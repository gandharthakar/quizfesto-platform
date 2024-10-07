import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Respo {
    success: boolean,
    message: string
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
        const data = await prisma.qF_Winning_Prizes.findMany();
        if(data.length > 0) {
            sts = 200;
            resp = {
                success: true,
                message: "Prizes Found!",
            }
            const db_data = {
                prizes: data,
                ...resp
            };
            return NextResponse.json(db_data, {status: sts});
        } else {
            sts = 200;
            resp = {
                success: true,
                message: "No Prizes Found!",
            }
            return NextResponse.json(resp, {status: sts});
        }
    } catch (error: any) {
        sts = 500;
        resp = {
            success: false,
            message: error.message,
        }
        return NextResponse.json(resp, {status: sts});
    }
}