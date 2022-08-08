import { db } from "firebase";
import { collection, getDocs } from "firebase/firestore";

import { ADD_USERS } from "./users.actionTypes"

export const addUsers = (users) => ({
    type: ADD_USERS,
    users,
    
    
})  


export const fetchUsers = (uid) => {
    return async function(dispatch) {
    const users = await getDocs(collection(db, "users"));

    dispatch(addUsers(
        users.docs
            .map((doc) => doc.data())
            .filter((obj) => obj.uid !== uid)
    ))
    
}
}