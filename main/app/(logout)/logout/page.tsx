'use client';

import { deleteCookie } from "cookies-next";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

function Page() {

    const handleLogout = () => {
        signOut();
        deleteCookie("is_auth_user");
        let st = setTimeout(() => {
            window.location.href = "/";
            clearTimeout(st);
        }, 1000);
    }

    useEffect(() => {
        handleLogout();
    }, [handleLogout]);

    return (
        <>
            <section className="flex items-center justify-center min-h-screen p-[20px]">
                <h1 className="transition-all delay-75 font-ubuntu font-thin text-zinc-900 text-[25px] md:text-[30px]">
                    Logging out ...
                </h1>
            </section>
        </>
    )
}

export default Page;