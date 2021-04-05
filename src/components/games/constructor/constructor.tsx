import React, { useEffect, useState } from 'react';
//import { NavLink } from 'react-router-dom';
import { urlBackend } from '../../../data';
import { WordsProps } from '../../../common/ts/interfaces';
import { getRandomOderArr, getRandomBoolean, getRandomInteger, playAnswer } from '../../../data/utils';
import { AudioWord } from '../audioWords/audioWords';
import { Loader } from '../../loader';
//import { Loader } from '../loader';

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
let correctList: WordsProps[]= [];
let errorList: WordsProps[]= [];
//let indexLetter: number = 0;


/*
let round: number = 0;


const audio = new Audio();*/

interface GameProps {
  group: number,
  page?: number,
}

const GameConstructor: React.FC<GameProps> = ({group, page}) => {
  const [score, setScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [word, setWord] = useState<WordsProps>();
  const [solved, setSolved] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [listResultsNumber, setListResultsNumber] = useState<number>(0);
  const [lives, setLives] = useState<boolean[]>(new Array(5).fill(true));
  const [letters, setLetters] = useState<string[]>([]);
  const [mixedLetters, setMixedLetters] = useState<string[]>([]);
  const [indexLetter, setIndexLetter] = useState<number>(0);

  useEffect(() => {
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
            console.log(WORDS_GAME);
            setLoading(false)
          } else {
            WORDS_GAME= WORDS_GROUP.flat();
            console.log(WORDS_GAME);
            setLoading(false);
          }
          setWord(WORDS_GAME[indexWord!]);
          setLetters(getLetters(WORDS_GAME[indexWord!]));
          setMixedLetters(getMixedLetters(WORDS_GAME[indexWord!]));
        }
      });
    });
  }, []);

  const getLetters = (word: WordsProps) : (string[]) => {
    return word.word.split('');
  }
  const getMixedLetters = (word: WordsProps) : (string[]) => {
    const indexes = getRandomOderArr(word.word.length);
    return indexes.map(item => word.word[item]);
  }

  const getNewWord = () : void => {
    console.log('solved');
    indexWord = indexesWord.pop();
    setIndexLetter(0);
    setSolved(true);
  }
  //setLetters(getLetters(word!))
/*

  useEffect(() => {
    window.addEventListener("keyup", onKeyPressHandler);

    return () => (window as any).removeEventListener("keyup", onKeyPressHandler);

  })
  const onKeyPressHandler = (event: KeyboardEvent) => {
    event.preventDefault();
    if (event.key === 'ArrowRight') onClickHandlerGame(true)
    else if (event.key === 'ArrowLeft') onClickHandlerGame(false)
  }*/
  const onToggleHandlerMute = () => {
    setMute(!mute);
  }

  const onClickHandlerGame = (letter : string) => {
    console.log(letter);
    const letters = getLetters(word!);
    if(letters[indexLetter] === letter) {
      playAnswer(true, mute);
      console.log('true');
      if (indexLetter < letters.length - 1) {
        setIndexLetter(indexLetter + 1);
      } else {
        getNewWord()
      }

    }
    else {
      playAnswer(false, mute);
      console.log('false');
    }
  }
  /*
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
  }*/
  /*
  const playTimer = () => {
    audio.src = '/audio/timer.mp3';
    audio.play();
  };*/
  /*
  const playAnswer = (answer: boolean) => {
    if (!mute) {
      audio.src = answer ? '/audio/correct.mp3' : '/audio/error.mp3';
      audio.play();
    }
  };*/

  return (
    <div className='game-constructor'>
    {word ?
      <React.Fragment>
        <div className='game-constructor__lives'>
          { lives.map((item, index) => {
            return (
              <span className = 'icon-container' key = {index}>
                { item?
                  <i className="material-icons">star</i> :
                  <i className="material-icons">star_border</i>
                }
              </span>)
            })
          }
        </div>
        <div className='game-constructor__body'>
          <div className='constructor-body-game__header'>
            <AudioWord src = {word.audio} />
            <h3>{correctList.length * 10}</h3>
            <span className = 'icon-container' onClick={() => onToggleHandlerMute()}>
              {mute ? <i className="material-icons">notifications_off</i> : <i className="material-icons">notifications</i>}
            </span>
          </div>
          <div className='constructor-body-game__letters'>
            {
              letters.map((letter, index) => {
                return index < indexLetter ? 
                ( <div className = 'letter letter--open' key = {index}>
                    {letter}
                  </div> ) :
                ( <div className = 'letter letter--close' key = {index}>
                    {letter}
                  </div> ) 
              })
            }
          </div>
          <div className='constructor-body-game__letters'>
            {
              mixedLetters.map((letter, index) => {
                return (
                  <div className = 'letter letter--question' key = {index}
                    onClick = {() => onClickHandlerGame(letter)}>
                    {letter}
                  </div>
                )
              })
            }
          </div>
          <div className='constructor-body-game__translate'>
            {word.wordTranslate}
          </div>
        </div>
        <button className='game-sprint__button-close'>
          <i className="material-icons sprint-body-game__icon">close</i>
        </button>
      </React.Fragment> :
      <Loader />}
    </div>
  )
};

export {GameConstructor};
