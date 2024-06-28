-- CreateTable
CREATE TABLE "Admin_User" (
    "admin_user_id" TEXT NOT NULL,
    "admin_user_name" TEXT NOT NULL,
    "admin_user_email" TEXT NOT NULL,
    "admin_user_password" TEXT NOT NULL,
    "admin_user_photo" TEXT NOT NULL,
    "admin_user_phone" TEXT NOT NULL,
    "role" "Role" DEFAULT 'Admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_User_pkey" PRIMARY KEY ("admin_user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_User_admin_user_email_key" ON "Admin_User"("admin_user_email");
