import request from 'supertest';
import app from '../index'; 
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const customerCode = process.env.CUSTOME_CODE_TEST || "123456";

describe('PATCH /confirm', () => {
  let measureUuid: string;
   
    it('deve retornar 200 e confirmar a medida com sucesso', async () => {
       // Fetch a valid measure UUID from the database
        const measure = await prisma.measure.findFirst({
          where:{
            customerCode:customerCode,
          }
        });  // Adjust the model and query as necessary
        if (measure) {
          measureUuid = measure.id;
        }
      const response = await request(app)
        .patch('/confirm')
        .send({
          measure_uuid: measureUuid,
          confirmed_value: 150,
        });
       // console.log('Response Status:', response.status);
      //  console.log('Response Body:', response.body);
  
      expect(response.status).toBe(200);
      expect(response.body.sucess).toBe(true);
    });
  
    it('deve retornar 400 se os dados fornecidos forem inválidos', async () => {
      const response = await request(app)
        .patch('/confirm')
        .send({
          measure_uuid: measureUuid, 
          confirmed_value: 'test', 
        });

       // console.log('Response Status:', response.status);
      //  console.log('Response Body:', response.body);
  
      expect(response.status).toBe(400);
      expect(response.body.error_code).toBe('INVALID_DATA');
    });
  
    it('deve retornar 404 se a medida não for encontrada', async () => {
      const response = await request(app)
        .patch('/confirm')
        .send({
          measure_uuid: 'notmeasure',
          confirmed_value: 150,
        });
  
      expect(response.status).toBe(404);
      expect(response.body.error_code).toBe('MEASURE_NOT_FOUND');
    });
  
    it('deve retornar 409 se a medida já tiver sido confirmada', async () => {
      const response = await request(app)
        .patch('/confirm')
        .send({
          measure_uuid: measureUuid,
          confirmed_value: 150,
        });
       // console.log('Response Status:', response.status);
      //  console.log('Response Body:', response.body);
  
      expect(response.status).toBe(409);
      expect(response.body.error_code).toBe('CONFIRMATION_DUPLICATE');
    });
  });
  