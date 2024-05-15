'use client';

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { set_dark_mode, unset_dark_mode } from "@/app/redux-service/slices/theme-mode/themeSwitcherSlice";
import Link from "next/link";
import Image from "next/image";

export default function Page() {

    const dispatch = useDispatch();

    useEffect(() => {
        let glsi = localStorage.getItem('site-dark-mode');
        const checkDM = glsi ? JSON.parse(glsi) : '';
        if(checkDM) {
            dispatch(set_dark_mode());
        } else {
            dispatch(unset_dark_mode());
        }
    });

    return (
        <>
            <div className="transition-all delay-75 flex flex-col justify-center items-center px-[15px] py-[50px] min-h-screen bg-white dark:bg-zinc-950">
                <div className="w-full pb-[20px]">
                    <div className="text-center">
                        <Image src="/images/quizfesto-logo-final.svg" width={130} height={28} className="inline-block w-[130px] h-[28px]" alt="logo" />
                    </div>
                </div>
                <div className="w-full pb-[15px]">
                    <div className="w-full max-w-[800px] mx-auto py-[20px] px-[15px] border-[1px] border-solid border-zinc-400 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900">
                        <div className="pb-[0px] text-center">
                            <h1 className="transition-all delay-75 font-noto_sans text-[18px] md:text-[20px] font-semibold text-zinc-800 dark:text-zinc-300">
                                Your Score
                            </h1>
                        </div>
                        <div className="pb-[0px] text-center">
                            <h2 className="transition-all delay-75 font-noto_sans text-[30px] md:text-[40px] font-semibold text-zinc-900 dark:text-zinc-200">
                                12 / 20
                            </h2>
                        </div>
                        <div className="pb-[10px] text-center">
                            <h3 className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-900 dark:text-zinc-200">
                                Time Taken : <span className={`text-green-500`}>00:03:34</span> / <span>00:05:00</span>
                            </h3>
                        </div>

                        <div className="pb-[0px] text-center">
                            <h4 className="transition-all delay-75 font-noto_sans text-[18px] md:text-[20px] font-semibold text-zinc-600 dark:text-zinc-400">
                                You Answered <span>12</span> questions correctly.
                            </h4>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="w-full max-w-[800px] mx-auto py-[20px] px-[15px]">
                        <div className="pb-[15px] text-center">
                            <h5 className="transition-all delay-75 font-ubuntu text-[12px] md:text-[14px] text-zinc-500 dark:text-zinc-500">
                                Your Score Will Be Saved Only After Your Submit.
                            </h5>
                        </div>

                        <div className="flex flex-wrap gap-[15px] justify-center">
                            <div>
                                <button 
                                    type="button" 
                                    title="Submit Score" 
                                    className="inline-block transition-all delay-75 border-[2px] border-solid border-theme-color-1 text-white bg-theme-color-1 py-[8px] md:py-[10px] px-[20px] md:px-[25px] rounded-full font-ubuntu font-semibold text-[16px] md:text-[18px] hover:bg-theme-color-1-hover-dark hover:text-white"
                                >
                                    Submit Score
                                </button>
                            </div>
                            <div>
                                <Link href="/" title="Back To Home" className="inline-block transition-all delay-75 border-[2px] border-solid border-theme-color-2 text-theme-color-2 py-[8px] md:py-[10px] px-[20px] md:px-[25px] rounded-full font-ubuntu font-semibold text-[16px] md:text-[18px] hover:bg-theme-color-2 hover:text-white">
                                    Back To Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}