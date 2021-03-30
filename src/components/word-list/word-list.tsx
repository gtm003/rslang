import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {levelsEnglish} from "../../data";
import {Select} from "./select";
import {WordSlider} from "./word-slider";
import {NavLink} from "react-router-dom";
import {Pagination} from "../pagination";

interface WordListProps {
  group: number,
  pageInitial?: number
}

const WordList: React.FC<WordListProps> = ({group, pageInitial = 0}) => {
  const [page, setPage] = useState(pageInitial - 1);
  const history = useHistory();
  const name: string = levelsEnglish[group - 1].name;
  const changeSelectItem = (e: any) => {
    const newPage: number = (typeof e === "number") ? e : Number(e.target.value);
    history.push(`/tutorial/group${group}/page${newPage + 1}`);
    setPage(newPage);
  };

  return (
    <div className="word-list">
      <p className='word-list__title'>топ 600 слов {name}</p>
      <div className="word-list__select">
        <Select changeSelectItem={changeSelectItem} page={page}/>
        <NavLink to={`/settings`}>
          <img src='/images/settingsIcon.png' alt='settings'/>
        </NavLink>
      </div>
      <WordSlider group={group} page={page}/>
      <Pagination group={group} page={page + 1} changeSelectItem={changeSelectItem}/>
    </div>
  )
};

export {WordList};
