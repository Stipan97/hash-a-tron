import React, { useEffect, useState } from 'react';
import { decryptMessage } from '../../modules/crypt/cryptMessage';
import { firestore } from '../../modules/firebase/firebaseProvider';

interface MessagesProps {
  roomKey: string;
}

interface Message {
  username: string;
  message: string;
  time: string;
}

export const Messages: React.FC<MessagesProps> = ({ roomKey }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('rooms')
      .doc(roomKey)
      .collection('messages')
      .orderBy('time', 'asc')
      .onSnapshot({ includeMetadataChanges: true }, (query) => {
        setMessages([]);
        query.forEach((doc) => {
          setMessages((oldArray) => [...oldArray, doc.data() as Message]);
        });
      });

    return () => unsubscribe();
  }, [roomKey]);

  return (
    <div className="chat-component">
      {messages.map((message) => (
        <div className="chat-component__message" key={message.time}>
          <span className="message__text">
            <span className="message__text-username">{message.username}</span>
            <span className="message__text-message">{decryptMessage(message.message, roomKey)}</span>
          </span>
          <p className="message__time">{new Date(parseInt(message.time)).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};
