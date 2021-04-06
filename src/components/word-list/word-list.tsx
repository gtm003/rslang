import React, {useState} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {levelsEnglish} from "../../data";
import {Select} from "./select";
import {WordSlider} from "./word-slider";
import {Pagination} from "../pagination";
import {toggleOpen, toggleButtons} from "../../common/redux/action";
import {connect} from "react-redux";

interface WordListProps {
  toggleOpen: any,
  toggleButtons: any,
  group: number,
  pageInitial?: number
}

const WordListRedux: React.FC<WordListProps> = ({group, pageInitial = 0, toggleOpen, toggleButtons}) => {
  const [page, setPage] = useState(pageInitial - 1);
  const history = useHistory();
  const name: string = levelsEnglish[group - 1].name;
  const changeSelectItem = (e: any) => {
    const newPage: number = (typeof e === "number") ? e : ((e.target.value === '') ? -1 : Number(e.target.value));
    history.push(`/tutorial/group${group}/page${newPage + 1}`);
    setPage(newPage);
  };

  return (
    <div className="word-list">
      <p className='word-list__title'>топ 600 слов {name}</p>
      <div className="word-list__select">
        <NavLink to={`/games`}>
          <img src='/images/games.png' alt='open games' title='Open games'/>
        </NavLink>
        <Select changeSelectItem={changeSelectItem} page={page}/>
        <img src='/images/settingsIcon.png' alt='settings' onClick={() => toggleOpen('true')}/>
      </div>
      <WordSlider group={group} page={page}/>
      <Pagination group={group} page={page + 1} changeSelectItem={changeSelectItem}/>
    </div>
  )
};

const mapDispatchToProps = {
  toggleOpen,
  toggleButtons
};

const WordList = connect(null, mapDispatchToProps)(WordListRedux);
export {WordList};
