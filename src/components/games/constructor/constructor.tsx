import React, { useEffect, useState } from 'react';
//import { NavLink } from 'react-router-dom';
//import { urlBackend } from '../../data';
//import { getRandomOderArr, getRandomBoolean, getRandomInteger } from '../../data/utils';
//import { Loader } from '../loader';
/*
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
const audio = new Audio();*/

interface GameProps {
  group: number,
  page?: number,
}
/*
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
}*/

const GameConstructor: React.FC<GameProps> = ({group, page}) => {
  /*const [score, setScore] = useState<number>(0);
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

    </div>
  )
};

export {GameConstructor};
