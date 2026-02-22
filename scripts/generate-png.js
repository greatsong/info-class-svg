const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SVG_DIR = path.join(__dirname, '..', 'svg');
const PNG_DIR = path.join(__dirname, '..', 'png');
const SIZES = [32, 64, 128, 256];

async function generatePngs() {
  const categories = fs.readdirSync(SVG_DIR).filter(d =>
    fs.statSync(path.join(SVG_DIR, d)).isDirectory()
  );

  let total = 0;
  let success = 0;
  let errors = [];

  for (const category of categories) {
    const svgCategoryDir = path.join(SVG_DIR, category);
    const svgFiles = fs.readdirSync(svgCategoryDir).filter(f => f.endsWith('.svg'));

    for (const size of SIZES) {
      const pngSizeDir = path.join(PNG_DIR, `${size}`, category);
      fs.mkdirSync(pngSizeDir, { recursive: true });
    }

    for (const svgFile of svgFiles) {
      const svgPath = path.join(svgCategoryDir, svgFile);
      const baseName = svgFile.replace('.svg', '');
      const svgBuffer = fs.readFileSync(svgPath);

      for (const size of SIZES) {
        total++;
        const pngPath = path.join(PNG_DIR, `${size}`, category, `${baseName}.png`);
        try {
          await sharp(svgBuffer)
            .resize(size, size)
            .png()
            .toFile(pngPath);
          success++;
        } catch (err) {
          errors.push(`${category}/${baseName} @${size}px: ${err.message}`);
        }
      }
    }

    console.log(`  ${category}: ${svgFiles.length} SVGs × ${SIZES.length} sizes`);
  }

  console.log(`\nDone! ${success}/${total} PNGs generated.`);
  if (errors.length > 0) {
    console.log(`\nErrors (${errors.length}):`);
    errors.forEach(e => console.log(`  - ${e}`));
  }
}

console.log(`Generating PNGs in sizes: ${SIZES.join(', ')}px`);
console.log(`Source: ${SVG_DIR}`);
console.log(`Output: ${PNG_DIR}\n`);

generatePngs().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
