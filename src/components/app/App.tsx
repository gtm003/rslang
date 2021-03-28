import React from 'react';

import { Footer } from '../footer';
import { Header } from '../header';
import { MainPage } from '../main-page';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <MainPage />
      <Footer isAuth={false}/>
    </>
  );
}

export { App };
