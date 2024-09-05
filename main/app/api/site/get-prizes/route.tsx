import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Respo {
    success: boolean,
    message: string
}

export async function GET(req: Request) {

    let resp: Respo = {
        success: false,
        message: ''
    }
    let sts:number = 400;

    try {
        const data = await prisma.qF_Winning_Prizes.findMany();
        if(data.length > 0) {
            sts = 200;
            resp = {
                success: true,
                message: "Prizes Found!",
            }
            let db_data = [...data, resp];
            return NextResponse.json(db_data, {status: sts});
        } else {
            sts = 201;
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