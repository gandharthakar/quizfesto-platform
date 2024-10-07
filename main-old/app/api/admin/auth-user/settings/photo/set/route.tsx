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

    let isTrueAdminUser:boolean = false;

    try {

        const body = await req.json();
        let { user_id, user_photo } = body;

        if(user_id && user_photo) {
            const fu__in__usrtblmdl = await prisma.qF_User.findFirst({
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
            const fu__in__admntblmdl = await prisma.qF_Admin_User.findFirst({
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
                    await prisma.qF_User.update({
                        where: {
                            user_id
                        },
                        data: {
                            user_photo
                        }
                    });
                } else {
                    if(fu__in__admntblmdl) {
                        await prisma.qF_Admin_User.update({
                            where: {
                                admin_user_id: user_id
                            },
                            data: {
                                admin_user_photo: user_photo
                            }
                        });
                    }
                }

                resp = {
                    success: true,
                    message: "Profile Photo Updated."
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