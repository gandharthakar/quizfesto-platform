/*
  Warnings:

  - You are about to drop the column `user_gender` on the `QF_Admin_User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QF_Admin_User" DROP COLUMN "user_gender",
ADD COLUMN     "admin_user_gender" TEXT;
