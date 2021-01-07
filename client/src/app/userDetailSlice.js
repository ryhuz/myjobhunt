import { createSlice } from '@reduxjs/toolkit'

export const userDetailSlice = createSlice({
    name: 'userDetail',
    initialState: {
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        /* other settings */
        expiryWarningWeeks: 0,
    },
    reducers: {
        storeUser: (state, action) => {
            let { username, email, firstname, lastname, expiryWarningWeeks } = action.payload;
            state.username = username;
            state.email = email;
            state.firstname = firstname;
            state.lastname = lastname;
            /* other settings */
            state.expiryWarningWeeks = expiryWarningWeeks;
        },
        logoutUser: (state) => {
            state.username = "";
            state.email = "";
            state.firstname = "";
            state.lastname = "";
        },
    }
})

export const { storeUser, logoutUser } = userDetailSlice.actions;

export const getName = state => {
    let name = {
        firstname: state.userDetail.firstname,
        lastname: state.userDetail.lastname,
    }
    return name;
}

export const expirySetting = state => state.userDetail.expiryWarningWeeks;

export default userDetailSlice.reducer
