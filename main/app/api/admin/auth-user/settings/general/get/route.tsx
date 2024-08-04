import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Respo {
    user_full_name: string,
    user_email: string,
}

interface ShtResp {
    success: boolean,
    message: string
}

export async function POST(req: Request) {
    let resp_main: Respo = {
        user_full_name: '',
        user_email: '',
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
            let user:any = {};
            const fu__in__usrtblmdl = await prisma.user.findFirst({
                where: {
                    AND: [
                        {
                            user_id
                        },
                        {
                            role: "Admin"
                        }
                    ]
                }
            });
            const fu__in__admntblmdl = await prisma.admin_User.findFirst({
                where: {
                    admin_user_id: user_id,
                }
            });

            if(fu__in__usrtblmdl) {
                user = fu__in__usrtblmdl;
            } else {
                if(fu__in__admntblmdl) {
                    user = fu__in__admntblmdl;
                } else {
                    user = {};
                }
            }

            console.log(user);
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