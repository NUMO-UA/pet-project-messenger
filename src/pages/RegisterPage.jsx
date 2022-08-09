import {Redirect} from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';
import { Register } from 'components/Log/Register';

export const RegisterPage = () => {
    
    const {isAuth} = useAuth(); 


    return isAuth ? (
        <Redirect to="/" />
    ) : (
        <div>
            <Register />      
        </div>
    )
}

