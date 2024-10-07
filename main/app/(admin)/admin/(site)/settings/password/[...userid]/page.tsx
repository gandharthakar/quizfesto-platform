'use client';

import AdminSettingsNav from "@/app/components/admin/adminSettingsNav";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";

function Page() {

    const param = useParams();
    const AuthUser = param?.userid[0];
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfPassword, setShowConfPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    const handleFormSubmit: SubmitHandler<validationSchema> = async (formdata) => {
        setIsLoading(true);
        const baseURI = window.location.origin;
        const resp = await fetch(`${baseURI}/api/admin/auth-user/settings/password`, {
            method: 'POST',
            body: JSON.stringify({ user_id: AuthUser, password: formdata.password, confirm_password: formdata.confirmPassword })
        });
        const body = await resp.json();
        if(body.success) {
            Swal.fire({
                title: "Success!",
                text: body.message,
                icon: "success",
                timer: 4000
            });
            setIsLoading(false);
            reset();
        } else {
            Swal.fire({
                title: "Error!",
                text: body.message,
                icon: "error",
                timer: 4000
            });
            setIsLoading(false);
        }
    }

    return (
        <div className="pt-[15px] pb-[25px]">
            <div className="pb-[25px]">
                <AdminSettingsNav />
            </div>

            <div className="lg:max-w-[500px]">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="pb-[20px]">
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
                    <div className="pb-[20px]">
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
                    <div className="text-right">
                        {
                            isLoading ? 
                            (<div className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-800 dark:text-zinc-200 font-semibold">Loading...</div>) 
                            :
                            (
                                <button type="submit" title="Change Password" className="ws-button-m1">
                                    Change Password
                                </button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page;