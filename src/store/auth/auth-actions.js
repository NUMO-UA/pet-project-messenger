import { ADD_USER } from "./auth.actionTypes"
import { REMOVE_USER } from "./auth.actionTypes"

export const addUser = (user) => ({
    type: ADD_USER,
    email: user.email,
    token: user.token,
    uid: user.uid
})

export const removeUser = () => ({
    type: REMOVE_USER,    
    
})  



