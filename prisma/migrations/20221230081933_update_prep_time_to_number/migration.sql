/*
  Warnings:

  - Changed the type of `prepTime` on the `Recipe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "prepTime",
ADD COLUMN     "prepTime" INTEGER NOT NULL;
