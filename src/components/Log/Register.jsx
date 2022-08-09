import {useDispatch} from 'react-redux';
import { onRegister } from 'store/auth/auth-actions';
import SignUp from './SignUp';

const Register = () => {
    
    const dispatch = useDispatch();

    const handleRegister = (email, password) => {
        dispatch(onRegister(email, password))
    }

    return (
        <SignUp
            title="register"
            handleClick={handleRegister}
        />
    )
}

export {Register}
