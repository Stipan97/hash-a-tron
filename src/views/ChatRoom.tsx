import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Messages } from '../components/chat/Messages';
import { rootReducerState } from '../models';
import { encryptMessage } from '../modules/crypt/cryptMessage';
import { firestore } from '../modules/firebase/firebaseProvider';

interface ChatRoomProps {
  key: string;
}

export const ChatRoom: React.FC = () => {
  const { key } = useParams<ChatRoomProps>();
  const [message, setMessage] = useState('');
  const currentUser = useSelector(
    (state: rootReducerState) => state.user.data?.username,
  );
  const history = useHistory();

  const onChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  };

  const onMessageSend = () => {
    firestore
      .collection('rooms')
      .doc(key)
      .collection('messages')
      .doc()
      .set({
        username: currentUser,
        message: encryptMessage(message, key),
        time: new Date().getTime().toString(),
      })
      .then(() => {
        setMessage('');
      });
  };

  const onClickDeleteRoom = () => {
    firestore
      .collection('rooms')
      .doc(key)
      .collection('messages')
      .get()
      .then((docs) => {
        docs.forEach((doc) => doc.ref.delete());
      })
      .finally(() => {
        firestore
          .collection('rooms')
          .doc(key)
          .delete()
          .then(() => {
            history.push('/home');
          });
      });
  };

  return (
    <div>
      <p>key: {key}</p>
      <Messages roomKey={key} />
      <input type="text" value={message} onChange={onChangeMessage} />
      <button onClick={onMessageSend}>Send</button>
      <button onClick={onClickDeleteRoom}>Delete Room</button>
    </div>
  );
};
