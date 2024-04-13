import {createSlice} from "@reduxjs/toolkit"

export default createSlice({
    name: "register",
    
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        startRegister: (state, action) => {
            state.isFetching = true
        },
        registerSuccessful: (state, action) => {
            state.currentUser = action.payload,
            state.isFetching = false,
            state.error = false
        },
        registerFail: (state, action) => {
            state.isFetching = false,
            state.error = true
        }
    }
})