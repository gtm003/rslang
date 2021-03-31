import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { urlBackend } from '../../data';
import { Loader } from '../loader';

import './sprint.scss';

const getData = async (url: string): Promise<SprintBodyProps[]> => {
  const res = await fetch(url);

if (!res.ok) {
  throw new Error(`Could not fetch ${url}, received ${res.status}`);
}

return await res.json();
};

const urls: Array<string> = [];
const WORDS_GROUP: SprintBodyProps[][] = [];
let WORDS_GAME: SprintBodyProps[] = [];

const getRandomInteger = (max : number) : number => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getOderArr = (n : number) => {
  let arr : number[] = [];
  Array(n).fill(1).forEach((item, index) => arr.push(index));
  return arr;
};

const getRandomOderArr = (n : number) => {
  let array = getOderArr(n);
  for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getRandomBoolean = () : boolean => {
  return Math.random() < 0.5;
};

let indexesWord = getRandomOderArr(20);
let indexWord = indexesWord.pop();
let indexTranslate = getRandomBoolean() ? indexWord : getRandomInteger(19);
let round: number = 0;
const wordList: Object[]= [];

interface GameSprintProps {
  group: number,
  page?: number,
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
  const [score, setScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState(true);
  const [loading, setLoading] = useState(true);
  const [word, setWord] = useState<string>('');
  const [wordTranslate, setWordTranslate] = useState<string>('');


  useEffect(() => {
    for (let j = 0; j < 30; j += 1) {
      urls.push(`${urlBackend}words?group=${group}&page=${j}`)
    }
    let chain = Promise.resolve();
    urls.forEach((url) => {
    chain = chain
      .then(() => getData(url))
      .then((res: SprintBodyProps[]) => {
        WORDS_GROUP.push(res);
        if(WORDS_GROUP.length === 30) {
          if(page !== undefined) {
            setWords(WORDS_GROUP[page]);
            WORDS_GAME = WORDS_GROUP[page];
            console.log(WORDS_GAME);
            setLoading(false)
          } else {
            setWords(WORDS_GROUP.flat());
            WORDS_GAME= WORDS_GROUP.flat();
            setLoading(false)
          }
          setWord(WORDS_GAME[indexWord!].word);
          setWordTranslate(WORDS_GAME[indexTranslate!].wordTranslate);
        }
      });
    });
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
    
    if (answer === correctAnswer) {
      setScore(score + 10);
      wordList.push ({
        word : words[indexWord!].word,
        wordTranslate : words[indexWord!].wordTranslate,
        answer : true,
      })
    }
    if(indexesWord.length) {
      //console.log('next step');
      indexWord = indexesWord.pop();
      indexTranslate = getRandomBoolean() ? indexWord : getRandomInteger(19);
      setWord(WORDS_GAME[indexWord!].word);
      setWordTranslate(WORDS_GAME[indexTranslate!].wordTranslate);
    } else {
      indexesWord = getRandomOderArr(20);
      if (page! > round) {
        round += 1;
        WORDS_GAME = WORDS_GROUP[page! - round];
        indexWord = indexesWord.pop();
        indexTranslate = getRandomBoolean() ? indexWord : getRandomInteger(19);
        setWord(WORDS_GAME[indexWord!].word);
        setWordTranslate(WORDS_GAME[indexTranslate!].wordTranslate);
      } else {
        setGameStatus(false);
      }
    }
  }

  const onClickHandlerNewGame = () => {
    indexesWord = getRandomOderArr(20);
    indexWord = indexesWord.pop();
    indexTranslate = getRandomBoolean() ? indexWord : getRandomInteger(19);
    setGameStatus(true);
    setScore(0);
  }

  return (
    <div className='game-sprint'>
      { 
        !loading ?
        <React.Fragment>

          <Timer gameStatus={gameStatus}/>

        <div className='game-sprint__body'>
          {gameStatus  && ( 
          <div className='game-sprint__body--game'>
            <h3>{score}</h3>
            <h2>{word}</h2>
            <h3>{wordTranslate}</h3>
            <div className='body__answer'>
              <button className='sprint-body-answer__button button--false'
                onClick={onClickHandlerGame.bind(null, false)}>Неверно</button>
              <button className='sprint-body-answer__button button--true'
                onClick={onClickHandlerGame.bind(null, true)}>Верно</button>
            </div>
          </div>)}
          {!gameStatus  && ( 
          <div className='game-sprint__body--end'>
            <h3>Твой результат {score} очков</h3>
            <Progress />
            <div className='sprint-body__pagination'>
              <div className='sprint-body-pagination__dot sprint-body-pagination__dot--activ'></div>
              <div className='sprint-body-pagination__dot'></div>
            </div>
            <nav className='sprint-body__nav'>
              <a className='sprint-body-nav__link' onClick={onClickHandlerNewGame.bind(null, false)}>Продолжить игру</a>
              <a className='sprint-body-nav__link'>К списку игр</a>
            </nav>
          </div>)}
        </div>
        <button className='game-sprint__button-close'>Close</button>
      </React.Fragment>:

      <Loader />
      }
    </div>
  )
};

export {GameSprint};


const Timer: React.FC<TimerProps> = ({gameStatus}) => {
  const timerProps = {
    isPlaying: gameStatus,
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
      {gameStatus &&(<CountdownCircleTimer
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
    <svg xmlns="http://www.w3.org/2000/svg" width="200%" height="200%" viewBox="0 0 100 100"  preserveAspectRatio="none">
      <path fill="#afafaf" d="M 0 0 C 0 0 20 20 33 20 C 45 20 55 0 67 0 C 78 0 100 20 100 20 C 100 20 100 100 100 100 L 0 100 Z">
        <animate
          attributeName="d"
	        dur="7s"
	        repeatCount="indefinite" 
          values=" 
            M 0 0 C 0 0 20 20 33 20 C 45 20 55 0 67 0 C 78 0 100 20 100 20 C 100 20 100 100 100 100 L 0 100 Z;
            M 0 20 C 0 20 20 0 33 0 C 45 0 55 20 67 20 C 77 20 100 0 100 0 C 100 0 100 100 100 100 L 0 100 Z;
            M 0 0 C 0 0 20 20 33 20 C 45 20 55 0 67 0 C 78 0 100 20 100 20 C 100 20 100 100 100 100 L 0 100 Z" />
      </path>	
    </svg> 
  </div>)
}