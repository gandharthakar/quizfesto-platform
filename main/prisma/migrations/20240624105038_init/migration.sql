-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Normal', 'Admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" DEFAULT 'Normal';
