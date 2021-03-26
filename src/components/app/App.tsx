import React from 'react';

import { Footer } from '../footer';
import { Header } from '../header';
import { GameSprint } from '../sprint';

function App() {
  return (
    <>
      <Header />
      <GameSprint page={1} group={1}></GameSprint>
      <Footer isAuth={false}/>
    </>
  );
}

export default App;
