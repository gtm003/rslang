import React from 'react';
import {Footer} from '../footer';
import {Header} from '../header';
import {Switcher} from "../../common/navigation";
import {BrowserRouter} from "react-router-dom";
import {Settings} from "../settings";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header/>
      <main className='main'>
        <Switcher/>

        <Settings/>
      </main>
      <Footer isAuth={false}/>
    </BrowserRouter>
  );
}

export {App};
