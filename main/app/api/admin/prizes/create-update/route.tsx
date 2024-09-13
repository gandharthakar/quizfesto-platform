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
        let { prize_type, prize_photo, prize_description } = body;
        
        if(prize_type && prize_description) {
            const getType = await prisma.qF_Winning_Prizes.findFirst({
                where: {
                    prize_type
                }
            });
            if(getType) {
                await prisma.qF_Winning_Prizes.update({
                    where: {
                        prize_type
                    },
                    data: {
                        prize_description,
                        prize_cover_photo: prize_photo
                    }
                });
                sts = 200;
                resp = {
                    success: true,
                    message: "Prize Updated Successfully!"
                }
            } else {
                await prisma.qF_Winning_Prizes.create({
                    data: {
                        prize_type,
                        prize_description,
                        prize_cover_photo: prize_photo
                    }
                });
                sts = 201;
                resp = {
                    success: true,
                    message: "Prize Created Successfully!"
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