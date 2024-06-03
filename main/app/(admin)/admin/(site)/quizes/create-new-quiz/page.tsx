'use client';

import { useState } from "react";
import Select from "react-tailwindcss-select";
import { FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { HiOutlinePlus } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";

interface TwSelInt {
    value: string,
    label: string,
}

function Page() {

    const defaultImage = "https://placehold.co/1000x700/png";
    const [quizCats, setQuizCats] = useState<TwSelInt[]>([]);
    const [alreadyHaveFeImg, setAlreadyHaveFeImg] = useState<boolean>(false);
    interface quizTrms {
        quiz_terms: string,
    }
    const [quizTerms, setQuizTerms] = useState<quizTrms[]>([{ quiz_terms: '' }]);
    const [quizAboutContent, setQuizAboutContent] = useState<string>('');

    const [fileExt, setFileExt] = useState<string>('');
    const [filSize, setFileSize] = useState<boolean>(false);
    const [fileDimensions, setFileDimensions] = useState<boolean>(false);

    const handleChangeSelect = (value:any) => {
        setQuizCats(value);
    };

    const handleAddInputQuizTerms = () => {
        setQuizTerms([...quizTerms, {quiz_terms: ''}]);
    };

    const handleChangeQuizTerms = (event: React.ChangeEvent<HTMLInputElement>, index:number) => {
        const value = event.target.value;
        const onChangeValue = [...quizTerms];
        onChangeValue[index].quiz_terms = value;
        setQuizTerms(onChangeValue);
    };

    const handleDeleteInputQuizTerms = (index:number) => {
        const newArray = [...quizTerms];
        newArray.splice(index, 1);
        setQuizTerms(newArray);
    };

    const options: TwSelInt[] = [
        { value: "fox", label: "🦊 Fox" },
        { value: "Butterfly", label: "🦋 Butterfly" },
        { value: "Honeybee", label: "🐝 Honeybee" }
    ];

    const validationSchema = z.object({
        quiz_main_title: z.string({
			required_error: "Please enter quiz title",
			invalid_type_error: "Quiz title must be in string format."
		}).min(10, {message: "Quiz title must be contains at least 10 characters."}),

        quiz_summ: z.string({
			required_error: "Please enter quiz summary",
			invalid_type_error: "Quiz summary must be in string format."
		}).min(15, {message: "Quiz summary must be contains at least 15 characters."}),

        quiz_disp_time: z.string({
			required_error: "Please enter quiz display time",
			invalid_type_error: "Quiz display time must be in string format."
		}).min(5, {message: "Quiz display time must be contains at least 5 characters."}),

        quiz_est_time: z.string({
			required_error: "Please enter quiz estimate time",
			invalid_type_error: "Quiz estimate time must be in string format."
		}).min(8, {message: "Quiz estimate time must be contains at least 8 characters."})
        .max(8, {message: "Quiz estimate time must be contains at least 8 characters."}),

        quiz_total_marks: z.number({
            required_error: "Please enter quiz total marks",
			invalid_type_error: "Quiz total marks be in integer (number) format."
        }),

        quiz_total_ques: z.number({
            required_error: "Please enter quiz total questions",
			invalid_type_error: "Quiz total questions be in integer (number) format."
        }),

        quiz_sts: z.string({
			required_error: "Please select quiz status",
			invalid_type_error: "Quiz status must be in string format."
		}).min(3, {message: "Quiz status must be contains at least 3 characters."}),
    });

    type validationSchema = z.infer<typeof validationSchema>;

    const { register, handleSubmit, reset, formState: { errors }} = useForm<validationSchema>({
		resolver: zodResolver(validationSchema),
	});

    const convertBase64 = (file:any) => {
        return new Promise<string>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                typeof fileReader.result === "string" ?
                resolve(fileReader.result)
                : reject("Unexpected type received from FileReader");
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleFormSubmit: SubmitHandler<validationSchema> = (formdata) => {
        // console.log(formdata);

        const terms: string[] = [];
        // recins.map((item) => ingradients.push(item.recipe_ingredient));
        quizTerms.map((item) => {
            if(item.quiz_terms !== '') {
                return terms.push(item.quiz_terms)
            } else {
                return [];
            }
        });
        
        const prepData = {
            quiz_title: formdata.quiz_main_title,
            quiz_categories: quizCats && quizCats.length > 0 ? quizCats.map(item => item.value) : [],
            quiz_cover_image: '',
            quiz_display_time: formdata.quiz_disp_time,
            quiz_estimate_time: formdata.quiz_est_time,
            quiz_total_questions: formdata.quiz_total_ques,
            quiz_total_marks: formdata.quiz_total_marks,
            quiz_status: formdata.quiz_sts,
            quiz_about_content: quizAboutContent,
            quiz_terms: terms,
        }
        console.log(prepData);
        // reset();
    }

    return (
        <>
            <div className="py-[25px]">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="flex gap-[20px] items-start flex-col xl-s2:flex-row-reverse">
                        <div className="w-full xl-s2:flex-1 xl-s2:w-auto">
                            <div className="transition-all delay-75 border-[2px] border-solid p-[15px] md:p-[25px] border-zinc-300 bg-white dark:bg-zinc-800 dark:border-zinc-600">
                                <div className="pb-[20px]">
                                    <label 
                                        className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300" 
                                        htmlFor="cq-qttl"
                                    >
                                        Quiz Title <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="cq-qttl" 
                                        className="ws-input-pwd-m1-v1" 
                                        autoComplete="off" 
                                        {...register("quiz_main_title")} 
                                    />
                                    {errors.quiz_main_title && (<div className="ws-input-error mt-[2px]">{errors.quiz_main_title.message}</div>)}
                                </div>
                                <div className="pb-[20px]">
                                    <label 
                                        className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300" 
                                        htmlFor="cq-qsumm"
                                    >
                                        Quiz Summary <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="cq-qsumm" 
                                        className="ws-input-pwd-m1-v1" 
                                        autoComplete="off" 
                                        {...register("quiz_summ")} 
                                    />
                                    {errors.quiz_summ && (<div className="ws-input-error mt-[2px]">{errors.quiz_summ.message}</div>)}
                                </div>
                                <div className="pb-[20px]">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
                                        <div>
                                            <label 
                                                className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300" 
                                                htmlFor="cq-qdisptm"
                                            >
                                                Quiz Display Time <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                id="cq-qdisptm" 
                                                className="ws-input-pwd-m1-v1" 
                                                autoComplete="off" 
                                                {...register("quiz_disp_time")} 
                                            />
                                            {errors.quiz_disp_time && (<div className="ws-input-error mt-[2px]">{errors.quiz_disp_time.message}</div>)}
                                        </div>
                                        <div>
                                            <label 
                                                className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300" 
                                                htmlFor="cq-qesttm"
                                            >
                                                Quiz Estimated Time <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                id="cq-qesttm" 
                                                className="ws-input-pwd-m1-v1" 
                                                autoComplete="off" 
                                                {...register("quiz_est_time")} 
                                            />
                                            {errors.quiz_est_time && (<div className="ws-input-error mt-[2px]">{errors.quiz_est_time.message}</div>)}
                                        </div>
                                        <div>
                                            <label 
                                                className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300" 
                                                htmlFor="cq-qtotqs"
                                            >
                                                Quiz Total Questions <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                id="cq-qtotqs" 
                                                className="ws-input-pwd-m1-v1" 
                                                autoComplete="off" 
                                                {...register("quiz_total_ques", {valueAsNumber: true})} 
                                            />
                                            {errors.quiz_total_ques && (<div className="ws-input-error mt-[2px]">{errors.quiz_total_ques.message}</div>)}
                                        </div>
                                        <div>
                                            <label 
                                                className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300" 
                                                htmlFor="cq-qttlmrks"
                                            >
                                                Quiz Total Marks <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                id="cq-qttlmrks" 
                                                className="ws-input-pwd-m1-v1" 
                                                autoComplete="off" 
                                                {...register("quiz_total_marks", {valueAsNumber: true})} 
                                            />
                                            {errors.quiz_total_marks && (<div className="ws-input-error mt-[2px]">{errors.quiz_total_marks.message}</div>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-[20px]">
                                    <label 
                                        className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300" 
                                        htmlFor="cq-qsts"
                                    >
                                        Quiz Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="cq-qsts" 
                                        className="ws-input-pwd-m1-v1" 
                                        {...register("quiz_sts")} 
                                    >
                                        <option value="">- Select -</option>
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                    {errors.quiz_sts && (<div className="ws-input-error mt-[2px]">{errors.quiz_sts.message}</div>)}
                                </div>
                                <div className="pb-[20px]">
                                    <label 
                                        className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300" 
                                        htmlFor="cq-abtqz"
                                    >
                                        About Quiz
                                    </label>
                                    <textarea 
                                        id="cq-abtqz" 
                                        className="ws-input-pwd-m1-v1" 
                                        autoComplete="off" 
                                        rows={5} 
                                        value={quizAboutContent}
                                        onChange={(e) => setQuizAboutContent(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="pb-[20px]">
                                    <label 
                                        className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300" 
                                        htmlFor="cq-qztrms"
                                    >
                                        Quiz Terms & Conditions
                                    </label>
                                    {
                                        quizTerms.map((items, index) => (
                                            <div className="flex items-center gap-x-[15px] pb-4 last:pb-0" key={index}>
                                                <div className="flex-1">
                                                    <input 
                                                        type="text" 
                                                        name="quiz_terms" 
                                                        className="ws-input-pwd-m1-v1" 
                                                        autoComplete="off"
                                                        value={items.quiz_terms}
                                                        onChange={(event) => handleChangeQuizTerms(event, index)}
                                                    />
                                                </div>
                                                <div className="flex gap-x-[15px]">
                                                    {index === quizTerms.length - 1 && (
                                                        <button type="button" title="Add Term" onClick={() => handleAddInputQuizTerms()}>
                                                            <HiOutlinePlus size={20} className="transition-all w-[15px] h-[15px] md:w-[20px] md:h-[20px] text-theme-color-2" />
                                                        </button>
                                                    )}
                                                    {quizTerms.length > 1 && (
                                                        <button type="button" title="Remove Term" onClick={() => handleDeleteInputQuizTerms(0)}>
                                                            <RiDeleteBin6Line size={20} className="transition-all w-[15px] h-[15px] md:w-[20px] md:h-[20px] text-red-600 dark:text-red-400" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="w-full xl-s2:min-w-[400px] xl-s2:max-w-[400px] xl-1:min-w-[450px] xl-1:max-w-[450px] md:w-auto">
                            <div className="transition-all sticky top-[0px] delay-75 border-[2px] border-solid p-[15px] md:p-[25px] border-zinc-300 bg-white dark:bg-zinc-800 dark:border-zinc-600">
                                <div className="pb-[20px]">
                                    <label 
                                        className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300"
                                    >
                                        Featured Image
                                    </label>
                                    <div>
                                        {
                                            alreadyHaveFeImg ? 
                                            (
                                                <>
                                                    <div className="pb-[20px]">
                                                        <Image src={defaultImage} width={1000} height={700} className="w-full h-auto" alt="photo" priority={true} />
                                                    </div>
                                                    <div className="flex gap-x-[15px] justify-end items-center">
                                                        <button type="button" title="Remove" className="transition-all delay-75 font-ubuntu text-[14px] text-red-600 underline dark:text-red-400">
                                                            <div className="flex gap-x-[5px] items-center">
                                                                <FaRegTrashAlt size={16} />
                                                                <div>Remove</div>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </>
                                            ) 
                                            : 
                                            (
                                                <>
                                                    <div className="pb-[20px]">
                                                        <Image src={defaultImage} width={1000} height={700} className="w-full h-auto" alt="photo" priority={true} />
                                                    </div>
                                                    <div className="flex gap-x-[15px] justify-between items-center">
                                                        <label 
                                                            htmlFor="feimg" 
                                                            title="Choose Image" 
                                                            className="transition-all delay-75 inline-block font-ubuntu font-semibold text-[16px] bg-theme-color-1 text-white py-[10px] px-[15px] cursor-pointer" 
                                                        >
                                                            <input type="file" id="feimg" name="featured_image" className="hidden" />
                                                            Choose Image
                                                        </label>

                                                        <button type="button" title="Clear" className="transition-all delay-75 font-ubuntu text-[14px] text-red-600 underline dark:text-red-400">
                                                            <div className="flex gap-x-[5px] items-center">
                                                                <FaRegTrashAlt size={16} />
                                                                <div>Clear</div>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="pb-[20px]">
                                    <label 
                                        className="transition-all delay-75 block mb-[5px] font-noto_sans text-[16px] font-semibold text-zinc-900 dark:text-zinc-300"
                                    >
                                        Categories
                                    </label>
                                    <Select
                                        primaryColor={"indigo"} 
                                        value={quizCats} 
                                        onChange={handleChangeSelect} 
                                        options={options} 
                                        isMultiple={true} 
                                        isSearchable={true} 
                                        classNames={{
                                            menuButton: (value) => `flex cursor-pointer text-sm text-gray-500 border border-gray-300 shadow-sm transition-all duration-75 focus:outline-0 bg-zinc-100 hover:border-gray-400 dark:bg-zinc-900 dark:border-zinc-500`,
                                            menu: `font_noto_sans absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700 dark:bg-zinc-900 dark:border-zinc-500`,
                                            tagItem: (value) => `bg-gray-200 border rounded-sm flex space-x-1 pl-1 dark:bg-zinc-800 dark:border-zinc-500 dark:text-zinc-200`,
                                            tagItemText: `text-zinc-900 font_noto_sans truncate cursor-default select-none dark:text-zinc-200`,
                                            listItem: (value) => `block font_noto_sans transition duration-200 px-3 py-3 cursor-pointer select-none truncate rounded text-zinc-500 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800`,
                                            searchContainer: `relative py-[10px] px-[15px]`,
                                            searchBox: `w-full font_noto_sans py-2 pl-8 pr-2 text-sm text-zinc-800 bg-gray-100 border border-gray-200 focus:outline-0 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200`,
                                        }} 
                                    />
                                </div>
                                <div className="text-right">
                                    <button type="submit" title="Create Quiz" className="transition-all delay-75 inline-block concard px-[20px] md:px-[25px] py-[10px] md:py-[12px] text-center text-white font-noto_sans font-semibold text-[16px] md:text-[18px] hover:shadow-lg">
                                        Create Quiz
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