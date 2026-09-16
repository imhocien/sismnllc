const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const CONSTRUCTION_IMG_PATH = 'C:/Users/shbsh/.gemini/antigravity/brain/6311b6b5-9234-4727-95c9-e12e59816781/construction_site_frame_1787861548535.jpg';
const COMPLETED_IMG_PATH = 'C:/Users/shbsh/.gemini/antigravity/brain/6311b6b5-9234-4727-95c9-e12e59816781/completed_landmark_final_1787861899928.jpg';

const FRAMES_DIR = path.join(__dirname, 'public', 'frames');
const IMAGES_DIR = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(FRAMES_DIR)) fs.mkdirSync(FRAMES_DIR, { recursive: true });
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

fs.copyFileSync(CONSTRUCTION_IMG_PATH, path.join(IMAGES_DIR, 'construction_hero.jpg'));
fs.copyFileSync(COMPLETED_IMG_PATH, path.join(IMAGES_DIR, 'completed_hero.jpg'));

const TOTAL_FRAMES = 120;
const WIDTH = 1920;
const HEIGHT = 1080;

async function generateCleanPristineSequence() {
  console.log(`Generating ${TOTAL_FRAMES} pristine photorealistic sequence frames (No baked text/watermarks)...`);

  const constructionBuffer = await sharp(CONSTRUCTION_IMG_PATH)
    .resize(WIDTH, HEIGHT, { fit: 'cover' })
    .toBuffer();

  const completedBuffer = await sharp(COMPLETED_IMG_PATH)
    .resize(WIDTH, HEIGHT, { fit: 'cover' })
    .toBuffer();

  const startTime = Date.now();

  const buildingBaseY = HEIGHT - 120;
  const buildingTopY = 80;
  const buildingHeight = buildingBaseY - buildingTopY;

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const progress = i / (TOTAL_FRAMES - 1); // 0.0 to 1.0
    const frameNum = String(i + 1).padStart(3, '0');
    const outputPath = path.join(FRAMES_DIR, `frame_${frameNum}.webp`);

    // Smooth architectural vertical wipe + global tone transition curve
    // Scanline climbs vertically as building finishes from ground up
    const scanlineY = buildingBaseY - (progress * buildingHeight);
    const transitionBand = 80; // Soft optical transition band

    // Alpha mask for the completed building
    const maskSvg = `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scanMask" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000000" />
          <stop offset="${Math.max(0, (scanlineY - transitionBand) / HEIGHT)}" stop-color="#000000" />
          <stop offset="${Math.min(1, (scanlineY + transitionBand) / HEIGHT)}" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="url(#scanMask)" />
    </svg>`;

    if (progress <= 0.005) {
      // 100% Pure Construction Site Frame
      await sharp(constructionBuffer)
        .webp({ quality: 92, effort: 3 })
        .toFile(outputPath);
    } else if (progress >= 0.995) {
      // 100% Pure Completed Architectural Landmark Frame
      await sharp(completedBuffer)
        .webp({ quality: 92, effort: 3 })
        .toFile(outputPath);
    } else {
      // Composite smooth masked completed building onto construction frame
      const maskBuffer = await sharp(Buffer.from(maskSvg)).png().toBuffer();
      
      const maskedCompleted = await sharp(completedBuffer)
        .ensureAlpha()
        .joinChannel(maskBuffer)
        .toBuffer();

      await sharp(constructionBuffer)
        .composite([
          { input: maskedCompleted, blend: 'over' },
        ])
        .webp({ quality: 92, effort: 3 })
        .toFile(outputPath);
    }

    if ((i + 1) % 20 === 0 || i === TOTAL_FRAMES - 1) {
      console.log(`Generated frame_${frameNum}.webp (${i + 1}/${TOTAL_FRAMES}) [Progress: ${(progress * 100).toFixed(1)}%]`);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`✓ 120 pristine photorealistic frames generated in ${duration}s!`);
}

generateCleanPristineSequence().catch(console.error);
