import fs from 'fs';

async function main() {
  const html = await fetch('https://sismnllc.com/about.html').then(r => r.text());
  const regex = /<div class="ts-team-wrapper">([\s\S]*?)<\/div>\s*<\/div>/gi;
  let match;
  let count = 0;
  while ((match = regex.exec(html)) !== null) {
    count++;
    const block = match[1];
    const nameMatch = block.match(/<h3[^>]*class="ts-name"[^>]*>([\s\S]*?)<\/h3>/i);
    const roleMatch = block.match(/<p[^>]*class="ts-designation"[^>]*>([\s\S]*?)<\/p>/i);
    const imgMatch = block.match(/src="([^"]+)"/i);
    const dataSrcMatch = block.match(/data-savepage-src="([^"]+)"/i);
    const dataCurrentSrc = block.match(/data-savepage-currentsrc="([^"]+)"/i);
    
    console.log(`[${count}] Name:`, nameMatch ? nameMatch[1].trim() : 'N/A');
    console.log(`     Role:`, roleMatch ? roleMatch[1].trim() : 'N/A');
    console.log(`     src:`, imgMatch ? imgMatch[1] : 'N/A');
    console.log(`     data-current-src:`, dataCurrentSrc ? dataCurrentSrc[1] : 'N/A');
    console.log('----------------------------------------------------');
  }
}

main();
