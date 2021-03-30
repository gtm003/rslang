import React from 'react';

import { Footer } from '../footer';
import { Header } from '../header';
import {WordList} from "../word-list";
import { MainPage } from '../main-page';
import { GameSprint } from '../sprint';

const App: React.FC = () => {
  return (
    <>
      <Header />

      <WordList group={1} />

      <MainPage />

      <GameSprint group={1} page={1}/>

      <Footer isAuth={false}/>
    </>
  );
}

export { App };
