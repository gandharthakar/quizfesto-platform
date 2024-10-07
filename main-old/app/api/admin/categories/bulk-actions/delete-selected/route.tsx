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

const getFilteredQuizes = async (filter: string) => {
    const view_post = await prisma.qF_Quiz.findMany({
        where: {
            quiz_categories: {
                has: filter
            }
        }
    });
    return view_post;
}

const removeCategoryFromQuizes = async (categoryId: string) => {
    const posts = await getFilteredQuizes(categoryId);

    const updatedPosts = posts.map(post => {
        const updatedCategories = post.quiz_categories.filter(category => category !== categoryId);
        return {
            quiz_id: post.quiz_id,
            quiz_categories: updatedCategories
        };
    });

    await Promise.all(updatedPosts.map(post => prisma.qF_Quiz.update({ where: { quiz_id: post.quiz_id }, data: { quiz_categories: post.quiz_categories } })));
}

export async function DELETE(req: Request) {
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

                // Remove 'Selected' Categories From Home Top Categories List. 
                let hcats = await prisma.qF_Homepage_Categories.findFirst();
                if(hcats !== null) {
                    let commonIDs = findCommonItems(category_id_list, hcats.home_cats);
                    if(commonIDs.length > 0) {
                        let updated = removeItemsFromArray(hcats.home_cats, category_id_list);
                        await prisma.qF_Homepage_Categories.update({
                            where: {
                                home_cat_id: hcats.home_cat_id
                            },
                            data: {
                                home_cats: updated
                            }
                        });
                    }
                }

                // Remove 'Selected' Categories From List Of Associative Quizes. 
                for(let i = 0; i < category_id_list.length; i++) {
                    await removeCategoryFromQuizes(category_id_list[i]);
                }
            } else {
                sts = 200;
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