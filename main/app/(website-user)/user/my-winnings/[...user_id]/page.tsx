import UserAreaWinningCard from "@/app/components/userAreaWinningCard";
import { FaTrophy } from "react-icons/fa6";


export default function Page() {
    return (
        <>
            <div className="py-[25px]">
                <div className="grid gap-[20px] grid-cols-1 md:grid-cols-2 xl-s1:grid-cols-3">
                    <UserAreaWinningCard
                        winning_type={1} 
                        winning_possition_text={1} 
                        winning_type_text="rd" 
                        winning_description="You scored 6000 in this month. You won 2rd winner prize. You will get paytm cashback upto rupees 500. You will receive email for further details." 
                        winning_date="01-06-2024" 
                    />
                </div>
            </div>
        </>
    )
}