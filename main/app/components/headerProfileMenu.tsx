'use client';

import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import Image from "next/image";

export default function HeaderProfileMenu() {

    let isUserLoggedIn:boolean = true;

    return (
        <>
            {
                isUserLoggedIn ? 
                (
                    <>
                        <Link href="/user/1" title="profile" className="transition-all delay-75 relative bg-white border border-solid border-zinc-800 w-[40px] h-[40px] text-[20px] rounded-full flex items-center justify-center font-noto_sans font-bold text-zinc-800">
                            <span className="uppercase">g</span>
                            <Image src="/images/testimonials/michael-davis.jpg" width={40} height={40} className="absolute left-0 top-0 w-full h-full rounded-full z-[2]" alt="photo" />
                        </Link>
                    </>
                ) 
                : 
                (
                    <>
                        {/* Desktop Login */}
                        <Link href="/sign-in" title="Login" className="transition-all delay-100 hidden md:inline-block bg-theme-color-1 text-white hover:bg-theme-color-1-hover-dark font-medium text-[16px] md:text-[18px] py-[5px] md:py-[10px] px-[20px] md:px-[35px] rounded-full">
							Sign In
						</Link>

                        {/* Mobile Login */}
                        <Link href="/sign-in" title="Login" className="transition-all delay-75 relative bg-white border border-solid border-zinc-800 w-[40px] h-[40px] text-[20px] rounded-full md:hidden flex items-center justify-center font-noto_sans font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-400 dark:hover:text-theme-color-2 dark:hover:border-theme-color-2">
                            <FaRegUser size={15} />
                        </Link>
                    </>
                )
            }
        </>
    )
}