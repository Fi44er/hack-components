-- AlterTable
ALTER TABLE "tokens" ALTER COLUMN "exp" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "verification-code" ALTER COLUMN "created-at" DROP DEFAULT;
