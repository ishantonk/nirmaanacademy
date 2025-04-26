/*
  Warnings:

  - Added the required column `ip` to the `Visitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visitor" ADD COLUMN     "ip" VARCHAR(100) NOT NULL,
ADD COLUMN     "visitAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
