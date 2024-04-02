/*
  Warnings:

  - You are about to drop the `VerificationCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "VerificationCode";

-- CreateTable
CREATE TABLE "verification-code" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "created-at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiration-time" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "verification-code_pkey" PRIMARY KEY ("id")
);
