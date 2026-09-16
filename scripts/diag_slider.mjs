import { chromium } from 'playwright';

const URL = 'http://localhost:5173';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

// Observe raw wheel events + the component's own controller commands
const events = [];
await page.evaluate(() => {
  window.__sliderEvents = [];
  window.addEventListener(
    'wheel',
    (e) => {
      window.__sliderEvents.push({
        t: Math.round(performance.now()),
        dy: Math.round(e.deltaY),
        target: (e.target || {}).tagName,
      });
    },
    { capture: true, passive: true }
  );
});
page.on('console', (msg) => {
  if (msg.text().includes('WHEEL')) console.log(msg.text());
});

const burstWheel = async (times = 5, delta = 120) => {
  for (let i = 0; i < times; i++) {
    await page.mouse.wheel(0, delta);
  }
};

const readState = () =>
  page.evaluate(() => {
    const m = document.body.innerText.match(/ACT 0(\d) \/ 03/);
    return { act: m ? Number(m[1]) : 0, height: document.body.scrollHeight };
  });

console.log('INIT:', JSON.stringify(await readState()));
events.length = 0;
await burstWheel(5, 120);
console.log('EVENTS (5x120):', JSON.stringify(events));
await page.waitForTimeout(300);
console.log('T+300ms:', JSON.stringify(await readState()));
await page.waitForTimeout(1300);
console.log('T+1600ms:', JSON.stringify(await readState()));

// second burst after clear pause
events.length = 0;
await burstWheel(5, 120);
console.log('EVENTS2:', JSON.stringify(events));
await page.waitForTimeout(1600);
console.log('AFTER2:', JSON.stringify(await readState()));

await browser.close();