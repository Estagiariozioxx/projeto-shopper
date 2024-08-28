import { PrismaClient } from "@prisma/client";
import { startOfMonth, endOfMonth } from "date-fns";
import { MensureIn } from "dtos/MensureDtos";

const prisma = new PrismaClient();

export default class WaterGasModel{

    verifyMeasureDate = async (measure:MensureIn) =>{

        const startDate = startOfMonth(new Date());
        const endDate = endOfMonth(new Date());

        return await prisma.measure.findMany({
            where: {
            customerCode:measure.custumer_cod,
            measureDatetime: {
                gte: startDate,
                lte: endDate,
            },
            },
        });
    }


}