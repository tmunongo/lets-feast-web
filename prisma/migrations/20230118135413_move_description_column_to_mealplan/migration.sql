/*
  Warnings:

  - You are about to drop the column `description` on the `Day` table. All the data in the column will be lost.
  - Added the required column `description` to the `MealPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Day" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "MealPlan" ADD COLUMN     "description" TEXT NOT NULL;
