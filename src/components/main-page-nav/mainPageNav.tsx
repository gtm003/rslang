import React from 'react';
import { NavLink } from "react-router-dom";
import { navLink } from "../../data";

const MainPageNav: React.FC = () => {
  let mainPageNav: string[];
  const isAuth: boolean = false;

  isAuth ?
    mainPageNav = ["Учебник", "Мини-игры", "Словарь", "Статистика", "Настройка"] :
    mainPageNav = ["Учебник", "Мини-игры", "Статистика", "Настройка"];

  return (
    <nav className="main-page-nav">
      <ul className="main-page-nav__list">
        {mainPageNav.map((item: string) => {
          return (
            <NavLink to={`/${navLink[item]}`} key={item} className="main-page-nav__item">
              {item}
            </NavLink>
          )
        })}
      </ul>
    </nav>
  )
}

export { MainPageNav };