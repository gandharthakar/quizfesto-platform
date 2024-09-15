import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Respo {
    success: boolean,
    message: string
}

export async function DELETE(req: Request) {
    let resp: Respo = {
        success: false,
        message: ''
    }
    let sts:number = 400;

    try {

        const body = await req.json();
        let { quiz_id_list } = body;

        if(quiz_id_list) {
            await prisma.qF_Quiz.deleteMany({
                where: {
                    quiz_id: {
                        in: quiz_id_list
                    }
                }
            });
            sts = 200;
            resp = {
                success: true,
                message: "Selected Quizes Deleted Successfully!"
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