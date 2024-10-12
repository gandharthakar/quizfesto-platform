import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Respo {
    success: boolean,
    message: string
    user_block_status?: string
}

export async function POST(req: Request) {
    /* eslint-disable no-unused-vars */
    let resp: Respo = {
        success: false,
        message: ''
    }

    /* eslint-disable no-unused-vars */
    let sts: number = 400;

    try {

        const body = await req.json();
        const { user_id } = body;

        if (user_id) {
            const existingUser = await prisma.qF_User.findFirst({
                where: {
                    user_id
                }
            });
            if (existingUser !== null) {
                sts = 200;
                resp = {
                    success: true,
                    message: "User Found!",
                    user_block_status: existingUser.isBlockedByAdmin ?? ""
                }
            } else {
                sts = 200;
                resp = {
                    success: false,
                    message: "User Not Found!"
                }
            }
        } else {
            sts = 400;
            resp = {
                success: false,
                message: "Missing Required Fields!"
            }
        }

        return NextResponse.json(resp, { status: sts });
    } catch (error: any) {
        sts = 500;
        resp = {
            success: false,
            message: error.message
        }
        return NextResponse.json(resp, { status: sts });
    }
}