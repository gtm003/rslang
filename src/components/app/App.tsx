import React from 'react';
import { Footer } from '../footer';
import { Header } from '../header';
import { Switcher } from "../../common/navigation";
import { BrowserRouter } from "react-router-dom";
import { Settings } from "../settings";
import { Savannah } from "../savannah";


const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Savannah />
    </BrowserRouter>
  );
}

export { App };
