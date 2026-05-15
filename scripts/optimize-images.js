const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const uploadsDir    = path.join(__dirname, '../public/uploads');
const iconsDir      = path.join(__dirname, '../public/uploads/icons');
const dataDir       = path.join(__dirname, '../public/data');
const watermarkPath = path.join(__dirname, '../public/watermark.png');

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else results.push(full);
  }
  return results;
}

function isHeic(filePath) {
  try {
    const buf = Buffer.alloc(12);
    const fd  = fs.openSync(filePath, 'r');
    fs.readSync(fd, buf, 0, 12, 0);
    fs.closeSync(fd);
    const boxType = buf.slice(4, 8).toString('ascii');
    const brand   = buf.slice(8, 12).toString('ascii');
    return boxType === 'ftyp' && /^(heic|heif|heis|heix|mif1|msf1)$/.test(brand);
  } catch {
    return false;
  }
}

async function optimize() {
  const hasWatermark  = fs.existsSync(watermarkPath);
  const watermarkRaw  = hasWatermark ? fs.readFileSync(watermarkPath) : null;
  const watermarkMeta = hasWatermark ? await sharp(watermarkRaw).metadata() : null;

  if (!hasWatermark) console.warn('Warning: public/watermark.png not found — gallery icons will have no watermark');

  let count = 0;

  // Convert HEIC → JPG (catches .heic extension AND HEIC data with a wrong extension)
  const heicFiles = walk(uploadsDir).filter(f => /\.heic$/i.test(f) || isHeic(f));
  for (const file of heicFiles) {
    const jpgPath = file.replace(/\.[^.]+$/, '.jpg');
    if (jpgPath === file) continue;
    try {
      await sharp(file).rotate().jpeg({ quality: 82, progressive: true }).toFile(jpgPath);
      fs.unlinkSync(file);
      count++;
    } catch (e) {
      console.error(`Skipped ${path.basename(file)}: ${e.message}`);
    }
  }

  if (heicFiles.length > 0 && fs.existsSync(dataDir)) {
    for (const jsonFile of fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))) {
      const filePath = path.join(dataDir, jsonFile);
      let content    = fs.readFileSync(filePath, 'utf8');
      for (const heicFile of heicFiles) {
        const oldName = path.basename(heicFile);
        const newName = oldName.replace(/\.[^.]+$/, '.jpg');
        if (oldName !== newName) content = content.split(oldName).join(newName);
      }
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }

  // Build the set of filenames that need a watermark (gallery + slideshow only)
  const watermarkNames = new Set();
  for (const jsonFile of ['gallery.json', 'slideshow.json']) {
    const jsonPath = path.join(dataDir, jsonFile);
    if (!fs.existsSync(jsonPath)) continue;
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    for (const img of data.images || []) {
      watermarkNames.add(path.basename(img.src));
    }
  }

  // Apply watermark to gallery/slideshow icons — skip everything else
  for (const file of walk(iconsDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f))) {
    if (!watermarkNames.has(path.basename(file))) continue;
    if (!watermarkRaw) continue;

    const ext = path.extname(file).toLowerCase();
    const tmp = file + '.tmp';
    try {
      const meta      = await sharp(file).metadata();
      const needsSwap = meta.orientation && meta.orientation >= 5;
      const w = needsSwap ? meta.height : meta.width;
      const h = needsSwap ? meta.width  : meta.height;

      const wmW     = Math.round(w * 0.8);
      const wmH     = Math.round(watermarkMeta.height * (wmW / watermarkMeta.width));
      const resized = await sharp(watermarkRaw).resize(wmW, wmH).toBuffer();

      const pipeline = sharp(file).rotate().composite([{ input: resized, gravity: 'center', blend: 'over' }]);

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

  console.log(`Watermarked ${count} image(s).`);
}

optimize();
