import { createReducer } from "@reduxjs/toolkit";


export const authReduser = createReducer([], (builder) => {
    builder
      .addCase('ADD_USER', (state, action) => {
        return {
            ...state,
                email: action.email,
                token: action.token,
                uid: action.uid,
        }
      })
      .addCase('REMOVE_USER', (state, action) => {
        return {
            ...state,
                email: null,
                token: null,
                uid: null,
        }
      })
  })





