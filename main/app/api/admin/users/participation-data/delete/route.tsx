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
        let { user_id } = body;

        if(user_id) {

            let data = await prisma.user_Participation.findMany({
                where: {
                    user_id
                }
            });

            if(data.length > 0) {
                await prisma.user_Participation.deleteMany({
                    where: {
                        user_id
                    }
                });
                sts = 200;
                resp = {
                    success: true,
                    message: "Participation Data Reset Successfully!"
                }
            } else {
                sts = 200;
                resp = {
                    success: false,
                    message: "Participation Data Not Found!"
                }
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