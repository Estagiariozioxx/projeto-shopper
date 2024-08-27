import WaterGasController from "../controllers/WaterGasController";
import {validation} from "../middlewares/validation"
import { Router } from "express"


const routes = Router();
const waterGasController = new WaterGasController();

routes.post('/upload',validation,waterGasController.create);

export default routes;