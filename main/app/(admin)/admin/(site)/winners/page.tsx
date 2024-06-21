'use client';

import WinnersUsersForm from "@/app/components/admin/winnersUsersForm";
import { useState } from "react";

function Page() {

    const [userTxtArW1, setUserTxtArW1] = useState<string>("");
    const [userTxtArW2, setUserTxtArW2] = useState<string>("");
    const [userTxtArW3, setUserTxtArW3] = useState<string>("");
    const [data, setData] = useState();

    return (
        <>
            <div className="py-[25px]">
                <div className="pb-[25px]">
                    <button 
                        type="button" 
                        title="Find Winner" 
                        className="transition-all delay-75 inline-block py-[8px] md:py-[15px] px-[15px] md:px-[25px] text-[16px] md:text-[18px] font-ubuntu font-semibold bg-theme-color-1 text-zinc-100"
                    >
                        Find Winners
                    </button>
                </div>
                <div>
                    <div className="pb-[20px] last:pb-0">
                        <WinnersUsersForm 
                            user_winner_type="1" 
                            user_win_possition_text="st" 
                            user_full_name="Amit Jain" 
                            user_profile_picture="" 
                            user_winning_date="21-06-2024" 
                            user_descr_value={userTxtArW1} 
                            user_descr_onChange={setUserTxtArW1} 
                        />
                    </div>
                    <div className="pb-[20px] last:pb-0">
                        <WinnersUsersForm 
                            user_winner_type="2" 
                            user_win_possition_text="nd" 
                            user_full_name="Gaurav Pawar" 
                            user_profile_picture="" 
                            user_winning_date="21-06-2024" 
                            user_descr_value={userTxtArW2} 
                            user_descr_onChange={setUserTxtArW2} 
                        />
                    </div>
                    <div className="pb-[20px] last:pb-0">
                        <WinnersUsersForm 
                            user_winner_type="3" 
                            user_win_possition_text="rd" 
                            user_full_name="Shaila Kumari" 
                            user_profile_picture="/images/testimonials/sarah-johnson.jpg" 
                            user_winning_date="21-06-2024" 
                            user_descr_value={userTxtArW3} 
                            user_descr_onChange={setUserTxtArW3} 
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;