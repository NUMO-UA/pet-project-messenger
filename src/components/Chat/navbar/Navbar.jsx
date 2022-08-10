import { AppBar, Button,Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useAuth } from "hooks/use-auth";
import { useDispatch } from 'react-redux'
import { removeUser } from "store/auth/auth-actions";
import ChatIcon from '@mui/icons-material/Chat';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { theme } from "../chatheads/ChatHeads";

export const Navbar = () => {

  const dispatch = useDispatch();

  const { isAuth, email } = useAuth();

  const handleClick = () => {
    dispatch(removeUser())
  }

  return isAuth ? (
    <AppBar position='static'>
      <Toolbar>
        <IconButton>
          <ChatIcon sx={{ fontSize: '45px', m: 1, color: 'primary' }} />
        </IconButton>
        <Typography
          variant="h6"
          component="span"
        >Messenger
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center" >
          <Button
            sx={{ margin: '20px'}}
            variant="outlined"
            color="secondary"
            onClick={handleClick}
            startIcon={<ExitToAppIcon />}
          >Log out
          </Button>
          <Typography
          sx={{ margin: '20px'}}
          startIcon={<ExitToAppIcon />}
            variant="h6"
            component="span"
            className="user-name"
          >{email}
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  ) : (
    <></>
  )
}

