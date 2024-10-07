'use client';

import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";

interface WinUsrFrm {
    winner_type: number, 
    winning_position_text: string, 
    user_id?: string,
    winner_date: string,
    user_full_name: string,
    winner_description: string,
    user_profile_picture?: string
}

function WinnersUsersForm(props: WinUsrFrm) {

    const { 
        winner_type=0, 
        winning_position_text, 
        // winner_user_id, 
        winner_date, 
        user_full_name, 
        winner_description, 
        user_profile_picture 
    } = props;

    const [input, setInput] = useState<string>(winner_description ? winner_description : '');
    const [inputError, setInputError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let buttonText = winning_position_text ? "Update" : "Save";

    const InputChange = (e: any) => {
        let value = e.target.value;
        setInput(value);

        if(value == '') {
            setInputError("Please enter description.");
        } else {
            setInputError("");
            if(value.length < 6) {
                setInputError("Description must conatins 5 characters.");
            } else {
                setInputError("");
            }
        }
    }

    const removeWinner = async () => {
        let conf = confirm("Are you sure want to remove this winner ?");
        if(conf) {
            let baseURI = window.location.origin;
            let resp = await fetch(`${baseURI}/api/admin/winners/crud/remove`, {
                method: "DELETE",
                body: JSON.stringify({ winner_type }),
            });
            const body = await resp.json();
            if(body.success) {
                Swal.fire({
                    title: "Success!",
                    text: body.message,
                    icon: "success",
                    timer: 3000
                });
                let set = setTimeout(() => {
                    window.location.reload();
                    clearTimeout(set);
                }, 3000);
            } else {
                Swal.fire({
                    title: "Error!",
                    text: body.message,
                    icon: "error",
                    timer: 3000
                });
            }
        }
    }

    const handleSubmitForm = async (e: any) => {
        e.preventDefault();

        let isValidForm = false;
        if(input == '') {
            isValidForm = false;
            setInputError("Please enter description.");
        } else {
            setInputError("");
            if(input.length < 6) {
                isValidForm = false;
                setInputError("Description must conatins 5 characters.");
            } else {
                isValidForm = true;
                setInputError("");
            }
        }

        if(isValidForm) {
            setIsLoading(true);
            let baseURI = window.location.origin;
            let resp = await fetch(`${baseURI}/api/admin/winners/crud/update`, {
                method: "POST",
                body: JSON.stringify({ winner_type, winner_description: input }),
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
    }

    return (
        <>
            <div className="transition-all delay-75 border-[2px] border-solid p-[15px] border-zinc-300 bg-white hover:border-zinc-600 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:border-zinc-400">
                <div className="flex gap-x-[20px] gap-y-[10px] items-start flex-col md:flex-row">
                    <div className="pb-0">
                        <div className="flex items-center justify-center relative w-[80px] md:w-[150px] h-[80px] md:h-[150px] font-ubuntu text-[30px] md:text-[40px] bg-zinc-200 dark:bg-zinc-600 rounded-full dark:text-zinc-200">
                            <span className="uppercase">{user_full_name.charAt(0)}</span>
                            {user_profile_picture && (<Image src={user_profile_picture} width={100} height={100} className="w-full h-full absolute left-0 top-0 z-[4] rounded-full" alt="photo" priority={true} />)}
                        </div>
                        <div className="pt-[10px] text-left md:text-center">
                            <h6 className="transition-all delay-75 inline-block font-noto_sans text-[16px] md:text-[18px] font-semibold text-zinc-800 dark:text-zinc-200">
                                {winner_type}<sup>{winning_position_text}</sup> Winner.
                            </h6>
                        </div>
                    </div>
                    <div className="w-full md:flex-1">
                        <div className="pb-[10px]">
                            <h2 className="transition-all delay-75 font-noto_sans text-[10px] md:text-[12px] text-zinc-900 dark:text-zinc-300">
                                Name
                            </h2>
                            <h1 className="transition-all delay-75 block font-ubuntu text-[16px] md:text-[18px] font-semibold text-zinc-800 dark:text-zinc-100">
                                {user_full_name}
                            </h1>
                        </div>
                        <div className="pb-[10px]">
                            <h2 className="transition-all delay-75 font-noto_sans text-[10px] md:text-[12px] text-zinc-900 dark:text-zinc-300">
                                Winning Date
                            </h2>
                            <h1 className="transition-all delay-75 block font-ubuntu text-[16px] md:text-[18px] font-semibold text-zinc-800 dark:text-zinc-100">
                                {winner_date}
                            </h1>
                        </div>
                        <form onSubmit={handleSubmitForm}>
                            <div className="pb-[10px]">
                                <h2 className="transition-all delay-75 font-noto_sans text-[10px] md:text-[12px] text-zinc-900 dark:text-zinc-300">
                                    Winning Description
                                </h2>
                                <h1 className="pt-[10px]">
                                    <textarea 
                                        className="ws-input-pwd-m1-v1" 
                                        rows={3} 
                                        value={input} 
                                        onChange={InputChange} 
                                        autoComplete="off" 
                                    ></textarea>
                                    {inputError && (<div className="ws-input-error mt-[2px]">{inputError}</div>)}
                                </h1>
                            </div>
                            <div className="flex flex-wrap gap-[15px] justify-end items-center">
                                <button 
                                    type="button" 
                                    title="Remove" 
                                    className="transition-all delay-75 py-[6px] md:py-[8px] px-[15px] md:px-[20px] text-red-600 font-ubuntu text-[16px] font-medium" 
                                    onClick={removeWinner}
                                >
                                    Remove
                                </button>
                                {
                                    isLoading ? 
                                    (<div className="spinner size-4"></div>) 
                                    : 
                                    (
                                        <button 
                                            type="submit" 
                                            title={buttonText}
                                            className="transition-all delay-75 py-[6px] md:py-[8px] px-[15px] md:px-[20px] bg-theme-color-2 hover:bg-theme-color-2-hover-dark text-zinc-100 font-ubuntu text-[16px] font-medium"
                                        >
                                            {buttonText}
                                        </button>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WinnersUsersForm;