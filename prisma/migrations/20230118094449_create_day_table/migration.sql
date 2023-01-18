/*
  Warnings:

  - You are about to drop the column `planId` on the `Recipe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_planId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "planId",
ADD COLUMN     "dayId" TEXT;

-- CreateTable
CREATE TABLE "Day" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mealPlanId" TEXT,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_mealPlanId_fkey" FOREIGN KEY ("mealPlanId") REFERENCES "MealPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
