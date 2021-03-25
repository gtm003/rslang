import React from 'react';

import { Footer } from '../footer';
import { Header } from '../header';
import { GameSprint } from '../sprint';

function App() {
  return (
    <>
      <Header />
      <Footer isAuth={false}/>
      <GameSprint page={0} group={0} />
    </>
  );
}

export default App;
