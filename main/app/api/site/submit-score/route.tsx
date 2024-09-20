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
        const { 
            quiz_total_question, 
            quiz_total_marks,
            quiz_total_score, 
            quiz_estimated_time, 
            quiz_time_taken, 
            quiz_id, 
            quiz_title, 
            quiz_coorect_answers_count, 
            user_id, 
            quiz_cover_photo,

         } = body;

         if(quiz_total_question && quiz_total_marks && quiz_total_score && quiz_estimated_time && quiz_time_taken && quiz_id && quiz_title && quiz_coorect_answers_count && user_id) {

            await prisma.user_Participation.create({
                data: {
                    quiz_total_question,
                    quiz_total_marks,
                    quiz_total_score, 
                    quiz_estimated_time, 
                    quiz_time_taken, 
                    quiz_id, 
                    quiz_title, 
                    quiz_coorect_answers_count, 
                    user_id, 
                    quiz_cover_photo: quiz_cover_photo ? quiz_cover_photo : '',
                }
            });

            sts = 201;
            resp = {
                success: true,
                message: "Score Submited Successfully!"
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