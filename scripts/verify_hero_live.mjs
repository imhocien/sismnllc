import { chromium } from 'playwright';

async function testScrollHero() {
  console.log('Launching browser for comprehensive hero verification...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // Desktop
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Opening http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // 1. Initial State: Stop 1 (Act 1, 1st frame)
  await page.screenshot({ path: 'verify_ch1_initial.png' });
  console.log('Captured verify_ch1_initial.png');

  // 2. First scroll gesture: moves to Stop 2 (Act 2 on right side, frame ~60)
  for (let i = 0; i < 8; i++) {
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(50);
  }
  // Wait for snap to settle cleanly on Stop 2
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'verify_ch2_scrolled.png' });
  console.log('Captured verify_ch2_scrolled.png');

  // 3. Second scroll gesture: moves to Stop 3 (Act 3, last frame 119)
  for (let i = 0; i < 9; i++) {
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(50);
  }
  // Wait for snap to settle cleanly on Stop 3
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'verify_ch3_scrolled.png' });
  console.log('Captured verify_ch3_scrolled.png');

  // 4. Mobile View (390x844 iPhone 14)
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(1500);
  await mobile.screenshot({ path: 'verify_mobile_ch1.png' });
  console.log('Captured verify_mobile_ch1.png');

  // Mobile scroll to Chapter 2
  for (let i = 0; i < 14; i++) {
    await mobile.mouse.wheel(0, 100);
    await mobile.waitForTimeout(60);
  }
  await mobile.waitForTimeout(800);
  await mobile.screenshot({ path: 'verify_mobile_ch2.png' });
  console.log('Captured verify_mobile_ch2.png');

  await browser.close();
  console.log('Verification finished!');
}

testScrollHero().catch(console.error);
