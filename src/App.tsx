import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from './components/header/Header';
import { LogIn } from './views/LogIn';
import { Register } from './views/Register';
import { ResetPassword } from './views/ResetPassword';

import './style/main.css';
import { Home } from './views/Home';
import { ChatRoom } from './views/ChatRoom';

export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Register} />
          <Route path="/login" component={LogIn} />
          <Route path="/resetpassword" component={ResetPassword} />
          <Route path="/home" component={Home} />
          <Route path="/chatroom/:key" component={ChatRoom} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
