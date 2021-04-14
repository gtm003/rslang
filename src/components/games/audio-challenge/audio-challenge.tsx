import React, { useState, useEffect, useRef, useMemo } from 'react';
import { WordsProps, GameProps } from "../../../common/ts/interfaces";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { Loader } from "../../loader";
import { ResultsGame } from '../resultsGame/resultsGame';
import { Lives } from "../lives/lives";
import { shuffleArray, highlightWords, removeWordsHighlighting} from "../utils/utils";
import { urlBackend } from "../../../data";

let necessaryWords: WordsProps[];
let correctAnswers: WordsProps[] = [];
let wrongAnswers: WordsProps[] = [];
let lives: number = 5;

interface SavannahProps {
  words: WordsProps[]
};

const AudioChallengeRedux: React.FC<GameProps & SavannahProps> = ({ group, page = -1, words }) => {
  const [gameWords, setGameWords] = useState<WordsProps[]>([]);
  const [translations, setTranslations] = useState<WordsProps[]>([]);
  const [isWelcomeScreen, setIsWelcomeScreen] = useState<boolean>(true);
  const audioChallenge = useRef<HTMLElement>(null);
  const soundWaves = useRef<HTMLImageElement>(null);
  const wordContainer = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const button = useRef<HTMLButtonElement>(null);
let answers: number = 0;

  useEffect(() => {
    page > -1 ?
      necessaryWords = words.slice((Number(group) * 600), ((Number(group)) * 600) + ((page + 1) * 20)) :
      necessaryWords = words.slice((Number(group) * 600), ((Number(group) + 1) * 600));

    setGameWords(necessaryWords);
    setTranslations(necessaryWords);

    correctAnswers = [];
    wrongAnswers = [];
  }, [words, group, page]);

  useEffect(() => {
    window.addEventListener("keyup", onKeyUpHandler);
    return () => (window as any).removeEventListener("keyup", onKeyUpHandler);
  }, [gameWords]);

  useEffect(() => {
    if (lives > 0 && gameWords.length > 0 && !isWelcomeScreen) {
      playAudio(gameWords[translationWordIndex].audio);
    }
  }, [gameWords]);

  const playAudio = async (audioSrc: string) => {
    const audio = new Audio();
    audio.src = urlBackend + audioSrc;
    audio.play();

    wordContainer.current?.classList.add("no-opacity");
    soundWaves.current?.classList.add("vawes-resizing");

    audio.onended = () => {
      wordContainer.current?.classList.remove("no-opacity");
      soundWaves.current?.classList.remove("vawes-resizing");
    }
  };

  const onKeyUpHandler = (evt: KeyboardEvent) => {
    switch (evt.key) {
      case "1":
        return onAnswer(translationWord, translationsOnScreen[0].wordTranslate);
      case "2":
        return onAnswer(translationWord, translationsOnScreen[1].wordTranslate);
      case "3":
        return onAnswer(translationWord, translationsOnScreen[2].wordTranslate);
      case "4":
        return onAnswer(translationWord, translationsOnScreen[3].wordTranslate);
      case "5":
        return onAnswer(translationWord, translationsOnScreen[4].wordTranslate);
      case "ArrowLeft":
        return playAudio(translationWord.audio);
      case "ArrowRight":
        return answers === 0 ? onAnswer(translationWord) : onNextQuestionClick(translationWord);
    }
  };

  const restartGame = () => {
    page > -1 ?
      necessaryWords = words.slice((Number(group) * 600), ((Number(group)) * 600) + ((page + 1) * 20)) :
      necessaryWords = words.slice((Number(group) * 600), ((Number(group) + 1) * 600));
    setGameWords(necessaryWords);
    lives = 5;
    correctAnswers = [];
    wrongAnswers = [];
  };

  const onAnswer = (wordTranslation: WordsProps, translate?: React.MouseEvent | string): void => {
    ++answers;
    if (answers === 1 && gameWords.length !== 0) {
      let wrongAnswer: boolean;

      if (typeof translate === "string") {
        wrongAnswer = translate !== wordTranslation.wordTranslate;
      } else {
        const evtTarget = translate?.target as HTMLElement;
        wrongAnswer = translate === undefined || evtTarget.innerText.match(/[а-я-,]/gi)?.join('') !== wordTranslation.wordTranslate.replace(/\s/g, '');
      };

      if (wrongAnswer) {
        --lives;
        wrongAnswers.push(wordTranslation);
      } else {
        correctAnswers.push(wordTranslation);
      };

      if (soundWaves.current) {
        soundWaves.current.src = bgImage;
        soundWaves.current.style.height = "100%";
      }

      if (wordContainer.current) {
        wordContainer.current.classList.add("no-opacity");
      }

      if (word.current) {
        word.current.classList.add("show-word")
      }

      if (button.current) {
        button.current.classList.add("blue-btn");
        button.current.innerHTML = `<img src="/images/games/right-arrow.png" alt="" />`
      }

      const wordTranslations = document.querySelectorAll<HTMLLIElement>(".minigames__translation-item");
      highlightWords(wordTranslations, wordTranslation);
    };
  };

  const onNextQuestionClick = (wordTranslation: WordsProps) => { 
    answers = 0;

    if (soundWaves.current) {
      soundWaves.current.src = "/images/games/sound-waves.png";
      soundWaves.current.style.height = "auto";
    }

    if (button.current) {
      button.current.innerHTML = `Не знаю`;
      button.current.classList.remove("blue-btn");
    }

    if (word.current) {
      word.current.classList.remove("show-word")
    }

    const wordTranslations = document.querySelectorAll<HTMLLIElement>(".minigames__translation-item");

    const updatedWords = gameWords.filter((word) => word.word !== wordTranslation.word);

    setGameWords(updatedWords);
    removeWordsHighlighting(wordTranslations, wordTranslation);
  }

  const translationWordIndex = useMemo(() => Math.floor(Math.random() * gameWords.length), [gameWords]);
  const translationWord: WordsProps = gameWords[translationWordIndex] || {};
  const translationsCopy = translations.slice();

  translationsCopy.splice(translations.findIndex((word) => word.wordTranslate === translationWord.wordTranslate), 1);

  const getRandomWords = () => {
    const randomWordIndex: number = Math.floor(Math.random() * translationsCopy.length);
    const randomWord = translationsCopy[randomWordIndex];

    translationsCopy.splice(randomWordIndex, 1);

    return randomWord;
  }

  const bgImage = new Image().src = urlBackend + translationWord.image;

  const translationsOnScreen: WordsProps[] = [
    getRandomWords(),
    getRandomWords(),
    getRandomWords(),
    getRandomWords(),
    translationWord
  ];

  if (gameWords.length === 0 && translations.length === 0) {
    return <Loader />
  };

  if (isWelcomeScreen) {
    return (
      <main className="audio-challenge minigames">
        <div className="minigames__wrapper">
          <div className="welcome-screen">
            <p className="welcome-screen__title">
              Выберите один верный перевод слова из пяти. Для управления игрой используйте клавиши 1, 2, 3, 4, 5, ←, → либо просто кликайте мышкой.
            </p>
            <button className="btn welcome-screen__btn" onClick={() => {
              setIsWelcomeScreen(false);
              playAudio(translationWord.audio);
            }}>
              Начать игру
            </button>
          </div>
        </div>
      </main >
    )
  };

  return (
    <main className="audio-challenge minigames" ref={audioChallenge}>
      <div className="minigames__wrapper">
        {lives > 0 && gameWords.length !== 0 && !isWelcomeScreen ?
          <>
            <div className="minigames__panel">
              <button className="minigames__fullscreen" onClick={() => {
                if (audioChallenge.current !== null) {
                  audioChallenge.current.requestFullscreen();
                }
              }}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M5.57143 5.57143H0V7.42859H6.50001C7.01328 7.42859 7.42859 7.01328 7.42859 6.50001V0H5.57143V5.57143Z" fill="white" />
                  <path d="M19.8572 0H18V6.50001C18 7.01328 18.4153 7.42859 18.9286 7.42859H25.4286V5.57143H19.8572V0Z" fill="white" />
                  <path d="M19.8572 25.4286H18V18.9286C18 18.4153 18.4153 18 18.9286 18H25.4286V19.8572H19.8572V25.4286Z" fill="white" />
                  <path d="M6.50001 18H0V19.8572H5.57143V25.4286H7.42859V18.9286C7.42859 18.4153 7.01328 18 6.50001 18V18Z" fill="white" />
                </svg>
              </button>
              <div className="minigames__right-panel">
                <Lives lives={lives} />
                <NavLink to='/games'>
                  <button className="minigames__close" >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.4347 14.022L0.532091 3.11904C-0.177435 2.40985 -0.177435 1.26318 0.532091 0.55399C1.24129 -0.155204 2.38795 -0.155204 3.09715 0.55399L14.0001 11.457L24.9028 0.55399C25.6123 -0.155204 26.7587 -0.155204 27.4679 0.55399C28.1774 1.26318 28.1774 2.40985 27.4679 3.11904L16.5652 14.022L27.4679 24.925C28.1774 25.6342 28.1774 26.7808 27.4679 27.49C27.1144 27.8438 26.6497 28.0215 26.1853 28.0215C25.7209 28.0215 25.2566 27.8438 24.9028 27.49L14.0001 16.5871L3.09715 27.49C2.74338 27.8438 2.279 28.0215 1.81462 28.0215C1.35024 28.0215 0.885857 27.8438 0.532091 27.49C-0.177435 26.7808 -0.177435 25.6342 0.532091 24.925L11.4347 14.022Z" fill="#CDCDCD" />
                    </svg>
                  </button>
                </NavLink>
              </div>
            </div>
            <div className="audio-challenge__wrapper">
              <div className="audio-challenge__word no-opacity" onClick={() => playAudio(translationWord.audio)} ref={wordContainer}>
                <img className="audio-challenge__sound-waves vawes-resizing" src="/images/games/sound-waves.png" alt="sound or word illustrarion" ref={soundWaves} />
                <span className="audio-challenge__word-answer" ref={word}>{translationWord.word}</span>
              </div>
              <ul className="minigames__translation-list">
                {
                  shuffleArray(translationsOnScreen).map((word: WordsProps, i: number) => {
                    return (
                      <li
                        key={word.wordTranslate + i}
                        className="minigames__translation-item"
                        onClick={evt => onAnswer(translationWord, evt)}
                      >
                        <span>{i + 1}. {word.wordTranslate}</span>
                      </li>
                    )
                  })
                }
              </ul>
              <button className="btn audio-challenge__button" ref={button} onClick={() => {
                answers === 0 ? onAnswer(translationWord) : onNextQuestionClick(translationWord);
              }}>
                Не знаю
              </button>
            </div>
          </>
          :
          <div className='minigames__result'>
            <ResultsGame errorList={wrongAnswers} correctList={correctAnswers} onClickHandlerNewGame={restartGame} />
          </div>
        }
      </div>
    </main >
  )
};

const mapStateToProps = (state: any) => ({
  words: state.data.words
});

const AudioChallenge = connect(mapStateToProps)(AudioChallengeRedux);

export { AudioChallenge };