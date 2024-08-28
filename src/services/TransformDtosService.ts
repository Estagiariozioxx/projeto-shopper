import  {MensureIn, MensureSave, MensureOut}  from "dtos/MensureUploadDtos";
import { Measure } from '@prisma/client';



// Função para mapear e transformar o DTO MensureIn para MensureSave
export async function transformToMensureSave(mensure: MensureIn, filePath:string,measureValue:string):Promise <MensureSave> {
    return {
        customerCode: mensure.custumer_code,
        measureDatetime: new Date(mensure.measure_datetime), 
        measureType: mensure.measure_type,
        imageUrl: filePath, 
        measureValue: measureValue 
    };
}



// Função para mapear e transformar o DTO MensureIn para MensureSave
export async function transformToMensureOut(mensure:Measure):Promise <MensureOut> {
    return {
        image_url: mensure.imageUrl,
        measure_value:parseInt(mensure.measureValue, 10),
        measure_uuid: mensure.id
    };
}