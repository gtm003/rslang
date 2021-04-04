import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { NavLink } from 'react-router-dom';
import { urlBackend } from '../../data';
import { getRandomOderArr, getRandomBoolean, getRandomInteger } from '../../data/utils';
import { Loader } from '../loader';

const getData = async (url: string): Promise<WordsProps[]> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};

const urls: Array<string> = [];
const WORDS_GROUP: WordsProps[][] = [];

let WORDS_GAME: WordsProps[] = [];
let indexesWord = getRandomOderArr(20);
let indexWord = indexesWord.pop();
let indexTranslate = getRandomBoolean() ? indexWord : getRandomInteger(19);
let round: number = 0;

let correctList: WordsProps[]= [];
let errorList: WordsProps[]= [];
const audio = new Audio();

interface GameSprintProps {
  group: number,
  page?: number,
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

const GameSprint: React.FC<GameSprintProps> = ({group, page}) => {
  //const [score, setScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [word, setWord] = useState<string>('');
  const [wordTranslate, setWordTranslate] = useState<string>('');
  const [mute, setMute] = useState<boolean>(false);
  const [listResultsNumber, setListResultsNumber] = useState<number>(0);
  const result = (correct : number, error : number) => {
    return (correct + error) ? Math.round(correct *100 / (correct + error)) : 0
  }

  useEffect(() => {
    WORDS_GROUP.length = 0;
    for (let j = 0; j < 30; j += 1) {
      urls.push(`${urlBackend}words?group=${group}&page=${j}`)
    }
    let chain = Promise.resolve();
    urls.forEach((url) => {
      chain = chain
        .then(() => getData(url))
        .then((res: WordsProps[]) => {
          WORDS_GROUP.push(res);

          if(WORDS_GROUP.length === 30) {
            if(page !== undefined) {
              WORDS_GAME = WORDS_GROUP[page];
              setLoading(false)
            } else {
              WORDS_GAME= WORDS_GROUP.flat();
              setLoading(false)
            }
            setWord(WORDS_GAME[indexWord!].word);
            setWordTranslate(WORDS_GAME[indexTranslate!].wordTranslate);
          }
        });
    });
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setGameStatus(false)
    }, 60000);
    return () => {
      clearTimeout(timerId);
    };
  }, [gameStatus]);

  useEffect(() => {
    window.addEventListener("keyup", onKeyPressHandler);

    return () => (window as any).removeEventListener("keyup", onKeyPressHandler);

  })
  const onKeyPressHandler = (event: KeyboardEvent) => {
    event.preventDefault();
    if (event.key === 'ArrowRight') onClickHandlerGame(true)
    else if (event.key === 'ArrowLeft') onClickHandlerGame(false)
  }

  const onClickHandlerGame = (answer : boolean) => {
    const correctAnswer : boolean = (indexWord === indexTranslate);
    playAnswer(answer === correctAnswer);
    if (answer === correctAnswer) {
      //setScore(score + 10);
      correctList.push (WORDS_GAME[indexWord!]);
    } else {
      errorList.push (WORDS_GAME[indexWord!]);
    }
    if(indexesWord.length) {
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
    setWord(WORDS_GAME[indexWord!].word);
    setWordTranslate(WORDS_GAME[indexTranslate!].wordTranslate);
    correctList = [];
    errorList = [];
  }

  const onToggleHandlerMute = () => {
    setMute(!mute);
  }
  /*
  const playTimer = () => {
    audio.src = '/audio/timer.mp3';
    audio.play();
  };*/

  const playAnswer = (answer: boolean) => {
    if (!mute) {
      audio.src = answer ? '/audio/correct.mp3' : '/audio/error.mp3';
      audio.play();
    }
  };

  return (
    <div className='game-sprint'>
      {
        !loading ?
          <React.Fragment>

            <Timer gameStatus={gameStatus}/>

            <div className='game-sprint__body'>
              {gameStatus  && (
                <div className='game-sprint__body game-sprint__body--game'>
                  <div className='sprint-body-game__header'>
                    <AudioWord src = {WORDS_GAME[indexWord!].audio} />
                    <h3>{correctList.length * 10}</h3>
                    <span className = 'icon-container' onClick={() => onToggleHandlerMute()}>
                {mute ? <i className="material-icons">notifications_off</i> : <i className="material-icons">notifications</i>}
              </span>
                  </div>
                  <div className='sprint-body-game__words'>
                    <h2>{word}</h2>
                    <h3>{wordTranslate}</h3>
                  </div>
                  <div className='sprint-body__answer'>
                    <div className = 'sprint-body-answer__item'>
                      <button className='sprint-body-answer__button button--false'
                              onClick={onClickHandlerGame.bind(null, false)}>Неверно</button>
                      <span><i className="material-icons">arrow_back</i></span>
                    </div>
                    <div className = 'sprint-body-answer__item'>
                      <button className='sprint-body-answer__button button--true'
                              onClick={onClickHandlerGame.bind(null, true)}>Верно</button>
                      <span><i className="material-icons">arrow_forward</i></span>
                    </div>
                  </div>
                </div>)}
              {!gameStatus  && (
                <div className='game-sprint__body game-sprint__body--end'>
                  <h3>Твой результат {correctList.length * 10} очков</h3>
                  { listResultsNumber === 0 ?
                    <Progress result = {result(correctList.length, errorList.length)}/> :
                    <WordListResultGame errorList = {errorList} correctList ={correctList} />
                  }
                  <nav className='sprint-body__nav'>
                    <div className='sprint-body__pagination'>
                      <div className='sprint-body-pagination__dot sprint-body-pagination__dot--activ'
                           onClick = {() => setListResultsNumber(0)}/>
                      <div className='sprint-body-pagination__dot'
                           onClick = {() => setListResultsNumber(1)}/>
                    </div>
                    <span className='sprint-body-nav__link' onClick={onClickHandlerNewGame.bind(null, false)}>Продолжить игру</span>
                    <NavLink to={`/games`} >
                      <span className='sprint-body-nav__link'>К списку игр</span>
                    </NavLink>
                  </nav>
                </div>
              )}
            </div>
            <button className='game-sprint__button-close'>
              <i className="material-icons sprint-body-game__icon">close</i>
            </button>
          </React.Fragment>:

          <Loader />
      }
    </div>
  )
};

