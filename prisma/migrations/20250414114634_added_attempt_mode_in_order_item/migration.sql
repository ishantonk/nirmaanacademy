/*
  Warnings:

  - You are about to drop the column `selectedAttemptId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `selectedModeId` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_selectedAttemptId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_selectedModeId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "selectedAttemptId",
DROP COLUMN "selectedModeId";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "attemptId" TEXT,
ADD COLUMN     "modeId" TEXT;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "Mode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
