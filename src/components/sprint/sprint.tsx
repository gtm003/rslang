import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { DATA_WORDS, getDataPage } from '../../data/WORDS';
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

interface TimerProps {
  gameStatus: boolean,
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
  const [gameStatus, setGameStatus] = useState(true);
  /*  
  useEffect(() => {
    fetch(`https://react-learnwords-example.herokuapp.com/words?group=${group}&page=${page}`)
      .then(response => response.json())
      .then(words => {
        setWords(words)
      })
  }, []);*/
  
  useEffect(() => {
    getDataPage(group, page).
    then((res: SprintBodyProps[]) => setWords(res))
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setGameStatus(false)
    }, 60000);
    return () => {
      clearTimeout(timerId);
    };
  }, [gameStatus]);

  const onClickHandlerGame = (answer : boolean) => {
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

  const onClickHandlerNewGame = () => {
    const newIndexWord = getRandomInteger(19);
    setIndexWord(newIndexWord);
    setIndexTranslate(
      getRandomBoolean() ? newIndexWord : getRandomInteger(19)
    );
    setGameStatus(true);
    setScore(0);
  }

  return (
    <div className='game-sprint'>
      { 
        words.length ?
        <React.Fragment>

          <Timer gameStatus={gameStatus}/>

        <div className='game-sprint__body'>
          <h3>{score}</h3>
          {gameStatus  && ( 
          <div className='game-sprint__body--game'>
            <h2>{words[indexWord].word}</h2>
            <h3>{words[indexTranslate].wordTranslate}</h3>
            <div className='body__answer'>
              <button className='body-answer__button button--false' onClick={onClickHandlerGame.bind(null, false)}>Неверно</button>
              <button className='body-answer__button button--true'onClick={onClickHandlerGame.bind(null, true)}>Верно</button>
            </div>
          </div>)}
          {!gameStatus  && ( 
          <div className='game-sprint__body--end'>
            <Progress />
            <div className='body__answer'>
              <button className='body-answer__button' onClick={onClickHandlerNewGame.bind(null, false)}>Продолжить игру</button>
              <button className='body-answer__button'>К списку игр</button>
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


const Timer: React.FC<TimerProps> = (gameStatus) => {
  //console.log(gameStatus.gameStatus)
  //console.log(new Date().toLocaleTimeString())
  const timerProps = {
    isPlaying: gameStatus.gameStatus,                                          // Тут надо написать правильно, только я пока не знаю как
    size: 100,
    strokeWidth: 10,
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
    <div className='game-sprint__timer'>
      {gameStatus.gameStatus &&(<CountdownCircleTimer
        {...timerProps}
        duration={60}
        colors={[
          ['#00ff00', 0.33],
          ['#ffff00', 0.33],
          ['#ff0000', 0.33],
        ]}
        onComplete={() => [
          true, 0
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("sec", getTimeSeconds(elapsedTime))
        }
      </CountdownCircleTimer>)}
    </div>
  )
};

const Progress = () => {
  return (
  <div className="morph-shape" id="morph-shape"  >
    <svg xmlns="http://www.w3.org/2000/svg" width="200%" height="200%" viewBox="0 0 1000 300"  preserveAspectRatio="none">
      <path fill="#afafaf" d="M0.00,49.98 C149.99,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z">
        <animate
          attributeName="d"
	        dur="7s"
	        repeatCount="indefinite" 
          values=" 
            M0.00,49.98 C149.99,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z;
	          M0.00,49.98 C157.16,-41.94 281.88,148.52 500.00,49.98 L500.00,0.00 L0.00,0.00 Z;
            M0.00,49.98 C149.99,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" />
      </path>	
    </svg> 
  </div>)
}