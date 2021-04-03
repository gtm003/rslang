import React, { useState, useEffect } from 'react';
import {WordsProps} from "../../common/ts/interfaces";

import { getDataPage } from "../../data";

const Savannah: React.FC = () => {
  const [words, setWords] = useState<WordsProps[]>([]);
  const [translations, setTranslations] = useState<string[]>([]);

  useEffect(() => {
    getDataPage(1, 1).then(res => {
      setWords(res);
      setTranslations(res.map((word) => word.wordTranslate));
    });
  }, []);

  const shuffleArray = (array: string[]) => {
    for (let i = 0; i <= array.length - 1; i++) {
      let j = Math.floor(Math.random() * i);
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  const changeWordList = (evt: any, wordTranslation: string): void => {
    if (evt.target.lastChild.data === wordTranslation) {
      const updatedWords = words.filter((word) => word.word !== translationWord);
      setWords(updatedWords);
    }
  };

  if (words.length === 0 || translations.length === 0) {
    return <div>Loading...</div>
  }
  
  const translationWordIndex: number = Math.floor(Math.random() * words.length);
  const translationWord: string = words[translationWordIndex].word;
  const wordTranslation: string = words[translationWordIndex].wordTranslate;
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
      <div className="savannah__word">
        {
          translationWord
        }
      </div>
      <div className="savannah__translation">
        <ul className="svannah__translation-list">
          {
            shuffleArray(wordTranslations).map((translation: string, i: number) => {
              return (
                <li key={translation + i} className="savannah__translation-item" onClick={evt => changeWordList(evt, wordTranslation)}>
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

export { Savannah };