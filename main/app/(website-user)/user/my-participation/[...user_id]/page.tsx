'use client';

import MyParticipationCard from "@/app/components/myParticipationCard";
import SitePagination from "@/app/components/sitePagination";
// import { dump_my_participation } from "@/app/constant/datafaker";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

interface JWTDec {
    is_auth_user: string,
    exp: number,
    iat: number
}

interface MyPartCrd {
    user_participation_id: string,
    quiz_title: string,
    quiz_cover_photo: string,
    quiz_display_time: string,
    quiz_total_question: number,
    quiz_total_marks: number,
    quiz_estimated_time: string,
    quiz_time_taken: string,
    quiz_correct_answers_count: number,
    quiz_total_score: number
}

function GFG(array: any, currPage: number, pageSize: number) {
    const startIndex = (currPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}

export default function Page() {

    const router = useRouter();
    const params = useParams();
    const user_id = params.user_id[0];

    const gau = getCookie('is_auth_user');
    if(gau) {
        const user_id_ck: JWTDec = jwtDecode(gau);
        const fin_uid = user_id_ck.is_auth_user;
        if(user_id !== fin_uid) {
            router.push('/logout');
        }
    }

    const dataPerPage = 5;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [mpData, setMpData] = useState<MyPartCrd[]>([]);
    const [totalPages, setTotalPages] = useState<number>(Math.ceil(mpData.length / dataPerPage));
    const [mpListData, setMpListData] = useState<MyPartCrd[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setMpListData(GFG(mpData, newPage, dataPerPage));
    };

    const getParticipationData = async () => {
        const baseURI = window.location.origin;
        const resp = await fetch(`${baseURI}/api/site/auth-user/get-my-participation`, {
            method: "POST",
            body: JSON.stringify({ user_id }),
            cache: 'no-store',
            next: { revalidate: 60 }
        });
        const body = await resp.json();
        if(body.success) {
            setIsLoading(false);
            setMpData(body.participation_data);
            setTotalPages(Math.ceil(body.participation_data.length / dataPerPage));
            setMpListData(GFG(body.participation_data, currentPage, dataPerPage));
        } else {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getParticipationData();
    //eslint-disable-next-line
    }, []);

    return (
        <>
            <section className="py-[25px]">
                <div>
                    {
                        mpListData.length > 0 ? 
                        (
                            <>
                                {
                                    mpListData.map((item) => (
                                        <div className="pb-[20px] last:pb-0" key={item.user_participation_id} >
                                            <MyParticipationCard 
                                                quiz_title={item.quiz_title} 
                                                quiz_cover_photo={item.quiz_cover_photo} 
                                                quiz_display_time={item.quiz_display_time} 
                                                quiz_total_question={item.quiz_total_question} 
                                                quiz_total_marks={item.quiz_total_marks} 
                                                quiz_estimated_time={item.quiz_estimated_time} 
                                                quiz_time_taken={item.quiz_time_taken} 
                                                quiz_correct_answers_count={item.quiz_correct_answers_count} 
                                                quiz_total_score={item.quiz_total_score} 
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
                                            No Data Found.
                                        </h1>
                                    )
                                }
                            </>
                        )
                    }
                </div>

                <SitePagination 
                    totalPages={totalPages} 
                    dataPerPage={dataPerPage} 
                    currentPage={currentPage} 
                    parentClassList="pt-[50px]" 
                    onPageChange={handlePageChange} 
                />
            </section>
        </>
    )
}