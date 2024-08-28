import { Response, Request, NextFunction } from "express";
import  {MensureIn}  from "dtos/MensureDtos";
import {ValidationError} from "../services/Error"



export function validation(req: Request, res: Response, next: NextFunction) {
  const body: Partial<MensureIn> = req.body;


  if (!body.image || typeof body.image !== "string") {
    return ValidationError(res,"INVALID_DATA", "O campo 'image' é obrigatório e deve ser uma string em formato base64.");
  }


  if (!body.custumer_cod || typeof body.custumer_cod !== "string") {
    return ValidationError(res,"INVALID_DATA", "O campo 'custumer_cod' é obrigatório e deve ser uma string.");
  }

 
  if (!body.measure_datetime || typeof body.measure_datetime !== "string" || isNaN(Date.parse(body.measure_datetime))) {
    return ValidationError(res, "INVALID_DATA","O campo 'measure_datetime' é obrigatório e deve ser uma string representando uma data válida.");
  }

 
  if (!body.measure_type || (body.measure_type !== "WATER" && body.measure_type !== "GAS")) {
    return ValidationError(res, "INVALID_DATA","O campo 'measure_type' é obrigatório e deve ser 'WATER' ou 'GAS'.");
  }

  next();
}
