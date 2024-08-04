'use client';

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { RootState } from "@/app/redux-service/store";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();
    const AuthUser = useSelector((state: RootState) => state.auth_user_id.auth_user_id);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>("");

    const validationSchema = z.object({
        phone_number: z.string({
            required_error: "Please enter phone number.",
			invalid_type_error: "Phone Number must be in numeric format."
        }).trim().min(10).max(13)
        .refine((value) => !isNaN(Number(value)), {
            message: 'Invalid phone number format (must be digits)',
        }),
    });

    type validationSchema = z.infer<typeof validationSchema>;

    const { register, handleSubmit, setValue, formState: { errors }} = useForm<validationSchema>({
		resolver: zodResolver(validationSchema),
	});

    const handleFormSubmit: SubmitHandler<validationSchema> = async (formdata) => {
        const resp = await fetch('http://localhost:3000/api/site/update-single-user/phone', {
            method: 'POST',
            body: JSON.stringify({ user_id: AuthUser, user_phone: formdata.phone_number })
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
        const resp = await fetch('http://localhost:3000/api/site/get-single-user', {
            method: 'POST',
            body: JSON.stringify({ user_id: AuthUser })
        });
        let body = await resp.json();
        setPhone(body.user_phone);
    }

    useEffect(() => {
        getUser();
        //eslint-disable-next-line
    }, [getUser]);

    useEffect(() => {
        setValue("phone_number", phone??'');
    //eslint-disable-next-line
    }, [phone]);

    return (
        <>
            <div className="pt-[25px] lg:pt-0">
                <div className="transition-all delay-75 bg-white border-[2px] border-solid border-zinc-300 px-[20px] py-[20px] md:px-[40px] md:py-[30px] lg:max-w-[800px] dark:bg-zinc-950 dark:border-zinc-700">
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="pb-[15px]">
                            <label 
                                htmlFor="uasp-gsephn" 
                                className="block transition-all delay-75 font-ubuntu font-semibold text-[16px] md:text-[18px] text-zinc-800 dark:text-zinc-300 mb-[5px]"
                            >
                                Phone Number
                            </label>
                            <input 
                                type="text" 
                                id="uasp-gsephn" 
                                className="ws-input-m1" 
                                autoComplete="off" 
                                {...register("phone_number")}
                            />
                            {errors.phone_number && (<div className="ws-input-error">{errors.phone_number.message}</div>)}
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