import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

type UsrParts = {
    user_participation_id: string,
    quiz_estimated_time: string,
    quiz_total_marks: string,
    time_taken: string,
}

interface Respo {
    user_id: string,
    user_full_name: string,
    user_email: string,
    user_phone?: string,
    user_photo?: string,
    user_participations?: UsrParts[]
}

interface ShtResp {
    success: boolean,
    message: string
}

export async function POST(req: Request) {
    let resp_main: Respo = {
        user_id: '',
        user_full_name: '',
        user_email: '',
        user_phone: '',
        user_photo: '',
        user_participations: [],
    }

    let sts:number = 400;

    let short_resp: ShtResp = {
        success: false,
        message: '',
    }

    let MixResp: any = '';

    try {

        const body = await req.json();
        let { user_id } = body;

        if(!user_id) {
            short_resp = {
                success: false,
                message: 'User id not provided',
            }
            MixResp = short_resp;
            sts = 400;
        } else {
            const gtUsr = await prisma.user.findFirst({
                where: {
                    user_id
                }
            });
            if(gtUsr) {
                resp_main = {
                    user_id: gtUsr.user_id,
                    user_full_name: gtUsr.user_full_name,
                    user_email: gtUsr.user_email,
                    user_phone: gtUsr.user_phone ?? '',
                    user_photo: gtUsr.user_photo ?? '',
                    user_participations: [],
                };
                MixResp = resp_main;
                sts = 200;
            } else {
                short_resp = {
                    success: false,
                    message: 'User not found with this user id.',
                }
                MixResp = short_resp;
                sts = 400;
            }
        }

        return NextResponse.json(MixResp, {status: sts});
    } catch (error: any) {
        sts = 500;
        short_resp = {
            success: false,
            message: error.message
        }
        return NextResponse.json(short_resp, {status: sts});
    }
}