import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ShowPassword } from '../components/auth/ShowPassword';
import {
  auth,
  firebaseError,
  firestore,
} from '../modules/firebase/firebaseProvider';

export const Register: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const onChangeRepeatPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.currentTarget.value);
  };

  const onClickRegister = () => {
    if (email && password && repeatPassword && username) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          firestore
            .collection('users')
            .doc(response.user?.uid)
            .set({
              username: username,
            })
            .then(() => {
              history.push('/login', email);
            })
            .catch(() => {
              console.log('pao');
            });
        })
        .catch((err: firebaseError) => {
          if (err.code === 'auth/email-already-in-use') {
            setMessage('User with that email already exists.');
          }
        });
    }
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

  const validatePassword = () => {
    if (password !== '') {
      if (
        !password.match(
          /^(?=.*\d)(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^0-9a-zA-Z]).{8,}$/,
        )
      ) {
        setMessage(
          'Password must contain 8 characters total with number/s and special character/s.',
        );
      } else {
        setMessage('');
      }
    } else {
      setMessage('Please input your password.');
    }
  };

  const validateRepeatPassword = () => {
    if (repeatPassword !== '') {
      if (password !== repeatPassword) {
        setMessage('Passwords do not match.');
      } else {
        setMessage('');
      }
    } else {
      setMessage('Please repeat your password.');
    }
  };

  const validateUsername = () => {
    if (!username) {
      setMessage('Please enter username');
    } else {
      setMessage('');
    }
  };

  return (
    <div className="auth-container">
      <div className="input-without-button">
        <input
          type="text"
          placeholder="Email"
          onChange={onChangeEmail}
          onBlur={validateEmail}
        />
      </div>
      <div className="input-without-button">
        <input
          type="text"
          placeholder="Username"
          onChange={onChangeUsername}
          onBlur={validateUsername}
        />
      </div>
      <div className="input-with-button-wrapper">
        <div className="input-with-button">
          <input
            type="password"
            placeholder="Password"
            onChange={onChangePassword}
            onBlur={validatePassword}
          />
          <ShowPassword />
        </div>
      </div>
      <div className="input-with-button-wrapper">
        <div className="input-with-button">
          <input
            type="password"
            placeholder="Repeat Password"
            onChange={onChangeRepeatPassword}
            onBlur={validateRepeatPassword}
          />
          <ShowPassword />
        </div>
      </div>
      <p>{message}</p>

      <button className="auth-button" onClick={onClickRegister}>
        Register
      </button>
    </div>
  );
};
