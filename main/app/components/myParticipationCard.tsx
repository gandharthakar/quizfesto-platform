'use client';

import Image from "next/image";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { PiExamFill } from "react-icons/pi";
import { RiQuestionFill } from "react-icons/ri";

interface MyPartCrd {
    quiz_title: string,
    quiz_cover_photo: string,
    quiz_display_time: string,
    quiz_total_questions: number | string,
    quiz_total_marks: number | string,
    quiz_estimate_time: string,
    quiz_time_taken_by_user: string,
    quiz_correct_question_attempted_by_user: string | number,
    user_score_of_this_quiz: string | number
}

function MyParticipationCard(props: MyPartCrd) {

    const { 
        quiz_title, 
        quiz_cover_photo, 
        quiz_display_time, 
        quiz_total_questions, 
        quiz_total_marks, 
        quiz_estimate_time, 
        quiz_time_taken_by_user, 
        quiz_correct_question_attempted_by_user, 
        user_score_of_this_quiz,
    } = props;

    const defaultImage = "https://placehold.co/1000x700/png";

    function getClassOfTimeTaken(qet: string, qttby: string) {
        let className = '';
        if(qttby < qet) {
            className = 'text-green-600';
        } else {
            if(qet === qttby) {
                className = '';
            } else {
                className = 'text-red-600';
            }
        }
        return className;
    }

    return (
        <>
            <div className="transition-all delay-75 border-[2px] border-solid p-[15px] border-zinc-300 bg-white hover:border-zinc-600 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:border-zinc-400">
                <div className="flex gap-x-[20px] gap-y-[10px] items-center flex-col md:flex-row">
                    <div className="w-full md:max-w-[200px]">
                        <Image src={quiz_cover_photo ? quiz_cover_photo : defaultImage} width={1000} height={700} className="w-full h-auto" alt="Photo" />
                    </div>
                    <div className="md:mr-auto w-full md:w-auto">
                        <div className="pb-[5px] md:pb-[2px]">
                            <h1 className="transition-all delay-75 font-ubuntu text-[20px] md:text-[22px] font-semibold text-zinc-700 dark:text-zinc-200">
                                {quiz_title}
                            </h1>
                        </div>
                        <div className="pb-[5px]">
                            <div className="flex flex-wrap gap-y-[5px] gap-x-[15px] items-center">
                                <div className="flex gap-x-[2px] md:gap-x-[3px] items-center">
                                    <MdOutlineAccessTimeFilled size={20} className="transition-all delay-75 w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-zinc-600 dark:text-zinc-300" />
                                    <h2 className="transition-all delay-75 font-ubuntu text-[16px] md:text-[18px] text-zinc-600 dark:text-zinc-300">
                                        {quiz_display_time}
                                    </h2>
                                </div>
                                <div className="flex gap-x-[2px] md:gap-x-[3px] items-center">
                                    <RiQuestionFill size={20} className="transition-all delay-75 w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-zinc-600 dark:text-zinc-300" />
                                    <h4 className="transition-all delay-75 font-ubuntu text-[16px] md:text-[18px] text-zinc-600 dark:text-zinc-300">
                                        {quiz_total_questions} Questions
                                    </h4>
                                </div>
                                <div className="flex gap-x-[2px] md:gap-x-[3px] items-center">
                                    <PiExamFill size={20} className="transition-all delay-75 w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-zinc-600 dark:text-zinc-300" />
                                    <h5 className="transition-all delay-75 font-ubuntu text-[16px] md:text-[18px] text-zinc-600 dark:text-zinc-300">
                                        Total Marks Is {quiz_total_marks}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="pb-[5px]">
                            <div className="flex gap-x-[2px] md:gap-x-[3px] items-center">
                                <MdOutlineAccessTimeFilled size={20} className="transition-all delay-75 w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-zinc-600 dark:text-zinc-300" />
                                <h3 className="transition-all delay-75 font-ubuntu text-[16px] md:text-[18px] text-zinc-600 dark:text-zinc-300">
                                    Time Taken : <span className={`${getClassOfTimeTaken(quiz_estimate_time, quiz_time_taken_by_user)}`}>{quiz_time_taken_by_user}</span> / {quiz_estimate_time}
                                </h3>
                            </div>
                        </div>
                        <div className="">
                            <h3 className="transition-all delay-75 font-ubuntu text-[16px] md:text-[18px] text-zinc-600 dark:text-zinc-300">
                                You Answered <span className="font-semibold">{quiz_correct_question_attempted_by_user}</span> questions correctly.
                            </h3>
                        </div>
                    </div>
                    <div className="md:min-w-[120px] w-full md:w-auto">
                        <div className="md:text-center">
                            <h5 className="transition-all delay-75 font-ubuntu text-[16px] md:text-[18px] text-zinc-900 dark:text-zinc-400">
                                Your Score
                            </h5>
                        </div>
                        <div className="md:text-center">
                            <h5 className="transition-all delay-75 font-ubuntu text-[18px] md:text-[22px] font-semibold text-zinc-900 dark:text-zinc-200">
                                {user_score_of_this_quiz} / {quiz_total_marks}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyParticipationCard;