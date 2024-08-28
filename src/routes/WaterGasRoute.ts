import WaterGasController from "../controllers/WaterGasController";
import {validation} from "../middlewares/validation"
import { Router } from "express"


const routes = Router();
const waterGasController = new WaterGasController();
console.log("entrei");

//routes.post('/upload',validation,waterGasController.create);

routes.post('/upload', (req, res, next) => {
    console.log(`POST /upload request received`);
    next();
  }, validation, waterGasController.create);


export default routes;