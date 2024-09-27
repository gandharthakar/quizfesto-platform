import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface QF_User {
    user_id: string,
    user_name: string,
    user_role: string
}

interface Respo {
    success: boolean,
    message: string
    users: QF_User[]
}

export async function GET() {
    let resp: Respo = {
        success: false,
        message: '',
        users: []
    }
    let sts:number = 400;

    try {

        const data = await prisma.user.findMany({
            orderBy: {
                user_id: 'desc'
            }
        });
        if(data.length > 0) {
            let user = data.map((item) => {
                let obj = { 
                    user_id: item.user_id, 
                    user_name: item.user_full_name, 
                    user_role: item.role??""
                }
                return obj;
            });
            sts = 200;
            resp = {
                success: true,
                message: "Users found!",
                users: user
            }
        } else {
            sts = 200;
            resp = {
                success: false,
                message: "Users Not found!",
                users: []
            }
        }
        
        return NextResponse.json(resp, {status: sts});
    } catch (error: any) {
        sts = 500;
        resp = {
            success: false,
            message: error.message,
            users: []
        }
        return NextResponse.json(resp, {status: sts});
    }
}