import { PrismaClient } from "@prisma/client";
import { startOfMonth, endOfMonth } from "date-fns";
import { MensureIn,MensureSave } from "dtos/MensureDtos";

const prisma = new PrismaClient();

export default class WaterGasModel{

    verifyMeasureDate = async (measure:MensureIn) =>{

    
      
      // Obter o início e o fim do mês da data recebida
      const startDate = startOfMonth(measure.measure_datetime); // Início do mês
      const endDate = endOfMonth(measure.measure_datetime);     // Fim do mês

      console.log(startDate)
      console.log(endDate)


        return await prisma.measure.findMany({
            where: {
            customerCode:measure.custumer_code,
            measureType:measure.measure_type,
            measureDatetime: {
                gte: startDate,
                lte: endDate,
            },
            },
        });
    }


    createMeasure = async (measureSave: MensureSave) => {
        return await prisma.measure.create({
          data: {
            customerCode: measureSave.customerCode,
            measureDatetime: measureSave.measureDatetime,
            measureType: measureSave.measureType,
            imageUrl: measureSave.imageUrl,
            measureValue: measureSave.measureValue
          }
        });
      }
      


}