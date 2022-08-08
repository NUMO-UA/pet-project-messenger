
import { db } from "firebase"
import { doc, getDoc, updateDoc, setDoc, onSnapshot} from "firebase/firestore";
import { ADD_RECEVIER } from "./conversation.actionTypes"
import { GET_MESSAGES } from "./conversation.actionTypes"
import { ADD_CONVERSATIONID } from "./conversation.actionTypes"

export const addReceiver = (receiver) => ({
    type: ADD_RECEVIER,
    receiver,
    
    
})  

export const getMessages = (messages) => ({
    type: GET_MESSAGES,
    messages,
    
    
})

// export const sendMessages = (messages) => ({
//     type: ADD_MESSAGES,
//     messages,
    
    
// })  

export const addConversationId = (ConversationId) => ({
    type: ADD_CONVERSATIONID,
    ConversationId,
    
}) 


export const postMessage = (conversationId, message, uid) => {
    console.log('conversationId',conversationId)
    console.log('uid',uid)
    console.log('message',message)
    return async function(dispatch) {
    if (!message) return;

    const myMessage = {
      message,
      uid: uid,
    };
    
    // add and save message to firestore
    const conversationRef = doc(db, "conversations", conversationId);
    const docSnap = await getDoc(conversationRef);

    // append message to existing conversation
    if (docSnap.exists()) {
      const docData = docSnap.data();
      await updateDoc(conversationRef, {
        messages: [...docData.messages, myMessage],
      });
    } else {
      // create a new conversation
      await setDoc(doc(db, "conversations", conversationId), {
        messages: [myMessage],
      });
    }
    message = "";
}
}


export const fetchMessage = (conversationId) => {
    return async function(dispatch) {
        if (!conversationId) return;

        const unsub = onSnapshot(
          doc(db, "conversations", conversationId),
          (doc) => {
            const currentData = doc.data();
    
            if (currentData?.messages.length > 0) dispatch(getMessages(currentData.messages));
            else dispatch(getMessages([]));
          }
          
        );
        return unsub;
}
}

    
