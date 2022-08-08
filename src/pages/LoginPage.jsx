import { Redirect } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';

import { Login } from 'components/Log/Login';

export const LoginPage = () => {

    const { isAuth } = useAuth();
    
    return isAuth ? (
        <Redirect to="/" />
    ) : (
        <Login />
    )
}

