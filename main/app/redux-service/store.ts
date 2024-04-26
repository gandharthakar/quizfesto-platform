'use client';

import { configureStore } from '@reduxjs/toolkit'

import themeModeReducer from './slices/theme-mode/themeSwitcherSlice';

const store = configureStore({
    reducer: {
        site_theme_mode: themeModeReducer
    },
    devTools: false,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;