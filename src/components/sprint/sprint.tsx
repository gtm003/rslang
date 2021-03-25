import React from 'react';
import { useFetch } from "react-async";

import './sprint.scss';

interface GameSprintProps {
  group: number,
  page: number,
}

interface IWords   {
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

const GameSprint: React.FC<GameSprintProps> = ({group, page}) => {
  const { data, error } = useFetch<IWords[]>(`https://react-learnwords-example.herokuapp.com/words?group=${group}&page=${page}`, {
  headers: { accept: "application/json" },
  });
  
  //console.log(data);
  if (error) return (<h1>{error.message}</h1>);
  if (!data) return(<h1>No data</h1>);

  return <div className='game-sprint'>
    <div className='game-sprint__timer'>Timer</div>
    <div className='game-sprint__body'>
      <h3>Score</h3>
      <h2>{data[0].word}</h2>
      <h3>{data[0].wordTranslate}</h3>
      <div className='sprint-body__answer'>
        <button className='body-answer__button--error'>Неверно</button>
        <button className='body-answer__button--true'>Верно</button>
      </div>
    </div>
    <button className='game-sprint__button-close'>Close</button>
  </div>
};

export {GameSprint};
