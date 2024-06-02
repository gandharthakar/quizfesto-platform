'use client';

import { IoMdCheckmark } from "react-icons/io";
import { FaEllipsisVertical } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";

interface AdmLstQzCd {
    quizid: string,
    quiz_title: string,
    quiz_publish_status: string,
}

function AdminListQuizCard(props: AdmLstQzCd) {

    const { quizid, quiz_title, quiz_publish_status } = props;

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setIsMenuOpen(false);
    }
    
    const handleDeleteQuiz = () => {
        setIsMenuOpen(false);
    }

    useEffect(()=> {

        let menuHandler = (e:any) => {
            if(menuRef.current !== null) {
                if(!menuRef.current.contains(e.target)) {
                    setIsMenuOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', menuHandler);

    }, []);

    return (
        <>
            <div className="transition-all delay-75 border-[2px] border-solid p-[15px] border-zinc-300 bg-white hover:border-zinc-600 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:border-zinc-400">
                <div className="flex gap-x-[15px] items-start">
                    <div className="alqc-chrb">
                        <input 
                            type="checkbox" 
                            id={quizid} 
                            name="quiz" 
                            className="input-chrb"  
                            value={quizid} 
                        />
                        <label htmlFor={quizid} className="label">
                            <div>
                                <div className="squere-box">
                                    <IoMdCheckmark size={18} className="svg-icon" />
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className="mr-auto">
                        <div className="pb-[5px]">
                            <h1 className="transition-all delay-75 font-noto_sans text-[18px] md:text-[20px] font-semibold text-zinc-800 dark:text-zinc-200 break-words">
                                {quiz_title}
                            </h1>
                        </div>
                        <div>
                            <h6 className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-800 dark:text-zinc-200">
                                <span className="font-semibold">Status : </span> 
                                {quiz_publish_status == "draft" ? (<span className="text-red-500 font-bold">Draft</span>) : (<span className="text-green-500 font-bold">Published</span>)}
                            </h6>
                        </div>
                    </div>
                    <div ref={menuRef} className="relative h-[18px]">
                        <button 
                            type="button"
                            title="Actions"  
                            className="transition-all delay-75 text-zinc-800 dark:text-zinc-200" 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <FaEllipsisVertical size={18} />
                        </button>
                        <ul className={`absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-950 dark:ring-zinc-800 ${isMenuOpen ? 'block' : 'hidden'}`}>
                            <li className="w-full">
                                <Link 
                                    href={`/admin/quizes/edit-quiz/${quizid}`} 
                                    title="Edit"
                                    className="transition-all delay-75 block w-full py-[10px] px-[15px] font-ubuntu text-[16px] text-zinc-900 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800" 
                                    onClick={handleClick}
                                >
                                    <div className="flex gap-x-[5px] items-center">
                                        <MdOutlineModeEdit size={20} />
                                        <div>
                                            Edit
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li className="w-full">
                                <button 
                                    type="button" 
                                    title="Delete" 
                                    className="transition-all delay-75 block w-full py-[10px] px-[15px] font-ubuntu text-[16px] text-red-500 hover:bg-zinc-100 dark:text-red-500 dark:hover:bg-zinc-800" 
                                    onClick={handleDeleteQuiz}
                                >
                                    <div className="flex gap-x-[5px] items-center">
                                        <RiDeleteBin6Line size={20} />
                                        <div>
                                            Delete
                                        </div>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminListQuizCard;