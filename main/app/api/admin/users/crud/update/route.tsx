import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

interface Respo {
    success: boolean,
    message: string
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
        const { user_id, user_full_name, user_email, user_password, user_conf_password, role, user_phone, user_photo, user_gender } = body;
        
        if(user_id && user_full_name && user_email && role) {
            
            // Find existing user by email
            const existinUserByEmail = await prisma.qF_User.findUnique({
                where: {
                    user_email
                }
            });
            if(existinUserByEmail) {
                if(user_password) {
                    if(user_password === user_conf_password) {
                        const hashPassword = await hash(user_password, 10);
                        await prisma.qF_User.update({
                            where: {
                                user_id,
                            },
                            data: {
                                user_full_name,
                                user_photo,
                                user_phone,
                                user_email,
                                role, 
                                user_password: hashPassword,
                                user_gender
                            }
                        });
                        sts = 200;
                        resp = {
                            success: true,
                            message: "User Updated Successfully."
                        }
                    } else {
                        sts = 422;
                        resp = {
                            success: false,
                            message: "Password & Confirm Password Doesn't Match."
                        }
                    }
                } else {
                    await prisma.qF_User.update({
                        where: {
                            user_id,
                        },
                        data: {
                            user_full_name,
                            user_photo,
                            user_phone,
                            user_email,
                            role,
                            user_gender
                        }
                    });
                    sts = 200;
                    resp = {
                        success: true,
                        message: "User Updated Successfully."
                    }
                }
            } else {
                sts = 200;
                resp = {
                    success: false,
                    message: "User Not Exist."
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