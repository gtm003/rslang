import React from 'react';

const MainPageNav: React.FC = () => {
  let mainPageNav: string[];
  const isAuth: boolean = false;

  isAuth ?
    mainPageNav = ["Учебник", "Мини-игры", "Словарь", "Статистика", "Настройка"] :
    mainPageNav = ["Учебник", "Мини-игры", "Статистика", "Настройка"];

  return (
    <nav className="main-page-nav">
      <ul className="main-page-nav__list">
        {mainPageNav.map((item) => {
          return (
            <li key={item} className="main-page-nav__item">
              <a href="/">
                {item}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export {MainPageNav};