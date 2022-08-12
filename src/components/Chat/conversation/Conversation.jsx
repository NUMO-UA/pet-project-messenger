
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUid } from "store/auth/auth-selectors";
import { postMessage, fetchMessage } from "store/conversation/conversation-actions";
import { selectMessages, selectReseiver } from "store/conversation/conversation-selectors";




export default function Conversation() {

  const dispatch = useDispatch();

  const [conversationId, setConversationId] = useState(null);
  const [message, setMessage] = useState('');

  const uid = useSelector(selectUid);
  const messages = useSelector(selectMessages);
  const receiver = useSelector(selectReseiver);



  useEffect(() => {
    if (!receiver || !uid) return;

    let myConvId;

    if (receiver.uid > uid) myConvId = receiver.uid + uid;
    else myConvId = uid + receiver.uid;

    setConversationId(myConvId);
  }, [receiver, uid]);

  useEffect(() => {
    dispatch(fetchMessage(conversationId))
  }, [conversationId, dispatch]);


  const sendMessage = useCallback(() => {
    dispatch(postMessage(conversationId, message.trim(), uid))

    setMessage('');
  }, [conversationId, message, uid, dispatch])


  const handleEnterKeyPressDown = (e) => {
    if ((e.code === "Enter" || e.key === "Enter") && !e.shiftKey) {
      sendMessage();
    }
  };

  return (
    <Grid container
      direction="column"
      alignItems="stretch"
      sx={{ height: '100%', width: '100%'}}
    >
      {receiver ? (
        <>
          <Grid item component="User"          
            direction="rows"
            sx={{              
              border: '1px solid rgb(112, 110, 110, 0.2)',
              height: '10%',
              width: '100%'
            }}>
            <MailOutlineIcon sx={{
              fontSize: '35px',
              m: 1,
              color: 'primary'
            }} />
            <Typography
              variant="h5"
              component="span">
              {receiver.email}
            </Typography>
          </Grid>

          <Grid
            item
            component="chat"
            sx={{
              overflow: 'scroll',
              border: '1px solid rgb(112, 110, 110, 0.2)',
              width: '100%',
              height: '81%',
            }}>
            {messages.length > 0 ? (
              messages.map((obj, i) => (
                <Grid
                  item
                  sx={{
                    display: 'flex',
                    flexDirection: 'colomn',
                  }}
                  key={i}
                  style={{ justifyContent: obj.uid === uid && "flex-end" }}
                >
                  <Typography>{obj.message}</Typography>
                </Grid>
              ))
            ) : (
              <Grid item>
                <Typography>Start a conversation with {receiver.email}</Typography>
              </Grid>
            )}
          </Grid>

          <Grid 
          item
          component="Text"
            sx={{
              height: '9%',
              border: '1px solid rgb(112, 110, 110, 0.2)',
              display: 'flex',
              flexDirection: 'row',
            }}>
            <TextField
              sx={{
                height: '100%',
                width: '80%',
              }} 
              autoFocus
              placeholder="Hi.."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleEnterKeyPressDown} />
            <Button
              sx={{
                height: '90%',
                width: '20%',
              }} onClick={sendMessage} >Send</Button>
          </Grid>
        </>
      ) : (
        <Grid className="no-conversation">
          <Typography>Pick someone to talk to.</Typography>
        </Grid>
      )}
    </Grid>

  )
}


