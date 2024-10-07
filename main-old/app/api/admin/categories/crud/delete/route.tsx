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

                // Remove 'Same' Category From Home Top Categories List. 
                let hcats = await prisma.qF_Homepage_Categories.findFirst();
                if(hcats !== null) {
                    let commonIDs = findCommonItems([category_id], hcats.home_cats);
                    if(commonIDs.length > 0) {
                        let updated = removeItemsFromArray(hcats.home_cats, [category_id]);
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

                // Remove 'Same' Category From List Of Associative Quizes. 
                await removeCategoryFromQuizes(category_id);
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