import React, { useState, useEffect, useRef } from 'react';
import { WordsProps, GameProps } from "../../../common/ts/interfaces";
import { connect } from "react-redux";
import { Loader } from "../../loader";
import { Lives } from "./lives/lives";
import { ResultPercent } from '../resultPercent/resultPercent';
import { ResultWordsList } from '../ResultWordsList/resultWordsList';
import { NavLink } from 'react-router-dom';

let correctAnswers: WordsProps[] = [];
let wrongAnswers: WordsProps[] = [];

interface SavannahProps {
  words: WordsProps[]
}

const SavannahRedux: React.FC<GameProps & SavannahProps> = ({ group, page, words }) => {
  const [gameWords, setGameWords] = useState<WordsProps[]>([]);
  const [translations, setTranslations] = useState<WordsProps[]>([]);
  const [lives, setLives] = useState<number>(5);
  const [listResultsNumber, setListResultsNumber] = useState<number>(0);
  const word = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const necessaryArray = words.slice((Number(group) * 600), 4);
    setGameWords(necessaryArray);
    setTranslations(necessaryArray);
    correctAnswers = [];
    wrongAnswers = [];
  }, [words, group]);

  useEffect(() => {
    window.addEventListener("keyup", onKeyUpHandler);

    return () => (window as any).removeEventListener("keyup", onKeyUpHandler);

  }, [gameWords]);



  const shuffleArray = (array: WordsProps[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const onAnswer = (wordTranslation: WordsProps, evt?: any, wordForTranslation?: string): void => {
    console.log(typeof evt);
    let wrongAnswer: boolean;
    if (typeof evt === "string") {
      wrongAnswer = wordForTranslation !== wordTranslation.wordTranslate;
    } else {
      wrongAnswer = evt === undefined || evt.target.innerText.match(/[а-я]/gi).join('') !== wordTranslation.wordTranslate;
    }

    word.current!.style.animationPlayState = "paused";
    const wordTranslations = document.querySelectorAll(".savannah__translation-item");

    wordTranslations?.forEach((translation) => {
      translation.textContent?.match(/[а-я]/gi)?.join('') === wordTranslation.wordTranslate ?
        translation.classList.add("word-correct") :
        translation.classList.add("word-wrong");
    })

    setTimeout(() => {
      if (wrongAnswer) {
        setLives(prevLives => prevLives - 1);
        wrongAnswers.push(wordTranslation);
      } else {
        correctAnswers.push(wordTranslation);
      }

      const updatedWords = gameWords.filter((word) => word.word !== wordTranslation.word);
      setGameWords(updatedWords);

      if (word.current) {
        word.current.style.animationPlayState = "running";
      }

      wordTranslations?.forEach((translation) => {
        translation.textContent?.match(/[а-я]/gi)?.join('') === wordTranslation.wordTranslate ?
          translation.classList.remove("word-correct") :
          translation.classList.remove("word-wrong");
      })

      word.current?.classList.replace("flow-animation", "word-hidden");
      setTimeout(() => word.current?.classList.replace("word-hidden", "flow-animation"), 50);
    }, 800);
  };

  const onKeyUpHandler = (evt: KeyboardEvent) => {
    switch (evt.key) {
      case "1":
        return onAnswer(wordsOnScreen[0], wordForTranslation.word);
      case "2":
        return onAnswer(wordsOnScreen[1], wordForTranslation.word);
      case "3":
        return onAnswer(wordsOnScreen[2], wordForTranslation.word);
      case "4":
        return onAnswer(wordsOnScreen[3], wordForTranslation.word);
    }
  }

  const restartGame = () => {
    const necessaryArray = words.slice((Number(group) * 600), 4);
    setGameWords(necessaryArray);
    setLives(5);
    correctAnswers = [];
    wrongAnswers = [];
  }

  const translationWordIndex: number = Math.floor(Math.random() * gameWords.length);
  const wordForTranslation: WordsProps = gameWords[translationWordIndex] || {};
  const translationsCopy = translations.slice();

  translationsCopy.splice(translations.findIndex((word) => word.wordTranslate === wordForTranslation.wordTranslate), 1);

  const getRandomWords = () => {
    const randomWordIndex: number = Math.floor(Math.random() * translationsCopy.length);
    const randomWord = translationsCopy[randomWordIndex];

    translationsCopy.splice(randomWordIndex, 1);

    return randomWord;
  }

  const wordsOnScreen: WordsProps[] = [
    getRandomWords(),
    getRandomWords(),
    getRandomWords(),
    wordForTranslation
  ]



  if (gameWords.length === 0 && translations.length === 0) {
    return <Loader />
  }

  return (
    <main className="savannah">
      {lives > 0 && gameWords.length !== 0 ?
        <>
          <Lives lives={lives} />
          <div className="savannah__word flow-animation" ref={word} onAnimationEnd={() => { onAnswer(wordForTranslation) }}>
            {
              wordForTranslation.word
            }
          </div>
          <div className="savannah__translation">
            <ul className="svannah__translation-list">
              {
                shuffleArray(wordsOnScreen).map((word: WordsProps, i: number) => {
                  return (
                    <li
                      key={word.wordTranslate + i}
                      className="savannah__translation-item"
                      onClick={evt => onAnswer(wordForTranslation, evt)}
                    >
                      <span tabIndex={0}>{i + 1}. {word.wordTranslate}</span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </>
        :
        <div className='game-sprint__body game-sprint__body--end'>
          <h3>Твой результат {correctAnswers.length * 10} очков</h3>
          {listResultsNumber === 0 ?
            <ResultPercent error={wrongAnswers.length} correct={correctAnswers.length} /> :
            <ResultWordsList errorList={wrongAnswers} correctList={correctAnswers} />
          }
          <nav className='sprint-body__nav'>
            <div className='sprint-body__pagination'>
              <div className='sprint-body-pagination__dot sprint-body-pagination__dot--activ'
                onClick={() => setListResultsNumber(0)} />
              <div className='sprint-body-pagination__dot'
                onClick={() => setListResultsNumber(1)} />
            </div>
            <span className='sprint-body-nav__link' onClick={restartGame}>Продолжить игру</span>
            <NavLink to={`/games`} >
              <span className='sprint-body-nav__link'>К списку игр</span>
            </NavLink>
          </nav>
        </div>
      }
    </main>
  )
}

const mapStateToProps = (state: any) => ({
  words: state.data.words
});

const Savannah = connect(mapStateToProps)(SavannahRedux);

export { Savannah };