import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Respo {
    success: boolean,
    message: string
}

const findCommonItems = (arr1:string[], arr2: string[]) => {
    return arr1.filter(item => arr2.includes(item));
}

const removeItemsFromArray = (fruitsArray: string[], itemsToRemove: string[]) => {
    return fruitsArray.filter(fruit => !itemsToRemove.includes(fruit));
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
                let hcats = await prisma.homepage_Categories.findFirst();
                if(hcats !== null) {
                    let commonIDs = findCommonItems([category_id], hcats.home_cats);
                    if(commonIDs.length > 0) {
                        let updated = removeItemsFromArray(hcats.home_cats, [category_id]);
                        await prisma.homepage_Categories.update({
                            where: {
                                home_cat_id: hcats.home_cat_id
                            },
                            data: {
                                home_cats: updated
                            }
                        });
                    }
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