/*
  Warnings:

  - You are about to drop the column `measureUuid` on the `Measure` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Measure_measureUuid_key";

-- AlterTable
ALTER TABLE "Measure" DROP COLUMN "measureUuid";
