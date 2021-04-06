import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useLocation } from 'react-router-dom';
import { urlBackend } from '../../../data';
import { WordsProps } from '../../../common/ts/interfaces';
import { getRandomOderArr, getRandomBoolean, getRandomInteger, playAnswer } from '../../../data/utils';
import { Loader } from '../../loader';
import { AudioWord } from '../audioWords/audioWords';
import { Crumbs } from "../../../common/navigation/crumbs";
import { ResultsGame } from '../resultsGame';

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

interface GameSprintProps {
  group: number,
  page?: number,
}

const GameSprint: React.FC<GameSprintProps> = ({group, page}) => {
  //const [score, setScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [word, setWord] = useState<string>('');
  const [wordTranslate, setWordTranslate] = useState<string>('');
  const [mute, setMute] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    WORDS_GROUP.length = 0;
    urls.length = 0;
    for (let j = 0; j < 30; j += 1) {
      urls.push(`${urlBackend}words?group=${group}&page=${j}`)
    }
    let chain = Promise.resolve();
    urls.forEach((url) => {
      chain = chain
        .then(() => getData(url))
        .then((res: WordsProps[]) => {
          WORDS_GROUP.push(res);
          if (WORDS_GROUP.length === 30) {
            if (page !== undefined) {
              WORDS_GAME = WORDS_GROUP[page];
              setLoading(false)
            } else {
              WORDS_GAME = WORDS_GROUP.flat();
              setLoading(false)
            }
            setWord(WORDS_GAME[indexWord!].word);
            setWordTranslate(WORDS_GAME[indexTranslate!].wordTranslate);
          }
        });
    });
  }, [group, page]);

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
    if(gameStatus) {
      if (event.key === 'ArrowRight') onClickHandlerGame(true);
      else if (event.key === 'ArrowLeft') onClickHandlerGame(false);
    }
  }

  const onClickHandlerGame = (answer : boolean) => {
    const correctAnswer : boolean = (indexWord === indexTranslate);
    playAnswer(answer === correctAnswer, mute);
    if (answer === correctAnswer) {
      //setScore(score + 10);
      correctList.push(WORDS_GAME[indexWord!]);
    } else {
      errorList.push(WORDS_GAME[indexWord!]);
    }
    if (indexesWord.length) {
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

  return (
    <>
      <Crumbs path={location.pathname}/>
      <div className='game-sprint'>
        {

          !loading ?
            <React.Fragment>

              <Timer gameStatus={gameStatus}/>

              <div className='game-sprint__body'>
                {gameStatus && (
                  <div className='game-sprint__body game-sprint__body--game'>
                    <div className='sprint-body-game__header'>
                      <AudioWord src={WORDS_GAME[indexWord!].audio}/>
                      <h3>{correctList.length * 10}</h3>
                      <span className='icon-container' onClick={() => onToggleHandlerMute()}>
                {mute ? <i className="material-icons">notifications_off</i> :
                  <i className="material-icons">notifications</i>}
              </span>
                    </div>
                    <div className='sprint-body-game__words'>
                      <h2>{word}</h2>
                      <h3>{wordTranslate}</h3>
                    </div>
                    <div className='sprint-body__answer'>
                      <div className='sprint-body-answer__item'>
                        <button className='sprint-body-answer__button button--false'
                                onClick={onClickHandlerGame.bind(null, false)}>Неверно
                        </button>
                        <span><i className="material-icons">arrow_back</i></span>
                      </div>
                      <div className='sprint-body-answer__item'>
                        <button className='sprint-body-answer__button button--true'
                                onClick={onClickHandlerGame.bind(null, true)}>Верно
                        </button>
                        <span><i className="material-icons">arrow_forward</i></span>
                      </div>
                      </div>
                </div>)}
              {!gameStatus  && (
              <ResultsGame correctList={correctList} errorList={errorList} onClickHandlerNewGame={onClickHandlerNewGame}/>
              )}
            </div>
            <button className='game-sprint__button-close'>
              <i className="material-icons sprint-body-game__icon">close</i>
            </button>
          </React.Fragment>:

          <Loader />
      }
    </div>
    </>
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

  const renderTime = (dimension: string, time: number) => {
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
      {gameStatus && (<CountdownCircleTimer
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
        {({elapsedTime}) =>
          renderTime("sec", getTimeSeconds(elapsedTime))
        }
      </CountdownCircleTimer>)}
    </div>
  )
};