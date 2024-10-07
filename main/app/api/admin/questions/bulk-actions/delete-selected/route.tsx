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

        const body = await req.json();
        const { question_id_list } = body;

        if(question_id_list.length > 0) {
            const data = await prisma.qF_Question.findMany({
                where: {
                    question_id: {
                        in: question_id_list
                    }
                }
            });
            if(data.length > 0) {
                await prisma.qF_Question.deleteMany({
                    where: {
                        question_id: {
                            in: question_id_list
                        }
                    }
                });
                sts = 200;
                resp = {
                    success: true,
                    message: "Selected Questions Deleted Successfully!"
                }
            } else {
                sts = 200;
                resp = {
                    success: false,
                    message: "Questions Not Found!",
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