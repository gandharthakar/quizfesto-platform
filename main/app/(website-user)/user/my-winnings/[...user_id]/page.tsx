import { FaTrophy } from "react-icons/fa6";

export default function Page() {
    return (
        <>
            <div className="py-[25px]">
                <div className="grid gap-[20px] grid-cols-1 md:grid-cols-2 xl-s1:grid-cols-3">
                    <div className="transition-all delay-75 border-[2px] border-solid py-[25px] px-[25px] border-zinc-300 bg-white hover:border-zinc-600 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:border-zinc-400">
                        <div className="pb-[15px]">
                            <div className="transition-all delay-75 flex items-center justify-center w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-zinc-100 rounded-full dark:bg-zinc-700">
                                <FaTrophy size={40} className="transition-all delay-75 w-[30px] h-[30px] md:w-[40px] md:h-[40px] text-amber-500" />
                            </div>
                        </div>
                        <div className="pb-0">
                            <h1 className="transition-all delay-75 font-noto_sans font-semibold text-[20px] md:text-[25px] text-zinc-900 dark:text-zinc-200">
                                1<sup>st</sup> Winner
                            </h1>
                        </div>
                        <div className="pb-[10px]">
                            <p className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-400">
                                <span className="font-bold text-theme-color-2">!Congratulations,</span> You scored 10000 in this month. You won 1<sup>st</sup> winner prize. You will get exclusive headphones from the boat brand. You will receive email for further details.
                            </p>
                        </div>
                        <div className="">
                            <p className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-400">
                                <span className="font-bold text-zinc-500 dark:text-zinc-300">Winning Date :</span> 01-06-2024
                            </p>
                        </div>
                    </div>
                    <div className="transition-all delay-75 border-[2px] border-solid py-[25px] px-[25px] border-zinc-300 bg-white hover:border-zinc-600 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:border-zinc-400">
                        <div className="pb-[15px]">
                            <div className="transition-all delay-75 flex items-center justify-center w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-zinc-100 rounded-full dark:bg-zinc-700">
                                <FaTrophy size={40} className="transition-all delay-75 w-[30px] h-[30px] md:w-[40px] md:h-[40px] text-gray-400" />
                            </div>
                        </div>
                        <div className="pb-0">
                            <h1 className="transition-all delay-75 font-noto_sans font-semibold text-[20px] md:text-[25px] text-zinc-900 dark:text-zinc-200">
                                2<sup>nd</sup> Winner
                            </h1>
                        </div>
                        <div className="pb-[10px]">
                            <p className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-400">
                                <span className="font-bold text-theme-color-2">!Congratulations,</span> You scored 8000 in this month. You won 2<sup>nd</sup> winner prize. You will get shopping voucher issued by amazon company. You will receive email for further details.
                            </p>
                        </div>
                        <div className="">
                            <p className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-400">
                                <span className="font-bold text-zinc-500 dark:text-zinc-300">Winning Date :</span> 01-06-2024
                            </p>
                        </div>
                    </div>
                    <div className="transition-all delay-75 border-[2px] border-solid py-[25px] px-[25px] border-zinc-300 bg-white hover:border-zinc-600 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:border-zinc-400">
                        <div className="pb-[15px]">
                            <div className="transition-all delay-75 flex items-center justify-center w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-zinc-100 rounded-full dark:bg-zinc-700">
                                <FaTrophy size={40} className="transition-all delay-75 w-[30px] h-[30px] md:w-[40px] md:h-[40px] text-orange-700" />
                            </div>
                        </div>
                        <div className="pb-0">
                            <h1 className="transition-all delay-75 font-noto_sans font-semibold text-[20px] md:text-[25px] text-zinc-900 dark:text-zinc-200">
                                3<sup>rd</sup> Winner
                            </h1>
                        </div>
                        <div className="pb-[10px]">
                            <p className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-400">
                                <span className="font-bold text-theme-color-2">!Congratulations,</span> You scored 6000 in this month. You won 2<sup>rd</sup> winner prize. You will get paytm cashback upto rupees 500. You will receive email for further details.
                            </p>
                        </div>
                        <div className="">
                            <p className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-400">
                                <span className="font-bold text-zinc-500 dark:text-zinc-300">Winning Date :</span> 01-06-2024
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}