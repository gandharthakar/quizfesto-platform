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

    try {

        const body = await req.json();
        let { category_id } = body;

        if(category_id) {
            const existingCat = await prisma.qF_Quiz_Category.findFirst({
                where: {
                    category_id
                }
            });
            if(existingCat) {
                await prisma.qF_Quiz_Category.delete({
                    where: {
                        category_id
                    }
                });
                sts = 200;
                resp = {
                    success: true,
                    message: "Category Deleted Successfully!"
                }
            } else {
                sts = 200;
                resp = {
                    success: false,
                    message: "No Category Found!"
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