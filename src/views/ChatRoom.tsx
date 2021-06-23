import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Messages } from '../components/chat/Messages';
import { rootReducerState } from '../models';
import { encryptMessage } from '../modules/crypt/cryptMessage';
import { auth, firestore } from '../modules/firebase/firebaseProvider';

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
  const currentLoggedUser = auth.currentUser ? true : false;

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
    <div className="chat-container">
      {currentLoggedUser ? (
        <>
          <div className="chat-body">
            <div className="chat-header">
              <div className="chat-key"><span className="chat-header__title">Room key</span><span className="chat-header__key">{key}</span></div>
              <button className="chat-delete" onClick={onClickDeleteRoom}>Delete Room</button>
            </div>
            <div className="chat-main">
              <Messages roomKey={key} />
            </div>
            <div className="chat-footer">
              <input className="chat-input" placeholder="Message..." type="text" value={message} onChange={onChangeMessage} />
              <button className="chat-send" onClick={onMessageSend}>Send</button>
            </div>
          </div>
        </>
      ) : (
        <h1 className="heading">You need to be logged in.</h1>
      )}
    </div>
  );
};
