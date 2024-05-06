
import Image from "next/image";
import { FaCrown } from "react-icons/fa";

export default function page() {

    let hasWinners:boolean = true;

    return (
        <>
            <section className="transition-all delay-75 min-h-screen px-[15px] py-[100px] bg-zinc-100 dark:bg-zinc-900 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url('/images/celebration.png')` }}>
                <div className="site-container text-center">
                    <div className="flex items-center justify-center flex-col min-h-[calc(100vh-200px)]">
                        <div className="text-center w-full">
                            <h1 className="transition-all delay-75 font-ubuntu font-bold text-[30px] md:text-[50px] text-zinc-900 dark:text-zinc-100">
                                Winners Of The Month
                            </h1>
                            {
                                hasWinners ? 
                                (
                                    <div className="pt-[20px] md:pt-[30px]">

                                        <div className="flex flex-row lg:flex-row items-end justify-center gap-[25px] flex-wrap lg:flex-nowrap pb-[0px] md:pb-[25px] lg:pb-[0px]">
                                            <div className="transition-all delay-75 hidden md:block lg:hidden w-full md:w-[calc(50%-13px)] lg:w-[calc(33.3333%-15px)] relative px-[15px] pt-[50px] pb-[20px] md:pt-[110px] md:pb-[40px] bg-white border-[2px] text-center border-solid border-zinc-900 dark:bg-zinc-800 dark:border-zinc-600">
                                                <div className="inline-block relative p-[2px] rounded-full mx-auto ring-yellow-400 ring-2">
                                                    <FaCrown size={20} className="absolute right-[10px] md:right-[15px] top-[-28px] md:top-[-42px] w-[25px] h-[25px] md:w-[40px] md:h-[40px] text-yellow-400" />
                                                    <div className="transition-all delay-75 relative w-[40px] h-[40px] md:w-[70px] md:h-[70px] flex items-center justify-center bg-zinc-200 dark:bg-zinc-700 rounded-full font-ubuntu font-bold text-[18px] md:text-[30px] text-zinc-800 dark:text-zinc-300">
                                                        <span className="uppercase">a</span>
                                                    </div>
                                                </div>
                                                <div className="text-center pt-[10px] md:pt-[15px]">
                                                    <h2 className="transition-all delay-75 font-ubuntu text-[16px] md:text-[20px] text-zinc-800 dark:text-zinc-200">
                                                        Amit Thakur
                                                    </h2>
                                                </div>
                                                <div className="pt-[10px]">
                                                    <h4 className="transition-all delay-75 font-noto_sans font-semibold text-[20px] md:text-[25px] text-zinc-900 dark:text-zinc-100">
                                                        1<sup>st</sup> Winner
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row lg:flex-row items-end justify-center gap-[25px] flex-wrap lg:flex-nowrap">
                                            <div className="transition-all delay-75 w-full md:w-[calc(50%-13px)] lg:w-[calc(33.3333%-15px)] order-2 md:order-1 lg:order-1 relative px-[15px] pt-[50px] pb-[20px] md:pt-[70px] md:pb-[40px] bg-white border-[2px] text-center border-solid border-zinc-900 dark:bg-zinc-800 dark:border-zinc-600">
                                                <div className="inline-block relative p-[2px] rounded-full mx-auto ring-theme-color-2 ring-2">
                                                    <FaCrown size={20} className="absolute right-[10px] top-[-28px] md:top-[-42px] w-[25px] h-[25px] md:w-[40px] md:h-[40px] text-gray-400" />
                                                    <div className="transition-all delay-75 relative w-[40px] h-[40px] md:w-[60px] md:h-[60px] flex items-center justify-center bg-zinc-200 dark:bg-zinc-700 rounded-full font-ubuntu font-bold text-[18px] md:text-[25px] text-zinc-800 dark:text-zinc-300">
                                                        <span className="uppercase">a</span>
                                                        <Image src="/images/testimonials/michael-davis.jpg" width={60} height={60} className="absolute left-0 top-0 w-full h-full rounded-full z-[2]" alt="photo" />
                                                    </div>
                                                </div>
                                                <div className="text-center pt-[10px] md:pt-[15px]">
                                                    <h2 className="transition-all delay-75 font-ubuntu text-[16px] md:text-[20px] text-zinc-800 dark:text-zinc-200">
                                                        Akash Gupta
                                                    </h2>
                                                </div>
                                                <div className="pt-[10px]">
                                                    <h4 className="transition-all delay-75 font-noto_sans font-semibold text-[20px] md:text-[25px] text-zinc-900 dark:text-zinc-100">
                                                        2<sup>nd</sup> Winner
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="transition-all delay-75 block md:hidden lg:block w-full md:w-[calc(50%-13px)] lg:w-[calc(33.3333%-15px)] order-1 md:order-3 lg:order-2 relative px-[15px] pt-[50px] pb-[20px] md:pt-[110px] md:pb-[40px] bg-white border-[2px] text-center border-solid border-zinc-900 dark:bg-zinc-800 dark:border-zinc-600">
                                                <div className="inline-block relative p-[2px] rounded-full mx-auto ring-yellow-400 ring-2">
                                                    <FaCrown size={20} className="absolute right-[10px] md:right-[15px] top-[-28px] md:top-[-42px] w-[25px] h-[25px] md:w-[40px] md:h-[40px] text-yellow-400" />
                                                    <div className="transition-all delay-75 relative w-[40px] h-[40px] md:w-[70px] md:h-[70px] flex items-center justify-center bg-zinc-200 dark:bg-zinc-700 rounded-full font-ubuntu font-bold text-[18px] md:text-[30px] text-zinc-800 dark:text-zinc-300">
                                                        <span className="uppercase">a</span>
                                                    </div>
                                                </div>
                                                <div className="text-center pt-[10px] md:pt-[15px]">
                                                    <h2 className="transition-all delay-75 font-ubuntu text-[16px] md:text-[20px] text-zinc-800 dark:text-zinc-200">
                                                        Amit Thakur
                                                    </h2>
                                                </div>
                                                <div className="pt-[10px]">
                                                    <h4 className="transition-all delay-75 font-noto_sans font-semibold text-[20px] md:text-[25px] text-zinc-900 dark:text-zinc-100">
                                                        1<sup>st</sup> Winner
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="transition-all delay-75 w-full md:w-[calc(50%-13px)] lg:w-[calc(33.3333%-15px)] order-3 md:order-2 lg:order-3 relative px-[15px] pt-[50px] pb-[20px] md:pt-[70px] md:pb-[40px] bg-white border-[2px] text-center border-solid border-zinc-900 dark:bg-zinc-800 dark:border-zinc-600">
                                                <div className="inline-block relative p-[2px] rounded-full mx-auto ring-theme-color-2 ring-2">
                                                    <FaCrown size={20} className="absolute right-[10px] top-[-28px] md:top-[-42px] w-[25px] h-[25px] md:w-[40px] md:h-[40px] text-orange-700" />
                                                    <div className="transition-all delay-75 relative w-[40px] h-[40px] md:w-[60px] md:h-[60px] flex items-center justify-center bg-zinc-200 dark:bg-zinc-700 rounded-full font-ubuntu font-bold text-[18px] md:text-[25px] text-zinc-800 dark:text-zinc-300">
                                                        <span className="uppercase">s</span>
                                                        <Image src="/images/testimonials/jennifer-lee.jpg" width={60} height={60} className="absolute left-0 top-0 w-full h-full rounded-full z-[2]" alt="photo" />
                                                    </div>
                                                </div>
                                                <div className="text-center pt-[10px] md:pt-[15px]">
                                                    <h2 className="transition-all delay-75 font-ubuntu text-[16px] md:text-[20px] text-zinc-800 dark:text-zinc-200">
                                                        Sarita Pawar
                                                    </h2>
                                                </div>
                                                <div className="pt-[10px]">
                                                    <h4 className="transition-all delay-75 font-noto_sans font-semibold text-[20px] md:text-[25px] text-zinc-900 dark:text-zinc-100">
                                                        3<sup>rd</sup> Winner
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) 
                                : 
                                (
                                    <div className="transition-all delay-75 px-[15px] py-[15px] md:py-[20px] mt-[20px] border-[2px] text-center border-solid border-zinc-900 bg-white max-w-[600px] mx-auto dark:bg-zinc-800 dark:border-zinc-600">
                                        <h6 className="transition-all delay-75 inline-block font-ubuntu text-[18px] md:text-[20px] text-zinc-900 dark:text-zinc-300">
                                            There is no winner in this month.
                                        </h6>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}