/*
  Warnings:

  - Made the column `text` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "text" SET NOT NULL;
