import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

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
    let ques = await prisma.qF_Question.findFirst({
        where: {
            question_id: qid
        }
    });

    return ques?.question_title;
}

const getOpts = async () => {
    let data = await prisma.qF_Option.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    let opts: QF_Opt[] = [];
    for(let i = 0; i < data.length; i++) {
        let obj = {
            option_id: data[i].option_id,
            options: data[i].options,
            question_text: await await getQT(data[i].questionid) ?? ""
        }
        opts.push(obj);
    }
    return opts;
}

export async function GET() {
    let resp: Respo = {
        success: false,
        message: '',
        options_list: []
    }
    let sts:number = 400;

    try {

        let data = await prisma.qF_Option.findMany();
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