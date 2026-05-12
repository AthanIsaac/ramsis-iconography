const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../public/uploads');

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
  const files = walk(uploadsDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  let count = 0;
  for (const file of files) {
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
