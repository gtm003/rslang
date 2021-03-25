import React, { useEffect, useState } from 'react';
//import { useFetch } from "react-async";

import './sprint.scss';

const getRandomInteger = (max : number) : number => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomBoolean = () : boolean => {
  return Math.random() < 0.5;
};

interface GameSprintProps {
  group: number,
  page: number,
}

interface SprintBodyProps {
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

  const [words, setWords] = useState<SprintBodyProps[]>([]);
  const [indexWord, setIndexWord] = useState<number>(getRandomInteger(19));
  const [indexTranslate, setIndexTranslate] = useState<number>(
    getRandomBoolean() ? indexWord : getRandomInteger(19)
  );
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    fetch(`https://react-learnwords-example.herokuapp.com/words?group=${group}&page=${page}`)
      .then(response => response.json())
      .then(words => {
        setWords(words)
      })
  }, []);

  const onClickHandler = (answer : boolean) => {
    const correctAnswer : boolean = (indexWord === indexTranslate);
    const newIndexWord = getRandomInteger(19);
    setIndexWord(newIndexWord);
    setIndexTranslate(
      getRandomBoolean() ? newIndexWord : getRandomInteger(19)
    );
    if (answer === correctAnswer) {
      setScore(score + 10);
    }
  }

  return (
    <div className='game-sprint'>
      { 
        words.length ?
        <React.Fragment>
        <div className='game-sprint__timer'>Timer</div>
          <div className='game-sprint__body'>
            <h3>{score}</h3>
            <h2>{words[indexWord].word}</h2>
            <h3>{words[indexTranslate].wordTranslate}</h3>
            <div className='sprint-body__answer'>
              <button className='body-answer__button--error' onClick={onClickHandler.bind(null, false)}>Неверно</button>
              <button className='body-answer__button--true'onClick={onClickHandler.bind(null, true)}>Верно</button>
            </div>
        </div>
        <button className='game-sprint__button-close'>Close</button>)
      </React.Fragment>:
      
      <h1>Loading...</h1>
      }
    </div>
  )
};

export {GameSprint};
