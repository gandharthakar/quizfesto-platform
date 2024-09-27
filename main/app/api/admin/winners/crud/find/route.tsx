import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

// interface QF_Winning_Record {
//     user_id: string,
//     aggregate_score: number,
//     record_date: string,
//     record_time: string
// }

// interface WinUsrFrm {
//     winner_id: string, 
//     winner_type: number, 
//     winning_possition_text: string, 
//     winner_user_id?: string,
//     winner_date: string,
//     user_full_name: string,
//     winner_description: string,
//     user_profile_picture?: string
// }

interface Respo {
    success: boolean,
    message: string,
    winners?: any[]
}

const getWinner = (data: any[], minScore: number, maxScore: number, onlyMaxScore: boolean) => {
    // Function For Find User By Earlest Date.
    const findEarliestDateUsers = (records: any[]) => {
        // Get the current month and year
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Filter records for the current month
        const filteredRecords = records.filter(record => {
            const recordDate = new Date(record.record_date);
            return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
        });

        // Find the earliest date among filtered records
        let earliestDate = filteredRecords[0].record_date;
        filteredRecords.forEach(record => {
            if (new Date(record.record_date) < new Date(earliestDate)) {
                earliestDate = record.record_date;
            }
        });

        // Get users with the earliest date
        const earliestDateUsers = filteredRecords.filter(record => record.record_date === earliestDate);

        return earliestDateUsers;
    }

    // Function For Find User By Earlest Time.
    const findEarliestTimeUser = (records: any[]) => {
        // Get the current month and year
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Filter records for the current month
        const filteredRecords = records.filter(record => {
            const recordDate = new Date(record.record_date);
            return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
        });

        // Find the earliest time among filtered records
        let earliestTime = filteredRecords[0].record_time;
        filteredRecords.forEach(record => {
            if (new Date(`2000-01-01 ${record.record_time}`) < new Date(`2000-01-01 ${earliestTime}`)) {
                earliestTime = record.record_time;
            }
        });

        // Get the user with the earliest time
        const earliestTimeUser = filteredRecords.find(record => record.record_time === earliestTime);

        return earliestTimeUser;
    }

    const startDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        return `${year}-${month < 10 ? '0'+month : month}-01`;
    }

    const endDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const startDate = new Date(year, month, 1);
        return startDate.toISOString().slice(0, 10);
    }

    // Filter By Score.
    let fs = [];
    if(onlyMaxScore) {
        fs = data.filter((item) => item.aggregate_score > maxScore);
    } else {
        fs = data.filter((item) => (item.aggregate_score >= minScore && item.aggregate_score < maxScore));
    }
    // Filter By Date.
    let fd = fs.filter((item) => (item.record_date <= endDate() && item.record_date >= startDate()));
    // Check If found more than 1 Record only.
    if(fd.length > 1) {
        // Filter By Earliest date.
        let fde = findEarliestDateUsers(fd);
        // Filter By Earliest Time.
        let fte = findEarliestTimeUser(fde);
        return fte;
    } else {
        return fd;
    }
}

const convertDigitIn = (str: string) => {
    return str.split('-').reverse().join('-');
}

const prepScoreRecord = async (winData: any[], winType: number, WinTypeDscr: string) => {
    let obj = {};
    let c1: any = {};
    let alreadyExist = await prisma.qF_Winners.findFirst({
        where: {
            winner_type: winType
        }
    });
    if(alreadyExist !== null) {
        c1 = {
            winner_id: alreadyExist.winner_id,
            user_id: alreadyExist.user_id,
            winner_type: alreadyExist.winner_type,
            winner_date: convertDigitIn(alreadyExist.winner_date),
            winner_description: alreadyExist.winner_description
        };
    } else {
        c1 = await prisma.qF_Winners.create({
            data: {
                winner_type: winType,
                user_id: winData[0].user_id,
                winner_date: winData[0].record_date,
                winner_description: `You scored ${winData[0].aggregate_score} in this month.`
            }
        });
    }
    let ufn = await prisma.user.findFirst({ where: { user_id: c1.user_id }, select: { user_full_name: true } });
    let upp = await prisma.user.findFirst({ where: { user_id: c1.user_id }, select: { user_photo: true } });
    obj = {
        winner_id: c1.winner_id,
        winner_type: winType,
        winning_position_text: WinTypeDscr,
        user_id: c1.winner_user_id,
        winner_date: convertDigitIn(c1.winner_date),
        user_full_name: ufn?.user_full_name,
        winner_description: c1.winner_description,
        user_profile_picture: upp?.user_photo
    }
    return obj;
}

export async function GET() {
    let resp: Respo = {
        success: false,
        message: '',
        winners: []
    }
    let sts:number = 400;

    try {

        const data = await prisma.aggrigate_Scores.findMany();
        if(data.length > 0) {
            let propData = data.map((item) => {
                return {
                    user_id: item.user_id??"",
                    aggregate_score: item.aggregate_score,
                    record_date: item.record_date,
                    record_time: item.record_time
                }
            });

            let first_winner = getWinner(propData, 0, 20000, true);
            let second_winner = getWinner(propData, 15000, 20000, false);
            let third_winner = getWinner(propData, 10000, 15000, false);
            
            let winner_1 = {};
            let winner_2 = {};
            let winner_3 = {};
            let arr: any = [];

            if(first_winner.length > 0) {
                winner_1 = await prepScoreRecord(first_winner, 1, 'st');
                arr.push(winner_1);
            }

            if(second_winner.length > 0) {
                winner_2 = await prepScoreRecord(second_winner, 2, 'nd');
                arr.push(winner_2);
            }

            if(third_winner.length > 0) {
                winner_3 = await prepScoreRecord(third_winner, 3, 'rd');
                arr.push(winner_3);
            }

            sts = 200;
            resp = {
                success: true,
                message: "Records Found!",
                winners: arr
            }
        } else {
            sts = 200;
            resp = {
                success: false,
                message: "No Records Found!"
            }
        }
        
        return NextResponse.json(resp, {status: sts});
    } catch (error: any) {
        sts = 500;
        resp = {
            success: false,
            message: error.message
        }
        return NextResponse.json(resp, {status: sts});
    }
}