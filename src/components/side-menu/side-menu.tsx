import React from 'react';
import { NavLink } from 'react-router-dom';

import { navLink, menuLinks } from '../../data';

interface SideMenuProps {
  isAuth: boolean
  isMenuOpen: boolean
  onMenuLinkClick: () => void
}

const SideMenu: React.FC<SideMenuProps> = ({isAuth, isMenuOpen, onMenuLinkClick }) => {
  const clazz = isAuth ? 'side-menu--auth' : '';
  const isVisible = isMenuOpen ? 'side-menu--show' : '';

  return (
    <div className={`side-menu ${clazz} ${isVisible}`}>
      <ul className="side-menu__list">
        {menuLinks.map((item: string) => {
          if (isAuth === false && item === 'Словарь') {
            return null;
          }

          const clazz: string = item === 'Войти' ? 'side-menu__item--login' : ''; 
          
          return (
            <li className={`side-menu__item ${clazz}`} key={item}>
              <NavLink exact to={`/${navLink[item]}`}
                    onClick={onMenuLinkClick}
                    activeClassName='active'>
                {item}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { SideMenu };
