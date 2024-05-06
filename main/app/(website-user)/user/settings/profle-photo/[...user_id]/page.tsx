'use client';

import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function Page() {

    let hasOwnImage:boolean = false;

    return (
        <>
            <div className="pt-[25px] lg:pt-0">
                <div className="transition-all delay-75 bg-white border-[2px] border-solid border-zinc-300 px-[20px] py-[20px] md:px-[40px] md:py-[30px] lg:max-w-[800px] dark:bg-zinc-950 dark:border-zinc-700">
                    <form>
                        {
                            hasOwnImage ? 
                            (
                                <>
                                    <div className="text-center pb-[10px]">
                                        <Image src="/images/testimonials/john-smith.jpg" width={100} height={100} alt="photo" className="inline-block w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full" priority={true} />
                                    </div>
                                    <div className="text-center">
                                        <button type="button" title="Remove Photo" className="inline-block font-ubuntu text-[18x] md:text-[20x] font-medium text-red-600 dark:text-red-500">
                                            <div className="flex gap-x-[10px] items-center">
                                                <FaRegTrashAlt size={17} />
                                                <div>
                                                    Remove Photo
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </>
                            ) 
                            : 
                            (
                                <>
                                    <div className="flex flex-col md:flex-row gap-y-[15px] gap-x-[35px]">
                                        <div className="w-full md:flex-1">
                                            <label htmlFor="imgInp" className="transition-all delay-75 cursor-pointer border-[2px] border-dashed border-zinc-300 w-full flex justify-center items-center min-h-[200px] px-[15px] py-[50px] bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900">
                                                <input type="file" id="imgInp" className="hidden" />
                                                <div>
                                                    <div className="pb-[5px] text-center">
                                                        <FaCloudUploadAlt size={80} className="transition-all inline-block delay-75 w-[50px] h-[50px] md:w-[80px] md:h-[80px] text-zinc-400" />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="inline-block font-noto_sans text-[16px] md:text-[18px] text-zinc-500 font-medium">
                                                            Drag & Drop File <br />
                                                            Or <span className="text-theme-color-2">Select File</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="w-full md:w-auto">
                                            <div className="pb-[10px]">
                                                <h1 className="transition-all delay-75 font-noto_sans text-[18px] md:text-[20px] font-semibold text-zinc-900 dark:text-zinc-300">
                                                    Image Preview
                                                </h1>
                                            </div>
                                            <Image 
                                                src="https://placehold.co/1000x1000/png" 
                                                width={100} 
                                                height={100} 
                                                className="inline-block w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-zinc-100 rounded-full" 
                                                alt="photo" 
                                            />
                                        </div>
                                    </div>

                                    <div className="py-[20px]">
                                        <h4 className="block transition-all delay-75 font-noto_sans text-[18px] md:text-[20px] font-semibold text-zinc-900 dark:text-zinc-300">
                                            Requirements:
                                        </h4>
                                    </div>

                                    <ul className="flex flex-col gap-y-[5px] list-disc pl-[20px]">
                                        <li className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-900 dark:text-zinc-300">
                                            The image file size should be less than 500 KB. &#x3c; less 500 KB
                                        </li>
                                        <li className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-900 dark:text-zinc-300">
                                            The maximum height and width of image shuld be 1000px x 1000px.
                                        </li>
                                        <li className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-900 dark:text-zinc-300">
                                            Image file format should be ".jpg" or ".png". Other files are not allowed.
                                        </li>
                                    </ul>
                                </>
                            )
                        }
                        <div className="text-right pt-[25px]">
                            <button type="submit" title="Save Changes" className="ws-button-m1">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}