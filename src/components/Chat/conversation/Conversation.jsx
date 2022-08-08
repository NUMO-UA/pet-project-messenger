
import { TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUid } from "store/auth/auth-selectors";
import { postMessage, fetchMessage } from "store/conversation/conversation-actions";
import { selectMessages, selectReseiver } from "store/conversation/conversation-selectors";
import "./conversation.css";


export default function Conversation() {

  const chatBodyRef = useRef(null);

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
    dispatch(postMessage(conversationId, message, uid))
  }, [conversationId, message, uid, dispatch])


  const handleEnterKeyPressDown = (e) => {
    if ((e.code === "Enter" || e.key === "Enter") && !e.shiftKey) {
      sendMessage();
    }
  };

  const scollToBottomOfChat = () => {
    if (!chatBodyRef.current) return;
    chatBodyRef.current.style.scrollBehavior = "smooth";
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  };

  return (
    <div>
    {receiver ? (
      <div>
        <div className="user-conversation-header">
          <div className="user-conv-header-container">
            <div className="user-profile-pic-container">
              <p className="user-profile-pic-text">{receiver.email[0]}</p>
            </div>
            <p>{receiver.email}</p>
          </div>

          <div className="user-conv-header-container">
          </div>
        </div>    

             <div className="conversation-messages" ref={chatBodyRef}>
            {messages.length > 0 ? (
              messages.map((obj, i) => (
                <div
                  key={i}
                  className="message-container"
                  style={{ justifyContent: obj.uid === uid && "flex-end" }}
                >
                  <div className="message-bubble">{obj.message}</div>
                </div>
              ))
            ) : (
              <div className="no-conversation">
                <div>
                </div>
                <p>Start a conversation with {receiver.email}</p>
              </div>
            )}
          </div>

          <div className="input-container">
            <div className="input-message">
              <input placeholder="Hi.." onChange={(e) => setMessage(e.target.value)} onKeyPress={handleEnterKeyPressDown} />
            </div>
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
    ) : (
      <div className="no-conversation">
        <div>
        </div>
        <p>Pick someone to talk to.</p>
      </div>
    )}
  </div>
  )
}


