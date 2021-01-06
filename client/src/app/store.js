import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../app/loginSlice'
import userDetailReducer from '../app/userDetailSlice'

export default configureStore({
    reducer: {
        login: loginReducer,
        userDetail: userDetailReducer,
    }
})