import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Respo {
    success: boolean,
    message: string
}

export async function POST(req: Request) {
    let resp: Respo = {
        success: false,
        message: ''
    }
    let sts:number = 400;

    try {

        const body = await req.json();
        let { quiz_id, question_title, question_marks } = body;

        if(quiz_id && question_title && question_marks) {
            await prisma.qF_Question.create({
                data: {
                    quizid: quiz_id,
                    question_title,
                    question_marks
                }
            });
            sts = 201;
            resp = {
                success: true,
                message: "Question Created Successfully!"
            }
        } else {
            sts = 400;
            resp = {
                success: false,
                message: "Missing Required Fields!"
            }
        }
        
        return NextResponse.json(resp, {status: sts});
    } catch (error: any) {
        sts = 500;
        resp = {
            success: false,
            message: error.message
        }
        return NextResponse.json(resp, {status: sts});
    }
}