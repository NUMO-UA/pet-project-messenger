import { Redirect } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';



import ChatHeads from 'components/Chat/chatheads/ChatHeads';
import Conversation from 'components/Chat/conversation/Conversation';

import "./HomePage.css";
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from 'store/users/users-actions';
import { selectVisibleCUsers } from 'store/users/users-selectors';




export const HomePage = (props) => {

    const dispatch = useDispatch();

    const [search, setSearch] = useState('');

    const { isAuth, uid } = useAuth();

    const items = useSelector(state => selectVisibleCUsers(state, { search }))

    const handleSearch = useCallback((value) => {

        setSearch(value)

    },[])

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchUsers(uid));
        }
    }, [isAuth, dispatch, uid])


    return isAuth ? (
        <div className="chat-screen">
            <div className="half-screen chat-heads">
                <ChatHeads items={items} onHandleSearch={handleSearch} />
            </div>
            <div className="half-screen">
                <Conversation />
            </div>
        </div>
    ) : (
        <Redirect to="/login" />

    )

}

