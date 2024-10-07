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
        const { quiz_id } = body;

        if(quiz_id) {
            const alreadQuizExited = await prisma.qF_Quiz.findFirst({
                where: {
                    quiz_id
                }
            });
            if(alreadQuizExited) {
                await prisma.qF_Quiz.delete({
                    where: {
                        quiz_id
                    }
                });
                sts = 200;
                resp = {
                    success: true,
                    message: "Quiz Deleted Successfully!"
                }
            } else {
                sts = 200;
                resp = {
                    success: false,
                    message: "Quiz Not Exist!"
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
        if(error.message.endsWith("Invalid value provided. Expected StringFilter or String, provided Int.")) {
            sts = 500;
            resp = {
                success: false,
                message: "Quiz Not Exist!"
            }
        } else {
            sts = 500;
            resp = {
                success: false,
                message: error.message
            }
        }
        return NextResponse.json(resp, {status: sts});
    }
}