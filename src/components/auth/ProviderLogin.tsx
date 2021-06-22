import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../modules/redux/actions/currentUserActions';
import { useHistory } from 'react-router';
import {
  auth,
  authProviderFacebook,
  authProviderGoogle,
  firestore,
} from '../../modules/firebase/firebaseProvider';

interface ProviderLoginProps {
  type: 'Google' | 'Facebook';
  persist: boolean;
}

export const ProviderLogin: React.FC<ProviderLoginProps> = ({
  type,
  persist,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let provider: typeof authProviderGoogle | typeof authProviderFacebook;
  if (type === 'Google') {
    provider = authProviderGoogle;
  } else {
    provider = authProviderFacebook;
  }

  const onClickLoginWithProvider = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        firestore
          .collection('users')
          .doc(result.user?.uid)
          .set({
            username: result.user?.displayName,
          })
          .then(() => {
            dispatch(setCurrentUser(persist));
            history.push('/home');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button className={type.toLowerCase()} onClick={onClickLoginWithProvider}>
      Login with {type}
    </button>
  );
};