export {GameSprint};

interface TimerProps {
  gameStatus: boolean,
}

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

interface ProgressProps {
  result: number
}
const Progress: React.FC<ProgressProps> = ({result}) => {
  return (
    <div className="morph-shape" id="morph-shape"  >
      <svg xmlns="http://www.w3.org/2000/svg" transform = {`translate(0, ${110 - 1.5 * result})`}  width="100%" height="120%" viewBox="0 0 100 100"  preserveAspectRatio="none">
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
      <div className = 'result'>{`${result}%`}</div>
    </div>)
}

interface WordListResultGameProps{
  errorList: WordsProps[];
  correctList: WordsProps[];
}
const WordListResultGame: React.FC<WordListResultGameProps> = ({errorList, correctList}) => {
  return (
    <div className="game-sprint__results game-sprint__results--list" >
      <h4 className = 'result-list__header result-list__header--error'>{`Ошибок : ${errorList.length}`}</h4>
      {
        errorList.map((word : WordsProps, index : number) => {
          return (
            <div key = {index} className = 'result-list__item'>
              <AudioWord src = {word.audio} />
              <span className = 'result-list__item--bold'>{word.word}</span><span> &#8212; </span><span>{word.wordTranslate}</span>
            </div>
          )
        })
      }
      <h4 className = 'result-list__header result-list__header--correct'>{`Знаю : ${correctList.length}`}</h4>
      {
        correctList.map((word : WordsProps, index : number) => {
          return (
            <div key = {index} className = 'result-list__item'>
              <AudioWord src = {word.audio} />
              <span className = 'result-list__item--bold'>{word.word}</span><span> &#8212; </span><span>{word.wordTranslate}</span>
            </div>
          )
        })
      }
    </div>)
}

interface AudioWordProps {
  src: string,
}
const AudioWord: React.FC<AudioWordProps> = ({src}) => {
  const playWord = (src: string) => {
    audio.src = urlBackend + src;
    audio.play();
  };
  return (
    <span className = 'icon-container' onClick={() => playWord(src)}>
      <i className="material-icons sprint-body-game__icon">volume_up</i>
    </span>
  )
}