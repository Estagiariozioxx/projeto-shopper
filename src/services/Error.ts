import { Response } from "express";

export function ValidationError(res: Response,errorCode:string, description: string) {
    return res.status(400).json({
      error_code: errorCode,
      error_description: description,
    });
  }