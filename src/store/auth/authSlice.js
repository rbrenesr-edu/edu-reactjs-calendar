import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //*  authenticate  not-authenticate,
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },

        onLogin: (state, { payload }) => {
            state.status = 'authenticate';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticate';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessages:(state)=>{
            state.errorMessage = undefined;
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    onChecking,
    onLogin,
    onLogout,
    clearErrorMessages,
} = authSlice.actions;