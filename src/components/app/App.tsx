import React from 'react';

import { Footer } from '../footer';
import { Header } from '../header';
import {WordList} from "../word-list";

function App() {
  return (
    <>
      <Header />
      <WordList group={1} page={1} />
      <Footer isAuth={false}/>
    </>
  );
}

export default App;
