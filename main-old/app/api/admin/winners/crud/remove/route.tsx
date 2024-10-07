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
        let { winner_type } = body;

        if(winner_type) {
            let alreadyExist = await prisma.qF_Winners.findFirst({
                where: {
                    winner_type
                }
            });
            if(alreadyExist !== null) {
                await prisma.qF_Winners.delete({
                    where: {
                        winner_type
                    }
                });
                sts = 200;
                resp = {
                    success: true,
                    message: "Winner Deleted Successfully!"
                }
            } else {
                sts = 200;
                resp = {
                    success: false,
                    message: "Winner Not Found!"
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