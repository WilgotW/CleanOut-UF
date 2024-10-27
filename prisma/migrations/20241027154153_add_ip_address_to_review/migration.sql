/*
  Warnings:

  - A unique constraint covering the columns `[ipAddress]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "ipAddress" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Review_ipAddress_key" ON "Review"("ipAddress");
