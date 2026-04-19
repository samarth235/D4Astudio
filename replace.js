import fs from 'fs/promises';
import path from 'path';

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(res);
    } else if (res.endsWith('.jsx') || res.endsWith('.tsx') || res.endsWith('.js') || res.endsWith('.html') || res.endsWith('.scss') || res.endsWith('.css')) {
      await processFile(res);
    }
  }
}

async function processFile(filePath) {
  let content = await fs.readFile(filePath, 'utf8');
  const original = content;

  // Replace image extensions
  // Handles .png, .jpg, .jpeg, .JPG, .PNG followed by quotation marks, backticks, or closing parentheses
  content = content.replace(/\.(png|jpg|jpeg|JPG|PNG)(['"`\)])/g, '.webp$2');
  
  if (content !== original) {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`Updated extensions in: ${filePath}`);
  }
}

processDirectory('./src')
  .then(() => processFile('./index.html'))
  .then(() => console.log('Replacement complete'))
  .catch(console.error);
