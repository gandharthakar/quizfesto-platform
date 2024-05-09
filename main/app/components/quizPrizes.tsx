import Image from "next/image";

export default function QuizPrizes() {
    return (
        <>
            <section className="transition-all delay-75 bg-white px-[15px] py-[50px] md:py-[100px] dark:bg-zinc-950">
                <div className="site-container">
                    <div className="pb-[25px] md:pb-[50px]">
                        <div className="pb-[10px] text-center">
                            <h3 className="transition-all delay-75 font-noto_sans text-[25px] md:text-[30px] text-zinc-800 font-semibold dark:text-zinc-200">
                                Win Exciting Prizes
                            </h3>
                        </div>
                        <div className="max-w-[500px] mx-auto text-center">
                            <p className="transition-all delay-75 font-noto_sans text-[16px] md:text-[18px] text-zinc-800 font-normal dark:text-zinc-300">
                                Every month we declare 3 winners for 1st, 2nd and 3rd prizes. Winners will get their respective prizes.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-[20px]">
                        <div className="transition-all delay-75 relative w-full border-[2px] border-solid bg-zinc-100 flex flex-col items-start md:items-center md:flex-row gap-y-[15px] gap-x-[30px] dark:bg-zinc-900 hover:border-theme-color-2 dark:border-zinc-700 dark:hover:border-theme-color-2">
                            {/* Prize Logo */}
                            <Image src="/images/winner-prizes/logos/prize-logo-1.png" width={150} height={138} className="w-[150px] h-[138px] absolute right-0 top-[50%] translate-y-[-50%] z-[2] hidden md:block opacity-[0.8] md:opacity-[1]" alt="prize" />
                            
                            {/* Price Image */}
                            <Image src="/images/winner-prizes/winprz-1.jpg" width={250} height={179} className="w-full max-w-none md:max-w-[250px] h-auto relative z-[5]" alt="prize" />
                            <div className="pr-[15px] pl-[15px] md:pl-0 md:pr-[180px] pb-[15px] md:pb-[0px]">
                                <div className="pb-[0px]">
                                    <h6 className="transition-all delay-75 font-ubuntu text-[20px] md:text-[25px] text-zinc-800 dark:text-zinc-200">
                                        <b>1<sup>st</sup></b> : Winner Prize
                                    </h6>
                                </div>
                                <div>
                                    <p className="transition-all delay-75 font-noto_sans text-[16px] md:text-[18px] dark:text-zinc-400">
                                        Score 10000 and 1<sup>st</sup> winner will get exclusive headphones from the brand called boat.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="transition-all delay-75 relative w-full border-[2px] border-solid bg-zinc-100 flex flex-col items-start md:items-center md:flex-row gap-y-[15px] gap-x-[30px] dark:bg-zinc-900 hover:border-theme-color-2 dark:border-zinc-700 dark:hover:border-theme-color-2">
                            {/* Prize Logo */}
                            <Image src="/images/winner-prizes/logos/prize-logo-2.png" width={150} height={138} className="w-[150px] h-[138px] absolute right-0 top-[50%] translate-y-[-50%] z-[2] hidden md:block opacity-[0.8] md:opacity-[1]" alt="prize" />
                            
                            {/* Price Image */}
                            <Image src="/images/winner-prizes/winprz-2.jpg" width={250} height={179} className="w-full max-w-none md:max-w-[250px] h-auto relative z-[5]" alt="prize" />
                            <div className="pr-[15px] pl-[15px] md:pl-0 md:pr-[180px] pb-[15px] md:pb-[0px]">
                                <div className="pb-[0px]">
                                    <h6 className="transition-all delay-75 font-ubuntu text-[20px] md:text-[25px] text-zinc-800 dark:text-zinc-200">
                                        <b>2<sup>nd</sup></b> : Winner Prize
                                    </h6>
                                </div>
                                <div>
                                    <p className="transition-all delay-75 font-noto_sans text-[16px] md:text-[18px] dark:text-zinc-400">
                                        Score 8000 and 2<sup>nd</sup> winner will get shopping voucher issued by amazon company.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="transition-all delay-75 relative w-full border-[2px] border-solid bg-zinc-100 flex flex-col items-start md:items-center md:flex-row gap-y-[15px] gap-x-[30px] dark:bg-zinc-900 hover:border-theme-color-2 dark:border-zinc-700 dark:hover:border-theme-color-2">
                            {/* Prize Logo */}
                            <Image src="/images/winner-prizes/logos/prize-logo-3.png" width={150} height={138} className="w-[150px] h-[138px] absolute right-0 top-[50%] translate-y-[-50%] z-[2] hidden md:block opacity-[0.8] md:opacity-[1]" alt="prize" />
                            
                            {/* Price Image */}
                            <Image src="/images/winner-prizes/winprz-3.jpg" width={250} height={179} className="w-full max-w-none md:max-w-[250px] h-auto relative z-[5]" alt="prize" />
                            <div className="pr-[15px] pl-[15px] md:pl-0 md:pr-[180px] pb-[15px] md:pb-[0px]">
                                <div className="pb-[0px]">
                                    <h6 className="transition-all delay-75 font-ubuntu text-[20px] md:text-[25px] text-zinc-800 dark:text-zinc-200">
                                        <b>3<sup>rd</sup></b> : Winner Prize
                                    </h6>
                                </div>
                                <div>
                                    <p className="transition-all delay-75 font-noto_sans text-[16px] md:text-[18px] dark:text-zinc-400">
                                        Score 6000 and 3<sup>rd</sup> winner will get paytm cashback upto rupees 500.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}