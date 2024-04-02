/*
  Warnings:

  - You are about to drop the column `expiration-time` on the `verification-code` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "verification-code" DROP COLUMN "expiration-time";
