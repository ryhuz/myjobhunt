import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        login: false,
        token: {},
    },
    reducers: {
        successfulLogin: (state, action) => {
            state.login = true;
            state.token = action.payload;
        },
        successfulLogout: state => {
            state.login = false;
            state.token = {};
        }
    }
})

export const { successfulLogin, successfulLogout } = loginSlice.actions;

export const checkLogin = state => state.login;

export default loginSlice.reducer