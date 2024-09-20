import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Respo {
    success: boolean,
    message: string
}

export async function DELETE() {
    let resp: Respo = {
        success: false,
        message: ''
    }
    let sts:number = 400;

    try {

        let data = await prisma.user_Participation.findMany();

        if(data.length > 0) {
            await prisma.user_Participation.deleteMany();
            sts = 200;
            resp = {
                success: true,
                message: "All Users Participation Data Reset Successfully!"
            }
        } else {
            sts = 200;
            resp = {
                success: false,
                message: "Participation Data Not Found!"
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