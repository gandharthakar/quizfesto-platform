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

        const data = await prisma.qF_Homepage_Categories.findFirst();
        if(data !== null) {
            await prisma.qF_Homepage_Categories.delete({
                where: {
                    home_cat_id: data.home_cat_id
                }
            });
            sts = 200;
            resp = {
                success: true,
                message: "Categories Removed Successfully!"
            }
        } else {
            sts = 400;
            resp = {
                success: false,
                message: "No Categories Found!"
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