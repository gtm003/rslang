import React, {useEffect, useState} from 'react';
import {getDataPage, urlBackend, levelsEnglish} from "../../data";
import {Select} from "./select";

interface WordListProps {
  group: number,
  page: number,
}

interface WordsProps {
  "id": "string",
  "group": 0,
  "page": 0,
  "word": "string",
  "image": "string",
  "audio": "string",
  "audioMeaning": "string",
  "audioExample": "string",
  "textMeaning": "string",
  "textExample": "string",
  "transcription": "string",
  "wordTranslate": "string",
  "textMeaningTranslate": "string",
  "textExampleTranslate": "string"
}

const WordList: React.FC<WordListProps> = ({group, page}) => {
  const [words, setWords] = useState<WordsProps[]>([]);

  useEffect(() => {
    getDataPage(group, page).
    then((res: WordsProps[]) => setWords(res));
  }, []);

  const name: string = levelsEnglish[group].name;

  return (
    <div className="word-list">
      <p className='word-list__title'>топ 600 слов {name}</p>
      <Select />
      {
        words.length ?
          <React.Fragment>
            <h2> data</h2>

          </React.Fragment> :
          <h1>Loading...</h1>
      }
    </div>
  )
};

export {WordList};