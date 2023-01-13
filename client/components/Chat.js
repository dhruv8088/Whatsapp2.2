import React from 'react'
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Avatar } from '@material-ui/core';
import getRecipientEmail from '../utils/getRecipientEmail';

function Chat({ id, users, mh }) {

    const [user] = useAuthState(auth);
    const userChatRef = db
    .collection('users')
    .where('email', '==', getRecipientEmail(users, user));

    const [recipientSnapshot] = useCollection(userChatRef);
    const recipientData = recipientSnapshot?.docs?.[0]?.data();

    const recipientEmail = getRecipientEmail(users, user);

   
   

  return (
    <Container>
      {recipientData ? (
        <UserAvatar src={recipientData?.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0]} </UserAvatar>
      )}
       <p>{recipientEmail}</p>
    </Container>
  )
}

export default Chat

const Container = styled.div`
 display: flex;
  align-items: center;
  cursor: pointer;
  padding: 1.5rem;
  word-break: break-word;
  font-size: 1.35rem;
  color: #495057;
  border-bottom: 1px solid #e9ecef;
  position: relative;
  :hover {
    background-color: #e9eaeb;
    & > .ac {
      display: flex;
    }
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 0.5rem;
  margin-right: 1.5rem;
`;