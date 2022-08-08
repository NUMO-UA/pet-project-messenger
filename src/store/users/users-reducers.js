import { createReducer } from "@reduxjs/toolkit"


const initialState = {
    usersData: []
}

export const userReducerData = createReducer([], (builder) => {
    builder
        .addCase('ADD_USERS', (state, action) => {
            return {
                ...state,
                usersData: action.users 
            }
        })
        return initialState
      })