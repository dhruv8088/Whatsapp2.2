import React from 'react'
import styled from 'styled-components';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';

function Message({ user, message }) {
    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

  return (
    <Container>
        <TypeOfMessage>{message.message}
        <TimeStamp>
          {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
        </TimeStamp>
        
        </TypeOfMessage>
    </Container>
  )
}

export default Message

const Container = styled.div``;

const MessageElement = styled.div`
  width: fit-content;
  max-width: 50ch;
  line-height: 2rem;
  padding: 0.3rem;
  border-radius: 0.2rem;
  margin: 1rem;
  min-width: 6rem;
  padding-bottom: 1rem;
  position: relative;
  text-align: right;
  font-size: 1.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  text-align: left;
  background-color: #dcf8c6;
`;

const Reciever = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`;

const TimeStamp = styled.span`
  color: gray;
  padding: 0rem;
  font-size: 0.7rem;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
`;