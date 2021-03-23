import React from 'react';

import "./header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
        <nav className="header__nav">
          <span className="header__logo">RSLang</span>
          <ul className="header__site-nav">
            <li>
              <a href="/">
                Главная
              </a>
            </li>
            <li>
              <a href="/">
                О Команде
              </a>
            </li>
          </ul>
        </nav>
        <nav className="header__user-nav">
          <button>
            Войти
          </button>
          <button>
            Открыть меню
          </button>
        </nav>
    </header>
  )
}

export { Header };