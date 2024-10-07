import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface QF_Stats {
    total_quizes: number,
    total_questions: number,
    total_options: number,
    total_categories: number,
    total_users: number,
    total_winners: number
}

interface Respo {
    success: boolean,
    message: string
    stats?: QF_Stats
}

export async function GET() {
    /* eslint-disable no-unused-vars */
    let resp: Respo = {
        success: false,
        message: ''
    }

    /* eslint-disable no-unused-vars */
    let sts:number = 400;

    try {

        const prepData = {
            total_quizes: await prisma.qF_Quiz.count(),
            total_questions: await prisma.qF_Question.count(),
            total_options: await prisma.qF_Option.count(),
            total_categories: await prisma.qF_Quiz_Category.count(),
            total_users: await prisma.qF_User.count(),
            total_winners: await prisma.qF_Winners.count()
        }
        sts = 200;
        resp = {
            success: true,
            message: "Stats found!",
            stats: prepData
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