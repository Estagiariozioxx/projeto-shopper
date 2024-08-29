import { PrismaClient } from "@prisma/client";
import { startOfMonth, endOfMonth } from "date-fns";
import { MensureIn,MensureSave } from "dtos/MensureUploadDtos";
import { MensureConfirmIn } from "dtos/MensureConfirmDtos";
import { MeasureList } from "dtos/MensureListDtos";

const prisma = new PrismaClient();

export default class WaterGasModel{

    verifyMeasureDate = async (measure:MensureIn) =>{
      // Obter o início e o fim do mês da data recebida
      const startDate = startOfMonth(measure.measure_datetime); // Início do mês
      const endDate = endOfMonth(measure.measure_datetime);     // Fim do mês

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


      verifyMeasureReading= async (measure:MensureConfirmIn) =>{
  
          return await prisma.measure.findMany({
              where: {
                id:measure.measure_uuid
              }
          });
        }

        verifyMeasureConfirmed= async (measure:MensureConfirmIn) =>{
  
          return await prisma.measure.findMany({
              where: {
                id:measure.measure_uuid,
                hasConfirmed:false
              }
          });
        }

        measureUpdateConfirm = async (measure:MensureConfirmIn) => {

          return await prisma.measure.update({
            where:{
              id:measure.measure_uuid
            },
            data:{
              hasConfirmed:true,
              measureValue:measure.confirmed_value,
              updatedAt:new Date()

            }

          })

        }

        measureList = async (measureList:MeasureList) => {

            return await prisma.measure.findMany({
              where: {
                  customerCode: measureList.customerCode,
                  ...(measureList.measureType && { 
                      measureType: measureList.measureType
                  })
              },
          });

        }
      


}