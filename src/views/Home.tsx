import React from 'react';
import { CreateRoom } from '../components/home/CreateRoom';
import { JoinRoom } from '../components/home/JoinRoom';

export const Home: React.FC = () => {
  return (
    <div>
      <CreateRoom />
      <JoinRoom />
    </div>
  );
};
