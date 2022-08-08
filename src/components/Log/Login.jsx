import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import SignIn from './SignIn';
import { addUser } from 'store/auth/auth-actions';


const Login = () => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const handleLogin = (email, password) => {
        console.log(email, password)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(addUser({
                    email: user.email,
                    uid: user.uid,
                    token: user.accessToken,
                }));

                push('/');
            })
            .catch(() => alert('Invalid user!'))
    }

    return (
            <SignIn
                title="sign in"
                handleClick={handleLogin}
            />
    )
}

export { Login }
