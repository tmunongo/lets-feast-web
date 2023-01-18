-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_planId_fkey";

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "planId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_planId_fkey" FOREIGN KEY ("planId") REFERENCES "MealPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
