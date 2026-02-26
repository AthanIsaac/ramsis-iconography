const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const IMAGE_CONFIGS = {
  thumbnail: { width: 400, height: 400, quality: 85, suffix: '-thumb' },
  medium: { width: 800, height: 800, quality: 90, suffix: '-med' },
  large: { width: 1200, height: 1200, quality: 95, suffix: '-large' }
};

const MISSING_IMAGES = ['Christ.jpg', 'Theotokos.jpg', 'simon.jpg'];

async function optimizeImage(inputPath, outputDir, config) {
  const inputFileName = path.basename(inputPath, path.extname(inputPath));
  const outputFileName = `${inputFileName}${config.suffix}`;
  
  const webpPath = path.join(outputDir, `${outputFileName}.webp`);
  const jpegPath = path.join(outputDir, `${outputFileName}.jpg`);
  
  try {
    console.log(`  Creating ${config.suffix.replace('-', '')} versions...`);
    
    // Create WebP version
    await sharp(inputPath)
      .resize(config.width, config.height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: config.quality })
      .toFile(webpPath);
    
    // Create JPEG version
    await sharp(inputPath)
      .resize(config.width, config.height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: config.quality, progressive: true })
      .toFile(jpegPath);
    
    const webpStats = await fs.stat(webpPath);
    const jpegStats = await fs.stat(jpegPath);
    
    console.log(`    ✅ WebP: ${(webpStats.size / 1024).toFixed(1)}KB`);
    console.log(`    ✅ JPEG: ${(jpegStats.size / 1024).toFixed(1)}KB`);
    
    return true;
  } catch (error) {
    console.error(`    ❌ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🔧 Fixing missing optimized images...\n');
  
  const inputDir = 'public/uploads/icons';
  const outputDir = 'public/uploads/optimized/icons';
  
  for (const imageName of MISSING_IMAGES) {
    const inputPath = path.join(inputDir, imageName);
    
    try {
      await fs.access(inputPath);
      console.log(`📸 Processing: ${imageName}`);
      
      let successCount = 0;
      for (const [sizeName, config] of Object.entries(IMAGE_CONFIGS)) {
        const success = await optimizeImage(inputPath, outputDir, config);
        if (success) successCount++;
      }
      
      if (successCount === 3) {
        console.log(`  ✅ Successfully optimized ${imageName}\n`);
      } else {
        console.log(`  ⚠️  Partially optimized ${imageName} (${successCount}/3)\n`);
      }
      
    } catch (error) {
      console.error(`❌ Could not find ${imageName}: ${error.message}\n`);
    }
  }
  
  console.log('✨ Missing image optimization complete!');
}

main().catch(console.error);