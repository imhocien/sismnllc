import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function extractTest() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  
  const setupResult = await page.evaluate(() => {
    const vid = document.createElement('video');
    vid.id = 'extractor-vid';
    vid.src = '/videos/hero-background.mp4';
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = 'auto';
    document.body.appendChild(vid);
    
    return new Promise((resolve) => {
      vid.onloadedmetadata = () => {
        resolve({
          duration: vid.duration,
          width: vid.videoWidth,
          height: vid.videoHeight
        });
      };
    });
  });

  console.log('Video ready:', setupResult);
  
  const testTimes = [0, 1, 2, 3, 4];
  for (let i = 0; i < testTimes.length; i++) {
    const t = testTimes[i];
    const buffer = await page.evaluate(async (time) => {
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
        }, 'image/jpeg', 0.9);
      });
    }, t);

    const imgBuf = Buffer.from(buffer, 'base64');
    // Convert to webp with sharp
    const webpBuf = await sharp(imgBuf).webp({ quality: 80 }).toBuffer();
    console.log(`Extracted frame at ${t}s, webp size: ${(webpBuf.length / 1024).toFixed(1)} KB`);
  }

  await browser.close();
  console.log('Test complete!');
}

extractTest().catch(console.error);
