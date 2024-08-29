import request from 'supertest';
import app from '../index'; 

describe('PATCH /confirm', () => {
    it('deve retornar 200 e confirmar a medida com sucesso', async () => {
      const response = await request(app)
        .patch('/confirm')
        .send({
          measure_uuid: '123456',
          confirmed_value: 150,
        });
  
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  
    it('deve retornar 400 se os dados fornecidos forem inválidos', async () => {
      const response = await request(app)
        .patch('/confirm')
        .send({
          measure_uuid: 123456, 
          confirmed_value: 'test', 
        });
  
      expect(response.status).toBe(400);
      expect(response.body.error_code).toBe('INVALID_DATA');
    });
  
    it('deve retornar 404 se a medida não for encontrada', async () => {
      const response = await request(app)
        .patch('/confirm')
        .send({
          measure_uuid: 'medidanaotemnobanco',
          confirmed_value: 150,
        });
  
      expect(response.status).toBe(404);
      expect(response.body.error_code).toBe('MEASURE_NOT_FOUND');
    });
  
    it('deve retornar 409 se a medida já tiver sido confirmada', async () => {
      const response = await request(app)
        .patch('/confirm')
        .send({
          measure_uuid: '123456',
          confirmed_value: 150,
        });
  
      expect(response.status).toBe(409);
      expect(response.body.error_code).toBe('CONFIRMATION_DUPLICATE');
    });
  });
  