import { FaTrophy } from "react-icons/fa";

interface UsrAraWinCrd {
    winning_type: string | number,
    winning_possition_text: string | number, 
    winning_type_text: string, 
    winning_description: string,
    winning_date: string,
}

function UserAreaWinningCard(props: UsrAraWinCrd) {

    const { 
        winning_type=3, 
        winning_possition_text=3, 
        winning_type_text="rd", 
        winning_description="-", 
        winning_date="-"
    } = props;

    const getWinTropyColorClass = () => {
        const tr_classes:string[] = ["text-amber-500", "text-gray-400", "text-orange-700"];
        let cls:string = '';
        switch (winning_type) {
            case 1 || "1":
                cls = tr_classes[0];
                break;
            case 2 || "2":
                cls = tr_classes[1];
                break;
            case 3 || "3":
                cls = tr_classes[2];
                break;
            default:
                cls = tr_classes[0];
                break;
        }
        console.log(cls);
        return cls;
    }

    return (
        <>
            <div className="transition-all delay-75 border-[2px] border-solid py-[25px] px-[25px] border-zinc-300 bg-white hover:border-zinc-600 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:border-zinc-400">
                <div className="pb-[15px]">
                    <div className="transition-all delay-75 flex items-center justify-center w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-zinc-100 rounded-full dark:bg-zinc-700">
                        <FaTrophy size={40} className={`transition-all delay-75 w-[30px] h-[30px] md:w-[40px] md:h-[40px] ${getWinTropyColorClass()}`} />
                    </div>
                </div>
                <div className="pb-0">
                    <h1 className="transition-all delay-75 font-noto_sans font-semibold text-[20px] md:text-[25px] text-zinc-900 dark:text-zinc-200">
                        {winning_possition_text}<sup>{winning_type_text}</sup> Winner
                    </h1>
                </div>
                <div className="pb-[10px]">
                    <p className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-400">
                        <span className="font-bold text-theme-color-2">!Congratulations,</span> {winning_description}
                    </p>
                </div>
                <div className="">
                    <p className="transition-all delay-75 font-noto_sans text-[14px] md:text-[16px] text-zinc-400">
                        <span className="font-bold text-zinc-500 dark:text-zinc-300">Winning Date :</span> {winning_date}
                    </p>
                </div>
            </div>
        </>
    )
}

export default UserAreaWinningCard;