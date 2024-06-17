'use client';

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

function Page() {

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

    const { register, handleSubmit, reset, setValue, formState: { errors }} = useForm<validationSchema>({
		resolver: zodResolver(validationSchema),
	});

    const handleFormSubmit: SubmitHandler<validationSchema> = (formdata) => {
        console.log(formdata);
        // reset();
    }

    useEffect(() => {
        setValue("quiz_id", "12345");
        setValue("question_text", "This is question text ?");
        setValue("question_marks", 2);
    }, []);

    return (
        <>
            <div className="py-[25px]">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="flex gap-[20px] items-start flex-col xl-s2:flex-row-reverse">
                        <div className="w-full xl-s2:flex-1 xl-s2:w-auto">
                            <div className="transition-all delay-75 border-[2px] border-solid p-[15px] md:p-[25px] border-zinc-300 bg-white dark:bg-zinc-800 dark:border-zinc-600">
                                <div className="pb-[20px]">
                                    <label 
                                        htmlFor="cq-qzid" 
                                        className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300"
                                    >
                                        Quiz ID <span className="text-red-500">*</span>
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
                                        Question Text <span className="text-red-500">*</span>
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
                                        Question Marks <span className="text-red-500">*</span>
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
                                    <button type="submit" title="Edit Question" className="transition-all delay-75 inline-block concard px-[20px] md:px-[25px] py-[10px] md:py-[12px] text-center text-white font-noto_sans font-semibold text-[16px] md:text-[18px] hover:shadow-lg">
                                        Edit Question
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Page;