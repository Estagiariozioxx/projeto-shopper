import { Response, Request, NextFunction } from "express";


interface Body {
  image: string; 
  custumer_cod: string;
  measure_datetime: string; 
  measure_type: "WATER" | "GAS";
}


function ValidationError(res: Response, description: string) {
  return res.status(400).json({
    error_code: "INVALID_DATA",
    error_description: description,
  });
}

export function validation(req: Request, res: Response, next: NextFunction) {
  const body: Partial<Body> = req.body;

  // Verifica se o campo `image` está presente e é uma string
  if (!body.image || typeof body.image !== "string") {
    return ValidationError(res, "O campo 'image' é obrigatório e deve ser uma string em formato base64.");
  }

  // Verifica se o campo `custumer_cod` está presente e é uma string
  if (!body.custumer_cod || typeof body.custumer_cod !== "string") {
    return ValidationError(res, "O campo 'custumer_cod' é obrigatório e deve ser uma string.");
  }

  // Verifica se o campo `measure_datetime` está presente e é uma string que representa uma data válida
  if (!body.measure_datetime || typeof body.measure_datetime !== "string" || isNaN(Date.parse(body.measure_datetime))) {
    return ValidationError(res, "O campo 'measure_datetime' é obrigatório e deve ser uma string representando uma data válida.");
  }

  // Verifica se o campo `measure_type` está presente e é "WATER" ou "GAS"
  if (!body.measure_type || (body.measure_type !== "WATER" && body.measure_type !== "GAS")) {
    return ValidationError(res, "O campo 'measure_type' é obrigatório e deve ser 'WATER' ou 'GAS'.");
  }

  next();
}
