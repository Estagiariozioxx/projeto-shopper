import { Request, Response } from "express";
import  {MensureIn}  from "dtos/MensureDtos";
import WaterGasModel from "../models/WaterGasModel";
import {ValidationError} from "../services/Error"


const waterGasModel = new WaterGasModel();


export default class WaterGasController{

    create = async (req: Request, res: Response) => {

        const mensure:MensureIn = req.body;

        const verifyMeasureDate = await waterGasModel.verifyMeasureDate(mensure);

        if(verifyMeasureDate.length == 0){
            return ValidationError(res, "DOUBLE_REPORT","Leitura do mês já realizada");
        }
        else{

        }
        
          res.status(200).json("ok")

      };




}