'use client';

import AdminSettingsNav from "@/app/components/admin/adminSettingsNav";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";

function Page() {

    const param = useParams();
    let AuthUser = param?.userid[0];
    const [usrName, setUsrName] = useState<string>('');
    const [usrEmail, setUsrEmail] = useState<string>('');
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
        defaultValues: {
            full_name: 'Amit Thakur',
            email: 'amitthakur2214@example.com'
        }
	});

    const handleFormSubmit: SubmitHandler<validationSchema> = async (formdata) => {
        setIsLoading(true);
        let baseURI = window.location.origin;
        const resp = await fetch(`${baseURI}/api/admin/auth-user/settings/general/set`, {
            method: 'POST',
            body: JSON.stringify({ user_id: AuthUser, user_full_name: formdata.full_name, user_email: formdata.email })
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
            // router.refresh();
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
        setIsLoading(true);
        let baseURI = window.location.origin;
        const resp = await fetch(`${baseURI}/api/admin/auth-user/settings/general/get`, {
            method: 'POST',
            body: JSON.stringify({ user_id: AuthUser })
        });
        let body = await resp.json();
        if(body.success) {
            setUsrName(body.user_full_name);
            setUsrEmail(body.user_email);
        }
    }

    useEffect(() => {
        getUser();
        setIsLoading(false);
        //eslint-disable-next-line
    }, [getUser]);

    useEffect(() => {
        setValue("full_name", usrName??"");
        setValue("email", usrEmail??"");
        //eslint-disable-next-line
    }, [usrName]);

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
    )
}

export default Page;