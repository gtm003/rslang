import React from 'react';
import { Footer } from '../footer';
import { HeaderRedux } from '../header';
import { Switcher } from "../../common/navigation";
import { BrowserRouter } from "react-router-dom";
import { Settings } from "../settings";
import { LoginFormRedux } from '../loginform';
import { SignUpFormRedux } from '../signupform';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <HeaderRedux isAuth={false}/>
      <div className="main-wrapper">
        <Switcher />
      </div>
      <Settings />
      <LoginFormRedux />
      <SignUpFormRedux />
      <Footer isAuth={false} />
    </BrowserRouter>
  );
}

export { App };
