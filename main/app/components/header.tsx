'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitchHeaderDesktop from './themeSwitchHeaderDesktop';
import { FiMenu } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { useState } from 'react';
import HeaderProfileMenu from './headerProfileMenu';

interface CompProp {
    isSticky?: boolean
}

export default function Header(props: CompProp) {

    let { isSticky=true } = props;
    let pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <>
            <div className={`top-[20px] left-[15px] menu-ms-1:top-[25px] z-[20] ${isSticky ? 'fixed' : 'absolute'}`}>
                <Link href="/" title="QuizFesto Home">
                    <Image src="images/quizfesto-logo-final.svg" alt="logo" width="180" height="38" className="w-[135px] h-[28px] menu-ms-1:w-[180px] menu-ms-1:h-[38px]" priority={true} />
                </Link>
            </div>

            <nav className={`top-[65px] menu-ms-1:top-[20px] left-0 menu-ms-1:left-1/2 menu-ms-1:translate-x-[-50%] border-[2px] border-solid border-zinc-800 bg-white py-[12px] menu-ms-1:py-[7px] px-[0px] menu-ms-1:px-[20px] z-[20] w-full menu-ms-1:w-auto rounded-sm menu-ms-1:rounded-full dark:bg-zinc-800 dark:border-zinc-500 ${isSticky ? 'fixed' : 'absolute'} ${isMenuOpen ? 'block menu-ms-1:block' : 'hidden menu-ms-1:block'}`}>
                <ul className="site-nav menu-ms-1:whitespace-nowrap flex flex-col menu-ms-1:flex-row gap-x-0 menu-ms-1:gap-x-8 gap-y-[15px] menu-ms-1:gap-y-0">
                    <li className="w-full menu-ms-1:w-auto px-[20px] menu-ms-1:px-0">
                        <Link href="/" title="Home" className={`block font-ubuntu font-medium text-[16px] menu-ms-1:text-[20px] text-zinc-800 hover:text-theme-color-2 dark:hover:text-theme-color-2 hover:before:bg-theme-color-2 dark:text-zinc-300 ${pathname === '/' ? 'active' : ''}`}>
                            Home
                        </Link>
                    </li>
                    <li className="w-full menu-ms-1:w-auto px-[20px] menu-ms-1:px-0">
                        <Link href="/all-quizzes" title="All Quizzes" className={`block font-ubuntu font-medium text-[16px] menu-ms-1:text-[20px] text-zinc-800 hover:text-theme-color-2 dark:hover:text-theme-color-2 hover:before:bg-theme-color-2 dark:text-zinc-300 ${pathname === '/all-quizzes' ? 'active' : ''}`}>
                            All Quizzes
                        </Link>
                    </li>
                    <li className="w-full menu-ms-1:w-auto px-[20px] menu-ms-1:px-0">
                        <Link href="/about" title="About" className={`block font-ubuntu font-medium text-[16px] menu-ms-1:text-[20px] text-zinc-800 hover:text-theme-color-2 dark:hover:text-theme-color-2 hover:before:bg-theme-color-2 dark:text-zinc-300 ${pathname === '/about' ? 'active' : ''}`}>
                            About
                        </Link>
                    </li>
                    <li className="w-full menu-ms-1:w-auto px-[20px] menu-ms-1:px-0">
                        <Link href="/faqs" title="FAQs" className={`block font-ubuntu font-medium text-[16px] menu-ms-1:text-[20px] text-zinc-800 hover:text-theme-color-2 dark:hover:text-theme-color-2 hover:before:bg-theme-color-2 dark:text-zinc-300 ${pathname === '/faqs' ? 'active' : ''}`}>
                            FAQs
                        </Link>
                    </li>
                    <li className="w-full menu-ms-1:w-auto px-[20px] menu-ms-1:px-0">
                        <Link href="/contact" title="Contact Us" className={`block font-ubuntu font-medium text-[16px] menu-ms-1:text-[20px] text-zinc-800 hover:text-theme-color-2 dark:hover:text-theme-color-2 hover:before:bg-theme-color-2 dark:text-zinc-300 ${pathname === '/contact' ? 'active' : ''}`}>
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className={`top-[13px] menu-ms-1:top-[20px] right-[15px] z-[20] ${isSticky ? 'fixed' : 'absolute'}`}>
                <div className="flex gap-x-[10px] items-center">
                    <div>
                        <HeaderProfileMenu />
                    </div>
                    {/* <div className="hidden menu-ms-1:block"> */}
                    <div className="">
                        <ThemeSwitchHeaderDesktop />
                    </div>
                    <div className="block menu-ms-1:hidden">
                        <button 
                            type="button" 
                            title="Toggle Menu" 
                            className="transition-all delay-75 bg-white border border-solid border-zinc-800 w-[35px] h-[35px] rounded-full flex items-center justify-center text-zinc-800 hover:text-theme-color-2 hover:border-theme-color-2 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-400 dark:hover:text-theme-color-2 dark:hover:border-theme-color-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {
                                isMenuOpen ? 
                                (
                                    <MdOutlineClose size={25} />
                                ) 
                                : 
                                (
                                    <FiMenu size={20} />
                                )
                            }
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}