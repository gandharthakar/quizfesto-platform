import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface ShtResp {
    success: boolean,
    message: string
}

export async function POST(req: Request) {
    let sts:number = 400;

    let short_resp: ShtResp = {
        success: false,
        message: '',
    }

    try {
        
        const body = await req.json();
        let { user_id } = body;

    } catch (error: any) {
        sts = 500;
        short_resp = {
            success: false,
            message: error.message
        }
        return NextResponse.json(short_resp, {status: sts});
    }
}