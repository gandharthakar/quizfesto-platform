'use client';

import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Page() {

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

    return (
        <>
            <div className="pt-[25px] lg:pt-0">
                <div className="transition-all delay-75 bg-white border-[2px] border-solid border-zinc-300 px-[20px] py-[20px] md:px-[40px] md:py-[30px] lg:max-w-[800px] dark:bg-zinc-950 dark:border-zinc-700">
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="pb-[15px]">
                            <label 
                                htmlFor="uasp-gspwd" 
                                className="block transition-all delay-75 font-ubuntu font-semibold text-[16px] md:text-[18px] text-zinc-800 dark:text-zinc-300 mb-[5px]"
                            >
                                New Password
                            </label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="uasp-gspwd" 
                                    className="ws-input-pwd-m1" 
                                    autoComplete="off" 
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
                        <div className="pb-[15px]">
                            <label 
                                htmlFor="uasp-gscnfpwd" 
                                className="block transition-all delay-75 font-ubuntu font-semibold text-[16px] md:text-[18px] text-zinc-800 dark:text-zinc-300 mb-[5px]"
                            >
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input 
                                    type={showConfPassword ? "text" : "password"} 
                                    id="uasp-gscnfpwd" 
                                    className="ws-input-pwd-m1" 
                                    autoComplete="off" 
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
                        <div className="text-right pt-[15px]">
                            <button type="submit" title="Change Password" className="ws-button-m1">
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}