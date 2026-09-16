import { chromium } from 'playwright';
import fs from 'fs';

async function verifyHero() {
  console.log('Launching browser for hero verification...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // 1. Desktop Viewport (1440x900)
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Capture Frame 1 (0% scroll)
  await page.screenshot({ path: 'hero_chapter1_desktop.png' });
  console.log('Saved hero_chapter1_desktop.png');

  // Scroll down to 35% of hero pinned range (roughly 1400px down)
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.8, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'hero_chapter2_desktop.png' });
  console.log('Saved hero_chapter2_desktop.png');

  // Scroll down to 80% of hero pinned range (roughly 3200px down)
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 3.6, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'hero_chapter3_desktop.png' });
  console.log('Saved hero_chapter3_desktop.png');

  // 2. Mobile Viewport (390x844 iPhone 14)
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: 'hero_mobile_initial.png' });
  console.log('Saved hero_mobile_initial.png');

  // Mobile scroll down to Chapter 2
  await mobilePage.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.8, behavior: 'instant' }));
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({ path: 'hero_mobile_chapter2.png' });
  console.log('Saved hero_mobile_chapter2.png');

  await browser.close();
  console.log('All verification screenshots captured!');
}

verifyHero().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
