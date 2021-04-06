import React, { useState, useEffect, useRef } from 'react';
import { WordsProps, GameProps } from "../../../common/ts/interfaces";
import { connect } from "react-redux";
import { Loader } from "../../loader";
import { Lives } from "./lives/lives";
import { ResultPercent } from '../resultPercent/resultPercent';
import { ResultWordsList } from '../ResultWordsList/resultWordsList';
import { NavLink } from 'react-router-dom';

// let lives = 5;
let correctAnswers: WordsProps[] = [];
let wrongAnswers: WordsProps[] = [];

interface SavannahProps {
  words: WordsProps[]
}

const SavannahRedux: React.FC<GameProps & SavannahProps> = ({ group, page, words }) => {
  const [gameWords, setGameWords] = useState<WordsProps[]>([]);
  const [translations, setTranslations] = useState<WordsProps[]>([]);
  const [lives, setLives] = useState<number>(5);
  const [isPlay, setIsPlay] = useState<boolean>(true);
  const [listResultsNumber, setListResultsNumber] = useState<number>(0);
  // const [correctAnswers, setCorrectAnswers] = useState<WordsProps[]>([]);
  // const [wrongAnswers, setWrongAnswers] = useState<WordsProps[]>([]);
  const word = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPlay) {
      const necessaryArray = words.slice((Number(group) * 600), ((Number(group) + 1) * 600));
      setGameWords(necessaryArray);
      setTranslations(necessaryArray);
      correctAnswers = [];
      wrongAnswers = [];
    }
  }, [words, group, isPlay]);


  // useEffect(() => {
  //   setTranslations(gameWords.map((word) => word.wordTranslate));
  // }, [gameWords])

  useEffect(() => {
    if (lives <= 0) {
      setIsPlay(false);
    }
  }, [lives])

  // useEffect(() => {
  //   getDataPage(group, page).then(res => {
  //     setWords(res);
  //     setTranslations(res.map((word) => word.wordTranslate));
  //   });
  // }, []);

  const shuffleArray = (array: WordsProps[]) => {
    for (let i = 0; i <= array.length - 1; i++) {
      let j = Math.floor(Math.random() * i);
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  const onAnswer = (wordTranslation: WordsProps, evt?: any): void => {
    const wrongAnswer = evt === undefined || evt.target.lastChild.data !== wordTranslation.wordTranslate;

    word.current!.style.animationPlayState = "paused";
    const wordTranslations = document.querySelectorAll(".savannah__translation-item");

    wordTranslations?.forEach((translation) => {
      translation.lastChild?.textContent === wordTranslation.wordTranslate ?
        translation.classList.add("word-correct") :
        translation.classList.add("word-wrong");
    })

    setTimeout(() => {
      if (wrongAnswer) {
        setLives(prevLives => prevLives - 1);
        wrongAnswers.push(wordTranslation);
        // setWrongAnswers((prevAnswers) => [...prevAnswers, wordTranslation]);
      } else {
        correctAnswers.push(wordTranslation);

        // setCorrectAnswers((prevAnswers) => [...prevAnswers, wordTranslation]);
      }

      const updatedWords = gameWords.filter((word) => word.word !== wordForTranslation);
      setGameWords(updatedWords);

      if (word.current) {
        word.current.style.animationPlayState = "running";
      }

      word.current?.classList.replace("flow-animation", "word-hidden");
      setTimeout(() => word.current?.classList.replace("word-hidden", "flow-animation"), 50);
    }, 800);
  };

  const restartGame = () => {
    setIsPlay(true);
    // setCorrectAnswers([]);
    // setWrongAnswers([]);
    setLives(5);
  }

  if (gameWords.length === 0 || translations.length === 0) {
    return <Loader />
  }

  const translationWordIndex: number = Math.floor(Math.random() * gameWords.length);
  const wordForTranslation: string = gameWords[translationWordIndex].word;
  const wordTranslation: WordsProps = gameWords[translationWordIndex];
  const translationsCopy = translations.slice();

  translationsCopy.splice(translations.findIndex((word) => word.wordTranslate === wordTranslation.wordTranslate), 1);

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
    wordTranslation
  ]

  return (
    <main className="savannah">
      {isPlay ?
        <>
          <Lives lives={lives} />
          <div className="savannah__word flow-animation" ref={word} onAnimationEnd={() => { onAnswer(wordTranslation) }}>
            {
              wordForTranslation
            }
          </div>
          <div className="savannah__translation">
            <ul className="svannah__translation-list">
              {
                shuffleArray(wordsOnScreen).map((word: WordsProps, i: number) => {
                  return (
                    <li key={word.wordTranslate + i} className="savannah__translation-item" onClick={evt => onAnswer(wordTranslation, evt)} >
                      <span>{i + 1}. </span>
                      <span>
                        {word.wordTranslate}
                      </span>
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