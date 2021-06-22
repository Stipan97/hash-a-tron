import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ProviderLogin } from '../components/auth/ProviderLogin';
import { ShowPassword } from '../components/auth/ShowPassword';
import {
  auth,
  firebaseError,
  persistenceNone,
  persistenceSession,
} from '../modules/firebase/firebaseProvider';
import { setCurrentUser } from '../modules/redux/actions/currentUserActions';

import '../style/logIn.css';

export const LogIn: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [email, setEmail] = useState(
    (location.state as string) ? (location.state as string) : '',
  );
  const [password, setPassword] = useState('');
  const [saveUser, setSaveUser] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const onChangeRememberMe = () => {
    setSaveUser(!saveUser);
  };

  const validateEmail = () => {
    if (email !== '') {
      if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        setMessage('Email address is not properly formatted.');
      } else {
        setMessage('');
      }
    } else {
      setMessage('Please input your Email address.');
    }
  };

  const onClickLogIn = () => {
    auth
      .setPersistence(saveUser ? persistenceSession : persistenceNone)
      .then(() => {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            dispatch(setCurrentUser(saveUser));
            history.push('/home');
            console.log(saveUser);
          })
          .catch((err: firebaseError) => {
            switch (err.code) {
              case 'auth/user-not-found': {
                setMessage('User with this email do not exist.');
                return;
              }
              case 'auth/wrong-password': {
                setMessage('Password is not correct.');
                return;
              }
            }
            console.log(err.code);
          });
      });
  };

  return (
    <div className="auth-container">
      <div className="input-without-button">
        <input
          type="text"
          placeholder="Email"
          onChange={onChangeEmail}
          onBlur={validateEmail}
          value={email}
        />
      </div>
      <div className="input-with-button-wrapper">
        <div className="input-with-button">
          <input
            type="password"
            placeholder="Password"
            onChange={onChangePassword}
          />
          <ShowPassword />
        </div>
      </div>
      <p>{message}</p>

      <label>
        <input type="checkbox" onChange={onChangeRememberMe} />
        Remember me
      </label>

      <button className="auth-button" onClick={onClickLogIn}>
        Login
      </button>

      <Link className="login-linkto" to="/resetpassword">
        Forgot your password?
      </Link>
      <Link className="login-linkto" to="/">
        Don't have account? Create one.
      </Link>

      <div className="provider-login">
        <ProviderLogin type="Google" persist={saveUser} />
        <ProviderLogin type="Facebook" persist={saveUser} />
      </div>
    </div>
  );
};
