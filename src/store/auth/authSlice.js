import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //*checking  authenticate  not-authenticate,
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

export const {
    onChecking,
    onLogin,
    onLogout,
    clearErrorMessages,
} = authSlice.actions;