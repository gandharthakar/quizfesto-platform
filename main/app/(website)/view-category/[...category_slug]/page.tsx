import QuizCard from "@/app/components/quizCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { RiSearch2Line } from "react-icons/ri";

function Page() {

    const defaultImage = "https://placehold.co/1000x700/png";

    return (
        <>
            <section className="transition-all delay-75 pt-[100px] md:pt-[150px] pb-[50px] px-[15px] bg-zinc-100 dark:bg-zinc-900">
                <div className="site-container">
                    <div className="text-center">
                        <h1 className="transition-all delay-75 inline-block font-ubuntu text-[20px] md:text-[30px] break-words font-semibold text-zinc-900 dark:text-zinc-200">
                            Category Name
                        </h1>
                    </div>

                    <div className="pt-[20px] md:max-w-[350px] mx-auto">
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
                </div>
            </section>

            <section className="transition-all delay-75 py-[50px] px-[15px] bg-zinc-200 dark:bg-zinc-800">
                <div className="site-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <QuizCard 
                            quiz_id={"658"} 
                            quiz_title={"This is Quiz 1"} 
                            quiz_cover_photo={defaultImage} 
                            quiz_categories={[
                                {
                                    cat_id: 33,
                                    category_title: "Tax",
                                    category_slug: "tax"
                                },
                                {
                                    cat_id: 34,
                                    category_title: "New Tax Regim",
                                    category_slug: "new-tax-regim"
                                }
                            ]} 
                            quiz_summary={"This is quiz summary of quiz 1"} 
                            number_of_question={20} 
                            quiz_duration={"5 Mins"}
                            quiz_already_played_by_user={false}
                        />
                        <QuizCard 
                            quiz_id={"722"} 
                            quiz_title={"This is Quiz 2"} 
                            quiz_cover_photo={defaultImage} 
                            quiz_categories={[
                                {
                                    cat_id: 45,
                                    category_title: "Economics",
                                    category_slug: "economics"
                                },
                                {
                                    cat_id: 84,
                                    category_title: "Finance",
                                    category_slug: "finance"
                                },
                                {
                                    cat_id: 84,
                                    category_title: "GST",
                                    category_slug: "gst"
                                }
                            ]} 
                            quiz_summary={"This is quiz summary of quiz 2"} 
                            number_of_question={50} 
                            quiz_duration={"10 Mins"}
                            quiz_already_played_by_user={true}
                        />
                        <QuizCard 
                            quiz_id={"365"} 
                            quiz_title={"This is Quiz 3"} 
                            quiz_cover_photo={defaultImage} 
                            quiz_categories={[
                                {
                                    cat_id: 12,
                                    category_title: "Tech",
                                    category_slug: "tech"
                                }
                            ]} 
                            quiz_summary={"This is quiz summary of quiz 3"} 
                            number_of_question={5} 
                            quiz_duration={"2 Mins"}
                            quiz_already_played_by_user={true}
                        />
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
                                    1 / 3
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
            </section>
        </>
    )
}

export default Page;