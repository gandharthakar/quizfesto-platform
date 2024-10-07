import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface QF_Opt {
    option_id: string,
    options: string[],
    question_text: string | Promise<string>
}

interface Respo {
    success: boolean,
    message: string,
    options_list: QF_Opt[]
}

const getQT = async (qid: string) => {
    const ques = await prisma.qF_Question.findFirst({
        where: {
            question_id: qid
        }
    });

    return ques?.question_title;
}

const getOpts = async () => {
    const data = await prisma.qF_Option.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    
    //eslint-disable-next-line
    let opts: QF_Opt[] = [];
    /* eslint-disable no-unused-vars */
    for(let i = 0; i < data.length; i++) {
        const obj = {
            option_id: data[i].option_id,
            options: data[i].options,
            question_text: await await getQT(data[i].questionid) ?? ""
        }
        opts.push(obj);
    }
    return opts;
}

export async function GET() {
    /* eslint-disable no-unused-vars */
    let resp: Respo = {
        success: false,
        message: '',
        options_list: []
    }

    /* eslint-disable no-unused-vars */
    let sts:number = 400;

    try {

        const data = await prisma.qF_Option.findMany();
        if(data.length > 0) {
            sts = 200;
            resp = {
                success: true,
                message: "Options Found!",
                options_list: await getOpts()
            }
        } else {
            sts = 200;
            resp = {
                success: false,
                message: "No Options Found!",
                options_list: []
            }
        }
        
        return NextResponse.json(resp, {status: sts});
    } catch (error: any) {
        sts = 500;
        resp = {
            success: false,
            message: error.message,
            options_list: []
        }
        return NextResponse.json(resp, {status: sts});
    }
}