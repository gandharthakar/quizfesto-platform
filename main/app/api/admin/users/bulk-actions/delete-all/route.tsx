import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Respo {
    success: boolean,
    message: string
}

export async function DELETE(req: Request) {
    /* eslint-disable no-unused-vars */
    let resp: Respo = {
        success: false,
        message: ''
    }

    /* eslint-disable no-unused-vars */
    let sts:number = 400;

    try {

        const data = await prisma.qF_User.findMany();
        if(data.length > 0) {
            await prisma.qF_User.deleteMany();
            sts = 200;
            resp = {
                success: true,
                message: "All Users Deleted Successfully!"
            }
        } else {
            sts = 200;
            resp = {
                success: false,
                message: "No Users Found!"
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