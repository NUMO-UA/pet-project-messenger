import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addReceiver } from "store/conversation/conversation-actions";
import { InputBase } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const theme = createTheme();

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
    sx={{ height: '100%', width: '100%' }} >
      <Grid 
      item
        sx={{
          marginLeft: '2%',
          height: '15%',
          width: '80%'
        }}>
        <Typography>Conversations</Typography>
        <TextField
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
          height: '80%',
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
