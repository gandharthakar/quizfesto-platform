'use client';

import Image from "next/image";
import Link from "next/link";
import { RiQuestionFill } from "react-icons/ri";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaLock } from "react-icons/fa";

type quizCategoriesType = {
    cat_id: number | string,
    category_title: string,
    category_slug: string,
}

interface QuizCardPropsTypes {
    quiz_id: number | string,
    quiz_cover_photo?: string,
    quiz_title: string,
    quiz_categories?: quizCategoriesType[],
    quiz_summary: string,
    quiz_description?: string,
    number_of_question: number | string,
    quiz_duration: string,
    quiz_terms?: string,
    quiz_already_played_by_user?: boolean
}

export default function QuizCard(props: QuizCardPropsTypes) {

    const { 
        quiz_id, 
        quiz_cover_photo="", 
        quiz_title, 
        quiz_categories, 
        quiz_summary, 
        quiz_description, 
        number_of_question, 
        quiz_duration, 
        quiz_terms, 
        quiz_already_played_by_user=false 
    } = props;

    const defaultImage = "https://placehold.co/1000x700/png";
    const user_id = "1";

    return (
        <>
            <div className="transition-all delay-75 border-[2px] border-solid p-[15px] border-zinc-300 bg-white hover:border-zinc-600 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:border-zinc-400">
                <div className="flex flex-col gap-y-[15px] min-h-[100%]">
                    <div className="w-full">
                        <div className="pb-[20px]">
                            <Link href={`/view-quiz-details/${quiz_id}`} title={quiz_title}>
                                <Image src={quiz_cover_photo ? quiz_cover_photo : defaultImage} alt="photo" width={1000} height={700} className="w-full h-auto" priority={true} />
                            </Link>
                        </div>
                        {
                            quiz_categories?.length ? 
                            (
                                <div className="pb-[10px]">
                                    <ul className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                                        {
                                            quiz_categories.map((cat) => (
                                                <li key={cat.cat_id}>
                                                    <Link 
                                                        href={`/view-category/${cat.category_slug}`} 
                                                        title={cat.category_title}
                                                        className="transition-all delay-75 inline-block concard text-white font-semibold font-ubuntu text-[12px] md:text-[16px] px-[10px] md:px-[15px] py-[4px] md:py-[6px] rounded-full"
                                                    >
                                                        {cat.category_title}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            ) 
                            : 
                            (
                                <>
                                    <div className="pb-[10px]">
                                        <div className="transition-all delay-75 inline-block concard text-white font-semibold font-ubuntu text-[12px] md:text-[16px] px-[10px] py-[4px] md:px-[15px] md:py-[6px] rounded-full">
                                            Uncategorized
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        <div className="pb-[5px]">
                            <h1 className="transition-all delay-75 font-noto_sans font-bold text-[20px] md:text-[22px] text-zinc-800 dark:text-zinc-200">
                                <Link href={`/view-quiz-details/${quiz_id}`} title={quiz_title}>
                                    {quiz_title}
                                </Link>
                            </h1>
                        </div>
                        <div className="pb-[15px]">
                            <p className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] font-normal text-zinc-800 dark:text-zinc-300">
                                {quiz_summary}
                            </p>
                        </div>
                        <div className="pb-[15px]">
                            <div className="flex flex-wrap gap-y-[5px] gap-x-[15px] items-center">
                                <div className="flex gap-x-[5px] items-center">
                                    <MdOutlineAccessTimeFilled size={20} className="transition-all delay-75 w-[15px] h-[15px] md:w-[20px] md:h-[20px] text-zinc-600 dark:text-zinc-300" />
                                    <h2 className="transition-all delay-75 font-ubuntu text-[12] md:text-[14] text-zinc-600 dark:text-zinc-300">
                                        {quiz_duration}
                                    </h2>
                                </div>
                                <div className="flex gap-x-[5px] items-center">
                                    <RiQuestionFill size={20} className="transition-all delay-75 w-[15px] h-[15px] md:w-[20px] md:h-[20px] text-zinc-600 dark:text-zinc-300" />
                                    <h2 className="transition-all delay-75 font-ubuntu text-[12] md:text-[14] text-zinc-600 dark:text-zinc-300">
                                        {number_of_question} {Number(number_of_question) > 1 || !["1", "0"].includes(number_of_question.toString()) ? ('Questions') : ("question")}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto w-full">
                        <div className="flex gap-x-[15px] justify-between items-center">
                            <div className="transition-all delay-75 font-noto_sans text-[12px] md:text-[12px] text-zinc-400">
                                T & C Applied.
                            </div>
                            <div>
                                {
                                    quiz_already_played_by_user ? 
                                    (
                                        <div className="flex gap-x-[5px] items-center">
                                            <FaLock size={18} className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] text-theme-color-2" />
                                            <div className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-700 dark:text-zinc-300">
                                                Locked
                                            </div>
                                        </div>
                                    ) 
                                    : 
                                    (
                                        <Link href={`/play-quiz/${quiz_id}/${user_id}`} title="Participate" className="transition-all delay-75 inline-block px-[15px] py-[6px] md:px-[25px] md:py-[8px] font-ubuntu text-[16px] md:text-[18px] text-white bg-theme-color-1 hover:bg-theme-color-1-hover-dark">
                                            Participate
                                        </Link>
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}