import React, {useState} from 'react';
import {levelsEnglish} from "../../data";
import {Select} from "./select";
import {WordSlider} from "./word-slider";

interface WordListProps {
  group: number,
}

const WordList: React.FC<WordListProps> = ({group}) => {
  const [page, setPage] = useState(0);

  const name: string = levelsEnglish[group].name;
  const changeSelectItem = (e: any) => setPage(e.target.value);

  return (
    <div className="word-list">
      <p className='word-list__title'>топ 600 слов {name}</p>
      <Select changeSelectItem={changeSelectItem}/>
      <WordSlider group={group} page={page}/>
    </div>
  )
};

export {WordList};
