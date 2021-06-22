import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firestore } from '../../modules/firebase/firebaseProvider';

export const JoinRoom: React.FC = () => {
  const [joinKey, setJoinKey] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const onChangeKey = (event: ChangeEvent<HTMLInputElement>) => {
    setJoinKey(event.currentTarget.value);
  };

  const onClickJoinRoom = () => {
    firestore
      .collection('rooms')
      .get()
      .then((collection) => {
        collection.docs.forEach((doc) => {
          if (doc.id === joinKey) {
            setMessage('');
            history.push('/chatroom/' + joinKey);
            return;
          }
        });
      });
    setMessage('Room does not exist.');
  };

  return (
    <>
      <div className="input-with-button-wrapper">
        <div className="input-with-button">
          <input
            type="text"
            placeholder="Enter Key"
            maxLength={17}
            onChange={onChangeKey}
          />
          <button onClick={onClickJoinRoom}>Join</button>
        </div>
      </div>
      <p>{message}</p>
    </>
  );
};
