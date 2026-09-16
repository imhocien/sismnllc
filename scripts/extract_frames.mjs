import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function extractAllFrames() {
  const TOTAL_FRAMES = 120;
  const outDir = path.resolve('public/frames');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log(`Starting extraction of ${TOTAL_FRAMES} frames from hero-background.mp4...`);
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  
  const duration = await page.evaluate(() => {
    const vid = document.createElement('video');
    vid.id = 'extractor-vid';
    vid.src = '/videos/hero-background.mp4';
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = 'auto';
    document.body.appendChild(vid);
    
    return new Promise((resolve) => {
      vid.onloadedmetadata = () => resolve(vid.duration);
    });
  });

  console.log(`Video duration: ${duration}s. Generating ${TOTAL_FRAMES} frames...`);

  // Process in batches of 1 to ensure seek precision
  const startTime = Date.now();
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const frameIndex = i + 1;
    // Calculate time stamp
    const targetTime = (i / (TOTAL_FRAMES - 1)) * (duration - 0.05);

    const base64Data = await page.evaluate(async (time) => {
      const vid = document.getElementById('extractor-vid');
      vid.currentTime = time;
      await new Promise(r => vid.onseeked = r);
      
      const cvs = document.createElement('canvas');
      cvs.width = 1600;
      cvs.height = 900;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(vid, 0, 0, 1600, 900);
      
      return new Promise(r => {
        cvs.toBlob(blob => {
          const reader = new FileReader();
          reader.onloadend = () => r(reader.result.split(',')[1]);
          reader.readAsDataURL(blob);
        }, 'image/jpeg', 0.92);
      });
    }, targetTime);

    const padIndex = String(frameIndex).padStart(3, '0');
    const filename = `frame_${padIndex}.webp`;
    const destPath = path.join(outDir, filename);

    const imgBuf = Buffer.from(base64Data, 'base64');
    await sharp(imgBuf)
      .webp({ quality: 82, effort: 3 })
      .toFile(destPath);

    if (frameIndex % 10 === 0 || frameIndex === TOTAL_FRAMES) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`Progress: ${frameIndex}/${TOTAL_FRAMES} (${Math.round((frameIndex / TOTAL_FRAMES) * 100)}%) - ${elapsed}s elapsed`);
    }
  }

  await browser.close();
  console.log(`All ${TOTAL_FRAMES} frames extracted and saved to ${outDir}!`);
}

extractAllFrames().catch(err => {
  console.error('Extraction error:', err);
  process.exit(1);
});
