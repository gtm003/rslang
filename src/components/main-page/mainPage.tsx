import React from 'react';
import {useLocation} from 'react-router-dom';

import {MainPageNav} from '../main-page-nav';
import {Crumbs} from "../../common/navigation/crumbs";

const MainPage: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <Crumbs path={location.pathname}/>
      <main className="main-page">
        <h1 className="visually-hidden">Главная страница</h1>
        <section className="main-page__promo">
          <h2 className="main-page__title">
            Увеличь словарный запас с RSLang
          </h2>
          <p className="main-page__description">
            Традиционные и новые эффективные подходы к изучению слов, мотивация в виде статистики,
            различные уровни сложности - все это ты найдешь в RSLang.
          </p>
          <button className="main-page__video-btn btn">Смотреть видео</button>
        </section>
        <div className="main-page__bg-wrapper">
          <MainPageNav/>
        </div>
      </main>
    </>

  );
}

export {MainPage};
