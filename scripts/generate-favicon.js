import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pngToIco from 'png-to-ico';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateFavicon() {
  try {
    // Read the SVG file
    const svgBuffer = await fs.readFile(join(__dirname, '../public/crm-icon.svg'));
    
    // Convert SVG to PNG with different sizes
    const sizes = [16, 32, 48];
    const pngBuffers = await Promise.all(
      sizes.map(size => 
        sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toBuffer()
      )
    );

    // Create temporary PNG files
    await Promise.all(
      pngBuffers.map((buffer, index) =>
        fs.writeFile(join(__dirname, `../public/temp-${sizes[index]}.png`), buffer)
      )
    );

    // Generate ICO file from PNGs
    const icoBuffer = await pngToIco([
      join(__dirname, '../public/temp-16.png'),
      join(__dirname, '../public/temp-32.png'),
      join(__dirname, '../public/temp-48.png')
    ]);

    // Write the favicon
    await fs.writeFile(join(__dirname, '../public/favicon.ico'), icoBuffer);

    // Clean up temporary files
    await Promise.all(
      sizes.map(size =>
        fs.unlink(join(__dirname, `../public/temp-${size}.png`))
      )
    );

    console.log('Favicon generated successfully!');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon(); 