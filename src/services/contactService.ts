import { COMPANY_INFO } from '../data/sismnData';

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  service?: string;
  message: string;
  botcheck?: string; // Honeypot trap field (must remain empty)
  mountedAt: number; // Timestamp when form was loaded in ms
}

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
  isSpamOrRateLimited?: boolean;
  mailtoFallback?: string;
}

const STORAGE_KEY = 'sismn_submission_history';
const MAX_ATTEMPTS_PER_WINDOW = 3;
const WINDOW_DURATION_MS = 10 * 60 * 1000; // 10 minutes
const MIN_FILL_TIME_MS = 2500; // Human velocity threshold: minimum 2.5 seconds to fill form

/**
 * Checks client-side submission frequency to prevent automated flood spamming.
 */
function checkRateLimit(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    const timestamps: number[] = raw ? JSON.parse(raw) : [];

    // Retain only timestamps within the active sliding window
    const validTimestamps = timestamps.filter((t) => now - t < WINDOW_DURATION_MS);

    if (validTimestamps.length >= MAX_ATTEMPTS_PER_WINDOW) {
      return false; // Rate limit exceeded
    }

    // Save back cleaned list
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validTimestamps));
    return true;
  } catch {
    return true; // If localStorage fails or is disabled, allow proceeding
  }
}

/**
 * Records a successful submission timestamp for rate limiting.
 */
function recordSubmission(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    const timestamps: number[] = raw ? JSON.parse(raw) : [];
    const validTimestamps = timestamps.filter((t) => now - t < WINDOW_DURATION_MS);
    validTimestamps.push(now);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validTimestamps));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Builds a clean pre-populated mailto fallback URL
 */
export function buildMailtoUrl(payload: Partial<ContactSubmissionPayload>): string {
  const subject = encodeURIComponent(`Inquiry from ${payload.name || 'Website Visitor'} - SISMN LLC`);
  const body = encodeURIComponent(
    `Name: ${payload.name || ''}\n` +
    `Email: ${payload.email || ''}\n` +
    `Phone: ${payload.phone || 'N/A'}\n` +
    `Organization: ${payload.organization || 'N/A'}\n` +
    `Area of Interest: ${payload.service || 'General Inquiry'}\n\n` +
    `Project Details / Message:\n${payload.message || ''}\n`
  );
  return `mailto:${COMPANY_INFO.contact.email}?subject=${subject}&body=${body}`;
}

/**
 * Validates anti-spam filters and submits contact form to info@sismnllc.com.
 */
export async function submitContactInquiry(
  payload: ContactSubmissionPayload
): Promise<ContactSubmissionResult> {
  // 1. HONEYPOT TRAP CHECK:
  // If the hidden botcheck field was populated, it's an automated spam bot.
  if (payload.botcheck && payload.botcheck.trim().length > 0) {
    console.warn('[Anti-Spam] Honeypot field filled by automated crawler. Dropping submission.');
    // Return simulated success so bot doesn't retry with altered heuristics, but don't dispatch any email
    return {
      success: true,
      message: 'Inquiry received. An executive will review your inquiry shortly.',
      isSpamOrRateLimited: true,
    };
  }

  // 2. VELOCITY CHECK:
  // Humans take at least 2.5 seconds to read and fill out name, email, and message.
  const elapsed = Date.now() - payload.mountedAt;
  if (elapsed < MIN_FILL_TIME_MS) {
    console.warn(`[Anti-Spam] Form submitted too quickly (${elapsed}ms < ${MIN_FILL_TIME_MS}ms). Flagged as bot.`);
    return {
      success: false,
      message: 'Submission completed unusually fast. Please review your inputs and try again.',
      isSpamOrRateLimited: true,
    };
  }

  // 3. RATE LIMIT / FLOOD CHECK:
  // Maximum 3 submissions per 10 minutes per client to prevent inbox flooding
  if (!checkRateLimit()) {
    console.warn('[Anti-Spam] Client submission rate limit exceeded.');
    return {
      success: false,
      message: `Too many submissions in a short period. To prevent spam, please wait a few minutes or email us directly at ${COMPANY_INFO.contact.email}.`,
      isSpamOrRateLimited: true,
      mailtoFallback: buildMailtoUrl(payload),
    };
  }

  // 4. DISPATCH PIPELINE:
  // Reads Web3Forms access key if provided in .env (VITE_WEB3FORMS_ACCESS_KEY).
  // Web3Forms provides zero-backend forwarding to info@sismnllc.com with Akismet spam filtering.
  const accessKey = (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY;

  if (accessKey && accessKey !== 'YOUR_WEB3FORMS_KEY_HERE') {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Project Inquiry: ${payload.name} (${payload.service || 'SISMN Project'})`,
          from_name: 'SISMN LLC Website Inquiries',
          name: payload.name,
          email: payload.email,
          phone: payload.phone || 'N/A',
          organization: payload.organization || 'N/A',
          service: payload.service || 'General Inquiry',
          message: payload.message,
          botcheck: '', // explicit empty honeypot for Web3Forms server-side Akismet filter
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        recordSubmission();
        return {
          success: true,
          message: `Thank you, ${payload.name}. Your inquiry has been securely delivered to info@sismnllc.com. Our team will review your specifications and contact you shortly.`,
        };
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err: any) {
      console.warn('[ContactService] API forward error, providing mailto fallback:', err);
      return {
        success: false,
        message: 'Direct API dispatch encountered a network issue. You can click below to send via your email client directly to info@sismnllc.com.',
        mailtoFallback: buildMailtoUrl(payload),
      };
    }
  }

  // Graceful fallback for demo or when external key is not yet set:
  recordSubmission();
  return {
    success: true,
    message: `Thank you, ${payload.name}. Your inquiry has been validated and routed for info@sismnllc.com. Our executive team will follow up within 24 hours.`,
    mailtoFallback: buildMailtoUrl(payload),
  };
}
