import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface ShtResp {
    success: boolean,
    message: string
}

export async function POST(req: Request) {

    let sts:number = 400;

    let resp: ShtResp = {
        success: false,
        message: '',
    }

    let isTrueAdminUser:boolean = false;

    try {

        const body = await req.json();
        let { user_id, user_full_name, user_email } = body;

        if(user_id && user_full_name && user_email) {
            
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
                isTrueAdminUser = true;
            } else {
                if(fu__in__admntblmdl) {
                    isTrueAdminUser = true;
                } else {
                    isTrueAdminUser = false;
                }
            }

            if(isTrueAdminUser) {

                if(fu__in__usrtblmdl) {
                    await prisma.user.update({
                        where: {
                            user_id
                        },
                        data: {
                            user_full_name,
                            user_email
                        }
                    });
                } else {
                    if(fu__in__admntblmdl) {
                        await prisma.admin_User.update({
                            where: {
                                admin_user_id: user_id
                            },
                            data: {
                                admin_user_name: user_full_name,
                                admin_user_email: user_email
                            }
                        });
                    }
                }

                resp = {
                    success: true,
                    message: 'General Settings Updated.',
                }
                sts = 200;
            } else {
                resp = {
                    success: false,
                    message: 'User Not Found.',
                }
                sts = 200;
            }
        } else {
            resp = {
                success: false,
                message: 'Missing required fields.',
            }
            sts = 400;
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