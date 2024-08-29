
import {sign} from 'jsonwebtoken';


const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const secretKey = process.env.SECRET_KEY || 'imgtempshopper';


export default function generateTemporaryUrl(fileName: string, expiresIn: string): string {
    const token = sign({ fileName }, secretKey, { expiresIn });
    return `http://localhost:3000/files/${fileName}?token=${token}`;
  }