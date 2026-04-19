import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

async function optimizeImages() {
  try {
    const files = await fs.readdir(publicDir);
    const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.JPG', '.PNG']);

    for (const file of files) {
      const ext = path.extname(file);
      if (imageExtensions.has(ext)) {
        const filePath = path.join(publicDir, file);
        const nameWithoutExt = path.basename(file, ext);
        const newFileName = `${nameWithoutExt}.webp`;
        const newFilePath = path.join(publicDir, newFileName);

        console.log(`Processing: ${file}...`);
        
        try {
          const image = sharp(filePath);
          const metadata = await image.metadata();

          let pipeline = image;
          if (metadata.width && metadata.width > 1920) {
            console.log(`  Resizing ${file} from width ${metadata.width} to 1920`);
            pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
          }

          await pipeline
            .webp({ quality: 85 })
            .toFile(newFilePath);

          console.log(`  Successfully created ${newFileName}`);
          
          // Delete old file
          await fs.unlink(filePath);
          console.log(`  Deleted original ${file}`);
        } catch (err) {
          console.error(`  Error processing ${file}:`, err);
        }
      }
    }
    console.log('Finished optimizing images.');
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

optimizeImages();
