import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../modules/firebase/firebaseProvider';

import '../style/logIn.css';

export const ResetPassword: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const onClickConfirmEmail = () => {
    auth.sendPasswordResetEmail(email).then(() => {
      history.push('/login', email);
    });
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
      <p>{message}</p>

      <button className="auth-button" onClick={onClickConfirmEmail}>
        Confirm
      </button>
    </div>
  );
};
