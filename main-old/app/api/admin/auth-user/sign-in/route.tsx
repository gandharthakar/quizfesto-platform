import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

interface Resp {
    success: boolean,
    message: string
    token?: string
}

export async function POST(req: Request) {
    let resp: Resp = {
        success: false,
        message: ''
    }
    let sts:number = 400;

    try {

        let isAdminSide:boolean = false;
        let isUserSide:boolean = false;
        let finalSide:boolean = false;
        let finalUser:any = {};

        const body = await req.json();
        let { admin_user_email, admin_user_password } = body;

        if(admin_user_email && admin_user_password) {
            let usr_a = await prisma.qF_Admin_User.findFirst({
                where: {
                    admin_user_email
                }
            });
            let usr_b = await prisma.qF_User.findFirst({
                where: {
                    AND: [
                        {
                            user_email: admin_user_email
                        },
                        {
                            role: 'Admin'
                        }
                    ]
                }
            });

            isAdminSide = usr_a ? true : false;
            isUserSide = usr_b ? true : false;
            
            if(isAdminSide) {
                finalUser = usr_a;
            } else {
                finalUser = {};
                if(isUserSide) {
                    finalUser = usr_b;
                } else {
                    finalUser = {};
                }
            }          

            if(usr_a || usr_b) {
                finalSide = true;
            }

            if(finalSide) {
                let isMatch:boolean = false;
                if(isAdminSide) {
                    isMatch = await compare(admin_user_password, finalUser.admin_user_password);
                } else {
                    if(isUserSide) {
                        isMatch = await compare(admin_user_password, finalUser.user_password);
                    }
                }

                let token:string = '';
                if(isMatch) {
                    if(isAdminSide) {
                        token = jwt.sign({is_admin_user: finalUser.admin_user_id}, process.env.JWT_SECRET ?? "", { expiresIn: '30d' });
                    } else {
                        if(isUserSide) {
                            token = jwt.sign({is_admin_user: finalUser.user_id}, process.env.JWT_SECRET ?? "", { expiresIn: '30d' });
                        }
                    }
                }
                resp = {
                    success: true,
                    message: 'Admin User Success !',
                    token
                }
                sts = 200;
            } else {
                resp = {
                    success: false,
                    message: 'Admin Access Denied : Invalid User.',
                }
                sts = 401;
            }
        } else {
            resp = {
                success: false,
                message: 'Missing required fields.',
            }
            sts = 400;
        }

        return NextResponse.json(resp, {status: sts});
    } catch(error: any) {
        sts = 500;
        resp = {
            success: false,
            message: error.message
        }
        return NextResponse.json(resp, {status: sts});
    }
}