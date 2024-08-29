import request from 'supertest';
import app from '../index';

describe('POST /upload', () => {
  it('deve retornar 200 e os dados da imagem quando todos os parâmetros são válidos', async () => {
    const response = await request(app)
      .post('/upload')
      .send({
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...',
        customer_code: '123456',
        measure_datetime: '2024-09-01T12:00:00Z',
        measure_type: 'WATER',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('image_url');
    expect(response.body).toHaveProperty('measure_value');
    expect(response.body).toHaveProperty('measure_uuid');
  });

  it('deve retornar 400 se a imagem não for base64', async () => {
    const response = await request(app)
      .post('/upload')
      .send({
        image: 'not-base64',
        customer_code: '123456',
        measure_datetime: '2024-09-01T12:00:00Z',
        measure_type: 'WATER',
      });

    expect(response.status).toBe(400);
    expect(response.body.error_code).toBe('INVALID_DATA');
  });

  it('deve retornar 409 se já existir uma leitura para o mês atual', async () => {
    // Supondo que já tenha uma entrada no banco de dados para este cliente e tipo de medida

    const response = await request(app)
      .post('/upload')
      .send({
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...',
        customer_code: '123456',
        measure_datetime: '2024-09-01T12:00:00Z',
        measure_type: 'WATER',
      });

    expect(response.status).toBe(409);
    expect(response.body.error_code).toBe('DOUBLE_REPORT');
  });
});
