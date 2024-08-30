import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Criar banco de dados de teste
  /* await prisma.$executeRaw`CREATE DATABASE test_db;`;
  await prisma.$connect();
  // Migrate database
  await prisma.$executeRaw`prisma migrate dev`; */
});

afterAll(async () => {
  // Remover banco de dados de teste
  /*
  await prisma.$executeRaw`DROP DATABASE test_db;`;
  await prisma.$disconnect();*/
});
