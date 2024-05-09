'use client';

import QuizCard from "@/app/components/quizCard"
import { dump_quizzes_list } from "@/app/constant/datafaker"
import { RiSearch2Line } from "react-icons/ri";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

export default function Page() {
    return (
        <>
            <div className="transition-all delay-75 pt-[100px] md:pt-[150px] pb-[50px] px-[15px] bg-zinc-100 dark:bg-zinc-900">
                <div className="site-container">
                    <div className="pb-[35px] md:pb-[50px]">
						<div className="pb-[10px] text-center">
							<h3 className="transition-all delay-75 font-noto_sans text-[25px] md:text-[30px] text-zinc-800 font-semibold dark:text-zinc-200">
								Explore Our Quizzes
							</h3>
						</div>
						<div className="max-w-[500px] mx-auto text-center">
							<p className="transition-all delay-75 font-noto_sans text-[16px] md:text-[18px] text-zinc-800 font-normal dark:text-zinc-300">
								Explore our quizzes and try to participate on more and more quizzes to win excited prizes.
							</p>
						</div>
					</div>

                    <div className="pb-[50px] md:max-w-[350px] mx-auto">
                        <form>
                            <div className="relative ">
                                <input 
                                    type="text" 
                                    name="Search" 
                                    id="search" 
                                    placeholder="Search ..." 
                                    autoComplete="off" 
                                    className="transition-all delay-75 block w-full bg-white border-[2px] border-solid border-zinc-400 pl-[15px] pr-[42px] md:pr-[50px] py-[8px] md:py-[10px] font-noto_sans text-[16px] md:text-[18px] font-semibold text-zinc-800 rounded-full focus:outline-0 placeholder-zinc-400 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200"
                                />
                                <div className="absolute right-[16px] md:right-[18px] top-[12px] md:top-[13px] z-[2]">
                                    <button 
                                        type="submit" 
                                        title="Search" 
                                        className="transition-all delay-75 text-zinc-800 dark:text-zinc-200"
                                    >
                                        <RiSearch2Line size={25} className="w-[20px] h-[20px] md:w-[25px] md:h-[25px]" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        {
                            dump_quizzes_list.map((item) => (
                                <QuizCard 
                                    key={item.quiz_id} 
                                    quiz_id={item.quiz_id} 
                                    quiz_title={item.quiz_title} 
                                    quiz_cover_photo={item.quiz_cover_photo} 
                                    quiz_categories={item.quiz_categories} 
                                    quiz_summary={item.quiz_summary} 
                                    number_of_question={item.number_of_question} 
                                    quiz_duration={item.quiz_duration}
                                />
                            ))
                        }
                    </div>

                    <div className="pt-[50px] max-w-[280px] mx-auto">
                        <div className="flex justify-between gap-x-[15px] items-center">
                            <div>
                                <button 
                                    type="button" 
                                    title="Previous Page" 
                                    className="transition-all delay-75 text-zinc-700 dark:text-zinc-200 disabled:text-zinc-400 dark:disabled:text-zinc-600"
                                    disabled={true}
                                >
                                    <FaAngleLeft size={35} className="w-[25px] h-[25px] md:w-[35px] md:h-[35px]" />
                                </button>
                            </div>
                            <div>
                                <div className="transition-all delay-75 font-ubuntu text-[20px] md:text-[22px] text-zinc-800 dark:text-zinc-200">
                                    1 / 1000
                                </div>
                            </div>
                            <div>
                                <button 
                                    type="button" 
                                    title="Next Page" 
                                    className="transition-all delay-75 text-zinc-700 dark:text-zinc-200 disabled:text-zinc-400 dark:disabled:text-zinc-600"
                                    disabled={false}
                                >
                                    <FaAngleRight size={35} className="w-[25px] h-[25px] md:w-[35px] md:h-[35px]" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}