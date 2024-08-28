import { Response } from "express";

export function ValidationError(res: Response,errorCode:string, description: string,code:number) {
    return res.status(code).json({
      error_code: errorCode,
      error_description: description,
    });
  }