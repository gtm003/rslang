import React from 'react';
import {GroupItem} from "../group-item";
import {levelsEnglish} from '../../data';

const Tutorial = () => {
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
