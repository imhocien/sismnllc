import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const IMAGES_TO_DOWNLOAD = [
  // Branding
  {
    url: 'https://lh3.googleusercontent.com/aida/AEtjO1WhMdrfYVQNM3myRgH_5AkXG3F5lNG98Zi6ENoH0i8r5uVHdwh9O0wWvTCzgrsPBrkgHvDVPoWfNyfW70jxdvncc9mHwoXD_Q8lGxmPcmKGoc-_rvQ0F1KtWCuS6NrR_XUjQHedfytiT6UfFncYrbSy1aw6lJF-0l9a0HDKXL57cjKCyBRlpzZcEr5mZz4iXYkagbE3Q5-8sAnCkgSXtoAAlM3nzauJH2dv1bBWBG9GDOBKcmCRT5OkVw',
    dest: 'public/images/branding/sismn-logo.png',
  },
  // Hero Showcase
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Gdm7pcsmICQl0ggI_rGAkTlFJGsXcwkpzvpuTovzfkFuqL0D6Jy2zmJKSUQPqLLhMqUMBPqOQ92O08BPFNNmlK-Fz2rVM7NWyG8ZBZAkiuBxaUnd_n6N6yMVZK_q8c3FxN7JJDOXInXmb4cs9BEWSUINwV5lSWZmxM6Uu9BOEG2IXoDzk7kQhfA0XBIiMKpBz8XpBn3m10lUG9QLT6lV_0rLIncgOeg-u7HPyBJSfDwyYGfQSTOb',
    dest: 'public/images/showcase/hero-gateway.jpg',
  },
  // Featured Projects in HomePage
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6wuiocAQWRICthdBc-Q8i4j8DoAAE9nhE7HALQMk5hIE02OeItwzenacY3fA3lgGAYY9Re1AUICaQP-lzwfau0lH47zufnql2R6P3pJjrkJWu0JwTH16YcHgo-PMTYAmpc3CXOJqyYGYk8d76IKs0QHgbdgnWCahqZH-SeXdFfo4s4L4_JLsLzQxEDGLdl1a47HYwfa3hymF3rJjtTkV69HjG3368B3ruWkA26z5P-0IXwOfws49q',
    dest: 'public/images/projects/the-vineyards.jpg',
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOS_koIbgpugw6YdQ2VcEOvbUY9ArLqyh0lcPH_AfqJ18EEWiQ0cAx1hEqMc_JPpT0Epx9vaaVTyI166SLjC3d4Nl6QxTX8VlgLBa9UtLjt7ClFPUa9qjceyyZ2Dtd3AlwAbaKDVHPyufasMTPRi5FBCdmv5ORDGRT9mMi2SJcMYN48i9JgHVFRooVQesEY--BPwrt7Srz_8PopI__HvJd8-rVbczmIrhyt6Xyg5JBn3t2U9qY2ShG',
    dest: 'public/images/projects/the-mya-heights.jpg',
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYx91hXARaA489N53jbJaoUbRHvdkevV2gYYk50slHACg7LgA6ZQfPVPfi8lUUiIAUHXFFAct3-j7kAHfUFKFJI6f9GpDndApPQJoxg7ZjAsUI9ap_egT2efDRfvte0PN4Q01dj2kimJGFaXwGTa7rU9XHDVf_0t7jJOURxm9OvjdPcBnGmT3H31kRFqxAl3YceDFTlZ2eEPE7zFmE-xHUKQqCyNCaywDfNjSV6PSUKlIpoe4Tu2_q',
    dest: 'public/images/projects/shahla-homes.jpg',
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4ZO8jaBNr_0NRcljNHWaDNStj3Ts9WzaNYnZBVciPL0z9A3IblQpi6F-rJbifVU1laZpfvlmpu_D2rM71mOyhrXDOEjHv53V2sRZ3jMHQ0TlTgJcKmr99mxf7oadnt2N8s1lKYefOadKurbwVKCPIgy-SP2DUr2tUoUbCIxwm0_m34jOyLIAHZLA4raG0oWTC-2K_u4Jiu6irX-f_uaAAPmaXlKWTbqhijfbfyERqCWLLSz58O9ec',
    dest: 'public/images/projects/savana-avenue.jpg',
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC755wTaME0t9yzB6QE3N6a3-8dP-fwmJveahlP5u8B-p3u3zc5uXt8b199tF--VHcdGvqxzpCecDS7ZKaQvNxloYZJxSz8w8XIVcOwPU0EoOvoTBdMLt0hz3fDpK5oAb5ekutjdtlZl68OgqdjC2LHw4Lbkua-XsEkgwucw6qYZd_jtLM40eViXf4MQ_PYmu6hwlp8fawdsS1ocjUKX2NZKXXafzyxxE0n-D1qfQvqtZrC5LSuk8J',
    dest: 'public/images/projects/silver-saddle-court.jpg',
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXP68NKP-F2EB9NUDkSYrpDA5FTuDEJEcBTTRSiqtNVfNoFu6kkls9GV8yXeMT4Z-ybvewzIJy39epTmoqk2IKmdoYwo_ePaajuFBFX2DrOMlPTXmhghPboR6dMO404COYGUu5-aKRVGvTJ9GyfFdC56Wi5QLw1McVBG1RKZnOU8kt__tw7DfbuMvGqq2Qdj7V9GjMmMrXih71j_ewqeLnDPSBhgoH2PuksXcBteq6lgW7JWwO1JnL',
    dest: 'public/images/projects/clarksville-hospital.jpg',
  },
  // Hero Backgrounds
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
    dest: 'public/images/heroes/hero-slide-1.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80',
    dest: 'public/images/heroes/hero-slide-2.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80',
    dest: 'public/images/heroes/hero-slide-3.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80',
    dest: 'public/images/heroes/hero-slide-4.jpg',
  },
  // Subpage Headers
  {
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=80',
    dest: 'public/images/heroes/header-projects.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80',
    dest: 'public/images/heroes/header-contact.jpg',
  },
  // Projects in sismnData
  {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/projects/data-mya-heights.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/projects/data-shahla-homes.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/projects/data-silver-saddle.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/projects/data-clarksville.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/projects/blue-grove.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/projects/liberty-grove.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/projects/bear-creek.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/projects/commercial-plaza.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/projects/office-complex.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/projects/retail-center.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/projects/medical-facility.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/projects/restaurant-hub.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/projects/hotel-development.jpg',
  },
];

async function downloadFile(url, relativeDest) {
  const fullDest = path.join(rootDir, relativeDest);
  const dir = path.dirname(fullDest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log(`Downloading: ${url.substring(0, 70)}... -> ${relativeDest}`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const arrayBuffer = await res.arrayBuffer();
    fs.writeFileSync(fullDest, Buffer.from(arrayBuffer));
    console.log(`✓ Saved ${relativeDest} (${(arrayBuffer.byteLength / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`✗ Error downloading ${url}:`, err.message);
  }
}

async function main() {
  console.log(`Starting download of ${IMAGES_TO_DOWNLOAD.length} images...`);
  for (const item of IMAGES_TO_DOWNLOAD) {
    await downloadFile(item.url, item.dest);
  }
  console.log('All image downloads completed!');
}

main();
