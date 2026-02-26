const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration for different image sizes and qualities
const IMAGE_CONFIGS = {
  // Gallery thumbnails - smaller for grid view
  thumbnail: {
    width: 400,
    height: 400,
    quality: 85,
    suffix: '-thumb'
  },
  // Medium size for modal/detail view
  medium: {
    width: 800,
    height: 800,
    quality: 90,
    suffix: '-med'
  },
  // Large size for full screen
  large: {
    width: 1200,
    height: 1200,
    quality: 95,
    suffix: '-large'
  }
};

// Supported input formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.JPG', '.JPEG', '.PNG', '.WEBP', '.HEIC'];

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function optimizeImage(inputPath, outputDir, config) {
  const inputFileName = path.basename(inputPath, path.extname(inputPath));
  const outputFileName = `${inputFileName}${config.suffix}`;
  
  // Create both WebP and JPEG versions
  const webpPath = path.join(outputDir, `${outputFileName}.webp`);
  const jpegPath = path.join(outputDir, `${outputFileName}.jpg`);
  
  try {
    // Create WebP version (best compression)
    await sharp(inputPath)
      .resize(config.width, config.height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: config.quality })
      .toFile(webpPath);
    
    // Create JPEG fallback
    await sharp(inputPath)
      .resize(config.width, config.height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: config.quality, progressive: true })
      .toFile(jpegPath);
    
    // Get file sizes for reporting
    const webpStats = await fs.stat(webpPath);
    const jpegStats = await fs.stat(jpegPath);
    
    return {
      webp: { path: webpPath, size: webpStats.size },
      jpeg: { path: jpegPath, size: jpegStats.size }
    };
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(inputDir, outputDir) {
  console.log(`\n📁 Processing directory: ${inputDir}`);
  
  try {
    const files = await fs.readdir(inputDir);
    const imageFiles = files.filter(file => 
      SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase())
    );
    
    if (imageFiles.length === 0) {
      console.log('   No image files found');
      return;
    }
    
    console.log(`   Found ${imageFiles.length} image(s)`);
    
    // Ensure output directory exists
    await ensureDirectoryExists(outputDir);
    
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const originalStats = await fs.stat(inputPath);
      totalOriginalSize += originalStats.size;
      
      console.log(`\n   🖼️  Processing: ${file} (${(originalStats.size / 1024 / 1024).toFixed(2)}MB)`);
      
      // Generate all size variants
      for (const [sizeName, config] of Object.entries(IMAGE_CONFIGS)) {
        console.log(`      Creating ${sizeName} version...`);
        const result = await optimizeImage(inputPath, outputDir, config);
        
        if (result) {
          totalOptimizedSize += result.webp.size + result.jpeg.size;
          console.log(`      ✅ WebP: ${(result.webp.size / 1024).toFixed(1)}KB`);
          console.log(`      ✅ JPEG: ${(result.jpeg.size / 1024).toFixed(1)}KB`);
        }
      }
    }
    
    const compressionRatio = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    console.log(`\n   📊 Directory Summary:`);
    console.log(`      Original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`      Optimized: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`      Savings: ${compressionRatio}%`);
    
  } catch (error) {
    console.error(`Error processing directory ${inputDir}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting Image Optimization Process\n');
  
  const inputBaseDir = 'public/uploads';
  const outputBaseDir = 'public/uploads/optimized';
  
  // Ensure base output directory exists
  await ensureDirectoryExists(outputBaseDir);
  
  // Process icons directory
  await processDirectory(
    path.join(inputBaseDir, 'icons'),
    path.join(outputBaseDir, 'icons')
  );
  
  // Process project directories
  const projectsDir = path.join(inputBaseDir, 'projects');
  try {
    const projectFolders = await fs.readdir(projectsDir);
    
    for (const folder of projectFolders) {
      const projectPath = path.join(projectsDir, folder);
      const stats = await fs.stat(projectPath);
      
      if (stats.isDirectory()) {
        await processDirectory(
          projectPath,
          path.join(outputBaseDir, 'projects', folder)
        );
      }
    }
  } catch (error) {
    console.error('Error processing projects directory:', error.message);
  }
  
  console.log('\n✨ Image optimization complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Update your components to use the optimized images');
  console.log('   2. Implement responsive image loading');
  console.log('   3. Test the performance improvements');
}

// Run the optimization
main().catch(console.error);