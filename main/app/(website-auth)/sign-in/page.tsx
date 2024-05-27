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

    const validationSchema = z.object({
        email: z.string({
			required_error: "Please enter email address.",
			invalid_type_error: "Email must be in string format."
		}).email({
			message: "Please enter valid email address."
		}).min(1),

        password: z.string({
			invalid_type_error: "Password must be in string format."
		}).min(8).max(16),
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
                                        Sign In
                                    </h1>
                                </div>

                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className="pb-[15px] md:pb-[15px]">
                                        <input 
                                            type="email" 
                                            autoComplete="off" 
                                            className="ws-input-m1"
                                            placeholder="E-Mail"
                                            {...register("email")}
                                        />
                                        {errors.email && (<div className="ws-input-error">{errors.email.message}</div>)}
                                    </div>
                                    <div className="pb-[15px] md:pb-[15px]">
                                        <div className="relative">
                                            <input 
                                                type={showPassword ? "text" : "password"} 
                                                autoComplete="off" 
                                                className="ws-input-pwd-m1"
                                                placeholder="Password"
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

                                    <div className="pb-[15px] md:pb-[15px] text-right">
                                        <button type="submit" title="Sign In" className="ws-button-m1">
                                            Sign In
                                        </button>
                                    </div>

                                    <div className="text-center py-[10px]">
                                        <div className="transition-all delay-75 flex justify-center items-center w-[40px] h-[40px] md:w-[45px] md:h-[45px] bg-zinc-300 font-noto_sans font-semibold text-[14px] md:text-[16px] text-zinc-700 rounded-full mx-auto dark:bg-zinc-700 dark:text-zinc-200">
                                            OR
                                        </div>
                                    </div>

                                    <div className="pt-[15px] md:pt-[15px]">
                                        <button type="button" title="Sign in With Google" className="goggle-lsbtn">
                                            <div className="flex gap-x-[15px] md:gap-x-[20px] items-center">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                                        <path d="M1 1h22v22H1z" fill="none"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    Sign in with Google
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="w-full text-center pb-[10px]">
                        <p className="font-noto_sans text-zinc-600 text-[14px] md:text-[16px] font-semibold dark:text-zinc-400">
                            {`Don't have an account ?`}&nbsp;
                            <span className="font-bold dark:text-zinc-300">
                                Please <Link href="/sign-up" title="Sign In" className="underline">Sign Up</Link>
                            </span>
                        </p>
                    </div>
                    <div className="w-full text-center">
                        <p className="font-noto_sans text-zinc-600 text-[14px] md:text-[16px] font-semibold dark:text-zinc-400">
                            <span className="font-bold dark:text-zinc-300">
                                <Link href="/forgot-password" title="Forgot Your Password ?" className="underline">Forgot Your Password ?</Link>
                            </span>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}