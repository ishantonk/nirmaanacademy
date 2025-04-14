-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "attemptId" TEXT,
ADD COLUMN     "modeId" TEXT;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "Mode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
