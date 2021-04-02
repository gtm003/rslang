import React, { useState, useEffect } from 'react';

import { getDataPage } from "../../data";

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
}

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

  const getRandomWords = () => {
    const randomWordIndex: number = Math.floor(Math.random() * words.length);
    // const translations = words.map((word) => word.wordTranslate);
    const randomWord = translations[randomWordIndex];
    console.log(translations);
    translations.splice(randomWordIndex, 1);



    return randomWord;
  }

  if (words.length === 0) {
    return <div>Loading...</div>
  }

  const randomWordIndex: number = Math.floor(Math.random() * words.length);
  const translationWord: string = words[randomWordIndex].word;
  const wordTranslation: string = words[randomWordIndex].wordTranslate;

  const changeWordList = (evt: any, wordTranslation: string): void => {
    if (evt.target.lastChild.data === wordTranslation) {
      const updatedWords = words.filter((word) => word.word !== translationWord);
      setWords(updatedWords);
    }
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