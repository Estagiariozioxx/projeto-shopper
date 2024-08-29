import WaterGasController from "../controllers/WaterGasController";
import {validationUpload,validationConfirm,validationList,validationToken} from "../middlewares/validation"
import { Router } from "express"


const routes = Router();
const waterGasController = new WaterGasController();
console.log("entrei");

routes.post('/upload',validationUpload,waterGasController.create);
routes.patch('/confirm',validationConfirm,waterGasController.confirm);
routes.get('/:custumerCode/list',validationList,waterGasController.list);
routes.use('/files',validationToken);


export default routes;