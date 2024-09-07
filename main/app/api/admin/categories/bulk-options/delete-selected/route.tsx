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
        let { category_id_list } = body;

        if(category_id_list) {

            const cat_list = await prisma.qF_Quiz_Category.findMany({
                where: {
                    category_id: {
                        in: category_id_list
                    }
                }
            });

            if(cat_list.length > 0) {
                await prisma.qF_Quiz_Category.deleteMany({
                    where: {
                        category_id: {
                            in: category_id_list
                        }
                    }
                });
                sts = 200;
                resp = {
                    success: true,
                    message: "Selected Categories Deleted Successfully!"
                }
            } else {
                sts = 201;
                resp = {
                    success: false,
                    message: "No Categories Found!"
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