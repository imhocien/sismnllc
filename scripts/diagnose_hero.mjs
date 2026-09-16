import { chromium } from 'playwright';

async function diagnose() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const heroInfo = await page.evaluate(() => {
    const pinSpacer = document.querySelector('.pin-spacer');
    const hero = document.querySelector('section, div');
    return {
      hasPinSpacer: !!pinSpacer,
      pinSpacerHeight: pinSpacer ? pinSpacer.clientHeight : null,
      scrollTriggerCount: window.ScrollTrigger ? window.ScrollTrigger.getAll().length : 'No global ScrollTrigger',
      bodyHeight: document.body.scrollHeight,
    };
  });

  console.log('Hero Info:', JSON.stringify(heroInfo, null, 2));
  await browser.close();
}

diagnose().catch(console.error);
