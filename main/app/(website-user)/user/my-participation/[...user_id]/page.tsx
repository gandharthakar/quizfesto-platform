import MyParticipationCard from "@/app/components/myParticipationCard";
import { dump_my_participation } from "@/app/constant/datafaker";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Page() {

    // const defaultImage = "https://placehold.co/1000x700/png";

    return (
        <>
            <section className="py-[25px]">
                <div>
                    {
                        dump_my_participation.map((itm) => (
                            <div className="pb-[20px] last:pb-0 hidden" key={itm.id}>
                                <MyParticipationCard 
                                    quiz_title={itm.quiz_title} 
                                    quiz_cover_photo={itm.quiz_cover_photo} 
                                    quiz_display_time={itm.quiz_display_time} 
                                    quiz_total_questions={itm.quiz_total_questions} 
                                    quiz_total_marks={itm.quiz_total_marks} 
                                    quiz_estimate_time={itm.quiz_estimate_time} 
                                    quiz_time_taken_by_user={itm.quiz_time_taken_by_user} 
                                    quiz_correct_question_attempted_by_user={itm.quiz_correct_question_attempted_by_user} 
                                    user_score_of_this_quiz={itm.user_score_of_this_quiz} 
                                />
                            </div>
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
                                1 / 1
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
            </section>
        </>
    )
}