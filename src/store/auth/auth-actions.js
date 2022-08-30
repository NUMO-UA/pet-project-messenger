import { ADD_USER } from "./auth.actionTypes"
import { REMOVE_USER } from "./auth.actionTypes"


import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { db } from 'firebase';
import { addDoc, collection } from 'firebase/firestore';


export const addUser = (user) => ({
    type: ADD_USER,
    email: user.email,
    token: user.token,
    uid: user.uid
})

export const removeUser = () => ({
    type: REMOVE_USER,    
    
})  

export const onLogin = (email, password) => {

    return async function(dispatch) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(addUser({
                    email: user.email,
                    uid: user.uid,
                    token: user.accessToken,
                }));
            })
            .catch(() => alert('Invalid user!'))
}
}

export const onRegister = (email, password) => {

    return async function(dispatch) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(addUser({
                    email: user.email,
                    uid: user.uid,
                    token: user.accessToken,
                }));

                addDoc(collection(db, "users"), {
                    email: user.email,
                    uid: user.uid,
                  });
            })
            .catch(console.error)
}
}


