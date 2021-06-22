import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { rootReducerState } from '../../models';
import { auth } from '../../modules/firebase/firebaseProvider';
import {
  logoutCurrentUser,
  setCurrentUser,
} from '../../modules/redux/actions/currentUserActions';

export const Header: React.FC = () => {
  const userRedux = useSelector((state: rootReducerState) => state.user.data);
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickLogout = () => {
    auth.signOut().then(() => {
      dispatch(logoutCurrentUser());
      window.sessionStorage.removeItem('user');
      history.push('/login');
    });
  };

  const onClickLogIn = () => {
    history.push('/login');
  };

  useEffect(() => {
    if (window.sessionStorage.getItem('user')) {
      dispatch(setCurrentUser(false));
    }
  }, [dispatch]);

  return (
    <div className="header-container">
      <div className="header">
        <p>Hash-á-tron</p>
        {userRedux ? (
          <button onClick={onClickLogout}>Logout</button>
        ) : (
          <button onClick={onClickLogIn}>Login</button>
        )}
      </div>
    </div>
  );
};
