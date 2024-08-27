-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "Measure" (
    "id" TEXT NOT NULL,
    "customerCode" TEXT NOT NULL,
    "measureDatetime" TIMESTAMP(3) NOT NULL,
    "measureType" "MeasureType" NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "measureValue" INTEGER NOT NULL,
    "measureUuid" TEXT NOT NULL,
    "hasConfirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Measure_measureUuid_key" ON "Measure"("measureUuid");
