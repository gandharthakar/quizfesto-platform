'use client';

import QuizPrizes from "@/app/components/quizPrizes";
import { dump_quizzes_list } from "@/app/constant/datafaker";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { RiQuestionFill } from "react-icons/ri";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

type quizCategoriesType = {
    cat_id: number | string,
    category_title: string,
    category_slug: string,
}

export default function Page() {

    const params = useParams();
    const qz_id = params.quiz_id[0];
    const data = dump_quizzes_list.filter((dt) => dt.quiz_id.toString() === qz_id);
    let defaultImage = "https://placehold.co/1000x700/png";

    const prepTermsArr = (data:string) => {
        let strArr:string[] = data.split("</p>,").map((itm) => itm.replace(/(<p[^>]+?>|<p>|<\/p>)/img, ""));
        return strArr;
    }

    const [quizCats, setQuizCats] = useState<quizCategoriesType[]>(data[0].quiz_categories);
    const [quizTitle, setQuizTitle] = useState<string>(data[0].quiz_title);
    const [quizSummary, setQuizSummary] = useState<string>(data[0].quiz_summary);
    const [quizCover, setQuizCover] = useState<string>(data[0].quiz_cover_photo);
    const [quizNOQ, setQuizNOQ] = useState<string>(data[0].number_of_question);
    const [quizDuration, setQuizDuration] = useState<string>(data[0].quiz_duration);
    const [quizDescription, setQuizDescription] = useState<string>(data[0].quiz_description);
    const [quizTerms, setQuizTerms] = useState<string[]>(prepTermsArr(data[0].quiz_terms));

    return (
        <>
            <section className="transition-all delay-75 px-[15px] pt-[80px] pb-[30px] lg:pt-[180px] lg:pb-[50px] bg-zinc-100 dark:bg-zinc-900">
                <div className="site-container">
                    <div className="flex gap-x-[35px] flex-col lg:flex-row">
                        <div className="w-full lg:flex-1">
                            {
                                quizCats.length ? 
                                (
                                    <>
                                        <div className="pb-[15px]">
                                            <ul className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                                                {
                                                    quizCats.map((cat) => (
                                                        <li key={cat.cat_id}>
                                                            <Link 
                                                                href={`/view-category/${cat.cat_id}`} 
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
                                    </>
                                ) 
                                : 
                                (
                                    <>
                                        <div className="pb-[15px]">
                                            <div className="transition-all delay-75 inline-block concard text-white font-semibold font-ubuntu text-[12px] md:text-[16px] px-[10px] py-[4px] md:px-[15px] md:py-[6px] rounded-full">
                                                Uncategorized
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            <div className="pb-[5px]">
                                <h1 className="transition-all delay-75 font-noto_sans font-bold text-[20px] md:text-[25px] text-zinc-800 dark:text-zinc-200">
                                    {quizTitle}
                                </h1>
                            </div>
                            <div className="pb-[15px]">
                                <p className="transition-all delay-75 font-noto_sans text-[16px] md:text-[20px] text-zinc-700 dark:text-zinc-400">
                                    {quizSummary}
                                </p>
                            </div>
                            <div className="pb-[25px] lg:hidden">
                                <div className="flex flex-wrap gap-y-[5px] gap-x-[15px] items-center">
                                    <div className="flex gap-x-[5px] md:gap-x-[10px] items-center">
                                        <MdOutlineAccessTimeFilled size={30} className="transition-all delay-75 w-[20px] h-[20px] md:w-[30px] md:h-[30px] text-zinc-600 dark:text-zinc-300" />
                                        <h2 className="transition-all delay-75 font-ubuntu text-[16px] md:text-[25px] text-zinc-600 dark:text-zinc-300">
                                            {quizDuration}
                                        </h2>
                                    </div>
                                    <div className="flex gap-x-[5px] md:gap-x-[10px] items-center">
                                        <RiQuestionFill size={30} className="transition-all delay-75 w-[20px] h-[20px] md:w-[30px] md:h-[30px] text-zinc-600 dark:text-zinc-300" />
                                        <h2 className="transition-all delay-75 font-ubuntu text-[16px] md:text-[25px] text-zinc-600 dark:text-zinc-300">
                                            {quizNOQ} {Number(quizNOQ) > 1 || !["1", "0"].includes(quizNOQ) ? ('Questions') : ("question")}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-[25px]">
                                <Image src={quizCover ? quizCover : defaultImage} width={1000} height={700} className="w-full h-auto" alt="photo" />
                            </div>
                            <div className="pb-[25px]">
                                <div className="pb-[3px] md:pb-[5px]">
                                    <h2 className="transition-all delay-75 font-noto_sans text-[18px] md:text-[25px] font-bold text-zinc-800 dark:text-zinc-200">
                                        About The Quiz
                                    </h2>
                                </div>
                                <div>
                                    <p className="transition-all delay-75 font-noto_sans text-[16px] md:text-[20px] text-zinc-600 dark:text-zinc-400">
                                        {quizDescription}
                                    </p>
                                </div>
                            </div>
                            <div className="pb-[25px] lg:pb-[0]">
                                <div className="pb-[15px]">
                                    <h2 className="transition-all delay-75 font-noto_sans text-[18px] md:text-[25px] font-bold text-zinc-800 dark:text-zinc-200">
                                        Quiz Terms & Conditions
                                    </h2>
                                </div>
                                <div>
                                    {
                                        quizTerms.length ? 
                                        (
                                            <>
                                                <ul className="flex flex-col gap-y-[15px] list-disc pl-[22px] md:pl-[30px]">
                                                    {
                                                        quizTerms.map((trm, idx) => (
                                                            <li key={idx} className="transition-all delay-75 font-noto_sans text-[16px] md:text-[20px] text-zinc-600 dark:text-zinc-400">
                                                                {trm}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </>
                                        ) 
                                        : 
                                        ('')
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-[350px] hidden lg:block">
                            <div className="lg:sticky lg:top-[87px]">
                                <div className="transition-all delay-75 bg-white border-[2px] border-solid border-zinc-700 p-[20px] dark:bg-zinc-800 dark:border-zinc-700">
                                    <div className="hidden lg:block pb-[15px]">
                                        <div className="flex gap-x-[5px] md:gap-x-[10px] items-center">
                                            <MdOutlineAccessTimeFilled size={30} className="transition-all delay-75 w-[20px] h-[20px] md:w-[30px] md:h-[30px] text-zinc-600 dark:text-zinc-300" />
                                            <h2 className="transition-all delay-75 font-ubuntu text-[16px] md:text-[25px] text-zinc-600 dark:text-zinc-300">
                                                {quizDuration}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="hidden lg:block pb-[20px]">
                                        <div className="flex gap-x-[5px] md:gap-x-[10px] items-center">
                                            <RiQuestionFill size={30} className="transition-all delay-75 w-[20px] h-[20px] md:w-[30px] md:h-[30px] text-zinc-600 dark:text-zinc-300" />
                                            <h2 className="transition-all delay-75 font-ubuntu text-[16px] md:text-[25px] text-zinc-600 dark:text-zinc-300">
                                                {quizNOQ} {Number(quizNOQ) > 1 || !["1", "0"].includes(quizNOQ) ? ('Questions') : ("question")}
                                            </h2>
                                        </div>
                                    </div>
                                    <div>
                                        <Link href={`/play-quiz/${qz_id}`} title="Participate" className="transition-all delay-75 block w-full text-center px-[15px] py-[8px] md:px-[25px] md:py-[10px] font-ubuntu text-[18px] md:text-[20px] text-white bg-theme-color-1 hover:bg-theme-color-1-hover-dark">
                                            Participate
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <QuizPrizes />
        </>
    )
}