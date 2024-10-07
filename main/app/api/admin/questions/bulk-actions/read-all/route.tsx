import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface QF_Ques {
    question_id: string,
    question_title: string,
    question_marks: number,
}

interface Respo {
    success: boolean,
    message: string,
    questions: QF_Ques[]
}

export async function GET() {
    /* eslint-disable no-unused-vars */
    let resp: Respo = {
        success: false,
        message: '',
        questions: []
    }

    /* eslint-disable no-unused-vars */
    let sts:number = 400;

    try {

        const data = await prisma.qF_Question.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        if(data.length > 0) {
            sts = 200;
            resp = {
                success: true,
                message: "Questions Found!",
                questions: data.map((item) => {
                    return {
                        question_id: item.question_id,
                        question_title: item.question_title,
                        question_marks: item.question_marks
                    }
                })
            }
        } else {
            sts = 200;
            resp = {
                success: false,
                message: "Questions Not Found!",
                questions: []
            }
        }
        
        return NextResponse.json(resp, {status: sts});
    } catch (error: any) {
        sts = 500;
        resp = {
            success: false,
            message: error.message,
            questions: []
        }
        return NextResponse.json(resp, {status: sts});
    }
}