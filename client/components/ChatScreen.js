import React from 'react'
import styled from 'styled-components';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useRouter } from "next/dist/client/router";
import { Avatar, IconButton } from "@material-ui/core";
import AttachFileIcon from "@mui/icons-material/AttachFile"
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useState, useRef } from "react";
import firebase from 'firebase/compat/app';
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import Picker from 'emoji-picker-react';
import UIfx from 'uifx';
import Router from "next/router";

function ChatScreen({ chat, messages }) {

    const endOfMessagesRef = useRef(null);
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("");
    const router = useRouter();
    const [messagesSnapshot] = useCollection(
        db
          .collection("chats")
          .doc(router.query.id)
          .collection("messages")
          .orderBy("timestamp", "asc")
      );

    const showMessages = () => {
        if (messagesSnapshot) {
          return messagesSnapshot.docs.map((message) => (
            <>
              {/* {groupMessageByDate(
                moment(message.data().timestamp?.toDate().getTime()).format('LL')
              ) ? (
                <DateIndictor>
                  {moment(message.data().timestamp?.toDate().getTime()).format(
                    'LL'
                  )}
                </DateIndictor>
              ) : (
                ''
              )} */}
    
              <Message
                key={message.id}
                user={message.data().user}
                message={{
                  ...message.data(),
                  timestamp: message.data().timestamp?.toDate().getTime(),
                }}
              />
            </>
          ));
        } else {
          return JSON.parse(messages).map((message) => (
            <Message key={message.id} user={message.user} message={message} />
          ));
        }
      };

      

      const [recipientSnapshot] = useCollection(
        db
          .collection("users")
          .where("email", "==", getRecipientEmail(chat.users, user))
      );

      const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
          behaviour: "smooth",
          block: "start",
        });
      };

      const sendMessage = (e) => {
        e.preventDefault();
    // updating the last seen
        db.collection("users").doc(user.uid).set(
          {
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
    
        db.collection("chats").doc(router.query.id).collection("messages").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          user: user.email,
          photoURL: user.photoURL,
        });
        playMessageSentSound();
        setInput("");
        scrollToBottom();
      };

     
      const [showPicker, setShowPicker] = useState(false);

      const playMessageSentSound = () => {
        const sm = new UIfx("/send message.mp3");
        sm.play();
      };

      const onEmojiClick = (event, emojiObject) => {
      setInput(prevInput => prevInput + emojiObject.emoji);
      setShowPicker(false);
    };
      const recipient = recipientSnapshot?.docs?.[0]?.data();
      const recipientEmail = getRecipientEmail(chat.users, user);
      const surname = recipientEmail.split("@");

  return (
    <Container>
<Header>
{recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}

<HeaderInfo>
<h3>{surname[0]}</h3>
{recipientSnapshot ? (
<p>  Last Active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}</p>
              ) : (
            <p>Loading Last Active...</p>
          )}
</HeaderInfo>

</Header>

<MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef}  />
      </MessageContainer>
      <InputContainer>
      <IconButton>
            <AttachFileIcon style={{ fontSize: 25 }} />
          </IconButton>
          <Input 
          id="inputField"
          value={input}
          onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          autoFocus
          />
         <img
          className="emoji-icon"
          src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
          onClick={() => setShowPicker(val => !val)} />
        {showPicker && <Picker
          pickerStyle={{ width: '50%' }}
          onEmojiClick={onEmojiClick} />}
          
          
          <IconButton disabled={!input} type="submit" onClick={sendMessage}>
          <SendRoundedIcon style={{ color: "green" }} />
          </IconButton>
      </InputContainer>
    </Container>
  )
}

export default ChatScreen

const Container= styled.div`
`;

const Header = styled.div`
  position: sticky;
  background-color: #fff;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 1.1rem;
  height: 7rem;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;



const HeaderInfo = styled.div`
  margin-left: 1.5rem;
  flex: 1;
  > h3 {
    margin-bottom: 0.3rem;
    color: #495057;
    font-size: 1.35rem;
  }
  > p {
    font-size: 1.2rem;
    color: gray;
  }
`;

const EndOfMessage = styled.div`
  margin-bottom: 6.5rem;
`;

const MessageContainer = styled.div`
  padding: 3rem;
  background-color: #e5ded8;
  min-height: 80vh;
  position: relative;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 1.2rem;
  position: sticky;
  bottom: 0rem;
  background-color: #fff;
  z-index: 100;
  `;

const Input = styled.input`
flex: 1;
border: none;
outline: none;
border-radius: 3rem;
align-items: center;
padding: 1.3rem 1rem 1.3rem 1.3rem;
font-size: 1.55rem;
margin-left: 1.5rem;
margin-right: 1.5rem;
background-color: whitesmoke;
inline-size: min-content;
`;