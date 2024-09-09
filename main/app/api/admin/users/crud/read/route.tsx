import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface QF_User {
    user_full_name: string,
    user_email: string,
    user_phone?: string,
    user_photo?: string,
    role: string
}

interface Respo {
    success: boolean,
    message: string,
    user: QF_User
}

export async function POST(req: Request) {
    let resp: Respo = {
        success: false,
        message: '',
        user: {
            user_full_name: '',
            role: '',
            user_email: ''
        }
    }
    let sts:number = 400;

    try {

        const body = await req.json();
        let { user_id } = body;

        if(user_id) {
            const DB_User = await prisma.user.findFirst({
                where: {
                    user_id
                }
            });
            if(DB_User !== null) {
                sts = 200;
                resp = {
                    success: true,
                    message: "User Found!",
                    user: {
                        user_full_name: DB_User.user_full_name,
                        user_email: DB_User.user_email,
                        role: DB_User.role??"",
                        user_phone: DB_User.user_phone??"",
                        user_photo: DB_User.user_photo??""
                    }
                }
            } else {
                sts = 200;
                resp = {
                    success: false,
                    message: "No User Found!",
                    user: {
                        user_full_name: '',
                        role: '',
                        user_email: ''
                    }
                }
            }
        } else {
            sts = 400;
            resp = {
                success: false,
                message: "Missing Required Fields!",
                user: {
                    user_full_name: '',
                    role: '',
                    user_email: ''
                }
            }
        }

        return NextResponse.json(resp, {status: sts});
    } catch (error: any) {
        sts = 500;
        resp = {
            success: false,
            message: error.message,
            user: {
                user_full_name: '',
                role: '',
                user_email: ''
            }
        }
        return NextResponse.json(resp, {status: sts});
    }
}