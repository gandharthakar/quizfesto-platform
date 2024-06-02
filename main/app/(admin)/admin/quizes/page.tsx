
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrAdd } from "react-icons/gr";
import AdminListQuizCard from "@/app/components/admin/adminListQuizCard";
import { IoMdCheckmark } from "react-icons/io";

function Page() {
    return (
        <>
            <div className="py-[25px]">
                <div className="pb-[25px]">
                    <div className="flex gap-x-[15px] gap-y-[10px] flex-wrap items-center">
                        <div className="mr-auto">
                            <Link 
                                href="/admin/quizes/create-new-quiz" 
                                title="Add New" 
                                className="transition-all delay-75 inline-block font-noto_sans font-semibold text-[14px] md:text-[16px] py-[8px] md:py-[10px] px-[10px] md:px-[15px] bg-theme-color-2 text-zinc-100 hover:bg-theme-color-2-hover-dark"
                            >
                                <div className="flex gap-x-[5px] items-center">
                                    <GrAdd size={20} className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
                                    <div className="hidden md:block">Add New</div>
                                </div>
                            </Link>
                        </div>
                        <div className="alqc-chrb">
                            <input 
                                type="checkbox" 
                                id="selall" 
                                name="all_quiz" 
                                className="input-chrb"  
                                value="?" 
                            />
                            <label htmlFor="selall" className="label">
                                <div>
                                    <div className="squere-box">
                                        <IoMdCheckmark size={18} className="svg-icon" />
                                    </div>
                                </div>
                                <div className="label-text">
                                    Select All
                                </div>
                            </label>
                        </div>
                        <button 
                            type="button" 
                            title="Delete All" 
                            className="transition-all delay-75 inline-block font-noto_sans font-semibold text-[14px] md:text-[16px] py-[8px] md:py-[10px] px-[10px] md:px-[15px] bg-red-600 text-zinc-100 hover:bg-red-700"
                        >
                            <div className="flex gap-x-[5px] items-center">
                                <RiDeleteBin6Line size={20} className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
                                <div className="hidden md:block">Delete All</div>
                            </div>
                        </button>
                    </div>
                </div>

                <div>
                    <div className="pb-[20px] last:pb-0">
                        <AdminListQuizCard 
                            quizid="1" 
                            quiz_title="#1 This is the testing quiz title for demo purpose." 
                            quiz_publish_status="draft"
                        />
                    </div>
                    <div className="pb-[20px] last:pb-0">
                        <AdminListQuizCard 
                            quizid="2" 
                            quiz_title="#2 This is the testing quiz title for demo purpose." 
                            quiz_publish_status="published"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;