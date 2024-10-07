'use client';

import WinnersUsersForm from "@/app/components/admin/winnersUsersForm";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface WinUsrFrm {
    winner_id: string, 
    winner_type: number, 
    winning_position_text: string, 
    user_id?: string,
    winner_date: string,
    user_full_name: string,
    winner_description: string,
    user_profile_picture?: string
}

function Page() {

    const [winnersData, setWinnersData] = useState<WinUsrFrm[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getWinners = async () => {
        setIsLoading(true);
        setWinnersData([]);
        const baseURI = window.location.origin;
        const resp = await fetch(`${baseURI}/api/admin/winners/crud/find`, {
            method: "GET",
            cache: 'no-store',
            next: { revalidate: 60 }
        });
        const body = await resp.json();
        if(body.success) {
            setIsLoading(false);
            setWinnersData(body.winners);
        } else {
            setIsLoading(false);
        }
    }

    const readWinners = async () => {
        const baseURI = window.location.origin;
        const resp = await fetch(`${baseURI}/api/admin/winners/bulk-actions/read-all`, {
            method: "GET",
            cache: 'no-store',
            next: { revalidate: 60 }
        });
        const body = await resp.json();
        if(body.success) {
            setIsLoading(false);
            setWinnersData(body.winners);
        } else {
            setIsLoading(false);
        }
    }

    const deleteWinners = async () => {
        const conf = confirm("Are you sure want to remove all winners ?");
        if(conf) {
            const baseURI = window.location.origin;
            const resp = await fetch(`${baseURI}/api/admin/winners/bulk-actions/remove-all`, {
                method: "DELETE"
            });
            const body = await resp.json();
            if(body.success) {
                Swal.fire({
                    title: "Success!",
                    text: body.message,
                    icon: "success",
                    timer: 3000
                });
                const set = setTimeout(() => {
                    window.location.reload();
                    clearTimeout(set);
                }, 3000);
            } else {
                Swal.fire({
                    title: "Error!",
                    text: body.message,
                    icon: "error",
                    timer: 3000
                });
            }
        }
    }

    useEffect(() => {
        readWinners();
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="py-[25px]">
                <div className="pb-[25px] flex items-center gap-[15px]">
                    <button 
                        type="button" 
                        title="Find Winner" 
                        className="transition-all delay-75 inline-block py-[8px] md:py-[10px] px-[15px] md:px-[25px] text-[16px] md:text-[18px] font-ubuntu font-semibold bg-theme-color-1 text-zinc-100" 
                        onClick={getWinners}
                    >
                        Find Winners
                    </button>
                    <button 
                        type="button" 
                        title="Remove All" 
                        className="transition-all delay-75 inline-block py-[8px] md:py-[10px] px-[15px] md:px-[25px] text-[16px] md:text-[18px] font-ubuntu font-semibold bg-red-600 text-zinc-100 hover:bg-red-700" 
                        onClick={deleteWinners}
                    >
                        Remove All
                    </button>
                </div>
                
                <div>
                    <div className="pb-[20px]">
                        
                        {
                            winnersData.length > 0 ? 
                            (
                                <>
                                    {
                                        winnersData.map((item) => (
                                            <div key={item.winner_id} className="pb-[20px] last:pb-0">
                                                <WinnersUsersForm 
                                                    winner_type={item.winner_type} 
                                                    winning_position_text={item.winning_position_text}
                                                    user_id={item.user_id} 
                                                    winner_date={item.winner_date}
                                                    user_full_name={item.user_full_name}
                                                    winner_description={item.winner_description} 
                                                    user_profile_picture={item.user_profile_picture}
                                                />
                                            </div>
                                        ))
                                    }
                                </>
                            ) 
                            : 
                            (
                                <>
                                    {
                                        isLoading ?
                                        (<div className="spinner size-1"></div>) 
                                        : 
                                        (
                                            <h1 className="transition-all delay-75 text-[16px] md:text-[18px] font-semibold text-zinc-800 dark:text-zinc-300">
                                                No Winners Found.
                                            </h1>
                                        )
                                    }
                                </>
                            )
                        }
                        
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Page;