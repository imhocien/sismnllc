import { chromium } from 'playwright';
import fs from 'fs';

async function testVideo() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  console.log('Page loaded');

  const videoInfo = await page.evaluate(async () => {
    return new Promise((resolve, reject) => {
      const vid = document.createElement('video');
      vid.id = 'vid';
      vid.src = '/videos/hero-background.mp4';
      vid.muted = true;
      vid.playsInline = true;
      vid.onloadedmetadata = () => {
        resolve({
          duration: vid.duration,
          videoWidth: vid.videoWidth,
          videoHeight: vid.videoHeight
        });
      };
      vid.onerror = (e) => reject('Video failed to load: ' + vid.error?.message);
      document.body.appendChild(vid);
    });
  });

  console.log('Video metadata:', JSON.stringify(videoInfo));

  const frameBase64 = await page.evaluate(async () => {
    const vid = document.getElementById('vid');
    const cvs = document.createElement('canvas');
    vid.currentTime = 1.0;
    await new Promise((resolve) => {
      vid.onseeked = resolve;
    });
    cvs.width = vid.videoWidth;
    cvs.height = vid.videoHeight;
    const ctx = cvs.getContext('2d');
    ctx.drawImage(vid, 0, 0);
    return cvs.toDataURL('image/jpeg', 0.85);
  });

  const base64Data = frameBase64.replace(/^data:image\/jpeg;base64,/, '');
  fs.writeFileSync('temp_video_frame.jpg', base64Data, 'base64');
  console.log('Saved temp_video_frame.jpg');

  await browser.close();
}

testVideo().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
