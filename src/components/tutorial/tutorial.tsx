import React from 'react';
import {GroupItem} from "./groupItem";
import {levelsEnglish} from '../../data';

const Tutorial: React.FC = () => {
  return <div className="tutorial__groups">
    {levelsEnglish.map(({id, title, name}) => {
      const key = `group${id}`;
      return <GroupItem
        key={key}
        id={id}
        title={title}
        name={name}>
      </GroupItem>
    })}
  </div>
};

export {Tutorial};
