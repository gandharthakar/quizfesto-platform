'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { set_dark_mode, unset_dark_mode } from "@/app/redux-service/slices/theme-mode/themeSwitcherSlice";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Page() {

    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfPassword, setShowConfPassword] = useState<boolean>(false);

    const validationSchema = z.object({
        password: z.string({
			invalid_type_error: "Password must be in string format."
		}).min(8).max(16),
	
		confirmPassword: z.string({
			invalid_type_error: "Confirm password must be in string format."
		}).min(8).max(16)
    }).refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Your password didn't match."
	});

    type validationSchema = z.infer<typeof validationSchema>;

    const { register, handleSubmit, reset, formState: { errors }} = useForm<validationSchema>({
		resolver: zodResolver(validationSchema)
	});

    const handleFormSubmit: SubmitHandler<validationSchema> = (formdata) => {
        console.log(formdata);
        reset();
    }
    
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
            <section className="transition-all delay-75 py-[50px] px-[15px] bg-zinc-100 min-h-screen relative dark:bg-zinc-950">
                {/* Overlay */}
                {/* <div className="absolute top-0 left-0 w-full h-full opacity-[0.7] bg-white z-[1]"></div> */}

                <div className="flex flex-col justify-center items-center min-h-[calc(100vh-100px)] relative z-[5]">
                    <div className="w-full text-center">
                        <Link href="/" title="Home">
                            <Image src="/images/quizfesto-logo-final.svg" width={130} height={28} className="inline-block w-[130px] h-[28px]" alt="logo" />
                        </Link>
                    </div>
                    <div className="w-full py-[20px] max-w-[400px] mx-auto">
                        <div className="concard-rev p-[4px]">
                            <div className="bg-white py-[20px] px-[15px] md:py-[25px] md:px-[50px] dark:bg-zinc-900">
                                <div className="pb-[15px] md:pb-[20px] text-center">
                                    <h1 className="font-noto_sans text-zinc-800 text-[20px] md:text-[25px] font-bold dark:text-zinc-200">
                                        Reset Password
                                    </h1>
                                </div>

                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className="pb-[15px] md:pb-[15px]">
                                        <div className="relative">
                                            <input 
                                                type={showPassword ? "text" : "password"} 
                                                autoComplete="off" 
                                                className="ws-input-pwd-m1"
                                                placeholder="New Password"
                                                {...register("password")}
                                            />
                                            {
                                                showPassword ? 
                                                (<> <IoIosEyeOff size={20} className="transition-all delay-75 cursor-pointer text-zinc-700 hover:text-theme-color-2 absolute top-[11px] md:top-[13px] right-[10px] z-[2] dark:text-zinc-400 dark:hover:text-theme-color-2" onClick={() => setShowPassword(false)} /> </>) 
                                                : 
                                                (<> <IoIosEye size={20} className="transition-all delay-75 cursor-pointer text-zinc-700 hover:text-theme-color-2 absolute top-[11px] md:top-[13px] right-[10px] z-[2] dark:text-zinc-400 dark:hover:text-theme-color-2" onClick={() => setShowPassword(true)} /> </>)
                                            }
                                        </div>
                                        {errors.password && (<div className="ws-input-error">{errors.password.message}</div>)}
                                    </div>
                                    <div className="pb-[15px] md:pb-[15px]">
                                        <div className="relative">
                                            <input 
                                                type={showConfPassword ? "text" : "password"} 
                                                autoComplete="off" 
                                                className="ws-input-pwd-m1"
                                                placeholder="Confirm New Password"
                                                {...register("confirmPassword")}
                                            />
                                            {
                                                showConfPassword ? 
                                                (<> <IoIosEyeOff size={20} className="transition-all delay-75 cursor-pointer text-zinc-700 hover:text-theme-color-2 absolute top-[11px] md:top-[13px] right-[10px] z-[2] dark:text-zinc-400 dark:hover:text-theme-color-2" onClick={() => setShowConfPassword(false)} /> </>) 
                                                : 
                                                (<> <IoIosEye size={20} className="transition-all delay-75 cursor-pointer text-zinc-700 hover:text-theme-color-2 absolute top-[11px] md:top-[13px] right-[10px] z-[2] dark:text-zinc-400 dark:hover:text-theme-color-2" onClick={() => setShowConfPassword(true)} /> </>)
                                            }
                                        </div>
                                        {errors.confirmPassword && (<div className="ws-input-error">{errors.confirmPassword.message}</div>)}
                                    </div>

                                    {/* <div className="pb-[15px] md:pb-[15px] text-right"> */}
                                    <div className="text-right pt-[10px]">
                                        <button type="submit" title="Change Password" className="ws-button-m1">
                                            Change Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}