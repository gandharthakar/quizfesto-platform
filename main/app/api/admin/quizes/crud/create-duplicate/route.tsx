import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Respo {
    success: boolean,
    message: string
}

export async function POST(req: Request) {
    /* eslint-disable no-unused-vars */
    let resp: Respo = {
        success: false,
        message: ''
    }

    /* eslint-disable no-unused-vars */
    let sts: number = 400;

    try {

        const body = await req.json();
        const {
            quiz_id,
        } = body;

        if (quiz_id) {
            const existingQuiz = await prisma.qF_Quiz.findFirst({
                where: {
                    quiz_id
                }
            });
            if (existingQuiz !== null) {
                await prisma.qF_Quiz.create({
                    data: {
                        quiz_title: existingQuiz.quiz_title,
                        quiz_summary: existingQuiz.quiz_summary,
                        quiz_display_time: existingQuiz.quiz_display_time,
                        quiz_estimated_time: existingQuiz.quiz_estimated_time,
                        quiz_total_question: existingQuiz.quiz_total_question,
                        quiz_total_marks: existingQuiz.quiz_total_marks,
                        quiz_status: existingQuiz.quiz_status,
                        quiz_about_text: existingQuiz.quiz_about_text,
                        quiz_terms: existingQuiz.quiz_terms,
                        quiz_categories: existingQuiz.quiz_categories,
                        quiz_cover_photo: existingQuiz.quiz_cover_photo,
                        negative_marking_score: existingQuiz.negative_marking_score
                    }
                });
                sts = 201;
                resp = {
                    success: true,
                    message: "Duplicate Quiz Created Successfully!"
                }
            } else {
                sts = 200;
                resp = {
                    success: false,
                    message: "Quiz Not Exist!"
                }
            }

        } else {
            sts = 400;
            resp = {
                success: false,
                message: "Missing Required Fields!"
            }
        }

        return NextResponse.json(resp, { status: sts });
    } catch (error: any) {
        sts = 500;
        resp = {
            success: false,
            message: error.message
        }
        return NextResponse.json(resp, { status: sts });
    }
}