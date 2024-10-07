import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Respo {
    success: boolean,
    message: string
}

export async function DELETE(req: Request) {
    /* eslint-disable no-unused-vars */
    let resp: Respo = {
        success: false,
        message: ''
    }

    /* eslint-disable no-unused-vars */
    let sts:number = 400;

    try {

        const body = await req.json();
        const { prize_type } = body;
        
        if(prize_type) {
            const getType = await prisma.qF_Winning_Prizes.findFirst({
                where: {
                    prize_type
                }
            });
            if(getType) {
                await prisma.qF_Winning_Prizes.delete({
                    where: {
                        prize_type
                    },
                });
                sts = 200;
                resp = {
                    success: true,
                    message: "Prize Deleted Successfully!"
                }
            } else {
                sts = 200;
                resp = {
                    success: false,
                    message: "No Prize Found!"
                }
            }
        } else {
            sts = 400;
            resp = {
                success: false,
                message: "Missing Required Field."
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