import React, {useState} from 'react';
import {levelsEnglish} from "../../data";
import {Select} from "./select";
import {WordSlider} from "./word-slider";
import {NavLink} from "react-router-dom";
import {Pagination} from "../pagination";

interface WordListProps {
  group: number,
}

const WordList: React.FC<WordListProps> = ({group}) => {
  const [page, setPage] = useState(-1);

  const name: string = levelsEnglish[group].name;
  const changeSelectItem = (e: any) => {
    const newPage: number = (typeof e === "number") ? e : Number(e.target.value);
    setPage(newPage);
  };

  return (
    <div className="word-list">
      <p className='word-list__title'>топ 600 слов {name}</p>
      <div className="word-list__select">
        <Select changeSelectItem={changeSelectItem}/>
        <NavLink to={`/settings`}>
          <img src='/images/settingsIcon.png' alt='settings'/>
        </NavLink>
      </div>
      <WordSlider group={group} page={page}/>
      <Pagination group={group} page={page + 1}  changeSelectItem={changeSelectItem} />
    </div>
  )
};

export {WordList};
