import { Request, Response } from "express";

export default class WaterGasController{

    create = async (req: Request, res: Response) => {
      
          res.status(200).json("ok");

      };




}