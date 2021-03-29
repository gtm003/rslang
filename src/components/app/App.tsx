import React from 'react';

import { Footer } from '../footer';
import { Header } from '../header';
import {WordList} from "../word-list";
import { MainPage } from '../main-page';
import { Route, Switch } from 'react-router';
import { LoginFormRedux } from '../loginform/loginform';
import { SignUpFormRedux } from '../signupform/signupform';

const App: React.FC = () => {
  return (
    <>
      <Header />

      {/* <WordList group={1} /> */}

      <Switch>
        <Route path="/log-in" component={LoginFormRedux} />
        <Route path="/sign-up" component={SignUpFormRedux} />
        <Route path="/" component={MainPage} />
      </Switch>

      <Footer isAuth={false}/>
    </>
  );
}

export { App };
