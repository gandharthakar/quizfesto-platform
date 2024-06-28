-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Normal', 'Admin');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "user_full_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_phone" TEXT,
    "user_photo" TEXT,
    "role" "Role" DEFAULT 'Normal',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "User_Participation" (
    "user_participation_id" TEXT NOT NULL,
    "quiz_estimated_time" TEXT NOT NULL,
    "quiz_total_marks" TEXT NOT NULL,
    "time_taken" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "User_Participation_pkey" PRIMARY KEY ("user_participation_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- AddForeignKey
ALTER TABLE "User_Participation" ADD CONSTRAINT "User_Participation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
