
import { FaTrophy } from "react-icons/fa6";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaFlag } from "react-icons/fa6";

export default function Page() {
    return (
        <>
            <div className="py-[25px]">
                <div className="grid gap-[25px] grid-cols-1 lg-1:grid-cols-2 xl-1:grid-cols-3">
                    <div className="transition-all delay-75 bg-white dark:bg-zinc-800 px-[25px] py-[25px] border-[2px] border-solid p-[15px] border-zinc-300 hover:border-zinc-600 dark:border-zinc-600 dark:hover:border-zinc-400">
                        <div className="flex flex-row-reverse gap-x-[20px] items-center">
                            <div className="w-auto ml-auto">
                                <div className="flex items-center justify-center w-[50px] h-[50px] concard">
                                    <FaFlag size={23} className="w-[23px] h-[23px] text-white" />
                                </div>
                            </div>
                            <div className="pb-0">
                                <h2 className="transition-all delay-75 block font-ubuntu text-[18px] md:text-[25px] text-zinc-900 dark:text-zinc-400 leading-[30px] md:leading-[35px]">
                                    Your Score
                                </h2>
                                <div>
                                    <h2 className="transition-all delay-75 block font-ubuntu text-[30px] md:text-[40px] font-semibold text-zinc-900 dark:text-zinc-200 leading-[30px] md:leading-[45px]">
                                        100
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="transition-all delay-75 bg-white dark:bg-zinc-800 px-[25px] py-[25px] border-[2px] border-solid p-[15px] border-zinc-300 hover:border-zinc-600 dark:border-zinc-600 dark:hover:border-zinc-400">
                        <div className="flex flex-row-reverse gap-x-[20px] items-center">
                            <div className="w-auto ml-auto">
                                <div className="flex items-center justify-center w-[50px] h-[50px] concard">
                                    <FaTrophy size={25} className="w-[25px] h-[25px] text-white" />
                                </div>
                            </div>
                            <div className="pb-0">
                                <h2 className="transition-all delay-75 block font-ubuntu text-[18px] md:text-[25px] text-zinc-900 dark:text-zinc-400 leading-[30px] md:leading-[35px]">
                                    Your Winnings
                                </h2>
                                <div>
                                    <h2 className="transition-all delay-75 block font-ubuntu text-[30px] md:text-[40px] font-semibold text-zinc-900 dark:text-zinc-200 leading-[30px] md:leading-[45px]">
                                        0
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="transition-all delay-75 lg-1:col-span-2 xl-1:col-auto bg-white dark:bg-zinc-800 px-[25px] py-[25px] border-[2px] border-solid p-[15px] border-zinc-300 hover:border-zinc-600 dark:border-zinc-600 dark:hover:border-zinc-400">
                        <div className="flex flex-row-reverse gap-x-[20px] items-center">
                            <div className="w-auto ml-auto">
                                <div className="flex items-center justify-center w-[50px] h-[50px] concard">
                                    <IoChatboxEllipses size={25} className="w-[25px] h-[25px] text-white" />
                                </div>
                            </div>
                            <div className="pb-0">
                                <h2 className="transition-all delay-75 block font-ubuntu text-[18px] md:text-[25px] text-zinc-900 dark:text-zinc-400 leading-[30px] md:leading-[35px]">
                                    Your Participation
                                </h2>
                                <div>
                                    <h2 className="transition-all delay-75 block font-ubuntu text-[30px] md:text-[40px] font-semibold text-zinc-900 dark:text-zinc-200 leading-[30px] md:leading-[45px]">
                                        6
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}