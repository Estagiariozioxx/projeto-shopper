import request from 'supertest';
import app from '../index'; 

describe('GET /<customer_code>/list', () => {
    it('deve retornar 200 e listar todas as medidas para o cliente', async () => {
      const response = await request(app).get('/123456/list');
  
      expect(response.status).toBe(200);
      expect(response.body.customer_code).toBe('123456');
      expect(Array.isArray(response.body.measures)).toBe(true);
    });
  
    it('deve retornar 400 se o parâmetro measure_type for inválido', async () => {
      const response = await request(app).get('/123456/list?measure_type=INVALID');
  
      expect(response.status).toBe(400);
      expect(response.body.error_code).toBe('INVALID_TYPE');
    });
  
    it('deve retornar 404 se nenhum registro for encontrado para o cliente', async () => {
      const response = await request(app).get('/non-existent-customer/list');
  
      expect(response.status).toBe(404);
      expect(response.body.error_code).toBe('MEASURES_NOT_FOUND');
    });
  });
  