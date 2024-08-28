import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; 

export function saveBase64ImageService(base64Image: string): string {
  const match = base64Image.match(/^data:image\/(\w+);base64,/);
  const imageType = match ? match[1] : 'png'; 
  const fileName = `${uuidv4()}.${imageType}`;


  const tempDir = path.join(__dirname, 'temp_images');

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const filePath = path.join(tempDir, fileName);

  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

  const imageBuffer = Buffer.from(base64Data, 'base64');

  fs.writeFileSync(filePath, imageBuffer);

  return filePath;
}