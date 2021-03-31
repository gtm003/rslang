import React from 'react';
import {Footer} from '../footer';
import {Header} from '../header';
import {Switcher} from "../../common/navigation";
import {BrowserRouter} from "react-router-dom";
import { GameSprint } from '../sprint';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Switcher/>

      <GameSprint group={1} page={1}/>

      <Footer isAuth={false}/>
    </BrowserRouter>
  );
}

export {App};
