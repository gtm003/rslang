import React from 'react';
import {NavLink} from "react-router-dom";
import {GroupItem} from "./groupItem";
import {levelsEnglish} from '../../data';

const Tutorial: React.FC = () => {
  return <div className="tutorial__groups">
    {levelsEnglish.map(({id, title, name}) => {
      const key = `group${id}`;
      return (
        <NavLink to={`/tutorial/group/${id + 1}`} key={`group${id}`}>
          <GroupItem
            key={key}
            id={id}
            title={title}
            name={name}>
          </GroupItem>
        </NavLink>
      )
    })}
  </div>
};

export {Tutorial};

