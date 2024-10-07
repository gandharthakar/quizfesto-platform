import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Check_Winner {
    winner_type: number,
    winning_position_text: string,
    winning_score: number
}

interface Respo {
    success: boolean,
    message: string,
    winner?: Check_Winner
}

const getWinnerPosTxt = (winType: number) => {
    /* eslint-disable no-unused-vars */
    let txt = '';
    switch (winType) {
        case 1:
            txt = 'st'
            break;
        case 2:
            txt = 'nd'
            break;
        case 3:
            txt = 'rd'
            break;
        default:
            txt = ''
            break;
    }

    return txt;
}

export async function POST(req: Request) {
    /* eslint-disable no-unused-vars */
    let resp: Respo = {
        success: false,
        message: ''
    }

    /* eslint-disable no-unused-vars */
    let sts:number = 400;

    try {

        const body = await req.json();
        const {user_id } = body;
        
        if(user_id) {
            const ifWinner = await prisma.qF_Winners.findFirst({
                where: {
                    user_id
                }
            });

            if(ifWinner !== null) {
                sts = 200;
                resp = {
                    success: true,
                    message: "Winner Found!",
                    winner: {
                        winner_type: ifWinner.winner_type,
                        winning_position_text: getWinnerPosTxt(ifWinner.winner_type),
                        winning_score: (await prisma.qF_Aggrigate_Scores.findFirst({ where: { user_id } }))?.aggregate_score??0
                    }
                }
            } else {
                sts = 200;
                resp = {
                    success: false,
                    message: "No Winner Found!"
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