import {useSelector} from 'react-redux';

export function useAuth() {
    const {email, token, uid, } = useSelector(state => state.auth);
    return {
        isAuth: !!token ,  
        email,
        token,
        uid,
    };
}   
