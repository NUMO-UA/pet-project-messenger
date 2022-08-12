import { Redirect } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';



import ChatHeads from 'components/Chat/chatheads/ChatHeads';
import Conversation from 'components/Chat/conversation/Conversation';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from 'store/users/users-actions';
import { selectVisibleCUsers } from 'store/users/users-selectors';
import { Grid } from '@mui/material';




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
        <Grid
        container
        direction="rows" 
        sx={{ height: '89vh', width: '100%' }}
        >
            <Grid item sx={{ height: '100%', width: '20%' }}>
                <ChatHeads items={items} onHandleSearch={handleSearch} />
            </Grid>
            <Grid item sx={{ height: '100%', width: '80%' }}>
                <Conversation />
            </Grid>
        </Grid>
    ) : (
        <Redirect to="/login" />

    )

}

