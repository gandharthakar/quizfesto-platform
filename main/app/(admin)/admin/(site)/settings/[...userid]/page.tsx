'use client';

import AdminSettingsNav from "@/app/components/admin/adminSettingsNav";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

function Page() {

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
        <div className="pt-[15px] pb-[25px]">
            <div className="pb-[25px]">
                <AdminSettingsNav />
            </div>

            <div className="lg:max-w-[500px]">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="pb-[20px]">
                        <input 
                            type="text" 
                            id="uasp-gsfn" 
                            className="ws-input-m1" 
                            autoComplete="off" 
                            placeholder="Full Name" 
                            {...register("full_name")}
                        />
                        {errors.full_name && (<div className="ws-input-error">{errors.full_name.message}</div>)}
                    </div>
                    <div className="pb-[20px]">
                        <input 
                            type="email" 
                            id="uasp-gseml" 
                            className="ws-input-m1" 
                            autoComplete="off" 
                            placeholder="Email" 
                            {...register("email")}
                        />
                        {errors.email && (<div className="ws-input-error">{errors.email.message}</div>)}
                    </div>
                    <div className="text-right">
                        <button type="submit" title="Save Changes" className="ws-button-m1">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page;