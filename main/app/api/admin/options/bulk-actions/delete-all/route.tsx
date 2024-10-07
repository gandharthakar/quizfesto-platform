import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Respo {
    success: boolean,
    message: string
}

export async function DELETE() {
    /* eslint-disable no-unused-vars */
    let resp: Respo = {
        success: false,
        message: ''
    }

    /* eslint-disable no-unused-vars */
    let sts:number = 400;

    try {

        const data = await prisma.qF_Option.findMany();
        if(data.length > 0) {
            await prisma.qF_Option.deleteMany();
            sts = 200;
            resp = {
                success: true,
                message: "Options Deleted Successfully!",
            }
        } else {
            sts = 200;
            resp = {
                success: false,
                message: "No Options Found!",
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