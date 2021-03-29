import React from 'react';

import { Footer } from '../footer';
import { Header } from '../header';
import {WordList} from "../word-list";
import { MainPage } from '../main-page';

const App: React.FC = () => {
  return (
    <>
      <Header />

      <WordList group={1} />

      <MainPage />

      <Footer isAuth={false}/>
    </>
  );
}

export { App };
