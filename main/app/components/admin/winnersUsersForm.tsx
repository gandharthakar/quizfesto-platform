'use client';

import Image from "next/image";

interface WinUsrFrm {
    user_winner_type?: string | number, 
    user_win_possition_text?: string, 
    user_full_name: string, 
    user_profile_picture?: string, 
    user_winning_date?: string, 
    user_descr_value?: string,
    user_descr_onChange?: any,
}

function WinnersUsersForm(props: WinUsrFrm) {

    const { 
        user_winner_type=1, 
        user_win_possition_text, 
        user_full_name, 
        user_profile_picture, 
        user_winning_date="-", 
        user_descr_value, 
        user_descr_onChange 
    } = props;

    return (
        <>
            <div className="transition-all delay-75 border-[2px] border-solid p-[15px] border-zinc-300 bg-white hover:border-zinc-600 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:border-zinc-400">
                <div className="flex gap-x-[20px] gap-y-[10px] items-start flex-col md:flex-row">
                    <div className="pb-0">
                        <div className="flex items-center justify-center relative w-[80px] md:w-[150px] h-[80px] md:h-[150px] font-ubuntu text-[30px] md:text-[40px] bg-zinc-200 dark:bg-zinc-600 rounded-full dark:text-zinc-200">
                            <span className="uppercase">{user_full_name.charAt(0)}</span>
                            {user_profile_picture && (<Image src={user_profile_picture} width={100} height={100} className="w-full h-full absolute left-0 top-0 z-[4] rounded-full" alt="photo" priority={true} />)}
                        </div>
                        <div className="pt-[10px] text-left md:text-center">
                            <h6 className="transition-all delay-75 inline-block font-noto_sans text-[16px] md:text-[18px] font-semibold text-zinc-800 dark:text-zinc-200">
                                {user_winner_type}<sup>{user_win_possition_text}</sup> Winner.
                            </h6>
                        </div>
                    </div>
                    <div className="w-full md:flex-1">
                        <div className="pb-[10px]">
                            <h2 className="transition-all delay-75 font-noto_sans text-[10px] md:text-[12px] text-zinc-900 dark:text-zinc-300">
                                Name
                            </h2>
                            <h1 className="transition-all delay-75 block font-ubuntu text-[16px] md:text-[18px] font-semibold text-zinc-800 dark:text-zinc-100">
                                {user_full_name}
                            </h1>
                        </div>
                        <div className="pb-[10px]">
                            <h2 className="transition-all delay-75 font-noto_sans text-[10px] md:text-[12px] text-zinc-900 dark:text-zinc-300">
                                Winning Date
                            </h2>
                            <h1 className="transition-all delay-75 block font-ubuntu text-[16px] md:text-[18px] font-semibold text-zinc-800 dark:text-zinc-100">
                                {user_winning_date}
                            </h1>
                        </div>
                        <div className="pb-[10px]">
                            <h2 className="transition-all delay-75 font-noto_sans text-[10px] md:text-[12px] text-zinc-900 dark:text-zinc-300">
                                Winning Description
                            </h2>
                            <h1 className="pt-[10px]">
                                <textarea 
                                    className="ws-input-pwd-m1-v1" 
                                    rows={3} 
                                    value={user_descr_value} 
                                    onChange={(e) => user_descr_onChange(e.target.value)} 
                                ></textarea>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WinnersUsersForm;