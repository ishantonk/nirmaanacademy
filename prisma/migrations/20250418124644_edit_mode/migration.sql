/*
  Warnings:

  - You are about to drop the column `discountPrice` on the `Mode` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Mode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mode" DROP COLUMN "discountPrice",
DROP COLUMN "price";
