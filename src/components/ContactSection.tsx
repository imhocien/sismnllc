import React, { useState, useRef } from 'react';
import { COMPANY_INFO } from '../data/sismnData';
import { submitContactInquiry, ContactSubmissionResult } from '../services/contactService';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Architecture & Engineering',
    message: '',
    botcheck: '', // Honeypot trap
  });

  const mountedAt = useRef<number>(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<ContactSubmissionResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionResult(null);

    const result = await submitContactInquiry({
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      service: formState.service,
      message: formState.message,
      botcheck: formState.botcheck,
      mountedAt: mountedAt.current,
    });

    setIsSubmitting(false);
    setSubmissionResult(result);

    if (result.success) {
      setIsSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 px-margin-mobile md:px-margin-desktop bg-surface text-on-surface relative">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-0.5 bg-amber-highlight" />
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">
                Consultation &amp; Inquiries
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg uppercase tracking-tight text-on-surface">
              Let’s Discuss Your Next Project or Investment
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Reach out to our Dallas corporate office for real estate acquisition consulting, engineering proposals,
              architectural designs, or development partnerships.
            </p>
          </div>
          <div className="bg-surface-container px-4 py-2 rounded-full font-spec-code text-spec-code text-on-surface font-semibold border border-steel-border">
            CONFIDENTIAL PROJECT EVALUATION
          </div>
        </div>

        {/* 2-Column: Info & Form */}
        <div className="grid lg:grid-cols-12 gap-gutter-lg items-start">
          {/* Left Column: Contact Cards & Office Details */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Visit Office Card */}
            <div className="bg-surface-container-lowest border border-steel-border rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-surface-dark text-amber-highlight flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-[24px]">location_on</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface mb-1">Corporate Office</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-2 leading-relaxed">
                  {COMPANY_INFO.contact.address}
                </p>
                <a
                  href={COMPANY_INFO.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-label-caps text-label-caps uppercase text-amber-highlight hover:underline font-bold inline-flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-surface-container-lowest border border-steel-border rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-surface-dark text-amber-highlight flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-[24px]">call</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface mb-1">Call Us Directly</h3>
                <div className="flex flex-col gap-1 font-body-sm">
                  <a
                    href={`tel:${COMPANY_INFO.contact.phone.replace(/[^0-9]/g, '')}`}
                    className="text-on-surface hover:text-amber-highlight font-semibold"
                  >
                    Main: {COMPANY_INFO.contact.phone}
                  </a>
                  <a
                    href={`tel:${COMPANY_INFO.contact.altPhone.replace(/[^0-9]/g, '')}`}
                    className="text-outline hover:text-amber-highlight"
                  >
                    Alternate: {COMPANY_INFO.contact.altPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Email Us Card */}
            <div className="bg-surface-container-lowest border border-steel-border rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-surface-dark text-amber-highlight flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-[24px]">mail</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface mb-1">Email Inquiries</h3>
                <a
                  href={`mailto:${COMPANY_INFO.contact.email}`}
                  className="font-body-sm text-body-sm text-on-surface hover:text-amber-highlight font-semibold block"
                >
                  {COMPANY_INFO.contact.email}
                </a>
                <span className="font-body-sm text-xs text-outline">Response within 24 business hours</span>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-surface-container-lowest border border-steel-border rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-surface-dark text-amber-highlight flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-[24px]">schedule</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface mb-1">Working Hours</h3>
                <p className="font-body-sm text-body-sm text-on-surface font-medium">
                  {COMPANY_INFO.contact.hours}
                </p>
                <p className="font-body-sm text-xs text-outline">
                  {COMPANY_INFO.contact.weekend}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Proposal Request Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest border border-steel-border rounded-3xl p-6 sm:p-10 shadow-xl">
            <h3 className="font-headline-lg text-headline-lg uppercase text-on-surface mb-2">
              Send an Inquiry or RFP
            </h3>
            <p className="font-body-sm text-body-sm text-outline mb-8">
              Fill in your contact and project details and an engineering associate will get in touch promptly.
            </p>

            {isSubmitted ? (
              <div className="bg-surface-container border border-steel-border rounded-xl p-8 text-center animate-in fade-in duration-300 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded bg-slate-surface-dark text-amber-highlight flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined text-[28px]">verified</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm uppercase text-on-surface">
                  Inquiry Transmitted Successfully
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                  Thank you, <strong className="text-on-surface">{formState.name}</strong>. Your project specifications have been securely routed to{' '}
                  <span className="text-on-surface font-semibold underline decoration-amber-highlight/50">{COMPANY_INFO.contact.email}</span>. A senior partner will review your inquiry and follow up within 24 hours.
                </p>
                {submissionResult?.mailtoFallback && (
                  <a
                    href={submissionResult.mailtoFallback}
                    className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-amber-highlight transition-colors mt-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">mail</span>
                    <span>Send a backup copy directly via your email client</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({
                      name: '',
                      email: '',
                      phone: '',
                      service: 'Architecture & Engineering',
                      message: '',
                      botcheck: '',
                    });
                    mountedAt.current = Date.now();
                  }}
                  className="mt-3 text-xs font-label-caps text-amber-highlight hover:underline uppercase tracking-wider font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Anti-Spam Honeypot Trap - Invisible to humans, catches automated crawlers */}
                <div className="opacity-0 absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
                  <label htmlFor="cs_botcheck">Leave this field blank</label>
                  <input
                    id="cs_botcheck"
                    type="text"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formState.botcheck}
                    onChange={(e) => setFormState({ ...formState, botcheck: e.target.value })}
                  />
                </div>

                {/* Submission Error or Rate Limit Alert */}
                {submissionResult && !submissionResult.success && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 text-sm flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[18px] text-red-500 shrink-0 mt-0.5">warning</span>
                      <span>{submissionResult.message}</span>
                    </div>
                    {submissionResult.mailtoFallback && (
                      <div className="pl-6">
                        <a
                          href={submissionResult.mailtoFallback}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold underline hover:text-red-600"
                        >
                          <span>Click here to send directly to info@sismnllc.com</span>
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body-sm text-body-sm font-semibold text-on-surface">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-amber-highlight transition-all border border-steel-border/50 shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-body-sm text-body-sm font-semibold text-on-surface">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-amber-highlight transition-all border border-steel-border/50 shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body-sm text-body-sm font-semibold text-on-surface">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="(214) 000-0000"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-amber-highlight transition-all border border-steel-border/50 shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-body-sm text-body-sm font-semibold text-on-surface">
                      Area of Interest
                    </label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-amber-highlight transition-all border border-steel-border/50 shadow-sm"
                    >
                      <option value="Architecture & Engineering">Architecture &amp; Engineering</option>
                      <option value="Commercial Development">Commercial Development</option>
                      <option value="Residential Building">Residential Building</option>
                      <option value="Land Acquisition & Platting">Land Acquisition &amp; Platting</option>
                      <option value="Real Estate Investment Opportunity">Real Estate Investment Opportunity</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-body-sm text-body-sm font-semibold text-on-surface">
                    Project Location &amp; Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide property details, parcel location, project scope, or investment objectives..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-amber-highlight transition-all border border-steel-border/50 resize-none shadow-sm"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-slate-surface-dark hover:bg-secondary disabled:opacity-60 disabled:cursor-not-allowed text-on-primary font-label-caps text-label-caps uppercase tracking-wider font-bold px-8 py-4 rounded-full shadow-lg shadow-[#0b1c30]/20 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-amber-highlight border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <span className="material-symbols-outlined text-[16px]">send</span>
                      </>
                    )}
                  </button>

                  <a
                    href={COMPANY_INFO.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-surface-dark font-label-caps text-label-caps uppercase font-bold bg-surface-container hover:bg-surface-container-high border border-steel-border px-5 py-3.5 rounded-full transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px] text-amber-highlight">chat</span>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Embedded Map Section */}
        <div className="bg-surface-container-lowest border border-steel-border rounded-2xl overflow-hidden shadow-lg h-[360px] relative">
          <iframe
            title="SISMN LLC Dallas Office Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.6508935706597!2d-96.7725841!3d32.9338274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c2079c6d3fae5%3A0x6fa0ef434e3230b7!2s13151%20Emily%20Rd%20%23100%2C%20Dallas%2C%20TX%2075240!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            className="w-full h-full border-0"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

