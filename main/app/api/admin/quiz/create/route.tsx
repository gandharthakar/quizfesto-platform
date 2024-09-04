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
        let { 
            quiz_title,
            quiz_categories, 
            quiz_cover_image, 
            quiz_display_time, 
            quiz_estimate_time, 
            quiz_total_questions, 
            quiz_total_marks, 
            quiz_status, 
            quiz_about_content, 
            quiz_terms 
        } = body;
        
    } catch (error: any) {
        sts = 500;
        resp = {
            success: false,
            message: error.message
        }
        return NextResponse.json(resp, {status: sts});
    }
}