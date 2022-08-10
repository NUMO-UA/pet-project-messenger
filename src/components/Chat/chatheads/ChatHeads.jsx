import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useDispatch } from "react-redux";
import { addReceiver } from "store/conversation/conversation-actions";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { createTheme } from '@mui/material';


export const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});



export default function ChatHeads({ items, onHandleSearch }) {

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    onHandleSearch(e.target.value)
  }

  const handleReceiver = (obj) => {
    dispatch(addReceiver(obj))
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      sx={{
        border: '1px solid rgb(112, 110, 110, 0.2)',
        height: '100%',
        width: '100%'
      }} >
      <Grid
        item
        sx={{
          height: '25%',
          width: '80%'
        }}>
        <Typography 
          variant="h6"
        sx={{
          marginLeft: '45%',
          marginTop: '5%',
          marginBottom: '5%',
        }}>Conversations</Typography>
        <TextField
        sx={{
          marginLeft: '10%',
          width: '100%'
        }}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          autoFocus
          autoComplete="off"
          type='search'
          onChange={handleSearch} />
      </Grid>
      <Grid
        item
        component="Users"
        sx={{
          overflow: 'scroll',
          height: '73%',
          width: '100%'
        }}>
        {items.map((obj, i) => (
          <Grid item sx={{
            marginLeft: '2%',
            display: 'flex',
            flexDirection: 'colomn',
            alignItems: 'center',
          }}
            key={i}
            className="chat-head-item"
            onClick={() => handleReceiver(obj)}
          >
            <AccountBoxIcon sx={{ fontSize: '50px', color: 'secondary.main' }} />
            <Typography>{obj.email}</Typography>
          </Grid>
        ))}
      </Grid>


    </Grid>
  )
}
