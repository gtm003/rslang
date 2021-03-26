import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
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
  const [gameStatus, setGameStatus] = useState('game');

  useEffect(() => {
    fetch(`https://react-learnwords-example.herokuapp.com/words?group=${group}&page=${page}`)
      .then(response => response.json())
      .then(words => {
        setWords(words)
      })
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setGameStatus('finish')
    }, 60000);

    return () => {
      clearTimeout(timerId);
    };
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

  const timerProps = {
    isPlaying: true,
    size: 100,
    strokeWidth: 10,
    //initialRemainingTime: 30
    trailColor: '#afafaf'
  };

  const renderTime = (dimension:string, time:number) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };

  const getTimeSeconds = (time: number | undefined) => (60 - time!) | 0;

  return (
    <div className='game-sprint'>
      { 
        words.length ?
        <React.Fragment>
        <div className='game-sprint__timer'>
          <CountdownCircleTimer
            {...timerProps}
            duration={60}
            colors={[
              ['#00ff00', 0.33],
              ['#ffff00', 0.33],
              ['#ff0000', 0.33],
            ]}
          >
            {({ elapsedTime }) =>
          renderTime("sec", getTimeSeconds(elapsedTime))
          }
          </CountdownCircleTimer>
        </div>
        <div className='game-sprint__body'>
          <h3>{score}</h3>
          {gameStatus === 'game' && ( 
          <div>
            <h2>{words[indexWord].word}</h2>
            <h3>{words[indexTranslate].wordTranslate}</h3>
            <div className='sprint-body__answer'>
              <button className='body-answer__button--error' onClick={onClickHandler.bind(null, false)}>Неверно</button>
              <button className='body-answer__button--true'onClick={onClickHandler.bind(null, true)}>Верно</button>
            </div>
          </div>)}
        </div>
        <button className='game-sprint__button-close'>Close</button>
      </React.Fragment>:

      <h1>Loading...</h1>
      }
    </div>
  )
};

export {GameSprint};
