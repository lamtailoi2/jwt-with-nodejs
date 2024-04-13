import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../Components/Register/registerSlice.js"

export const store = configureStore({
    reducer: {
        authReducer: authSlice.reducer
    }
})

