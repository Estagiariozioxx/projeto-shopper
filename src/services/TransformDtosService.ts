import  {MensureIn, MensureSave, MensureOut}  from "dtos/MensureUploadDtos";
import { MensureConfirmOut } from "dtos/MensureConfirmDtos";
import { MeasureList,MeasureType } from "dtos/MensureListDtos";
import { Measure } from '@prisma/client';



// Função para mapear e transformar o DTO MensureIn para MensureSave
export async function transformToMensureSave(mensure: MensureIn, filePath:string,measureValue:string):Promise <MensureSave> {
    return {
        customerCode: mensure.custumer_code,
        measureDatetime: new Date(mensure.measure_datetime), 
        measureType: mensure.measure_type,
        imageUrl: filePath, 
        measureValue: Number(measureValue)
    };
}

// Função para mapear e transformar o DTO MensureIn para MensureSave
export async function transformToMensureOut(mensure:Measure):Promise <MensureOut> {
    return {
        image_url: mensure.imageUrl,
        measure_value:mensure.measureValue,
        measure_uuid: mensure.id
    };
}

export async function transformToMensureConfirm(status:boolean):Promise <MensureConfirmOut> {
    return {
        sucess:status
    };
}

export async function transformToMensureList(customerCode:string,measureType:MeasureType):Promise <MeasureList> {
    return {
        measureType:measureType,
        customerCode:customerCode

    };
}



