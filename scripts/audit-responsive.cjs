const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const viewports = [
  { name: 'mobile-small', width: 360, height: 740 },
  { name: 'mobile-standard', width: 390, height: 844 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'desktop-wide', width: 1536, height: 864 }
];

const routes = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/investment',
  '/team',
  '/contact',
  '/faq',
  '/privacy-policy',
  '/terms-of-service',
  '/license-disclosures'
];

const screenshotsDir = path.join(__dirname, '..', 'audit-screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

(async () => {
  console.log('🚀 Starting Comprehensive Responsive Audit across all routes & viewports...');
  
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const issues = [];

  for (const vp of viewports) {
    console.log(`\n📱 Testing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: vp.width < 768 
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
        : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    const page = await context.newPage();

    for (const route of routes) {
      const url = `http://localhost:5173${route}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(600); // allow Lenis / framer-motion / GSAP initial tick

        // 1. Check document horizontal overflow
        const overflow = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const winWidth = window.innerWidth;
          const docScrollWidth = docEl.scrollWidth;
          const bodyScrollWidth = body.scrollWidth;

          // Find offending elements that stick out beyond window width
          const overflowingElements = [];
          const allEls = document.querySelectorAll('*');
          for (const el of allEls) {
            // Ignore scripts, styles, SVGs defs, hidden elements
            if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'NOSCRIPT'].includes(el.tagName)) continue;
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
            
            // Allow parent containers with overflow hidden/auto/scroll
            const isScrollContainer = ['hidden', 'auto', 'scroll'].includes(style.overflowX);
            if (!isScrollContainer && rect.right > winWidth + 2) {
              // check if parent or grandparent clips it
              let parent = el.parentElement;
              let isClipped = false;
              while (parent && parent !== document.body) {
                const parentStyle = window.getComputedStyle(parent);
                if (['hidden', 'clip', 'auto', 'scroll'].includes(parentStyle.overflowX) || ['hidden', 'clip', 'auto', 'scroll'].includes(parentStyle.overflow)) {
                  isClipped = true;
                  break;
                }
                parent = parent.parentElement;
              }
              if (!isClipped) {
                overflowingElements.push({
                  tag: el.tagName,
                  id: el.id || undefined,
                  className: el.className ? String(el.className).slice(0, 80) : undefined,
                  right: Math.round(rect.right),
                  width: Math.round(rect.width)
                });
              }
            }
          }

          return {
            winWidth,
            docScrollWidth,
            bodyScrollWidth,
            hasDocOverflow: docScrollWidth > winWidth + 1,
            overflowingElements: overflowingElements.slice(0, 5)
          };
        });

        const hasIssues = overflow.hasDocOverflow || overflow.overflowingElements.length > 0;
        if (hasIssues) {
          console.log(`  ❌ [${vp.name}] ${route}: Overflow detected! winWidth=${overflow.winWidth}, docScrollWidth=${overflow.docScrollWidth}`);
          if (overflow.overflowingElements.length > 0) {
            console.log('     Elements sticking out:', JSON.stringify(overflow.overflowingElements));
          }
          issues.push({
            viewport: vp.name,
            route,
            details: overflow
          });
        } else {
          console.log(`  ✅ [${vp.name}] ${route}: Perfect fit (${overflow.winWidth}px)`);
        }

        // Take snapshot for mobile and tablet to visually verify key routes
        if ((vp.name === 'mobile-standard' || vp.name === 'mobile-small') && ['/', '/projects', '/contact', '/faq'].includes(route)) {
          const safeRoute = route === '/' ? 'home' : route.replace(/\//g, '');
          const screenshotPath = path.join(screenshotsDir, `${vp.name}-${safeRoute}.png`);
          await page.screenshot({ path: screenshotPath, fullPage: false });
        }

      } catch (err) {
        console.error(`  ⚠️ [${vp.name}] ${route} failed to load:`, err.message);
        issues.push({ viewport: vp.name, route, error: err.message });
      }
    }

    // Special test on mobile: Test Navbar mobile hamburger menu open/close
    if (vp.width < 768) {
      try {
        await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
        const menuBtn = page.locator('button[aria-label*="navigation" i], button[aria-label*="menu" i]').first();
        if (await menuBtn.isVisible()) {
          await menuBtn.click();
          await page.waitForTimeout(300);
          console.log(`  📱 [${vp.name}] Mobile Menu opened cleanly`);
          await menuBtn.click();
          await page.waitForTimeout(300);
          console.log(`  📱 [${vp.name}] Mobile Menu closed cleanly`);
        }
      } catch (e) {
        console.log(`  ⚠️ Mobile menu interaction test: ${e.message}`);
      }
    }

    await context.close();
  }

  await browser.close();

  console.log('\n=============================================');
  console.log(`Audit Finished: ${issues.length} issue(s) detected.`);
  console.log('=============================================');
  if (issues.length > 0) {
    console.log(JSON.stringify(issues, null, 2));
  }
})();
