import React from 'react';

import { Footer } from '../footer';
import { Header } from '../header';

function App() {
  return (
    <>
      <Header />
      <Footer isAuth={false}/>
    </>
  );
}

export default App;
