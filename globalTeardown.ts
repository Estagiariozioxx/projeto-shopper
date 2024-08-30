import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function globalTeardown() {
  await prisma.$connect();
  await prisma.$executeRaw`DELETE FROM "Measure" WHERE "customerCode" = '123456'`;
  await prisma.$disconnect();
}
