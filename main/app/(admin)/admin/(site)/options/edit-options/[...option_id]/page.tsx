'use client';

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlinePlus } from "react-icons/hi";

interface quesOptsSet {
    option_id: string,
    option_text: string,
    correct_status: string,
}

let mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

function Page() {

    const [genOptionSet, setGenOptionSet] = useState<quesOptsSet[]>([
        {
            option_id: mongoObjectId(),
            option_text: "",
            correct_status: "",
        }
    ]);
    const [searchTerms, setSearchTerms] = useState<string[]>([]);

    const handleAddInputOptSet = () => {
        setGenOptionSet([...genOptionSet, {
            option_id: mongoObjectId(),
            option_text: "",
            correct_status: "",
        }]);
    };

    const handleChangeOptSet = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index:number) => {
        const value = event.target.value;
        const name = event.target.name;
        const onChangeValue = [...genOptionSet];
        if(name === "opt_id") {
            onChangeValue[index].option_id = value;
        }
        if(name === "opt_txt") {
            onChangeValue[index].option_text = value;
        }
        if(name === "opt_sts") {
            onChangeValue[index].correct_status = value;
        }
        setGenOptionSet(onChangeValue);
    };

    const handleDeleteInputOptSet = (index:number) => {
        const newArray = [...genOptionSet];
        newArray.splice(index, 1);
        setGenOptionSet(newArray);
    };

    const validationSchema = z.object({
        question_id: z.string({
			required_error: "Please enter question ID",
			invalid_type_error: "Question ID must be in string format."
		}).min(5, {message: "Question ID must be contains at least 5 characters."}),

        question_text: z.string({
			required_error: "Please enter question text",
			invalid_type_error: "Question text must be in string format."
		}).min(5, {message: "Question text must be contains at least 5 characters."}),

    });

    type validationSchema = z.infer<typeof validationSchema>;

    const { register, handleSubmit, reset, setValue, formState: { errors }} = useForm<validationSchema>({
		resolver: zodResolver(validationSchema),
	});

    const handleFormSubmit: SubmitHandler<validationSchema> = (formdata) => {
        console.log(formdata);
        // reset();
        let s_arr:string[] = [];
        genOptionSet.map((itms) => s_arr.push(itms.option_text));
        setSearchTerms(s_arr);
        // console.log(s_arr);
    }

    useEffect(() => {
        const tet_opts = [
            {
                option_id: mongoObjectId(),
                option_text: "Option 1",
                correct_status: "false",
            },
            {
                option_id: mongoObjectId(),
                option_text: "Option 2",
                correct_status: "true",
            },
            {
                option_id: mongoObjectId(),
                option_text: "Option 3",
                correct_status: "false",
            },
            {
                option_id: mongoObjectId(),
                option_text: "Option 4",
                correct_status: "false",
            },
        ];
        setGenOptionSet(tet_opts);
        setValue("question_id", "123456");
        setValue("question_text", "This is question text ?");
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
                            </div>
                        </div>
                        <div className="w-full xl-s2:flex-1 xl-s2:w-auto">
                            <div className="transition-all delay-75 border-[2px] border-solid p-[15px] md:p-[25px] border-zinc-300 bg-white dark:bg-zinc-800 dark:border-zinc-600">
                                <div className="pb-[20px]">
                                    {
                                        genOptionSet.map((itm, idx) => (
                                            <div className="flex items-end gap-x-[15px] pb-4 last:pb-0" key={idx}>
                                                <div className="flex-1">
                                                    <div className="w-full pb-[15px]">
                                                        <input 
                                                            type="hidden" 
                                                            className="ws-input-pwd-m1-v1" 
                                                            name="opt_id" 
                                                            placeholder="Option Text" 
                                                            autoComplete="off" 
                                                            value={itm.option_id}
                                                            onChange={(event) => handleChangeOptSet(event, idx)}
                                                        />
                                                        <input 
                                                            type="text" 
                                                            className="ws-input-pwd-m1-v1" 
                                                            name="opt_txt" 
                                                            placeholder="Option Text" 
                                                            autoComplete="off" 
                                                            value={itm.option_text}
                                                            onChange={(event) => handleChangeOptSet(event, idx)}
                                                        />
                                                    </div>
                                                    <div className="w-full">
                                                        <select 
                                                            className="ws-input-pwd-m1-v1" 
                                                            name="opt_sts" 
                                                            value={itm.correct_status}
                                                            onChange={(event) => handleChangeOptSet(event, idx)}
                                                        >
                                                            <option value="">- Select -</option>
                                                            <option value="true">True</option>
                                                            <option value="false">False</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="flex gap-x-[15px]">
                                                    {idx === genOptionSet.length - 1 && (
                                                        <button type="button" title="Add Term" onClick={() => handleAddInputOptSet()}>
                                                            <HiOutlinePlus size={20} className="transition-all w-[15px] h-[15px] md:w-[20px] md:h-[20px] text-theme-color-2" />
                                                        </button>
                                                    )}
                                                    {genOptionSet.length > 1 && (
                                                        <button type="button" title="Remove Term" onClick={() => handleDeleteInputOptSet(idx)}>
                                                            <RiDeleteBin6Line size={20} className="transition-all w-[15px] h-[15px] md:w-[20px] md:h-[20px] text-red-600 dark:text-red-400" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="text-right">
                                    <button type="submit" title="Create Set" className="transition-all delay-75 inline-block concard px-[20px] md:px-[25px] py-[10px] md:py-[12px] text-center text-white font-noto_sans font-semibold text-[16px] md:text-[18px] hover:shadow-lg">
                                        Create Set
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