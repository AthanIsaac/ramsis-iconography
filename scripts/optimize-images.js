const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../public/uploads');
const dataDir = path.join(__dirname, '../public/data');

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else results.push(full);
  }
  return results;
}

async function optimize() {
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

  // Optimize JPG, PNG, WebP
  for (const file of walk(uploadsDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f))) {
    const ext = path.extname(file).toLowerCase();
    const tmp = file + '.tmp';
    try {
      const img = sharp(file).rotate();
      if (ext === '.jpg' || ext === '.jpeg') {
        await img.jpeg({ quality: 82, progressive: true }).toFile(tmp);
      } else if (ext === '.png') {
        await img.png({ compressionLevel: 9 }).toFile(tmp);
      } else if (ext === '.webp') {
        await img.webp({ quality: 82 }).toFile(tmp);
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
