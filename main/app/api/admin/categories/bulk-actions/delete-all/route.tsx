import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Respo {
    success: boolean,
    message: string
}

export async function DELETE() {
    let resp: Respo = {
        success: false,
        message: ''
    }
    let sts:number = 400;

    try {

        let data = await prisma.qF_Quiz_Category.findMany();
        if(data.length > 0) {
            await prisma.qF_Quiz_Category.deleteMany();
            sts = 200;
            resp = {
                success: true,
                message: "Categories Deleted Successfully!"
            }

            // Remove 'All' Categories From Home Top Categories List. 
            let hcats = await prisma.homepage_Categories.findFirst();
            if(hcats !== null) {
                await prisma.homepage_Categories.delete({
                    where: {
                        home_cat_id: hcats.home_cat_id
                    }
                });
            }

            // Remove 'All' Categories From List Of All Associative Quizes. 
            await prisma.qF_Quiz.updateMany({
                data: {
                    quiz_categories: []
                }
            });
        } else {
            sts = 200;
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