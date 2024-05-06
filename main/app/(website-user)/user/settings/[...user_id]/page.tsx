'use client';

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Page() {

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

    const { register, handleSubmit, reset, formState: { errors }} = useForm<validationSchema>({
		resolver: zodResolver(validationSchema),
        defaultValues: {
            full_name: 'Amit Thakur',
            email: 'amitthakur2214@example.com'
        }
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
                        <div className="pb-[15px]">
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