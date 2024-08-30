import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import fs from "fs";

const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY!);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


export async function GemininiUploadService(filePath: string): Promise <string>{

  const fileExtension = path.extname(filePath).toLowerCase(); // Converte para minúsculas para consistência

  let mimeType = await mimeTypeConvert(fileExtension);
  
  const uploadResponse = await fileManager.uploadFile(filePath, {
    mimeType: mimeType,
    displayName: "gas or water meter",
  });

  //console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);

    const getResponse = await fileManager.getFile(uploadResponse.file.name);
    //console.log(`getresponse ${JSON.stringify(getResponse, null, 2)}`);


    //console.log(`Retrieved file ${getResponse.displayName} as ${getResponse.uri}`);


    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      
      
      const result = await model.generateContent([
          {
            fileData: {
              mimeType: uploadResponse.file.mimeType,
              fileUri: uploadResponse.file.uri
            }
          },
          { text: "just tell me the value of the meter, without any text and no dots between the numbers, just numbers"},
        ]);
      
      //console.log(result.response.text())
      return result.response.text();


}



async function mimeTypeConvert(fileExtension:string){

    let mimeType = "";

    switch (fileExtension) {
        case ".jpeg":
            mimeType = "image/jpeg";
        case ".jpg":
            mimeType = "image/jpg";
            break;
        case ".webp":
            mimeType = "image/webp";
            break;
        case ".heic":
            mimeType = "image/heic";
            break;
        case ".heif":
            mimeType = "image/heif";
            break;
    }
    return mimeType;

}
