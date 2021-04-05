import React from "react";
import {NavLink} from "react-router-dom";
import {levelsEnglish} from "../../../data";

interface CrumbsProps {
  path: string,
}

const Crumbs: React.FC<CrumbsProps> = ({path}) => {
  const pathComponent: RegExpMatchArray | null = path.match(/[^\/][\w]*/g);
  let currentPath: string = '/';

  return (
    <div className='crumbs'>
      <NavLink to={currentPath} key='main'>
        <span>Главная</span>
        <img src='/images/navIconMain.png' alt='Icon main page'/>
      </NavLink>
      {pathComponent && pathComponent.map((path, index) => {
        currentPath += `${path}/`;
        const numberGroup: any = path.match(/^group/) && Number(path.slice(5, 7)) - 1;
        const isGroup: boolean = numberGroup || numberGroup === 0;
        const namePath: string = isGroup ? `${levelsEnglish[numberGroup].title} ${levelsEnglish[numberGroup].name}` : path;
        const classGroup: string = isGroup ? `crumbs__btn crumbs__btn--${numberGroup}` : '';
        const lastPath: boolean = (index === pathComponent.length - 1);

        return (
          <NavLink to={currentPath} key={path}>
            {lastPath ? <span className={`actual-menu ${classGroup}`}> {namePath}</span> :
              <span className={classGroup}> {namePath}</span>}
            {!lastPath && <img src='/images/navIconPage.png' alt='Icon secondary page'/>}
          </NavLink>
        )
      })}
    </div>
  )
};

export {Crumbs};