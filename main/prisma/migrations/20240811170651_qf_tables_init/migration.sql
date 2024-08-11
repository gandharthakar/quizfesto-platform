-- CreateTable
CREATE TABLE "QF_Quiz" (
    "quiz_id" TEXT NOT NULL,
    "quiz_title" TEXT NOT NULL,
    "quiz_summary" TEXT NOT NULL,
    "quiz_display_time" TEXT NOT NULL,
    "quiz_estimated_time" TEXT NOT NULL,
    "quiz_total_question" TEXT NOT NULL,
    "quiz_total_marks" TEXT NOT NULL,
    "quiz_status" TEXT NOT NULL,
    "quiz_about_text" TEXT,
    "quiz_terms" TEXT,
    "quiz_cover_photo" TEXT,

    CONSTRAINT "QF_Quiz_pkey" PRIMARY KEY ("quiz_id")
);

-- CreateTable
CREATE TABLE "QF_Question" (
    "question_id" TEXT NOT NULL,
    "question_title" TEXT NOT NULL,
    "question_marks" TEXT NOT NULL,
    "quizid" TEXT NOT NULL,

    CONSTRAINT "QF_Question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "QF_Option" (
    "option_id" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "option_data" JSONB NOT NULL,
    "questionid" TEXT NOT NULL,

    CONSTRAINT "QF_Option_pkey" PRIMARY KEY ("option_id")
);

-- CreateTable
CREATE TABLE "Quiz_Category" (
    "quiz_category_id" TEXT NOT NULL,
    "quiz_category_title" TEXT NOT NULL,
    "quiz_category_slug" TEXT NOT NULL,

    CONSTRAINT "Quiz_Category_pkey" PRIMARY KEY ("quiz_category_id")
);

-- CreateTable
CREATE TABLE "_QF_QuizToQuiz_Category" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QF_QuizToQuiz_Category_AB_unique" ON "_QF_QuizToQuiz_Category"("A", "B");

-- CreateIndex
CREATE INDEX "_QF_QuizToQuiz_Category_B_index" ON "_QF_QuizToQuiz_Category"("B");

-- AddForeignKey
ALTER TABLE "QF_Question" ADD CONSTRAINT "QF_Question_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "QF_Quiz"("quiz_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QF_Option" ADD CONSTRAINT "QF_Option_questionid_fkey" FOREIGN KEY ("questionid") REFERENCES "QF_Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QF_QuizToQuiz_Category" ADD CONSTRAINT "_QF_QuizToQuiz_Category_A_fkey" FOREIGN KEY ("A") REFERENCES "QF_Quiz"("quiz_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QF_QuizToQuiz_Category" ADD CONSTRAINT "_QF_QuizToQuiz_Category_B_fkey" FOREIGN KEY ("B") REFERENCES "Quiz_Category"("quiz_category_id") ON DELETE CASCADE ON UPDATE CASCADE;
