import WaterGasController from "../controllers/WaterGasController";
import {validationUpload,validationConfirm} from "../middlewares/validation"
import { Router } from "express"


const routes = Router();
const waterGasController = new WaterGasController();
console.log("entrei");

//routes.post('/upload',validation,waterGasController.create);

routes.post('/upload', (req, res, next) => {
    console.log(`POST /upload request received`);
    next();
  }, validationUpload, waterGasController.create);

  routes.patch('/confirm', (req, res, next) => {
    console.log(`patch /confirm request received`);
    next();
  }, validationConfirm, waterGasController.confirm);


export default routes;