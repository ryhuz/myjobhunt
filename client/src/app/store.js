import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../app/loginSlice'
import userDetailReducer from '../app/userDetailSlice'
import huntSlice from '../app/huntSlice'

export default configureStore({
    reducer: {
        login: loginReducer,
        userDetail: userDetailReducer,
        hunt: huntSlice,
    }
})