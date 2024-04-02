/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `verification-code` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "verification-code_email_key" ON "verification-code"("email");
