/*
  Warnings:

  - Added the required column `updatedAt` to the `Measure` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `measureValue` on the `Measure` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Measure" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "measureValue",
ADD COLUMN     "measureValue" INTEGER NOT NULL;
