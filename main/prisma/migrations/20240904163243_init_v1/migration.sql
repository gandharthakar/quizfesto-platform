-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "user_full_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_phone" TEXT,
    "user_photo" TEXT,
    "role" "Role" DEFAULT 'User',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

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

-- CreateTable
CREATE TABLE "User_Participation" (
    "user_participation_id" TEXT NOT NULL,
    "quiz_total_question" INTEGER NOT NULL,
    "quiz_total_marks" INTEGER NOT NULL,
    "quiz_estimated_time" TEXT NOT NULL,
    "quiz_time_taken" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "quiz_title" TEXT NOT NULL,
    "quiz_cover_photo" TEXT,
    "quiz_total_score" INTEGER NOT NULL,
    "quiz_coorect_answers_count" INTEGER NOT NULL,
    "user_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_Participation_pkey" PRIMARY KEY ("user_participation_id")
);

-- CreateTable
CREATE TABLE "QF_Quiz" (
    "quiz_id" TEXT NOT NULL,
    "quiz_title" TEXT NOT NULL,
    "quiz_summary" TEXT NOT NULL,
    "quiz_display_time" TEXT NOT NULL,
    "quiz_estimated_time" TEXT NOT NULL,
    "quiz_total_question" INTEGER NOT NULL,
    "quiz_total_marks" INTEGER NOT NULL,
    "quiz_status" TEXT NOT NULL,
    "quiz_about_text" TEXT,
    "quiz_terms" TEXT[],
    "quiz_cover_photo" TEXT,
    "quiz_categories" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QF_Quiz_pkey" PRIMARY KEY ("quiz_id")
);

-- CreateTable
CREATE TABLE "QF_Question" (
    "question_id" TEXT NOT NULL,
    "question_title" TEXT NOT NULL,
    "question_marks" INTEGER NOT NULL,
    "quizid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QF_Question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "QF_Option" (
    "option_id" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "options" TEXT NOT NULL,
    "correct_option" TEXT NOT NULL,
    "questionid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QF_Option_pkey" PRIMARY KEY ("option_id")
);

-- CreateTable
CREATE TABLE "QF_Quiz_Category" (
    "category_id" TEXT NOT NULL,
    "category_title" TEXT NOT NULL,
    "category_slug" TEXT NOT NULL,

    CONSTRAINT "QF_Quiz_Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "QF_Winning_Prizes" (
    "prize_id" TEXT NOT NULL,
    "priz_type" TEXT NOT NULL,
    "prize_description" TEXT NOT NULL,
    "prize_cover_photo" TEXT NOT NULL,

    CONSTRAINT "QF_Winning_Prizes_pkey" PRIMARY KEY ("prize_id")
);

-- CreateTable
CREATE TABLE "QF_Winners" (
    "winner_id" TEXT NOT NULL,
    "winner_type" TEXT NOT NULL,
    "winner_user_id" TEXT NOT NULL,
    "winner_date" TEXT NOT NULL,
    "winner_description" TEXT NOT NULL,

    CONSTRAINT "QF_Winners_pkey" PRIMARY KEY ("winner_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_User_admin_user_email_key" ON "Admin_User"("admin_user_email");

-- AddForeignKey
ALTER TABLE "User_Participation" ADD CONSTRAINT "User_Participation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QF_Question" ADD CONSTRAINT "QF_Question_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "QF_Quiz"("quiz_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QF_Option" ADD CONSTRAINT "QF_Option_questionid_fkey" FOREIGN KEY ("questionid") REFERENCES "QF_Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;
