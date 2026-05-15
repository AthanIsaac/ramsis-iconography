const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../public/uploads');
const iconsDir   = path.join(__dirname, '../public/uploads/icons');
const dataDir    = path.join(__dirname, '../public/data');
const fontPath   = path.join(__dirname, '../public/RumbleBrave.otf');

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else results.push(full);
  }
  return results;
}

function buildWatermarkSvg(width, height, fontBase64) {
  const fontSize     = Math.round(width * 0.09);
  const letterSpacing = Math.round(fontSize * 0.12);
  const cx = Math.round(width / 2);
  const cy = Math.round(height / 2);

  const fontFace = fontBase64
    ? `@font-face { font-family: 'Rumble Brave'; src: url('data:font/otf;base64,${fontBase64}') format('opentype'); }`
    : '';
  const fontFamily = fontBase64 ? "'Rumble Brave', serif" : 'serif';

  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">` +
    `<defs>` +
    `<style>${fontFace}</style>` +
    `<filter id="s"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="black" flood-opacity="0.3"/></filter>` +
    `</defs>` +
    `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle" ` +
    `font-family="${fontFamily}" font-size="${fontSize}" letter-spacing="${letterSpacing}" ` +
    `fill="white" fill-opacity="0.4" filter="url(#s)">ramsis iconography</text>` +
    `</svg>`
  );
}

async function optimize() {
  const fontBase64 = fs.existsSync(fontPath)
    ? fs.readFileSync(fontPath).toString('base64')
    : null;

  if (!fontBase64) console.warn('Warning: RumbleBrave.otf not found — watermark will use fallback serif font');

  let count = 0;

  // Convert HEIC → JPG first, then update JSON references
  const heicFiles = walk(uploadsDir).filter(f => /\.heic$/i.test(f));
  for (const file of heicFiles) {
    const jpgPath = file.replace(/\.heic$/i, '.jpg');
    try {
      await sharp(file).rotate().jpeg({ quality: 82, progressive: true }).toFile(jpgPath);
      fs.unlinkSync(file);
      count++;
    } catch (e) {
      console.error(`Skipped ${path.basename(file)}: ${e.message}`);
    }
  }

  if (heicFiles.length > 0 && fs.existsSync(dataDir)) {
    for (const file of fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))) {
      const filePath = path.join(dataDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const updated = content.replace(/\.heic/gi, '.jpg');
      if (updated !== content) fs.writeFileSync(filePath, updated, 'utf8');
    }
  }

  // Build the set of filenames referenced in gallery.json and slideshow.json
  const watermarkNames = new Set();
  for (const jsonFile of ['gallery.json', 'slideshow.json']) {
    const jsonPath = path.join(dataDir, jsonFile);
    if (!fs.existsSync(jsonPath)) continue;
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    for (const img of data.images || []) {
      watermarkNames.add(path.basename(img.src));
    }
  }

  // Optimize + watermark only gallery/slideshow icons
  const iconFiles = walk(iconsDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  for (const file of iconFiles) {
    const shouldWatermark = watermarkNames.has(path.basename(file));
    const ext = path.extname(file).toLowerCase();
    const tmp = file + '.tmp';
    try {
      const meta = await sharp(file).metadata();
      const needsSwap = meta.orientation && meta.orientation >= 5;
      const w = needsSwap ? meta.height : meta.width;
      const h = needsSwap ? meta.width  : meta.height;

      let pipeline = sharp(file).rotate();
      if (shouldWatermark) {
        const watermark = buildWatermarkSvg(w, h, fontBase64);
        pipeline = pipeline.composite([{ input: watermark }]);
      }

      if (ext === '.jpg' || ext === '.jpeg') {
        await pipeline.jpeg({ quality: 82, progressive: true }).toFile(tmp);
      } else if (ext === '.png') {
        await pipeline.png({ compressionLevel: 9 }).toFile(tmp);
      } else if (ext === '.webp') {
        await pipeline.webp({ quality: 82 }).toFile(tmp);
      }

      fs.renameSync(tmp, file);
      count++;
    } catch (e) {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
      console.error(`Skipped ${path.basename(file)}: ${e.message}`);
    }
  }

  // Optimize non-icon images (projects, etc.) without watermark
  const otherFiles = walk(uploadsDir)
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f) && !f.startsWith(iconsDir));
  for (const file of otherFiles) {
    const ext = path.extname(file).toLowerCase();
    const tmp = file + '.tmp';
    try {
      const pipeline = sharp(file).rotate();
      if (ext === '.jpg' || ext === '.jpeg') {
        await pipeline.jpeg({ quality: 82, progressive: true }).toFile(tmp);
      } else if (ext === '.png') {
        await pipeline.png({ compressionLevel: 9 }).toFile(tmp);
      } else if (ext === '.webp') {
        await pipeline.webp({ quality: 82 }).toFile(tmp);
      }
      fs.renameSync(tmp, file);
      count++;
    } catch (e) {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
      console.error(`Skipped ${path.basename(file)}: ${e.message}`);
    }
  }

  console.log(`Optimized ${count} image(s).`);
}

optimize();
