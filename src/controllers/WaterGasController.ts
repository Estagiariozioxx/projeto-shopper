import { Request, Response } from "express";
import  {MensureIn, MensureSave, MensureOut}  from "dtos/MensureUploadDtos";
import { MensureConfirmIn,MensureConfirmOut } from "dtos/MensureConfirmDtos";
import WaterGasModel from "../models/WaterGasModel";
import {ValidationError} from "../services/Error"
import {saveBase64ImageService} from "../services/MeasureImageService"
import { GemininiUploadService } from "../services/GeminiService";
import { transformToMensureSave,transformToMensureOut} from "../services/TransformDtosService";


const waterGasModel = new WaterGasModel();


export default class WaterGasController{

    create = async (req: Request, res: Response) => {
        

        const mensure:MensureIn = req.body;

        const verifyMeasureDate = await waterGasModel.verifyMeasureDate(mensure);

        if(verifyMeasureDate.length == 0){
            const filePath = saveBase64ImageService(mensure.image);
            const measureValue: string = await GemininiUploadService(filePath);

            const mensureSave: MensureSave = await transformToMensureSave(mensure,filePath,measureValue);

            const newMeasure = await waterGasModel.createMeasure(mensureSave);

            const mensureOut : MensureOut = await transformToMensureOut(newMeasure)

            res.status(200).json(mensureOut);

        }
        else{
            return ValidationError(res, "DOUBLE_REPORT","Leitura do mês já realizada",409);
        }
        
         
    };


    confirm = async (req: Request, res: Response) => {
        

        const mensureConfirm:MensureConfirmIn = req.body;

        const verifyMeasurereading = await waterGasModel.verifyMeasureReading(mensureConfirm);

        if(verifyMeasurereading.length == 0){
            return ValidationError(res, "MEASURE_NOT_FOUND","Leitura do mês já realizada",404);
        }
        else{
            const verifyMeasureconfirm = await waterGasModel.verifyMeasureConfirmed(mensureConfirm);

            if(verifyMeasureconfirm.length == 0){
                return ValidationError(res, "MEASURE_NOT_FOUND","Leitura do mês já realizada",409);
            }
            else{

                const measureUpdateConfirm = await waterGasModel.measureUpdateConfirm(mensureConfirm);
                res.status(200).json(measureUpdateConfirm);

            }


        }
        
         
    };
}