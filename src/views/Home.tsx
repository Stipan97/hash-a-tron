import React from 'react';
import { CreateRoom } from '../components/home/CreateRoom';
import { JoinRoom } from '../components/home/JoinRoom';
import { auth } from '../modules/firebase/firebaseProvider';

export const Home: React.FC = () => {
  const currentUser = auth.currentUser ? true : false;
  return (
    <div className="auth-container">
      {currentUser ? (
        <>
          <CreateRoom />
          <JoinRoom />
        </>
      ) : (
        <h1 className="heading">You need to be logged in.</h1>
      )}
    </div>
  );
};
