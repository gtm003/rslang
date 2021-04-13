import React, { useState, useEffect, useRef, useMemo } from 'react';
import { WordsProps, GameProps } from "../../../common/ts/interfaces";
import { connect } from "react-redux";
import { Loader } from "../../loader";
import { ResultsGame } from '../resultsGame/resultsGame';
import { Lives } from "../lives/lives";
import { urlBackend } from "../../../data";

let necessaryWords: WordsProps[];
let correctAnswers: WordsProps[] = [];
let wrongAnswers: WordsProps[] = [];

interface SavannahProps {
  words: WordsProps[]
};

const AudioChallengeRedux: React.FC<GameProps & SavannahProps> = ({ group, page = -1, words }) => {
  const [gameWords, setGameWords] = useState<WordsProps[]>([]);
  const [translations, setTranslations] = useState<WordsProps[]>([]);
  const [lives, setLives] = useState<number>(5);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isWelcomeScreen, setIsWelcomeScreen] = useState<boolean>(true);
  const audioChallenge = useRef<HTMLElement>(null);
  const soundWaves = useRef<SVGSVGElement>(null);
  const word = useRef<HTMLDivElement>(null);

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

    word.current?.classList.add("no-opacity");
    soundWaves.current?.classList.add("vawes-resizing");

    audio.onended = () => {
      word.current?.classList.remove("no-opacity");
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
    }
  };

  const restartGame = () => {
    page > -1 ?
      necessaryWords = words.slice((Number(group) * 600), ((Number(group)) * 600) + ((page + 1) * 20)) :
      necessaryWords = words.slice((Number(group) * 600), ((Number(group) + 1) * 600));
    setGameWords(necessaryWords);
    setLives(5);
    correctAnswers = [];
    wrongAnswers = [];
  };

  const shuffleArray = (array: WordsProps[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const highlightWords = (wordTranslations: NodeListOf<HTMLLIElement>, wordTranslation: WordsProps): void => {
    wordTranslations?.forEach((translation: HTMLLIElement) => {
      translation.textContent?.match(/[а-я-,]/gi)?.join('') === wordTranslation.wordTranslate.replace(/\s/g, '') ?
        translation.classList.add("word-correct") :
        translation.classList.add("word-wrong");
    });
  };

  const removeWordsHighlighting = (wordTranslations: NodeListOf<HTMLLIElement>, wordTranslation: WordsProps): void => {
    wordTranslations?.forEach((translation) => {
      translation.textContent?.match(/[а-я-,]/gi)?.join('') === wordTranslation.wordTranslate.replace(/\s/g, '') ?
        translation.classList.remove("word-correct") :
        translation.classList.remove("word-wrong");
    })
  };

  let answers: number = 0;

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

      const wordTranslations = document.querySelectorAll<HTMLLIElement>(".minigames__translation-item");
      highlightWords(wordTranslations, wordTranslation);

      setTimeout(() => {
        if (wrongAnswer) {
          setLives(prevLives => prevLives - 1);
          wrongAnswers.push(wordTranslation);
        } else {
          correctAnswers.push(wordTranslation);
        };

        const updatedWords = gameWords.filter((word) => word.word !== wordTranslation.word);

        setGameWords(updatedWords);
        removeWordsHighlighting(wordTranslations, wordTranslation);
      }, 800);
    };
  };

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
              Выбери один верный перевод слова из пяти. Сделать это можно, кликнув на слове мышью, либо нажав одну из клавиш 1, 2, 3, 4, 5.
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
              }
              }>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M5.57143 5.57143H0V7.42859H6.50001C7.01328 7.42859 7.42859 7.01328 7.42859 6.50001V0H5.57143V5.57143Z" fill="white" />
                  <path d="M19.8572 0H18V6.50001C18 7.01328 18.4153 7.42859 18.9286 7.42859H25.4286V5.57143H19.8572V0Z" fill="white" />
                  <path d="M19.8572 25.4286H18V18.9286C18 18.4153 18.4153 18 18.9286 18H25.4286V19.8572H19.8572V25.4286Z" fill="white" />
                  <path d="M6.50001 18H0V19.8572H5.57143V25.4286H7.42859V18.9286C7.42859 18.4153 7.01328 18 6.50001 18V18Z" fill="white" />
                </svg>
              </button>
              <div className="minigames__right-panel">
                <Lives lives={lives} />
                <button className="minigames__close" >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.4347 14.022L0.532091 3.11904C-0.177435 2.40985 -0.177435 1.26318 0.532091 0.55399C1.24129 -0.155204 2.38795 -0.155204 3.09715 0.55399L14.0001 11.457L24.9028 0.55399C25.6123 -0.155204 26.7587 -0.155204 27.4679 0.55399C28.1774 1.26318 28.1774 2.40985 27.4679 3.11904L16.5652 14.022L27.4679 24.925C28.1774 25.6342 28.1774 26.7808 27.4679 27.49C27.1144 27.8438 26.6497 28.0215 26.1853 28.0215C25.7209 28.0215 25.2566 27.8438 24.9028 27.49L14.0001 16.5871L3.09715 27.49C2.74338 27.8438 2.279 28.0215 1.81462 28.0215C1.35024 28.0215 0.885857 27.8438 0.532091 27.49C-0.177435 26.7808 -0.177435 25.6342 0.532091 24.925L11.4347 14.022Z" fill="#CDCDCD" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="audio-challenge__word no-opacity" onClick={() => playAudio(translationWord.audio)} ref={word}>
              <svg className="audio-challenge__sound-waves vawes-resizing" width="107" height="107" viewBox="0 0 107 107" fill="none" ref={soundWaves} xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path d="M2.05813 45.3298C0.920743 45.3298 0 46.2506 0 47.3868V57.6751C0 58.8125 0.920743 59.7332 2.05813 59.7332C3.19434 59.7332 4.11509 58.8125 4.11509 57.6751V47.3868C4.11509 46.2506 3.19434 45.3298 2.05813 45.3298V45.3298Z" fill="#E3E3E3" fillOpacity="0.9" />
                  <path d="M12.3535 36.9041C11.2173 36.9041 10.2954 37.826 10.2954 38.9622V67.4511C10.2954 68.5885 11.2173 69.5092 12.3535 69.5092C13.4898 69.5092 14.4117 68.5885 14.4117 67.4511V38.9622C14.4117 37.826 13.4898 36.9041 12.3535 36.9041Z" fill="#E3E3E3" fillOpacity="0.9" />
                  <path d="M22.6348 22.6951C21.4986 22.6951 20.5767 23.6158 20.5767 24.752V82.3679C20.5767 83.5042 21.4986 84.4261 22.6348 84.4261C23.771 84.4261 24.6929 83.5042 24.6929 82.3679V24.752C24.6929 23.6158 23.771 22.6951 22.6348 22.6951Z" fill="#E3E3E3" fillOpacity="0.9" />
                  <path d="M32.9234 32.9832C31.7872 32.9832 30.8652 33.9039 30.8652 35.0413V70.0213C30.8652 71.1575 31.7872 72.0794 32.9234 72.0794C34.0596 72.0794 34.9815 71.1575 34.9815 70.0213V35.0413C34.9815 33.9039 34.0596 32.9832 32.9234 32.9832Z" fill="#E3E3E3" fillOpacity="0.9" />
                  <path d="M63.9891 28.0015C62.8529 28.0015 61.9321 28.9222 61.9321 30.0596V76.3546C61.9321 77.4908 62.8529 78.4116 63.9891 78.4116C65.1253 78.4116 66.0472 77.4908 66.0472 76.3546V30.0596C66.0472 28.9222 65.1253 28.0015 63.9891 28.0015Z" fill="#E3E3E3" fillOpacity="0.9" />
                  <path d="M84.3658 30.9253C83.2295 30.9253 82.3076 31.8472 82.3076 32.9834V74.1366C82.3076 75.274 83.2295 76.1948 84.3658 76.1948C85.502 76.1948 86.4227 75.274 86.4227 74.1366V32.9834C86.4227 31.8472 85.502 30.9253 84.3658 30.9253Z" fill="#E3E3E3" fillOpacity="0.9" />
                  <path d="M94.6543 41.2136C93.5181 41.2136 92.5962 42.1355 92.5962 43.2718V63.8484C92.5962 64.9846 93.5181 65.9065 94.6543 65.9065C95.7905 65.9065 96.7113 64.9846 96.7113 63.8484V43.2718C96.7113 42.1355 95.7905 41.2136 94.6543 41.2136Z" fill="#E3E3E3" fillOpacity="0.9" />
                  <path d="M74.0777 14.4634C72.9403 14.4634 72.0195 15.3853 72.0195 16.5215V90.5978C72.0195 91.7351 72.9403 92.6559 74.0777 92.6559C75.2139 92.6559 76.1346 91.7351 76.1346 90.5978V16.5215C76.1346 15.3853 75.2139 14.4634 74.0777 14.4634V14.4634Z" fill="#E3E3E3" fillOpacity="0.9" />
                  <path d="M43.2113 47.3867C42.075 47.3867 41.1543 48.3086 41.1543 49.4448V57.675C41.1543 58.8124 42.075 59.7331 43.2113 59.7331C44.3475 59.7331 45.2694 58.8124 45.2694 57.675V49.4448C45.2694 48.3086 44.3475 47.3867 43.2113 47.3867Z" fill="#E3E3E3" fillOpacity="0.9" />
                  <path d="M104.942 46.6982C103.806 46.6982 102.884 47.619 102.884 48.7552V57.6589C102.884 58.7951 103.806 59.717 104.942 59.717C106.079 59.717 107.001 58.7951 107.001 57.6589V48.7552C107.001 47.619 106.079 46.6982 104.942 46.6982Z" fill="#E3E3E3" fillOpacity="0.9" />
                  <path d="M53.3062 42.7751C52.1688 42.7751 51.248 43.6959 51.248 44.8321V61.5821C51.248 62.7183 52.1688 63.6402 53.3062 63.6402C54.4424 63.6402 55.3631 62.7183 55.3631 61.5821V44.8321C55.3631 43.6959 54.4424 42.7751 53.3062 42.7751Z" fill="#E3E3E3" fillOpacity="0.9" />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="107" height="107" fill="white" />
                  </clipPath>
                </defs>
              </svg>

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
                      <span tabIndex={0}>{i + 1}. {word.wordTranslate}</span>
                    </li>
                  )
                })
              }
            </ul>
            <button className="btn audio-challenge__button" onClick={() => onAnswer(translationWord)}>
              {!isAnswered ?
                "Не знаю" :
                <svg width="44" height="37" viewBox="0 0 44 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0)">
                    <path d="M2.53446 17.0547H37.47L31.6828 12.0088C31.0371 11.4457 31.0346 10.5306 31.6773 9.96485C32.32 9.39901 33.3645 9.39691 34.0103 9.95993L42.6299 17.4756C42.6305 17.476 42.6309 17.4765 42.6314 17.4769C43.2755 18.04 43.2775 18.9581 42.6315 19.5231C42.631 19.5235 42.6305 19.524 42.63 19.5244L34.0104 27.04C33.3648 27.603 32.3202 27.601 31.6775 27.0351C31.0348 26.4694 31.0372 25.5543 31.683 24.9912L37.47 19.9453H2.53446C1.62337 19.9453 0.884834 19.2982 0.884834 18.5C0.884834 17.7017 1.62337 17.0547 2.53446 17.0547Z" fill="#4B2647" />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="42.2304" height="37" fill="white" transform="matrix(-1 0 0 1 43.1152 0)" />
                    </clipPath>
                  </defs>
                </svg>
              }
            </button>
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