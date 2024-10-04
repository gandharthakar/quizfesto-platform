import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";
// import { dump_quiz_data } from "@/app/constant/datafaker";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Respo {
    success: boolean,
    message: string,
    quiz_coorect_answers_count: number,
    quiz_total_score: number
}

interface QuizGivenAns {
    question_id: string,
    user_choosen_option: string,
    question_marks: number
}

interface QuizQues {
    question_id: string,
    correct_option: string
}

function countCorrectAnswers(questions: QuizQues[], answers: QuizGivenAns[]) {
    // Initialize a counter for correct answers
    let correctCount = 0;
    let totalMarks = 0;
    let arr = [];

    // Loop through each user answer
    for (const answer of answers) {
        const questionId = answer.question_id;
        const userOptionId = answer.user_choosen_option;

        // Find the corresponding question object
        const matchingQuestion = questions.find(question => question.question_id === questionId);

        // Check if question exists and user option matches correct answer
        if (matchingQuestion && matchingQuestion.correct_option === userOptionId) {
            correctCount++;
            arr.push(answer);
        }
    }

    for (const mark of arr) {
        totalMarks += mark.question_marks;
    }

    return {
        correct_answers: correctCount,
        total_mark: totalMarks
    };
}

const getCorrectOption = async (qid: string) => {
    const qdata = await prisma.qF_Option.findFirst({
        where: {
            questionid: qid
        },
        select: {
            correct_option: true
        }
    });
    return qdata?.correct_option;
}

export async function POST(req: Request) {
    let resp: Respo = {
        success: false,
        message: '',
        quiz_coorect_answers_count: 0,
        quiz_total_score: 0
    }
    let sts:number = 400;

    try {

        const body = await req.json();
        let { attempted_data, quiz_id } = body;

        if(attempted_data.length > 0 && quiz_id) {

            let qdata = await prisma.qF_Question.findMany({
                where: {
                    quizid: quiz_id
                }
            });

            let qArrData: QuizQues[] = [];
            for(let i = 0; i < qdata.length; i++) {
                let obj = {
                    question_id: qdata[i].question_id,
                    correct_option: await getCorrectOption(qdata[i].question_id)??""
                }
                qArrData.push(obj);
            }

            let data = countCorrectAnswers(qArrData, attempted_data);
            sts = 200;
            resp = {
                success: true,
                message: "Requested Data Received.",
                quiz_coorect_answers_count: data.correct_answers,
                quiz_total_score: data.total_mark
            }
        } else {
            sts = 400;
            resp = {
                success: false,
                message: "Requested Data Not Provided.",
                quiz_coorect_answers_count: 0,
                quiz_total_score: 0
            }
        }
        return NextResponse.json(resp, {status: sts});
    } catch (error: any) {
        sts = 500;
        resp = {
            success: false,
            message: error.message,
            quiz_coorect_answers_count: 0,
            quiz_total_score: 0
        }
        return NextResponse.json(resp, {status: sts});
    }
}