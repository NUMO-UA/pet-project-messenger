import SignIn from './SignIn';
import { onLogin } from 'store/auth/auth-actions';
import { useDispatch } from 'react-redux';


const Login = () => {
    
    const dispatch = useDispatch();
    
    const handleLogin = (email, password) => {
        dispatch(onLogin(email, password))
    }

    return (
            <SignIn
                title="sign in"
                handleClick={handleLogin}
            />
    )
}

export { Login }
