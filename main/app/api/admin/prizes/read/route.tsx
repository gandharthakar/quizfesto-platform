import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Respo {
    success: boolean,
    message: string,
    prize_type: number,
    prize_description: string,
    prize_cover_photo?: string,
}

export async function POST(req: Request) {
    let resp: Respo = {
        success: false,
        message: '',
        prize_type: 0,
        prize_description: '',
        prize_cover_photo: ''
    }
    let sts:number = 400;

    try {

        const body = await req.json();
        let { prize_type } = body;
        
        if(prize_type) {
            const getType = await prisma.qF_Winning_Prizes.findFirst({
                where: {
                    prize_type
                }
            });
            if(getType) {
                const data = await prisma.qF_Winning_Prizes.findFirst({
                    where: {
                        prize_type
                    },
                });
                if(data) {
                    sts = 200;
                    resp = {
                        success: true,
                        message: "Prize Found Successfully!",
                        prize_type: data.prize_type,
                        prize_description: data.prize_description,
                        prize_cover_photo: data.prize_cover_photo??""
                    }
                }
            } else {
                sts = 201;
                resp = {
                    success: true,
                    message: "No Prize Found!",
                    prize_type: 0,
                    prize_description: '',
                    prize_cover_photo: ''
                }
            }
        } else {
            sts = 400;
            resp = {
                success: false,
                message: "Missing Required Field.",
                prize_type: 0,
                prize_description: '',
                prize_cover_photo: ''
            }
        }

        return NextResponse.json(resp, {status: sts});
    } catch (error: any) {
        sts = 500;
        resp = {
            success: false,
            message: error.message,
            prize_type: 0,
            prize_description: '',
            prize_cover_photo: ''
        }
        return NextResponse.json(resp, {status: sts});
    }
}