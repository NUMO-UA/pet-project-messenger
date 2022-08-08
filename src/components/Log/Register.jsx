import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import SignUp from './SignUp';
import { db } from 'firebase';
import { addDoc, collection } from 'firebase/firestore';
import { addUser } from 'store/auth/auth-actions';

const Register = () => {
    const dispatch = useDispatch();
    const {push} = useHistory();

    const handleRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user);
                dispatch(addUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));

                addDoc(collection(db, "users"), {
                    email: user.email,
                    uid: user.uid,
                  });


                push('/');
            })
            .catch(console.error)
    }

    return (
        <SignUp
            title="register"
            handleClick={handleRegister}
        />
    )
}

export {Register}
