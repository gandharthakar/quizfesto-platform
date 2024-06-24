'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_dark_mode, unset_dark_mode } from "@/app/redux-service/slices/theme-mode/themeSwitcherSlice";
import Link from "next/link";
import Image from "next/image";
import { RootState } from "@/app/redux-service/store";
import { dump_quiz_data } from "@/app/constant/datafaker";
import { useRouter } from "next/navigation";

interface QuizGivenAns {
    question_id: string,
    user_choosen_option_id: string,
    question_marks: number
}

interface QuizQues {
    question_id: string,
    correct_option_id: string
}

export default function Page() {

    const router = useRouter();
    const dispatch = useDispatch();
    const trqzdt = useSelector((state: RootState) => state.transfer_quiz_data);

    const [corrQAArr, setCorrQAArr] = useState<QuizQues[]>(dump_quiz_data.only_corr_answ);
    const [usrAnsw, setUserAnsw] = useState<QuizGivenAns[]>([]);

    const [timeTaken, setTimeTaken] = useState<string>("00:00:00");
    const [estTime, setEstTime] = useState<string>("00:00:00");
    const [totalMarks, setTotalMarks] = useState<number>(0);
    const [correctAnswers, setCorectAnswers] = useState<number>(0);
    const [totalScore, setTotalScore] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    function countCorrectAnswers(questions: QuizQues[], answers: QuizGivenAns[]) {
        // Initialize a counter for correct answers
        let correctCount = 0;
        let totalMarks = 0;
        let arr = [];

        // Loop through each user answer
        for (const answer of answers) {
            const questionId = answer.question_id;
            const userOptionId = answer.user_choosen_option_id;

            // Find the corresponding question object
            const matchingQuestion = questions.find(question => question.question_id === questionId);

            // Check if question exists and user option matches correct answer
            if (matchingQuestion && matchingQuestion.correct_option_id === userOptionId) {
                correctCount++;
                arr.push(answer);
            }
        }

        for (const mark of arr) {
            totalMarks += mark.question_marks;
        }

        return {
            correct_answers: correctCount,
            total_mark: totalMarks
        };
    }

    const handleScoreSubmissionClick = () => {
        if(trqzdt.attempted_data.length > 0) {
            console.log(trqzdt);
        } else {
            alert("No Data Found.");
        }
    }

    useEffect(() => {

        function ppc(questions: QuizQues[], answers: QuizGivenAns[]) {
            // Initialize a counter for correct answers
            let correctCount = 0;
            let totalMarks = 0;
            let arr = [];
    
            // Loop through each user answer
            for (const answer of answers) {
                const questionId = answer.question_id;
                const userOptionId = answer.user_choosen_option_id;
    
                // Find the corresponding question object
                const matchingQuestion = questions.find(question => question.question_id === questionId);
    
                // Check if question exists and user option matches correct answer
                if (matchingQuestion && matchingQuestion.correct_option_id === userOptionId) {
                    correctCount++;
                    arr.push(answer);
                }
            }
    
            for (const mark of arr) {
                totalMarks += mark.question_marks;
            }
    
            return {
                correct_answers: correctCount,
                total_mark: totalMarks
            };
        }

        let glsi = localStorage.getItem('site-dark-mode');
        const checkDM = glsi ? JSON.parse(glsi) : '';
        if(checkDM) {
            dispatch(set_dark_mode());
        } else {
            dispatch(unset_dark_mode());
        }

        // const ls_fiqdata = localStorage.getItem('transfer_quiz_data');
        // const prsfid = ls_fiqdata ? JSON.parse(ls_fiqdata) : '';
        // if(prsfid) {
        //     setTimeTaken(prsfid.time_taken);
        //     setEstTime(prsfid.quiz_estimated_time);
        //     setTotalMarks(prsfid.quiz_total_marks);
        //     setUserAnsw(prsfid.attempted_data);

        //     setCorectAnswers(countCorrectAnswers(corrQAArr, usrAnsw).correct_answers);
        //     setTotalScore(countCorrectAnswers(corrQAArr, usrAnsw).total_mark);
        // }
        if(trqzdt.attempted_data.length > 0) {
            setTimeTaken(trqzdt.time_taken);
            setEstTime(trqzdt.quiz_estimated_time);
            setTotalMarks(trqzdt.quiz_total_marks);
            setUserAnsw(trqzdt.attempted_data);

            setCorectAnswers(countCorrectAnswers(corrQAArr, usrAnsw).correct_answers);
            setTotalScore(countCorrectAnswers(corrQAArr, usrAnsw).total_mark);
        }
        let st = setTimeout(() => {
            setIsLoading(false);
            clearTimeout(st);
        }, 200);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    const AuthUser = useSelector((state: RootState) => state.auth_user_id);
    useEffect(() => {
        if(!AuthUser) {

        } else {
            router.push("/sign-in");
        }
    }, []);

    return (
        <>
            <div className="transition-all delay-75 flex flex-col justify-center items-center px-[15px] py-[50px] min-h-screen bg-white dark:bg-zinc-950">
                <div className="w-full pb-[20px]">
                    <div className="text-center">
                        <Image src="/images/quizfesto-logo-final.svg" width={130} height={28} className="inline-block w-[130px] h-[28px]" alt="logo" />
                    </div>
                </div>
                <div className="w-full pb-[15px]">
                    <div className="w-full relative max-w-[800px] mx-auto py-[20px] px-[15px] border-[1px] border-solid border-zinc-400 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900">

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

                        <div className="pb-[0px] text-center">
                            <h1 className="transition-all delay-75 font-noto_sans text-[18px] md:text-[20px] font-semibold text-zinc-800 dark:text-zinc-300">
                                Your Score
                            </h1>
                        </div>
                        <div className="pb-[0px] text-center">
                            <h2 className="transition-all delay-75 font-noto_sans text-[30px] md:text-[40px] font-semibold text-zinc-900 dark:text-zinc-200">
                                {totalScore} / {totalMarks}
                            </h2>
                        </div>
                        <div className="pb-[10px] text-center">
                            <h3 className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-900 dark:text-zinc-200">
                                Time Taken : <span className={`${timeTaken > estTime ? 'text-red-500' : 'text-green-500'}`}>{timeTaken}</span> / <span>{estTime}</span>
                            </h3>
                        </div>

                        <div className="pb-[0px] text-center">
                            <h4 className="transition-all delay-75 font-noto_sans text-[18px] md:text-[20px] font-semibold text-zinc-600 dark:text-zinc-400">
                                You Answered <span>{correctAnswers}</span> questions correctly.
                            </h4>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="w-full max-w-[800px] mx-auto py-[20px] px-[15px]">
                        <div className="pb-[15px] text-center">
                            <p className="transition-all delay-75 font-ubuntu text-[14px] md:text-[16px] text-[#ff0000] font-bold">
                                {`Don't refresh or press back button of this page otherwise you will loose quiz data played by you.`}
                            </p>
                        </div>
                        <div className="pb-[15px] text-center">
                            <h5 className="transition-all delay-75 font-ubuntu text-[12px] font-semibold md:text-[14px] text-zinc-500 dark:text-zinc-500">
                                Your Score Will Be Saved Only After Your Submit.
                            </h5>
                        </div>

                        <div className="flex flex-wrap gap-[15px] justify-center">
                            {
                                trqzdt.attempted_data.length > 0 ? 
                                (
                                    <div>
                                        <button 
                                            type="button" 
                                            title="Submit Score" 
                                            className="inline-block transition-all delay-75 border-[2px] border-solid border-theme-color-1 text-white bg-theme-color-1 py-[8px] md:py-[10px] px-[20px] md:px-[25px] rounded-full font-ubuntu font-semibold text-[16px] md:text-[18px] hover:bg-theme-color-1-hover-dark hover:text-white" 
                                            onClick={handleScoreSubmissionClick}
                                        >
                                            Submit Score
                                        </button>
                                    </div>
                                ) 
                                : 
                                ('')
                            }
                            <div>
                                <Link href="/all-quizzes" title="Play Another Quiz" className="inline-block transition-all delay-75 border-[2px] border-solid border-theme-color-2 text-theme-color-2 py-[8px] md:py-[10px] px-[20px] md:px-[25px] rounded-full font-ubuntu font-semibold text-[16px] md:text-[18px] hover:bg-theme-color-2 hover:text-white">
                                    Play Another Quiz
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}