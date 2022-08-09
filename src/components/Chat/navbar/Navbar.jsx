import { AppBar, Box, Button, createTheme, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useAuth } from "hooks/use-auth";
import { useDispatch } from 'react-redux'
import { removeUser } from "store/auth/auth-actions";
import ChatIcon from '@mui/icons-material/Chat';

export const Navbar = () => {

  const dispatch = useDispatch();

  const { isAuth, email } = useAuth();

  const theme = createTheme();


  return isAuth ? (
    <AppBar position='static'>
      <Toolbar>
        <IconButton>
          <ChatIcon sx={{ fontSize: '45px', m: 1, color: 'primary' }} />
        </IconButton>
        <Typography
          variant="h6"
          component="span"
        >
          CHAT
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center" >
          <Button variant="contained" color="secondary" onClick={() => dispatch(removeUser())} >Log out</Button>
          <Typography variant="h6" component="span" className="user-name">{email}</Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  ) : (
    <></>
  )
}

