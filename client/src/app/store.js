import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../app/loginSlice'

export default configureStore({
    reducer: {
        login: loginReducer
    }
})