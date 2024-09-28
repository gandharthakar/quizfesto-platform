'use client';

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

interface JWTDec {
    is_auth_user: string,
    exp: number,
    iat: number
}

export default function Page() {

    const router = useRouter();
    const params = useParams();
    const user_id = params.user_id[0];

    let gau = getCookie('is_auth_user');
    if(gau) {
        let user_id_ck: JWTDec = jwtDecode(gau);
        let fin_uid = user_id_ck.is_auth_user;
        if(user_id !== fin_uid) {
            router.push('/logout');
        }
    }

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const validationSchema = z.object({
        full_name: z.string({
			required_error: "Please enter Full Name",
			invalid_type_error: "Full Name must be in string format."
		}).min(10, {message: "Full name must be contains at least 10 characters."}),

        email: z.string({
			required_error: "Please enter email address.",
			invalid_type_error: "Email must be in string format."
		}).email({
			message: "Please enter valid email address."
		}).min(1),
    });

    type validationSchema = z.infer<typeof validationSchema>;

    const { register, handleSubmit, setValue, formState: { errors }} = useForm<validationSchema>({
		resolver: zodResolver(validationSchema),
	});

    const handleFormSubmit: SubmitHandler<validationSchema> = async (formdata) => {
        setIsLoading(true);
        let baseURI = window.location.origin;
        const resp = await fetch(`${baseURI}/api/site/auth-user/update-single-user/general`, {
            method: 'POST',
            body: JSON.stringify({ user_id, user_full_name: formdata.full_name, user_email: formdata.email })
        });
        let body = await resp.json();
        if(body.success) {
            Swal.fire({
                title: "Success!",
                text: body.message,
                icon: "success",
                timer: 4000
            });
            //this will reload the page without doing SSR
            router.refresh();
            setIsLoading(false);
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

    //eslint-disable-next-line
    const getUser = async () => {
        let baseURI = window.location.origin;
        const resp = await fetch(`${baseURI}/api/site/auth-user/get-single-user`, {
            method: 'POST',
            body: JSON.stringify({ user_id })
        });
        let body = await resp.json();
        if(body.success) {
            setValue("full_name", body.user.user_full_name);
            setValue("email", body.user.user_email);
            setIsLoading(false);
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

    useEffect(() => {
        getUser();
    //eslint-disable-next-line
    }, []);

    // useEffect(() => {
    //     setValue("full_name", fullName??'');
    //     setValue("email", email??'');
    // //eslint-disable-next-line
    // }, [fullName]);

    return (
        <>
            <div className="pt-[25px] lg:pt-0">
                <div className="transition-all delay-75 bg-white border-[2px] border-solid border-zinc-300 px-[20px] py-[20px] md:px-[40px] md:py-[30px] lg:max-w-[800px] dark:bg-zinc-950 dark:border-zinc-700">
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="pb-[15px]">
                            <label 
                                htmlFor="uasp-gsfn" 
                                className="block transition-all delay-75 font-ubuntu font-semibold text-[16px] md:text-[18px] text-zinc-800 dark:text-zinc-300 mb-[5px]"
                            >
                                Full Name
                            </label>
                            <input 
                                type="text" 
                                id="uasp-gsfn" 
                                className="ws-input-m1" 
                                autoComplete="off" 
                                {...register("full_name")}
                            />
                            {errors.full_name && (<div className="ws-input-error">{errors.full_name.message}</div>)}
                        </div>
                        <div className="pb-[15px] hidden">
                            <label 
                                className="block transition-all delay-75 font-ubuntu font-semibold text-[16px] md:text-[18px] text-zinc-800 dark:text-zinc-300 mb-[5px]"
                            >
                                Username
                            </label>
                            <div className="block transition-all delay-75 px-[15px] py-[8px] text-[16px] md:text-[18px] font-noto_sans font-semibold border border-solid border-zinc-100 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-800">
                                amitthakur224
                            </div>
                        </div>
                        <div className="pb-[15px]">
                            <label 
                                htmlFor="uasp-gseml" 
                                className="block transition-all delay-75 font-ubuntu font-semibold text-[16px] md:text-[18px] text-zinc-800 dark:text-zinc-300 mb-[5px]"
                            >
                                Email
                            </label>
                            <input 
                                type="email" 
                                id="uasp-gseml" 
                                className="ws-input-m1" 
                                autoComplete="off" 
                                {...register("email")}
                            />
                            {errors.email && (<div className="ws-input-error">{errors.email.message}</div>)}
                        </div>
                        <div className="text-right pt-[15px]">
                            {
                                isLoading ? 
                                (<div className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-800 dark:text-zinc-200 font-semibold">Loading...</div>) 
                                : 
                                (
                                    <button type="submit" title="Save Changes" className="ws-button-m1">
                                        Save Changes
                                    </button>
                                )
                            }                            
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}