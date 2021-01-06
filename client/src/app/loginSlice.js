import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        login: false,
        currUser: "",
        refreshed: true,
    },
    reducers: {
        successfulLogin: (state, action) => {
            state.login = true;
            state.currUser = action.payload;
            state.refreshed = false;
        },
        successfulLogout: state => {
            state.login = false;
            state.currUser = "";
            state.refreshed = false;
        },
        checkedLoginStatus: state => {
            state.refreshed = false;
        },
    }
})

export const { successfulLogin, successfulLogout, checkedLoginStatus } = loginSlice.actions;

export const checkLogin = state => state.login;

export default loginSlice.reducer