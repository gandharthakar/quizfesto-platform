'use client';

import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrAdd } from "react-icons/gr";
import { IoMdCheckmark } from "react-icons/io";
import AdminListQuestionCard from "@/app/components/admin/adminListQuestionCard";
import CommonModal from "@/app/components/commonModal";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function Page() {

    const [cnqModal, setCnqModal] = useState<boolean>(false);
    
    const validationSchema = z.object({
        quiz_id: z.string({
			required_error: "Please enter quiz ID",
			invalid_type_error: "Quiz ID must be in string format."
		}).min(5, {message: "Quiz ID must be contains at least 5 characters."}),

        question_text: z.string({
			required_error: "Please enter question text",
			invalid_type_error: "Question text must be in string format."
		}).min(5, {message: "Question text must be contains at least 5 characters."}),

        question_marks: z.number({
			required_error: "Please enter question marks",
			invalid_type_error: "Question marks must be in string format."
		}).min(1, {message: "Question marks must be gretter than or is equal to 1."}),
    });

    type validationSchema = z.infer<typeof validationSchema>;

    const { register, handleSubmit, reset, formState: { errors }} = useForm<validationSchema>({
		resolver: zodResolver(validationSchema),
	});

    const handleFormSubmit: SubmitHandler<validationSchema> = (formdata) => {
        console.log(formdata);
        // reset();
    }

    return (
        <>
            <CommonModal
                modal_heading="Create New Question" 
                openState={cnqModal} 
                setOpenState={setCnqModal} 
                hide_modal_on_backdrop_click={true} 
                modal_max_width={500}
            >
                <div className="px-[15px] py-[25px]">
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="pb-[20px]">
                            <label 
                                htmlFor="cq-qzid" 
                                className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300"
                            >
                                Quiz ID
                            </label>
                            <input 
                                type="text" 
                                id="cq-qzid" 
                                className="ws-input-pwd-m1-v1" 
                                autoComplete="off" 
                                {...register("quiz_id")} 
                            />
                            {errors.quiz_id && (<div className="ws-input-error mt-[2px]">{errors.quiz_id.message}</div>)}
                        </div>
                        <div className="pb-[20px]">
                            <label 
                                htmlFor="cq-qzqtxt" 
                                className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300"
                            >
                                Question Text
                            </label>
                            <input 
                                type="text" 
                                id="cq-qzqtxt" 
                                className="ws-input-pwd-m1-v1" 
                                autoComplete="off" 
                                {...register("question_text")} 
                            />
                            {errors.question_text && (<div className="ws-input-error mt-[2px]">{errors.question_text.message}</div>)}
                        </div>
                        <div className="pb-[20px]">
                            <label 
                                htmlFor="cq-qzmrks" 
                                className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300"
                            >
                                Question Marks
                            </label>
                            <input 
                                type="text" 
                                id="cq-qzmrks" 
                                className="ws-input-pwd-m1-v1" 
                                autoComplete="off" 
                                {...register("question_marks", { valueAsNumber: true })} 
                            />
                            {errors.question_marks && (<div className="ws-input-error mt-[2px]">{errors.question_marks.message}</div>)}
                        </div>
                        <div className="text-right">
                            <button type="submit" title="Add Question" className="transition-all delay-75 inline-block concard px-[20px] md:px-[25px] py-[10px] md:py-[12px] text-center text-white font-noto_sans font-semibold text-[16px] md:text-[18px] hover:shadow-lg">
                                Add Question
                            </button>
                        </div>
                    </form>
                </div>
            </CommonModal>
            <div className="py-[25px]">
                <div className="pb-[25px]">
                    <div className="flex gap-x-[15px] gap-y-[10px] flex-wrap items-center">
                        <div className="mr-auto">
                            <Link 
                                href="#" 
                                title="Add New" 
                                className="transition-all delay-75 inline-block font-noto_sans font-semibold text-[14px] md:text-[16px] py-[8px] md:py-[10px] px-[10px] md:px-[15px] bg-theme-color-2 text-zinc-100 hover:bg-theme-color-2-hover-dark" 
                                onClick={() => setCnqModal(true)} 
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
                        <AdminListQuestionCard 
                            qestion_id="12345" 
                            quetion_text="This is question number 1 ?" 
                        />
                    </div>
                    <div className="pb-[20px] last:pb-0">
                        <AdminListQuestionCard 
                            qestion_id="24321" 
                            quetion_text="This is question number 2 ?" 
                        />
                    </div>
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
        </>
    )
}

export default Page;