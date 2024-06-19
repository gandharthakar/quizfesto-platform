'use client';

import { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";

interface TwSelInt {
    value: string,
    label: string,
}

function Page() {

    const [homeCats, setHomeCats] = useState<TwSelInt[]>([]);
    const [homeCatOpts, setHomeCatOpts] = useState<TwSelInt[]>([]);

    const handleChangeSelect = (value: any) => {
        setHomeCats(value);
    }

    useEffect(() => {
        const options: TwSelInt[] = [
            { value: "fox", label: "🦊 Fox" },
            { value: "Butterfly", label: "🦋 Butterfly" },
            { value: "Honeybee", label: "🐝 Honeybee" }
        ];

        setHomeCatOpts(options);
    }, []);

    return (
        <>
            <div className="py-[25px]">
                <form>
                    <div className="transition-all delay-75 border-[2px] border-solid p-[15px] md:p-[25px] border-zinc-300 bg-white dark:bg-zinc-800 dark:border-zinc-600">
                        <div className="pb-[20px]">
                            <Select
                                primaryColor={"indigo"} 
                                value={homeCats} 
                                onChange={handleChangeSelect} 
                                options={homeCatOpts}  
                                isMultiple={true} 
                                isSearchable={true} 
                                classNames={{
                                    menuButton: (value) => `flex cursor-pointer text-sm text-gray-500 border border-gray-300 shadow-sm transition-all duration-75 focus:outline-0 bg-zinc-100 hover:border-gray-400 dark:bg-zinc-900 dark:border-zinc-500`,
                                    menu: `font_noto_sans absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700 dark:bg-zinc-900 dark:border-zinc-500`,
                                    tagItem: (value) => `bg-gray-200 border rounded-sm flex space-x-1 pl-1 dark:bg-zinc-800 dark:border-zinc-500 dark:text-zinc-200`,
                                    tagItemText: `text-zinc-900 font_noto_sans truncate cursor-default select-none dark:text-zinc-200`,
                                    listItem: (value) => `block font_noto_sans transition duration-200 px-3 py-3 cursor-pointer select-none truncate rounded text-zinc-500 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800`,
                                    searchContainer: `relative py-[10px] px-[15px]`,
                                    searchBox: `w-full font_noto_sans py-2 pl-8 pr-2 text-sm text-zinc-800 bg-gray-100 border border-gray-200 focus:outline-0 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200`,
                                }} 
                            />
                        </div>
                        <div className="text-right">
                            <button type="submit" title="Save Categories" className="transition-all delay-75 inline-block concard px-[20px] md:px-[25px] py-[10px] md:py-[12px] text-center text-white font-noto_sans font-semibold text-[16px] md:text-[18px] hover:shadow-lg">
                                Save Categories
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Page;