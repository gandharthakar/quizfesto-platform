'use client';

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Page() {

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

    const { register, handleSubmit, reset, formState: { errors }} = useForm<validationSchema>({
		resolver: zodResolver(validationSchema),
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
                            <button type="submit" title="Save Changes" className="ws-button-m1">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}