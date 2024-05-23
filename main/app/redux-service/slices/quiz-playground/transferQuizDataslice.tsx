'use client';

import { createSlice } from "@reduxjs/toolkit";

type QuizAns = {
    question_id: string,
    user_choosen_option_id: string,
    question_marks: number | string
}

interface AnswObj {
    time_taken: string,
    attempted_data: QuizAns[],
    quiz_total_marks: string | number,
    quiz_estimated_time: string,
}

let initialState:AnswObj = {
    time_taken: '',
    attempted_data: [],
    quiz_total_marks: '',
    quiz_estimated_time: '',
};

const transferQuizDataReducer = createSlice({
    name: "transfer_quiz_data",
    initialState,
    reducers: {
        set_tqd: (state, actions) => {
            state = actions.payload;
            return state;
        },
        clear_tqd: (state) => {
            let arr:QuizAns[] = [];
            state = {
                time_taken: '',
                attempted_data: arr,
                quiz_total_marks: '',
                quiz_estimated_time: '',
            };
            return state;
        },
    }
});

export const { set_tqd, clear_tqd } = transferQuizDataReducer.actions;

export default transferQuizDataReducer.reducer;