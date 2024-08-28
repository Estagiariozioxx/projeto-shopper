import { Response } from "express";

export function ValidationError(res: Response,errorCode:string, description: string) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: description,
    });
  }