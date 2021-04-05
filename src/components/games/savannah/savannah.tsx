import React, { useState, useEffect, useRef } from 'react';
import { WordsProps, GameProps } from "../../../common/ts/interfaces";
import { connect } from "react-redux";
import { Loader } from "../../loader";
import { Lives } from "./lives/lives";
import { ActionCreator } from "../../../common/redux/action-creator";
import { getDataPage } from "../../../data";

interface SavannahProps {
  words: WordsProps[]
}

const SavannahRedux: React.FC<GameProps & SavannahProps> = ({ group, page, words }) => {
  const [gameWords, setGameWords] = useState<WordsProps[]>([]);
  const [translations, setTranslations] = useState<string[]>([]);
  const [lives, setLives] = useState<number>(5);
  const word = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGameWords(words.slice((Number(group) * 600), ((Number(group) + 1) * 600)));
  }, [words])

  useEffect(() => {
    setTranslations(gameWords.map((word) => word.wordTranslate));
  }, [gameWords])

  // useEffect(() => {
  //   getDataPage(group, page).then(res => {
  //     setWords(res);
  //     setTranslations(res.map((word) => word.wordTranslate));
  //   });
  // }, []);

  const shuffleArray = (array: string[]) => {
    for (let i = 0; i <= array.length - 1; i++) {
      let j = Math.floor(Math.random() * i);
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  const changeWordList = (wordTranslation: string, evt?: any): void => {
    setTimeout(() => {
      if (evt === undefined || evt.target.lastChild.data !== wordTranslation) {
        setLives(prevLives => prevLives - 1);
      }

      const updatedWords = gameWords.filter((word) => word.word !== translationWord);
      setGameWords(updatedWords);

      word.current!.style.animationPlayState = "running";
      word.current?.classList.replace("flow-animation", "word-hidden");
      setTimeout(() => word.current?.classList.replace("word-hidden", "flow-animation"), 50);
    }, 800);

    word.current!.style.animationPlayState = "paused";
    const wordTranslations = document.querySelectorAll(".savannah__translation-item");

    wordTranslations?.forEach((translation) => {
      translation.lastChild?.textContent === wordTranslation ?
        translation.classList.add("word-correct") :
        translation.classList.add("word-wrong");
    })
  };

  if (gameWords.length === 0 || translations.length === 0) {
    return <Loader />
  }

  const translationWordIndex: number = Math.floor(Math.random() * gameWords.length);
  const translationWord: string = gameWords[translationWordIndex].word;
  const wordTranslation: string = gameWords[translationWordIndex].wordTranslate;
  const translationsCopy = translations.slice();

  translationsCopy.splice(translations.findIndex((word) => word === wordTranslation), 1);

  const getRandomWords = () => {
    const randomWordIndex: number = Math.floor(Math.random() * translationsCopy.length);
    const randomWord = translationsCopy[randomWordIndex];

    translationsCopy.splice(randomWordIndex, 1);

    return randomWord;
  }

  const wordTranslations: string[] = [
    wordTranslation,
    getRandomWords(),
    getRandomWords(),
    getRandomWords()
  ]

  return (
    <main className="savannah">
      <Lives lives={lives} />
      <div className="savannah__word flow-animation" ref={word} onAnimationEnd={(evt) => changeWordList(wordTranslation)}>
        {
          translationWord
        }
      </div>
      <div className="savannah__translation">
        <ul className="svannah__translation-list">
          {
            shuffleArray(wordTranslations).map((translation: string, i: number) => {
              return (
                <li key={translation + i} className="savannah__translation-item" onClick={evt => changeWordList(wordTranslation, evt)} >
                  <span>{i + 1}. </span>
                  <span>
                    {translation}
                  </span>
                </li>
              )
            })
          }
        </ul>
      </div>
    </main>
  )
}

const mapStateToProps = (state: any) => ({
  words: state.data.words
});

const Savannah = connect(mapStateToProps)(SavannahRedux);

export { Savannah };