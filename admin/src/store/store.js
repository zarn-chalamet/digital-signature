import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import templateReducer from '../features/templateSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        template: templateReducer
    }
})

export default store