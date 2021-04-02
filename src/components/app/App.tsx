import React from 'react';
import { Footer } from '../footer';
import { HeaderRedux } from '../header';
import { Switcher } from "../../common/navigation";
import { BrowserRouter } from "react-router-dom";
import { Settings } from "../settings";
import { LoginFormRedux } from '../loginform';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <HeaderRedux />
      <Switcher />
      <Settings />
      <LoginFormRedux />
      <Footer isAuth={false} />
    </BrowserRouter>
  );
}

export { App };
