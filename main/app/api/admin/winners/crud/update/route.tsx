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
        let { winner_type, winner_description} = body;

        if(winner_type && winner_description) {
            let alreadyExist = await prisma.qF_Winners.findFirst({
                where: {
                    winner_type
                }
            });
            
            if(alreadyExist !== null) {
                await prisma.qF_Winners.update({
                    where: {
                        winner_type
                    },
                    data: {
                        winner_description
                    }
                });
                sts = 200;
                resp = {
                    success: true,
                    message: "Winner Updated Successfully!"
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