'use client';

import { createSlice } from "@reduxjs/toolkit";

type QuizAns = {
    question_id: string,
    user_choosen_option: string,
    question_marks: number
}

interface AnswObj {
    quiz_id: string,
    quiz_title: string,
    quiz_cover_photo: string,
    quiz_total_question: number,
    time_taken: string,
    attempted_data: QuizAns[],
    quiz_total_marks: number,
    quiz_estimated_time: string,
    quiz_display_time: string,
}

let initialState:AnswObj = {
    quiz_id: '',
    quiz_title: '',
    quiz_cover_photo: '',
    quiz_total_question: 0,
    time_taken: '',
    attempted_data: [],
    quiz_total_marks: 0,
    quiz_estimated_time: '',
    quiz_display_time: ''
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
                quiz_id: '',
                quiz_title: '',
                quiz_cover_photo: '',
                quiz_total_question: 0,
                time_taken: '',
                attempted_data: arr,
                quiz_total_marks: 0,
                quiz_estimated_time: '',
                quiz_display_time: ''
            };
            return state;
        },
    }
});

export const { set_tqd, clear_tqd } = transferQuizDataReducer.actions;

export default transferQuizDataReducer.reducer;