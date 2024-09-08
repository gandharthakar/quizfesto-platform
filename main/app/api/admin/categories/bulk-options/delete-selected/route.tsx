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
                let hcats = await prisma.homepage_Categories.findFirst();
                if(hcats !== null) {
                    let commonIDs = findCommonItems(category_id_list, hcats.home_cats);
                    if(commonIDs.length > 0) {
                        let updated = removeItemsFromArray(hcats.home_cats, category_id_list);
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