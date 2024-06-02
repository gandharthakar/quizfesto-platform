'use client';
import { useState } from "react";
import Select from "react-tailwindcss-select";

interface TwSelInt {
    value: string,
    label: string,
}

function Page() {

    const [animal, setAnimal] = useState(null);

    const handleChangeSelect = (value:any) => {
        setAnimal(value);
    };

    const options: TwSelInt[] = [
        { value: "fox", label: "🦊 Fox" },
        { value: "Butterfly", label: "🦋 Butterfly" },
        { value: "Honeybee", label: "🐝 Honeybee" }
    ];

    return (
        <>
            <div className="py-[25px]">
                <form>
                    <div className="flex gap-[20px] flex-col xl-s2:flex-row-reverse">
                        <div className="w-full xl-s2:flex-1 xl-s2:w-auto">
                            <div className="transition-all delay-75 border-[2px] border-solid p-[15px] md:p-[25px] border-zinc-300 bg-white dark:bg-zinc-800 dark:border-zinc-600">

                            </div>
                        </div>
                        <div className="w-full xl-s2:min-w-[400px] xl-s2:max-w-[400px] xl-1:min-w-[450px] xl-1:max-w-[450px] md:w-auto">
                            <div className="transition-all delay-75 border-[2px] border-solid p-[15px] md:p-[25px] border-zinc-300 bg-white dark:bg-zinc-800 dark:border-zinc-600">
                                <div className="pb-[20px]">
                                    <label 
                                        className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300"
                                    >
                                        Categories
                                    </label>
                                    <Select
                                        primaryColor={"indigo"} 
                                        value={animal} 
                                        onChange={handleChangeSelect} 
                                        options={options} 
                                        isMultiple={true} 
                                        isSearchable={true} 
                                        classNames={{
                                            menuButton: (value) => `flex cursor-pointer text-sm text-gray-500 border border-gray-300 shadow-sm transition-all duration-75 focus:outline-0 bg-white hover:border-gray-400 dark:bg-zinc-900 dark:border-zinc-500`,
                                            menu: `font_noto_sans absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700 dark:bg-zinc-900 dark:border-zinc-500`,
                                            tagItem: (value) => `bg-gray-200 border rounded-sm flex space-x-1 pl-1 dark:bg-zinc-800 dark:border-zinc-500 dark:text-zinc-200`,
                                            tagItemText: `text-zinc-900 font_noto_sans truncate cursor-default select-none dark:text-zinc-200`,
                                            listItem: (value) => `block font_noto_sans transition duration-200 px-3 py-3 cursor-pointer select-none truncate rounded text-zinc-500 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800`,
                                            searchContainer: `relative py-[10px] px-[15px]`,
                                            searchBox: `w-full font_noto_sans py-2 pl-8 pr-2 text-sm text-zinc-800 bg-gray-100 border border-gray-200 focus:outline-0 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200`,
                                        }} 
                                    />
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