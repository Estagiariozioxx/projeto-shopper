import { Request, Response } from "express";
import  {MensureIn, MensureSave, MensureOut}  from "dtos/MensureUploadDtos";
import { MensureConfirmIn,MensureConfirmOut } from "dtos/MensureConfirmDtos";
import WaterGasModel from "../models/WaterGasModel";
import {ValidationError} from "../services/Error"
import {saveBase64ImageService} from "../services/MeasureImageService"
import { GemininiUploadService } from "../services/GeminiService";
import { transformToMensureSave,transformToMensureOut,transformToMensureConfirm, transformToMensureList} from "../services/TransformDtosService";
import {MeasureType, MeasureList} from "../dtos/MensureListDtos"


const waterGasModel = new WaterGasModel();


export default class WaterGasController{

    create = async (req: Request, res: Response) => {
        
        const mensure:MensureIn = req.body;

        const verifyMeasureDate = await waterGasModel.verifyMeasureDate(mensure);

        if(verifyMeasureDate.length == 0){
            const file = saveBase64ImageService(mensure.image);
            const measureValue: string = await GemininiUploadService(file.filePath);

            const mensureSave: MensureSave = await transformToMensureSave(mensure,file.fileName,measureValue);

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
                return ValidationError(res, "CONFIRMATION_DUPLICATE","Leitura do mês já realizada",409);
            }
            else{

                const measureUpdateConfirm = await waterGasModel.measureUpdateConfirm(mensureConfirm);

                const measureconfirmout : MensureConfirmOut = await transformToMensureConfirm(true)
                res.status(200).json(measureconfirmout);

            }
        }
           
    };

    list = async (req: Request, res: Response) => {
        const customerCode:string  = req.params.custumerCode
        const measureTypeQuery = req.query.measure_type?.toString().toUpperCase();
        const measureType: MeasureType = measureTypeQuery as MeasureType;
            
        const measureList: MeasureList =await transformToMensureList(customerCode,measureType);

        const measurelist = await waterGasModel.measureList(measureList);

        if (measurelist.length > 0) {
            const response = {
                customer_code: customerCode,
                measures: measurelist.map(measure => ({
                    measure_uuid: measure.id,
                    measure_datetime: measure.measureDatetime,
                    measure_type: measure.measureType,
                    has_confirmed: measure.hasConfirmed,
                    image_url: measure.imageUrl,
                }))
            };
            return res.status(200).json(response);
        } else {
            return ValidationError(res, "MEASURE_NOT_FOUND","Nenhuma leitura encontrada",404);
        }
           
    };
}