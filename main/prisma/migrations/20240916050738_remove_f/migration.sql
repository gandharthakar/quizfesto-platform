/*
  Warnings:

  - You are about to drop the column `question_text` on the `QF_Option` table. All the data in the column will be lost.
  - The `options` column on the `QF_Option` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "QF_Option" DROP COLUMN "question_text",
DROP COLUMN "options",
ADD COLUMN     "options" TEXT[];
