-- CreateEnum
CREATE TYPE "GallerySlideType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateTable
CREATE TABLE "GallerySlide" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100),
    "subtitle" VARCHAR(200),
    "type" "GallerySlideType" NOT NULL DEFAULT 'IMAGE',
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GallerySlide_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GallerySlide_sortOrder_idx" ON "GallerySlide"("sortOrder");

-- CreateIndex
CREATE INDEX "GallerySlide_visible_idx" ON "GallerySlide"("visible");
