import { createReducer } from "@reduxjs/toolkit";



export const conversationReducerData = createReducer([], (builder) => {
    builder
        .addCase('ADD_RECEVIER', (state, action) => {
            return {
                ...state,
                receiverData: action.receiver
            }
        })
        .addCase('ADD_CONVERSATIONID', (state, action) => {
            return {
                ...state,
                conversationIdData: action.ConversationId
            }
        })
        .addCase('GET_MESSAGES', (state, action) => {
            return {
                ...state,
                messages: action.messages
            }
        })
      })
      
