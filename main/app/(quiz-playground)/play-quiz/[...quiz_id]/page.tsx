'use client';

import { set_dark_mode, unset_dark_mode } from "@/app/redux-service/slices/theme-mode/themeSwitcherSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useStopwatch } from "react-timer-hook";
import { FaClock } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import QuizInfoModal from "@/app/components/quizInfomodal";

export default function Page() {

    const dispatch = useDispatch();
    const { hours, minutes, seconds, start, pause, reset } = useStopwatch({ autoStart: false })
    const [showInfoModal, setShowInfoModal] = useState<boolean>(true);

    useEffect(() => {
        let glsi = localStorage.getItem('site-dark-mode');
        const checkDM = glsi ? JSON.parse(glsi) : '';
        if(checkDM) {
            dispatch(set_dark_mode());
        } else {
            dispatch(unset_dark_mode());
        }
    });

    return (
        <>
            <QuizInfoModal
                open_modal_on_page_load={true}
                openState={showInfoModal}
                setOpenState={setShowInfoModal}
                modal_heading="Quiz Instructions"
                backdrop={true}
                hide_modal_on_backdrop_click={true}
                modal_max_width={400}
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
                            onClick={() => setShowInfoModal(false)}
                        >
                            Ok I Understood
                        </button>
                    </div>
                </div>
            </QuizInfoModal>
            <div className="transition-all delay-75 px-[15px] py-[50px] min-h-screen bg-white dark:bg-zinc-950">
                <form>
                    <div className="flex flex-col justify-center items-start border-[1px] border-solid border-zinc-400 w-full min-h-[calc(100vh-100px)] max-w-[800px] mx-auto dark:border-zinc-600">
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
                        <div className="h-[4px] concard" style={{width: '15%'}}></div>
                        <div className="py-[25px] md:py-[50px] px-[15px] md:px-[30px] w-full">
                            <div className="pb-[15px] md:pb-[25px]">
                                <h2 className="transition-all delay-75 font-noto_sans text-[20px] md:text-[25px] text-zinc-800 font-semibold dark:text-zinc-300">
                                    Q. This is question text ?
                                </h2>
                            </div>
                            <div>
                                <ul className="quizques-options-list">
                                    <li>
                                        <input type="radio" name="answer_option" id="opt1" className="radio-btn" value={`Option 1`} />
                                        <label htmlFor="opt1" role="button" title="Option 1" className="option-btn">
                                            <div className="check-round">
                                                <IoIosCheckmarkCircle size={20} className="tick-icon" />
                                            </div>
                                            <div>
                                                Option 1
                                            </div>
                                        </label>
                                    </li>
                                    <li>
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
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-auto py-[15px] md:py-[25px] px-[15px] md:px-[30px] flex justify-between items-center gap-x-[20px] border-t-[1px] border-solid border-zinc-400 bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-600 w-full">
                            <h6 className="transition-all delay-75 font-noto_sans text-[16px] md:text-[18px] text-zinc-800 font-semibold dark:text-zinc-300">
                                1 / 20
                            </h6>

                            <div className="hidden">
                                <button 
                                    title="Next" 
                                    type="submit"
                                    className="transition-all delay-75 font-noto_sans font-semibold text-[16px] md:text-[18px] bg-theme-color-1 hover:bg-theme-color-1 text-white px-[15px] md:px-[15px] py-[8px] md:py-[10px]"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}