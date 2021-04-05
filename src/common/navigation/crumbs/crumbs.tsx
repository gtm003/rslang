import React from "react";
import {NavLink} from "react-router-dom";

interface CrumbsProps {
  path: string,
}

const Crumbs: React.FC<CrumbsProps> = ({path}) => {
  const pathComponent: RegExpMatchArray|null = path.match(/[^\/][\w]*/g);
  let currentPath: string = '/';
  return (
    <div className='crumbs'>
      <NavLink to={currentPath} key='main'>
        <span>Главная</span>
        <img src='/images/navIconMain.png' alt='Icon main page'/>
      </NavLink>
      {pathComponent && pathComponent.map((path, index) => {
        currentPath += `${path}/`;
        const lastPath: boolean = (index === pathComponent.length - 1);
        return (
          <NavLink to={currentPath} key={path}>
            {lastPath ? <span className='actual-menu'> {path}</span> : <span> {path}</span>}
            {!lastPath && <img src='/images/navIconPage.png' alt='Icon secondary page'/>}
          </NavLink>
        )
      })}
    </div>
  )
};

export {Crumbs};