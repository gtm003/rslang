import React, { useEffect, useState } from 'react';
import { urlBackend } from '../../../data';
import { WordsProps } from '../../../common/ts/interfaces';
import { getRandomOderArr, playAnswer } from '../../../data/utils';
import { Loader } from '../../loader';
import { ResultsGame } from '../resultsGame';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Lives } from '../savannah/lives/lives';

const CONTROL_TEXT = [
  {
    value: 'Не знаю',
    icon: 'sentiment_dissatisfied'
  }, {
    value: 'Дальше',
    icon: 'sentiment_satisfied'
  }
];
const quantityLives: number = 5;

let indexesWord = getRandomOderArr(20);
let indexWord = indexesWord.pop();
let correctList: WordsProps[] = [];
let errorList: WordsProps[] = [];
let wordAnswer = true;
let error = {
  currentWord: false,
  totalErrors: 0,
};
let round: number = 0;

let WORDS_GROUP : WordsProps[];
let WORDS_GAME : WordsProps[];

interface GameConstructorProps {
  words: WordsProps[],
  hardWords: WordsProps[],
  group?: number,
  page?: number,
  hard?: string | undefined,
}

const ConstructorRedux: React.FC<GameConstructorProps> = ({words, hardWords, group, page, hard}) => {
  //const [score, setScore] = useState<number>(0);
  const [word, setWord] = useState<WordsProps>();
  const [solved, setSolved] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [letters, setLetters] = useState<string[]>([]);
  const [indexLetter, setIndexLetter] = useState<number>(0);
  const [mixedOder, setMixedOder] = useState<number[]>([]);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [lives, setLives] = useState<number>(quantityLives);

    const getWordsGroup = () => {
      if (hard) return hardWords;
      return words.filter(item => item.group === group);
    }
  
    const getWordsGame = () => {
      if (page !== undefined) return WORDS_GROUP.filter(item => item.page === page - round);
      return WORDS_GROUP;
    }

  useEffect(() => {
    if(words.length) {
      WORDS_GROUP = getWordsGroup();
      WORDS_GAME = getWordsGame();
      indexesWord = getRandomOderArr(WORDS_GAME.length);
      indexWord = indexesWord.pop();
      setWord(WORDS_GAME[indexWord!]);
      setLetters(getLetters(WORDS_GAME[indexWord!]));
      setMixedOder(getRandomOderArr(WORDS_GAME[indexWord!].word.length));
    }
  }, [words]);

  const getLetters = (word: WordsProps): (string[]) => {
    return word.word.split('');
  }

  const onClickHandlerControl = (): void => {
    if (solved) {
      if (indexesWord.length) {
        indexWord = indexesWord.pop();
        getNewWord(indexWord!);
      } else {
        indexesWord = getRandomOderArr(20);
        if (page! > round) {
          round += 1;
          WORDS_GAME = getWordsGame();
          indexWord = indexesWord.pop();
          getNewWord(indexWord!);
        } else {
          setLives(0);
        }
      }
    } else {
      setSolved(true);
      setIndexLetter(letters.length);
      setLives(lives - 1);
      errorList.push(word!);
    }
  }


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

  const onClickHandlerGame = (elem: any, letter: string) => {
    const letters = getLetters(word!);
    if (letters[indexLetter] === letter) {
      elem.classList.add('letter--solved');
      playAnswer(true, mute);
      setIndexLetter(indexLetter + 1);
      if (indexLetter === letters.length - 1) {
        if (wordAnswer) {
          correctList.push(word!);
        }
        else {
          errorList.push(word!);
        }
        wordAnswer = true;
        playWord(word!.audio)
        setSolved(true);
      }
    }
    else {
      playAnswer(false, mute);
      elem.classList.add('letter--error');
      setLives(lives - 1);
      wordAnswer = false;
    }
  }

  const onClickHandlerNewGame = () => {
    indexesWord = getRandomOderArr(20);
    indexWord = indexesWord.pop();
    setLives(quantityLives);
    getNewWord(indexWord!);
    correctList = [];
    errorList = [];
  }

  const getNewWord = (index: number) => {
    setWord(WORDS_GAME[index]);
    setLetters(getLetters(WORDS_GAME[index]));
    setMixedOder(getRandomOderArr(WORDS_GAME[index].word.length));
    setIndexLetter(0);
    setSolved(false);
  }

  const playWord = (src: string) => {
    const audio = new Audio();
    audio.src = urlBackend + src;
    audio.play();
  };

  const onToggleHandlerFullScreen = () => {
    const sprint = document.querySelector('.constructor');
    setFullscreen(!fullscreen);
    if (!document.fullscreenElement) {
      sprint!.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  /*


  const onToggleHandlerMute = () => {
    setMute(!mute);
  }*/
  /*
  const playTimer = () => {
    audio.src = '/audio/timer.mp3';
    audio.play();
  };*/

  return (
    <div className='constructor'>
      { word ? (<React.Fragment>
        <div className='constructor__header'>
          <i className="material-icons constructor-header__icons constructor-header__icons--sound"
            onClick={() => onToggleHandlerMute()}>{mute ? 'notifications_off' : 'notifications'}</i>
          <i className="material-icons constructor-header__icons constructor-header__icons--fullscreen"
            onClick={() => onToggleHandlerFullScreen()}>{fullscreen ? 'fullscreen_exit' : 'fullscreen'}</i>
          {lives > 0 && <Lives lives = {lives} />}
          <NavLink to='/games'>
            <i className="material-icons constructor-header__icons constructor-header__icons--close">close</i>
          </NavLink>
        </div>
          <div className='constructor__body'>
            {lives ?
              (<React.Fragment>
                <p className='constructor-body-game__translate'>
                  {word.wordTranslate}
                </p>
                <div>
                  {solved ? word.transcription : 'Собери слово из букв'}
                </div>
                <WordInEnglish letters={letters} indexLetter={indexLetter} />
                <React.Fragment>
                  {solved ?
                    <WordCard word={word} /> :
                    <MixedLetters mixedOder={mixedOder} letters={letters} indexLetter={indexLetter}
                      onClickHandlerGame={onClickHandlerGame} />
                  }
                </React.Fragment>
                <div className='constructor-body-game__control'>
                  <p>Enter</p>
                  <button onClick={() => onClickHandlerControl()}>
                    <span className="control__value">{CONTROL_TEXT[Number(solved)].value}</span>
                    <i className="material-icons control__icon">{CONTROL_TEXT[Number(solved)].icon}</i>
                  </button>
                </div>
              </React.Fragment>) :
              <ResultsGame correctList={correctList} errorList={errorList} onClickHandlerNewGame={onClickHandlerNewGame} />}
          </div>
        </React.Fragment>) :
        <Loader />}
    </div>
  )
};

interface WordCardProps {
  word: WordsProps;
}
const WordCard: React.FC<WordCardProps> = ({ word }) => {
  return (
    <div className='constructor-body-game__card'>
      <img src={`${urlBackend}${word.image}`} alt={`${word.word}_img`} />
      <p>Контекст:</p>
      <p dangerouslySetInnerHTML={{ __html: word.textExample }}></p>
    </div>)
}

interface MixedLettersProps {
  mixedOder: number[];
  letters: string[];
  onClickHandlerGame: (elem: any, letter: string) => void;
  indexLetter: number;
}
const MixedLetters: React.FC<MixedLettersProps> = ({ mixedOder, letters, onClickHandlerGame, indexLetter }) => {
  return (
    <div className='constructor-body-game__letters  constructor-body-game__letters--question'>
      { mixedOder.map((indexMixed, index) => {
        return <div className='letter letter--question' key={index}
          onClick={(event) => onClickHandlerGame(event.target, letters[indexMixed])}>{letters[indexMixed]}</div>
        })
      }
    </div>
  )
}

interface WordInEnglishProps {
  letters: string[];
  indexLetter: number;
}
const WordInEnglish: React.FC<WordInEnglishProps> = ({ letters, indexLetter }) => {
  return (
    <div className='constructor-body-game__letters'>
      {
        letters.map((letter, index) => {
          return index < indexLetter ?
            (<div className='letter letter--open' key={index}> {letter} </div>) :
            (<div className='letter letter--close' key={index}> {letter} </div>)
        })
      }
    </div>)
}

const mapStateToProps = (state: any) => ({
  words: state.data.words,
  hardWords: state.data.hardWords,
});

const Constructor = connect(mapStateToProps)(ConstructorRedux);

export { Constructor };
