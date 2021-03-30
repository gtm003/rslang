import React from 'react';
import {Footer} from '../footer';
import {Header} from '../header';
import {Switcher} from "../../common/navigation";
import {BrowserRouter} from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Switcher/>

      <Footer isAuth={false}/>
    </BrowserRouter>
  );
}

export {App};
