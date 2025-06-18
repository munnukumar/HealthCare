/*
  Warnings:

  - Changed the type of `experience` on the `Doctor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "experience",
ADD COLUMN     "experience" INTEGER NOT NULL;
