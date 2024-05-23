'use client';

import { set_dark_mode, unset_dark_mode } from "@/app/redux-service/slices/theme-mode/themeSwitcherSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useStopwatch } from "react-timer-hook";
import { FaClock } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import QuizInfoModal from "@/app/components/quizInfomodal";
import { useRouter, useParams } from "next/navigation";
import { dump_quiz_data } from "@/app/constant/datafaker";
import { clear_tqd, set_tqd } from "@/app/redux-service/slices/quiz-playground/transferQuizDataslice";

interface AnswObj {
    question_id: string,
    user_choosen_option_id: string
}

let currentQuestionIndex:number = 0;
let atm_data:AnswObj[] = [];

export default function Page() {

    // console.log("comp re-render.");
    const router = useRouter();
    const params = useParams();
    let quiz_id = params.quiz_id[0];
    let user_id = params.quiz_id[1];
    const dispatch = useDispatch();
    const { hours, minutes, seconds, start, pause, reset } = useStopwatch({ autoStart: false })
    const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

    const [currentQuestionCount, setCurrentQuestionCount] = useState<number>(1);
    // const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [totalQuestions, setTotalQuestions] = useState<number>(dump_quiz_data.quiz_total_question);
    const [totalMarks, setTotalMarks] = useState<string | number>(dump_quiz_data.quiz_total_marks);
    const [quizEstTime, setQuizEstTime] = useState<string>(dump_quiz_data.quiz_estimated_time);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isFinishing, setIsFinishing] = useState<boolean>(false);
    interface QuizQuestion {
        question_id: string,
        question_text: string,
        question_marks: number | string
    }
    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>(
        {
            question_id: dump_quiz_data.only_q_a_opts[currentQuestionIndex].question_id,
            question_text: dump_quiz_data.only_q_a_opts[currentQuestionIndex].question_text,
            question_marks: dump_quiz_data.only_q_a_opts[currentQuestionIndex].question_marks,
        }
    );

    type QuizQuestionOpts = {
        option_id: string,
        option_text: string
    }
    const [currentQuestionOptions, setCurrentQuestionOptions] = useState<QuizQuestionOpts[]>(dump_quiz_data.only_q_a_opts[currentQuestionIndex].question_options);
    const [timing, setTiming] = useState<string>('');

    const CreateRadioButton = (opt_id:string, opt_txt:string, sa:string, ch:any) => {
        return (
            <>
                <input 
                    type="radio" 
                    name="answer_option" 
                    id={opt_id} 
                    className="radio-btn" 
                    value={opt_id} 
                    checked={sa === opt_id}
                    onChange={ch}
                />
                <label htmlFor={opt_id} role="button" title="Option 1" className="option-btn">
                    <div className="check-round">
                        <IoIosCheckmarkCircle size={20} className="tick-icon" />
                    </div>
                    <div>
                        {opt_txt}
                    </div>
                </label>
            </>
        )
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAnswer(event.target.value);
        setIsError(false);
    };

    const Radio = useMemo(() => {
        return currentQuestionOptions.map((itm) => (<li key={itm.option_id}>{CreateRadioButton(itm.option_id, itm.option_text, selectedAnswer, handleChange)}</li>));
    }, [currentQuestionOptions, selectedAnswer]);

    const handleClick = (e: any) => {
        e.preventDefault();
        
        let isValidForm:boolean = false;
        setIsError(true);

        if(selectedAnswer == '') {
            isValidForm = false;
        } else {
            isValidForm = true;
        }
        
        if(isValidForm) {
            setIsError(false);
            if(currentQuestionIndex < (totalQuestions - 1)) {
                // setCurrentQuestionIndex((prevCount) => prevCount === 0 ? 1 : prevCount + 1);
                currentQuestionIndex++;
            }

            setCurrentQuestionCount((itm) => {
                return itm < totalQuestions ? itm+1 : itm;
            });
            setCurrentQuestion(() => {
                return {
                    question_id: dump_quiz_data.only_q_a_opts[currentQuestionIndex].question_id,
                    question_text: dump_quiz_data.only_q_a_opts[currentQuestionIndex].question_text,
                    question_marks: dump_quiz_data.only_q_a_opts[currentQuestionIndex].question_marks,
                }
            });
            setCurrentQuestionOptions(dump_quiz_data.only_q_a_opts[currentQuestionIndex].question_options);
            
            let obj = {
                question_id: currentQuestion.question_id,
                user_choosen_option_id: selectedAnswer,
                question_marks: currentQuestion.question_marks,
            }
            atm_data.push(obj);
            // console.log(atm_data);

            if(currentQuestionCount === totalQuestions) {
                pause();
                router.push(`/submit-score/${quiz_id}/${user_id}`);
                setIsFinishing(true);
                const prepData = {
                    time_taken: timing,
                    attempted_data: atm_data,
                    quiz_total_marks: totalMarks,
                    quiz_estimated_time: quizEstTime,
                }
                // console.log(prepData);

                let temp_ls_dt = localStorage.getItem('transfer_quiz_data');
                if(temp_ls_dt) {
                    localStorage.removeItem('transfer_quiz_data');
                    localStorage.setItem('transfer_quiz_data', JSON.stringify(prepData));
                }
                dispatch(clear_tqd());
                dispatch(set_tqd(prepData));
            } else {
                // Reset Radio Buttons.
                setSelectedAnswer('');
            }
        }
    }

    const hideModalOnClick = () => {
        setShowInfoModal(false);
        start();
    }

    useEffect(() => {
        let glsi = localStorage.getItem('site-dark-mode');
        const checkDM = glsi ? JSON.parse(glsi) : '';
        if(checkDM) {
            dispatch(set_dark_mode());
        } else {
            dispatch(unset_dark_mode());
        }

        let temp_ls_dt = localStorage.getItem('transfer_quiz_data');
        if(!temp_ls_dt) {
            localStorage.setItem('transfer_quiz_data', JSON.stringify({}));
        }

        setTiming(`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
    }, [hours, minutes, seconds, setTiming, dispatch]);

    return (
        <>
            <QuizInfoModal
                open_modal_on_page_load={true}
                modal_heading="Quiz Instructions"
                backdrop={true}
                hide_modal_on_backdrop_click={true}
                modal_max_width={400}
                openState={showInfoModal} 
                setOpenState={setShowInfoModal}
                callBackAfterModalClose={start}
            >
                <div className="px-[20px] md:px-[25px] py-[20px]">
                    <ul className="flex flex-col gap-y-[15px] list-disc pl-[15px] md:pl-[20px]">
                        <li className="transition-all delay-75 w-full font-noto_sans text-[14px] md:text-[16px] text-zinc-800 dark:text-zinc-300">
                            Do not refresh page while opting / playing quiz because if you refresh the page you will loose everything and quiz will start from begin.
                        </li>
                        <li className="transition-all delay-75 w-full font-noto_sans text-[14px] md:text-[16px] text-zinc-800 dark:text-zinc-300">
                            Do not press back button while opting / playing quiz because if you press the back button then you will loose everything and quiz will start from begin.
                        </li>
                        <li className="transition-all delay-75 w-full font-noto_sans text-[14px] md:text-[16px] text-zinc-800 dark:text-zinc-300">
                            Just opt / play full quiz without hesitating about score you will get score at the end of the quiz.
                        </li>
                    </ul>

                    <div className="pt-[20px]">
                        <button 
                            type="button" 
                            title="Ok I Understood" 
                            className="transition-all delay-75 w-full py-[10px] px-[15px] font-noto_sans text-[16px] font-semibold text-white bg-theme-color-1 hover:bg-theme-color-1-hover-dark" 
                            onClick={hideModalOnClick}
                        >
                            Ok I Understood
                        </button>
                    </div>
                </div>
            </QuizInfoModal>
            <div className="transition-all delay-75 px-[15px] py-[50px] min-h-screen bg-white dark:bg-zinc-950">
                <form onSubmit={handleClick}>
                    <div className="relative flex flex-col justify-center items-start border-[1px] border-solid border-zinc-400 w-full min-h-[calc(100vh-100px)] max-w-[800px] mx-auto dark:border-zinc-600">
                        {
                            isLoading ? 
                            (
                                <div className={`transition-all delay-75 absolute left-0 top-0 z-[5] bg-[rgba(255,255,255,0.90)] w-full h-full dark:bg-[rgba(9,9,11,0.95)] justify-center items-center flex`}>
                                    <div className="spinner"></div>
                                </div>
                            ) 
                            : 
                            ('')
                        }
                        <div className="py-[10px] md:py-[25px] px-[15px] md:px-[30px] flex justify-between items-center gap-x-[20px] border-b-[1px] border-solid border-zinc-400 bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-600 w-full">
                            <h1 className="transition-all delay-75 font-noto_sans text-[16px] md:text-[25px] text-zinc-800 font-bold dark:text-zinc-300">
                                Quiz Playground
                            </h1>
                            <div>
                                <div className="transition-all delay-75 flex gap-x-[8px] items-center font-noto_sans text-zinc-800 text-[14px] md:text-[16px] font-semibold bg-white py-[5px] px-[8px] dark:bg-zinc-950 dark:text-zinc-300">
                                    <FaClock size={20} className="w-[16px] h-[16px] md:w-[20px] md:h-[20px] text-theme-color-2" />
                                    <div>
                                        {`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}
                                    </div>
                                </div>
                                <input type="hidden" value={`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`} />
                            </div>
                        </div>
                        <div className="h-[4px] concard" style={{width: `${(currentQuestionCount / totalQuestions) * 100}%`}}></div>
                        <div className="py-[25px] md:py-[50px] px-[15px] md:px-[30px] w-full">
                            <div className="pb-[15px] md:pb-[25px]">
                                <h2 className="transition-all delay-75 font-noto_sans text-[20px] md:text-[25px] text-zinc-800 font-semibold dark:text-zinc-300">
                                    {currentQuestion.question_text}
                                </h2>
                            </div>
                            <div className="pb-[15px]">
                                <ul className="quizques-options-list">
                                    {Radio}
                                    {/* {
                                        currentQuestionOptions.map((itm) => (
                                            <li key={itm.option_id}>
                                                <input 
                                                    type="radio" 
                                                    name="answer_option" 
                                                    id={itm.option_id} 
                                                    className="radio-btn" 
                                                    value={itm.option_id} 
                                                    checked={selectedAnswer === itm.option_id}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor={itm.option_id} role="button" title="Option 1" className="option-btn">
                                                    <div className="check-round">
                                                        <IoIosCheckmarkCircle size={20} className="tick-icon" />
                                                    </div>
                                                    <div>
                                                        {itm.option_text}
                                                    </div>
                                                </label>
                                            </li>
                                        ))
                                    } */}
                                    {/* <li>
                                        <input type="radio" name="answer_option" id="opt2" className="radio-btn" value={`Option 2`} />
                                        <label htmlFor="opt2" role="button" title="Option 2" className="option-btn">
                                            <div className="check-round">
                                                <IoIosCheckmarkCircle size={20} className="tick-icon" />
                                            </div>
                                            <div>
                                                Option 2
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="radio" name="answer_option" id="opt3" className="radio-btn" value={`Option 3`} />
                                        <label htmlFor="opt3" role="button" title="Option 3" className="option-btn">
                                            <div className="check-round">
                                                <IoIosCheckmarkCircle size={20} className="tick-icon" />
                                            </div>
                                            <div>
                                                Option 3
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="radio" name="answer_option" id="opt4" className="radio-btn" value={`Option 4`} />
                                        <label htmlFor="opt4" role="button" title="Option 4" className="option-btn">
                                            <div className="check-round">
                                                <IoIosCheckmarkCircle size={20} className="tick-icon" />
                                            </div>
                                            <div>
                                                Option 4
                                            </div>
                                        </label>
                                    </li> */}
                                </ul>
                            </div>
                            {isError && (<div className="ws-input-error">Please Select One Option.</div>)}
                        </div>
                        <div className="mt-auto py-[15px] md:py-[25px] px-[15px] md:px-[30px] flex justify-between items-center gap-x-[20px] border-t-[1px] border-solid border-zinc-400 bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-600 w-full">
                            <h6 className="transition-all delay-75 font-noto_sans text-[16px] md:text-[18px] text-zinc-800 font-semibold dark:text-zinc-300">
                                {currentQuestionCount} / {totalQuestions}
                            </h6>

                            <div className="">
                                {
                                    isFinishing ? 
                                    (
                                        <div className="transition-all delay-75 inline-block font-noto_sans text-[14px] md:text-[16px] text-zinc-600 dark:text-zinc-400">Finishing ...</div>
                                    ) 
                                    : 
                                    (
                                        <button 
                                            title="Next" 
                                            type="submit"
                                            className="transition-all delay-75 font-noto_sans font-semibold text-[16px] md:text-[18px] bg-theme-color-1 hover:bg-theme-color-1 text-white px-[15px] md:px-[15px] py-[8px] md:py-[10px]"
                                        >
                                            {currentQuestionIndex === (totalQuestions - 1) ? 'Finish' : 'Next'}
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}