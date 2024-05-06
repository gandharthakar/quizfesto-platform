
export default function Page() {
    return (
        <>
            <div className="py-[25px]">
                <div className="grid gap-[25px] grid-cols-1 md:grid-cols-2">
                    <div className="px-[15px] py-[25px] concard">
                        <div className="pb-[0px] text-center">
                            <h1 className="font-noto_sans text-[25px] md:text-[50px] font-bold text-white">
                                10
                            </h1>
                        </div>
                        <div className="text-center">
                            <h2 className="font-noto_sans text-[18px] md:text-[30px] font-medium text-white">
                                Total Participation
                            </h2>
                        </div>
                    </div>
                    <div className="px-[15px] py-[25px] concard">
                        <div className="pb-[0px] text-center">
                            <h1 className="font-noto_sans text-[25px] md:text-[50px] font-bold text-white">
                                0
                            </h1>
                        </div>
                        <div className="text-center">
                            <h2 className="font-noto_sans text-[18px] md:text-[30px] font-medium text-white">
                                Total Winnings
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}