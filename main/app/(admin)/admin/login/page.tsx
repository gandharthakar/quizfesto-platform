'use client';

import { set_admin_dark_mode, unset_admin_dark_mode } from "@/app/redux-service/slices/admin/theme-mode/adminThemeSwitcherSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux-service/store";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";

function Page() {

    const dispatch = useDispatch();
    const admThmMod = useSelector((state: RootState) => state.admin_theme_mode.admin_dark_theme_mode);
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
        let glsi = localStorage.getItem('admin-dark-mode');
        const checkDM = glsi ? JSON.parse(glsi) : '';
        if(checkDM) {
            dispatch(set_admin_dark_mode());
        } else {
            dispatch(unset_admin_dark_mode());
        }
    });

    return (
        <>
            <div className="concard-rev" style={{
                background: `url('/images/admin-login-bg.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center top',
                backgroundSize: 'cover'
            }}>
                <div className="md:max-w-[500px] w-full px-[15px] py-[50px] flex flex-col justify-center items-center min-h-screen bg-white dark:bg-zinc-950">
                    <div className="max-w-[300px] mx-auto w-full">
                        <div className="text-center pb-[20px]">
                            {
                                admThmMod ? 
                                (<Image src="/images/qf-admin-og-black-bg-final.svg" width={130} height={28} className="inline-block" alt="Logo" priority={true} />) 
                                : 
                                (<Image src="/images/qf-admin-og-white-bg-final.svg" width={130} height={28} className="inline-block" alt="Logo" priority={true} />)
                            }
                        </div>

                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="pb-[20px]">
                                <label 
                                    htmlFor="admin_usrnm" 
                                    className="transition-all delay-75 block mb-[5px] font-ubuntu font-semibold text-[14px] md:text-[16px] text-zinc-700 dark:text-zinc-300"
                                >
                                    Email
                                </label>
                                <input 
                                    type="email" 
                                    id="admin_usrnm" 
                                    className="transition-all delay-75 block w-full font-noto_sans text-[14px] md:text-[16px] border-[1px] border-solid border-zinc-400 bg-white focus:outline-0 px-[15px] py-[8px] text-zinc-900 placeholder:text-zinc-400 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-200" 
                                    placeholder="Email" 
                                    {...register("email")}
                                />
                                {errors.email && (<div className="pt-[2px]"><div className="ws-input-error">{errors.email.message}</div></div>)}
                            </div>
                            <div className="pb-[20px]">
                                <label 
                                    htmlFor="admin_pwd" 
                                    className="transition-all delay-75 block mb-[5px] font-ubuntu font-semibold text-[14px] md:text-[16px] text-zinc-700 dark:text-zinc-300"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        id="admin_pwd" 
                                        className="transition-all delay-75 block w-full font-noto_sans text-[14px] md:text-[16px] border-[1px] border-solid border-zinc-400 bg-white focus:outline-0 pl-[15px] pr-[40px] py-[8px] text-zinc-900 placeholder:text-zinc-400 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-200" 
                                        placeholder="Password"
                                        {...register("password")}
                                    />
                                    {
                                        showPassword ? 
                                        (<> <IoIosEyeOff size={20} className="transition-all delay-75 cursor-pointer text-zinc-700 hover:text-theme-color-2 absolute top-[10px] md:top-[11px] right-[10px] z-[2] dark:text-zinc-400 dark:hover:text-theme-color-2" onClick={() => setShowPassword(false)} /> </>) 
                                        : 
                                        (<> <IoIosEye size={20} className="transition-all delay-75 cursor-pointer text-zinc-700 hover:text-theme-color-2 absolute top-[10px] md:top-[11px] right-[10px] z-[2] dark:text-zinc-400 dark:hover:text-theme-color-2" onClick={() => setShowPassword(true)} /> </>)
                                    }
                                </div>
                                {errors.password && (<div className="pt-[2px]"><div className="ws-input-error">{errors.password.message}</div></div>)}
                            </div>
                            <div className="py-[10px] pb-[20px]">
                                <button type="submit" title="Login" className="transition-all delay-75 block w-full concard px-[15px] py-[8px] text-center text-white font-noto_sans text-[14px] md:text-[16px] hover:shadow-lg">
                                    Login
                                </button>
                            </div>
                            <div className="text-center">
                                <Link href="/" title="Visit Site" target="_blank" className="flex gap-x-[5px] justify-center items-center text-theme-color-1 dark:text-theme-color-2 hover:underline">
                                    <BiLinkExternal size={20} className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
                                    <div className="font-noto_sans text-[16px] md:text-[18px] font-semibold">
                                        Visit Site
                                    </div>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;