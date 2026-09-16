const fs = require('fs');
const path = require('path');
const { createH264MP4Encoder } = require('h264-mp4-encoder');
const sharp = require('sharp');

const FRAMES_DIR = path.join(__dirname, 'public', 'frames');
const VIDEOS_DIR = path.join(__dirname, 'public', 'videos');

if (!fs.existsSync(VIDEOS_DIR)) fs.mkdirSync(VIDEOS_DIR, { recursive: true });

async function createTransformationVideo() {
  console.log('Initializing H264 MP4 WebAssembly Encoder...');
  const encoder = await createH264MP4Encoder();

  const width = 1920;
  const height = 1080;
  const fps = 30;
  const totalFrames = 120;

  encoder.width = width;
  encoder.height = height;
  encoder.frameRate = fps;
  encoder.kbps = 9000; // 9 Mbps high bit-rate 1080p
  encoder.groupOfPictures = 15;
  encoder.initialize();

  console.log(`Encoding ${totalFrames} frames into cinematic 1080p MP4 (${fps}fps)...`);
  const startTime = Date.now();

  // Hold first frame for 15 frames (0.5s pause at start)
  const firstFrameRaw = await sharp(path.join(FRAMES_DIR, 'frame_001.webp'))
    .resize(width, height)
    .ensureAlpha()
    .raw()
    .toBuffer();

  for (let h = 0; h < 15; h++) {
    encoder.addFrameRgba(firstFrameRaw);
  }

  // Encode all 120 transformation frames
  for (let i = 0; i < totalFrames; i++) {
    const frameNum = String(i + 1).padStart(3, '0');
    const framePath = path.join(FRAMES_DIR, `frame_${frameNum}.webp`);

    const rawBuffer = await sharp(framePath)
      .resize(width, height)
      .ensureAlpha()
      .raw()
      .toBuffer();

    encoder.addFrameRgba(rawBuffer);

    if ((i + 1) % 30 === 0 || i === totalFrames - 1) {
      console.log(`Encoded frame ${i + 1}/${totalFrames}...`);
    }
  }

  // Hold last frame for 25 frames (~0.8s pause at end)
  const lastFrameRaw = await sharp(path.join(FRAMES_DIR, 'frame_120.webp'))
    .resize(width, height)
    .ensureAlpha()
    .raw()
    .toBuffer();

  for (let h = 0; h < 25; h++) {
    encoder.addFrameRgba(lastFrameRaw);
  }

  encoder.finalize();
  const mp4Buffer = Buffer.from(encoder.FS.readFile(encoder.outputFilename));
  encoder.delete();

  const outputPath = path.join(VIDEOS_DIR, 'construction_transformation.mp4');
  fs.writeFileSync(outputPath, mp4Buffer);

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  const sizeMB = (mp4Buffer.length / (1024 * 1024)).toFixed(2);
  console.log(`✓ 1080p MP4 video successfully generated: ${outputPath} (${sizeMB} MB in ${duration}s)`);
}

createTransformationVideo().catch(console.error);
