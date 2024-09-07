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
        let { category_title, category_slug } = body;
        if(category_title && category_slug) {
            const existingCat = await prisma.qF_Quiz_Category.findFirst({
                where: {
                    category_title
                }
            });

            if(existingCat) {
                sts = 201;
                resp = {
                    success: false,
                    message: "Category Already Exist!"
                }
            } else {
                await prisma.qF_Quiz_Category.create({
                    data: {
                        category_title,
                        category_slug
                    }
                });
                sts = 200;
                resp = {
                    success: true,
                    message: "Category Added Successfully!"
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