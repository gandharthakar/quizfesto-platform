-- AlterTable
ALTER TABLE "QF_Admin_User" ADD COLUMN     "user_gender" TEXT,
ALTER COLUMN "admin_user_photo" DROP NOT NULL,
ALTER COLUMN "admin_user_phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "QF_User" ADD COLUMN     "user_gender" TEXT;
