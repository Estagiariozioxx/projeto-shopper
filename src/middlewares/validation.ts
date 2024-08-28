import { Response, Request, NextFunction } from "express";
import  {MensureIn}  from "dtos/MensureUploadDtos";
import  {MensureConfirmIn}  from "dtos/MensureConfirmDtos";
import {ValidationError} from "../services/Error"



export function validationUpload(req: Request, res: Response, next: NextFunction) {
  const body: Partial<MensureIn> = req.body;


  if (!body.image || typeof body.image !== "string") {
    return ValidationError(res,"INVALID_DATA", "O campo 'image' é obrigatório e deve ser uma string em formato base64.",400);
  }


  if (!body.custumer_code || typeof body.custumer_code !== "string") {
    return ValidationError(res,"INVALID_DATA", "O campo 'custumer_cod' é obrigatório e deve ser uma string.",400);
  }

 
  if (!body.measure_datetime || typeof body.measure_datetime !== "string" || isNaN(Date.parse(body.measure_datetime))) {
    return ValidationError(res, "INVALID_DATA","O campo 'measure_datetime' é obrigatório e deve ser uma string representando uma data válida.",400);
  }

 
  if (!body.measure_type || (body.measure_type !== "WATER" && body.measure_type !== "GAS")) {
    return ValidationError(res, "INVALID_DATA","O campo 'measure_type' é obrigatório e deve ser 'WATER' ou 'GAS'.",400);
  }


  const base64Regex = /^data:image\/(png|jpeg|jpg|webp|heic|heif);base64,[A-Za-z0-9+/=]+$/;

  if (!base64Regex.test(body.image)) {
    return ValidationError(res, "INVALID_DATA", "O campo 'image' é inválido. A imagem deve estar em um dos formatos permitidos: PNG, JPEG, WEBP, HEIC, HEIF.",400);
  }

  next();
}



export function validationConfirm(req: Request, res: Response, next: NextFunction) {
  const body: Partial<MensureConfirmIn> = req.body;


  if (!body.measure_uuid || typeof body.measure_uuid !== "string") {
    return ValidationError(res,"INVALID_DATA", "O campo 'measure_uuid' é obrigatório e deve ser uma string",400);
  }


  if (!body.confirmed_value || typeof body.confirmed_value !== "number") {
    return ValidationError(res,"INVALID_DATA", "O campo 'confirmed_value' é obrigatório e deve ser um inteiro.",400);
  }

  next();
}
