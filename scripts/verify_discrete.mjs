import { chromium } from 'playwright';

const URL = 'http://localhost:5173';
let failures = 0;

function check(name, cond, extra = '') {
  const ok = !!cond;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? '  [' + extra + ']' : ''}`);
  if (!ok) failures++;
}

async function currentAct(page) {
  return page.evaluate(() => {
    const m = document.body.innerText.match(/ACT 0(\d) \/ 03/);
    return m ? Number(m[1]) : 0;
  });
}

async function assertAct(page, expected, label) {
  const act = await currentAct(page);
  check(`${label}: landed on Act`, act === expected, `expected ${expected}, got ${act}`);
  return act;
}

// One quick realistic gesture = a short strong flick (like a real wheel detent)
// followed by a clear pause before the next gesture.
async function burstWheel(page, times = 5, delta = 120) {
  for (let i = 0; i < times; i++) {
    await page.mouse.wheel(0, delta);
  }
}

const browser = await chromium.launch({ channel: 'msedge', headless: true });

// ── DESKTOP ──────────────────────────────────────────────────────────────
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  check('Initial Act 1', (await currentAct(page)) === 1);

  // Gesture 1: one strong flick → must advance to exactly Act 2
  await burstWheel(page);
  await page.waitForTimeout(1600);
  const act2 = await assertAct(page, 2, 'Gesture 1 (strong flick)');

  // An even more violent flick: must reach exactly Act 3, not skip past it
  await burstWheel(page, 8, 150);
  await page.waitForTimeout(1600);
  await assertAct(page, 3, 'Gesture 2 (violent flick)');

  // Reverse: one flick up → back to Act 2 exactly
  await burstWheel(page, 6, -150);
  await page.waitForTimeout(1600);
  await assertAct(page, 2, 'Reverse gesture 1');

  await burstWheel(page, 6, -150);
  await page.waitForTimeout(1600);
  await assertAct(page, 1, 'Reverse gesture 2');

  // Exit: two flicks down → Act 3, then one more gesture scrolls the page
  await burstWheel(page, 6, 150);
  await page.waitForTimeout(1600);
  await assertAct(page, 2, 'Forward to Act 2');
  await burstWheel(page, 6, 150);
  await page.waitForTimeout(1600);
  await assertAct(page, 3, 'Forward to Act 3');

  const before = await page.evaluate(() => window.scrollY);
  await burstWheel(page, 8, 150);
  await page.waitForTimeout(1600);
  const after = await page.evaluate(() => window.scrollY);
  check('Exit: page scrolled past hero', after > before + 100, `scrollY ${before} -> ${after}`);

  // Chapter dot buttons still work
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  await page.locator('button[aria-label="Go to Act 3"]').click();
  await page.waitForTimeout(1600);
  await assertAct(page, 3, 'Dot button: Act 3');
  await page.locator('button[aria-label="Go to Act 1"]').click();
  await page.waitForTimeout(1600);
  await assertAct(page, 1, 'Dot button: Act 1');

  // Keyboard: single Down → Act 2 only
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(1600);
  await assertAct(page, 2, 'Keyboard down: Act 2');
  await page.keyboard.press('ArrowUp');
  await page.waitForTimeout(1600);
  await assertAct(page, 1, 'Keyboard up: Act 1');

  await page.screenshot({ path: 'verify_discrete_desktop.png' });
  await page.close();
}

// ── SLIDER: three discrete scrolls = act 2, act 3, next section ──────────
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  check('Slider init Act 1', (await currentAct(page)) === 1);

  // Scroll 1 (single gentle notch) -> Act 2
  await page.mouse.wheel(0, 120);
  await page.waitForTimeout(700);
  await assertAct(page, 2, 'Slider scroll 1');

  // Scroll 2 arrives mid-transition -> must chain to Act 3, not be swallowed
  await page.mouse.wheel(0, 120);
  await page.waitForTimeout(700);
  await assertAct(page, 3, 'Slider scroll 2');

  // Scroll 3 -> hands the page to the next section
  const before = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 120);
  await page.waitForTimeout(1600);
  const after = await page.evaluate(() => window.scrollY);
  check('Slider scroll 3 exits', after > before + 10, `scrollY ${before} -> ${after}`);

  await page.screenshot({ path: 'verify_slider_desktop.png' });
  await page.close();
}

// ── MOBILE TOUCH ─────────────────────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  check('Mobile init Act 1', (await currentAct(page)) === 1);

  const swipe = async (dy) => {
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 195, y: 400 }] });
    for (let y = 400; Math.abs(400 - y) < Math.abs(dy); y += Math.sign(dy) * 30) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 195, y }] });
      await page.waitForTimeout(10);
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  };

  await swipe(-300);
  await page.waitForTimeout(1600);
  await assertAct(page, 2, 'Touch swipe 1');

  await swipe(-300);
  await page.waitForTimeout(1600);
  await assertAct(page, 3, 'Touch swipe 2');

  const before = await page.evaluate(() => window.scrollY);
  await swipe(-300);
  await page.waitForTimeout(1600);
  const after = await page.evaluate(() => window.scrollY);
  check('Touch exit: page scrolled', after > before + 80, `scrollY ${before} -> ${after}`);

  await page.screenshot({ path: 'verify_discrete_mobile.png' });
  await ctx.close();
}

await browser.close();
console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);