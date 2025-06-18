/*
  Warnings:

  - You are about to drop the column `specialty` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `experience` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialization` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "specialty",
ADD COLUMN     "experience" TEXT NOT NULL,
ADD COLUMN     "specialization" TEXT NOT NULL;
