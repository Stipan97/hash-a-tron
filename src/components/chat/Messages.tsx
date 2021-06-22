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
    <div>
      {messages.map((message) => (
        <div key={message.time}>
          <p>
            {message.username}: {decryptMessage(message.message, roomKey)}
          </p>
          <p>{new Date(parseInt(message.time)).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};
