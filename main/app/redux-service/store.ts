'use client';

import { configureStore } from '@reduxjs/toolkit'

import themeModeReducer from './slices/theme-mode/themeSwitcherSlice';
import userAreaMenuToggleReducer from './slices/user-area/userAreaMenuToggleSlice';

const store = configureStore({
    reducer: {
        site_theme_mode: themeModeReducer,
        user_area_menu_toggle: userAreaMenuToggleReducer
    },
    devTools: false,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;