'use client';

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

function Page() {

    const params = useParams();
    const option_id = params.option_id[0];
    
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const validationSchema = z.object({
        question_id: z.string({
			required_error: "Please enter question ID",
			invalid_type_error: "Question ID must be in string format."
		}).min(5, {message: "Question ID must be contains at least 5 characters."}),

        options: z.string({
			required_error: "Please enter options.",
			invalid_type_error: "Options text must be in string format."
		}).min(5, {message: "Options text must be contains at least 5 characters."}),

        correct_option: z.string({
			required_error: "Please enter correct option.",
			invalid_type_error: "Correct option text must be in string format."
		}).min(1, {message: "Correct option text must be contains at least 1 characters."})
    });

    type validationSchema = z.infer<typeof validationSchema>;

    const { register, handleSubmit, setValue, formState: { errors }} = useForm<validationSchema>({
		resolver: zodResolver(validationSchema),
	});

    const handleFormSubmit: SubmitHandler<validationSchema> = async (formdata) => {
        setIsLoading(true);
        let baseURI = window.location.origin;
        const resp = await fetch(`${baseURI}/api/admin/options/crud/update`, {
            method: "POST",
            body: JSON.stringify({
                option_id,
                options: formdata.options.split(", "),
                correct_option: formdata.correct_option,
                question_id: formdata.question_id
            })
        });
        const body = await resp.json();
        if(body.success) {
            Swal.fire({
                title: "Success!",
                text: body.message,
                icon: "success",
                timer: 3000
            });
            setIsLoading(false);
        } else {
            Swal.fire({
                title: "Error!",
                text: body.message,
                icon: "error",
                timer: 3000
            });
            setIsLoading(false);
        }
    }

    const getOption = async () => {
        let baseURI = window.location.origin;
        const resp = await fetch(`${baseURI}/api/admin/options/crud/read`, {
            method: "POST",
            body: JSON.stringify({
                option_id
            }),
            cache: 'no-store',
            next: { revalidate: 60 }
        });
        const body = await resp.json();
        if(body.success) {
            setValue("question_id", body.option.questionid);
            setValue("options", body.option.options.join(", "));
            setValue("correct_option", body.option.correct_option);
            setIsLoading(false);
        } else { 
            Swal.fire({
                title: "Error!",
                text: body.message,
                icon: "error",
                timer: 3000
            });
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getOption();
    //eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="py-[25px]">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="flex gap-[20px] items-start flex-col xl-s2:flex-row">
                        <div className="w-full xl-s2:flex-1 xl-s2:w-auto">
                            <div className="transition-all delay-75 border-[2px] border-solid p-[15px] md:p-[25px] border-zinc-300 bg-white dark:bg-zinc-800 dark:border-zinc-600">
                                <div className="pb-[20px]">
                                    <label 
                                        htmlFor="cq-quid" 
                                        className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300"
                                    >
                                        Question ID <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="cq-quid" 
                                        className="ws-input-pwd-m1-v1" 
                                        autoComplete="off" 
                                        {...register("question_id")} 
                                    />
                                    {errors.question_id && (<div className="ws-input-error mt-[2px]">{errors.question_id.message}</div>)}
                                </div>
                                <div className="pb-[20px]">
                                    <label 
                                        htmlFor="cq-qzqtxt" 
                                        className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300"
                                    >
                                        Options <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="cq-qzqtxt" 
                                        className="ws-input-pwd-m1-v1" 
                                        autoComplete="off" 
                                        {...register("options")} 
                                    />
                                    {errors.options && (<div className="ws-input-error mt-[2px]">{errors.options.message}</div>)}
                                </div>
                                <div className="pb-[20px]">
                                    <label 
                                        htmlFor="cq-qzqtxt" 
                                        className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300"
                                    >
                                        Correct Option <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="cq-qzqtxt" 
                                        className="ws-input-pwd-m1-v1" 
                                        autoComplete="off" 
                                        {...register("correct_option")} 
                                    />
                                    {errors.correct_option && (<div className="ws-input-error mt-[2px]">{errors.correct_option.message}</div>)}
                                </div>
                                <div className="text-right">
                                    {
                                        isLoading ? 
                                        (<div className="spinner size-1"></div>) 
                                        : 
                                        (
                                            <button type="submit" title="Update Options" className="transition-all delay-75 inline-block concard px-[20px] md:px-[25px] py-[10px] md:py-[12px] text-center text-white font-noto_sans font-semibold text-[16px] md:text-[18px] hover:shadow-lg">
                                                Update Options
                                            </button>
                                        )
                                    }
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