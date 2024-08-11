import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

interface Respo {
    password: string,
    confirm_password: string,
}

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
        let { user_id, password, confirm_password } = body;

        if(user_id && password && confirm_password) {
            
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

                if(password === confirm_password) {
                    const hashPassword = await hash(password, 10);
                    if(fu__in__usrtblmdl) {
                        await prisma.user.update({
                            where: {
                                user_id
                            },
                            data: {
                                user_password: hashPassword,
                            }
                        });
                    } else {
                        if(fu__in__admntblmdl) {
                            await prisma.admin_User.update({
                                where: {
                                    admin_user_id: user_id
                                },
                                data: {
                                    admin_user_password: hashPassword
                                }
                            });
                        }
                    }
                    resp = {
                        success: true,
                        message: 'Password Updated.',
                    }
                    sts = 200;
                } else {
                    resp = {
                        success: false,
                        message: "Password & Confirm Password Doesn't Match.",
                    }
                    sts = 400;
                }
            } else {
                resp = {
                    success: false,
                    message: 'User Not Found.',
                }
                sts = 400;
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