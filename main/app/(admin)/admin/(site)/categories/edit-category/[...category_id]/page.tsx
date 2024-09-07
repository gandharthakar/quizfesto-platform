'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

/* Encode string to slug */
function convertToSlug( str:string ) {
    
    //replace all special characters | symbols with a space
    //eslint-disable-next-line
    str = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
             .toLowerCase();
      
    // trim spaces at start and end of string
    str = str.replace(/^\s+|\s+$/gm,'');
      
    // replace space with dash/hyphen
    str = str.replace(/\s+/g, '-');   
    return str;
}

function Page() {

    const parms = useParams();
    const cat_id = parms.category_id[0];
    const [catTitle, setCatTitle] = useState<string>("");
    const [catSlug, setCatSlug] = useState<string>("");
    const [catError, setCatError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleInputChange = (e:any) => {
        const value = e.target.value;
        if(catTitle == "") {
            setCatError("Please enter category title.");
            if(catTitle.length < 2) {
                setCatError("Category title must be contains at least 2 characters.");
            } else {
                setCatError("");
            }
        } else {
            setCatError("");
        }
        setCatTitle(value);
        setCatSlug(convertToSlug(value));
    }

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        if(catTitle == "") {
            setCatError("Please enter category title.");
            if(catTitle.length < 2) {
                setCatError("Category title must be contains at least 2 characters.");
            } else {
                setCatError("");
            }
        } else {
            setCatError("");
            setIsLoading(true);
            let prepData = {
                category_id: cat_id,
                category_title: catTitle,
                category_slug: catSlug
            }
            let baseURI = window.location.origin;
            const resp = await fetch(`${baseURI}/api/admin/categories/crud/update`, {
                method: "POST",
                body: JSON.stringify(prepData)
            });
            const body = await resp.json();
            if(body.success) {
                setIsLoading(false);
                Swal.fire({
                    title: "Success!",
                    text: body.message,
                    icon: "success",
                    timer: 3000
                });
            } else {
                setIsLoading(false);
                Swal.fire({
                    title: "Error!",
                    text: body.message,
                    icon: "error",
                    timer: 3000
                });
            }
        }
    }

    const getCategoryDetails = async () => {
        let baseURI = window.location.origin;
        const resp = await fetch(`${baseURI}/api/admin/categories/crud/read`, {
            method: "POST",
            body: JSON.stringify({category_id: cat_id})
        });
        const body = await resp.json();
        if(body.success) {
            setCatTitle(body.cat_data.category_title);
            setCatSlug(body.cat_data.category_slug);
            setIsLoading(false);
        } else {
            setIsLoading(false);
            Swal.fire({
                title: "Error!",
                text: body.message,
                icon: "error",
                timer: 2000
            });
        }
    }

    useEffect(() => {
        // setCatTitle("Category 1");
        // setCatSlug(convertToSlug("Category 1"));
        getCategoryDetails();
    }, []);

    return (
        <>
            <div className="py-[25px]">
                <form onSubmit={handleFormSubmit}>
                    <div className="flex gap-[20px] items-start flex-col xl-s2:flex-row-reverse">
                        <div className="w-full xl-s2:flex-1 xl-s2:w-auto">
                            <div className="transition-all delay-75 border-[2px] border-solid p-[15px] md:p-[25px] border-zinc-300 bg-white dark:bg-zinc-800 dark:border-zinc-600">
                                <div className="pb-[20px]">
                                    <label 
                                        htmlFor="cq-catttl" 
                                        className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300"
                                    >
                                        Category Title <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="cq-catttl" 
                                        className="ws-input-pwd-m1-v1" 
                                        autoComplete="off" 
                                        value={catTitle} 
                                        onChange={handleInputChange} 
                                    />
                                    {
                                        catError && (<div className="ws-input-error mt-[2px]">{catError}</div>)
                                    }
                                </div>
                                <div className="pb-[20px]">
                                    <label 
                                        htmlFor="cq-catslug" 
                                        className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300"
                                    >
                                        Category Slug
                                    </label>
                                    <input 
                                        type="text" 
                                        id="cq-catslug" 
                                        className="ws-input-pwd-m1-v1" 
                                        autoComplete="off" 
                                        readOnly={true}
                                        value={catSlug}
                                    />
                                </div>
                                
                                <div className="text-right">
                                    {
                                        isLoading ? 
                                        (<div className="spinner size-1"></div>) 
                                        : 
                                        (
                                            <button type="submit" title="Update Category" className="transition-all delay-75 inline-block concard px-[20px] md:px-[25px] py-[10px] md:py-[12px] text-center text-white font-noto_sans font-semibold text-[16px] md:text-[18px] hover:shadow-lg">
                                                Update Category
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Page;