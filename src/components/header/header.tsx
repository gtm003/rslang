import React from 'react';

import "./header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="header__site-nav main-nav">
        <ul className="main-nav__list">
          <li className="main-nav__item">
            <span className="main-nav__logo">RSLang</span>
          </li>
          <li className="main-nav__item additional-item">
            <a href="/">
              Главная
              </a>
          </li>
          <li className="main-nav__item additional-item">
            <a href="/">
              О Команде
              </a>
          </li>
        </ul>
      </nav>
      <div className="header__right-column-wrapper right-column-wrapper">
        <button className="right-column-wrapper__login-btn">
          Войти
        </button>
        <nav className="site-nav">
          <button className="site-nav__btn">
            <span className="visually-hidden">
              Открыть меню
            </span>
          </button>
        </nav>
      </div>
    </header>
  )
}

export { Header };