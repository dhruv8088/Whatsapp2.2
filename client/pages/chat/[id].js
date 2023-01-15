import Head from 'next/head';
import React,{ useRef } from 'react'
import styled from "styled-components";
import ChatScreen from '../../components/ChatScreen';
import Sidebar from '../../components/Sidebar';
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";

function Chat({ chat, messages }) {
    const [user] = useAuthState(auth);
  return (
    <Container>
<Head>
    <title>Chat{" "}
          {getRecipientEmail(chat.users, user) !== undefined
            ? "With " + getRecipientEmail(chat.users, user)
            : ""}</title>
</Head>
<div className="mdHidden">
        <Sidebar />
      </div>

<ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
    </ChatContainer>
    </Container>
    
  )
}

export default Chat

export async function getServerSideProps(context) {
    const ref = db.collection("chats").doc(context.query.id);
  // PREP messages on the server
    const messagesRef = await ref
      .collection("messages")
      .orderBy("timestamp", "asc")
      .get();
  
    const messages = messagesRef.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .map((messages) => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime(),
      }));
      // PREP the chats
      const chatRef = await ref.get();

      const chat = {
        id: chatRef.id,
        ...chatRef.data(),
      };
    
      return {
        props: {
          messages: JSON.stringify(messages),
          chat: chat,
        },
      };
    }

const Container = styled.div`
  display: flex;
  
  background-color: white;
    min-height: 100vh;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100vh;
  ::-webkit-srollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;