import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { rootReducerState } from '../../models';
import { generateKey } from '../../modules/crypt/generateKey';
import { firestore } from '../../modules/firebase/firebaseProvider';

export const CreateRoom: React.FC = () => {
  const history = useHistory();
  const masterUser = useSelector(
    (state: rootReducerState) => state.user.data?.username,
  );

  const onCreateRoom = () => {
    const key = generateKey();

    firestore
      .collection('rooms')
      .doc(key)
      .set({
        master: masterUser,
      })
      .then(() => {
        history.push('/chatroom/' + key);
      });
  };

  return (
    <button className="auth-button" onClick={onCreateRoom}>
      Create Room
    </button>
  );
};
