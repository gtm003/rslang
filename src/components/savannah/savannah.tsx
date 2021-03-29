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
  const NUMBER_OF_WORDS = 4;
  const [words, setWords] = useState<WordsProps[]>([]);

  useEffect(() => {
    getDataPage(1, 1).then(res => setWords(res));
  }, []);

  if (words.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <main className="savannah">
      <div className="savannah__word">
        {
          words[Math.floor(Math.random() * words.length)].word
        }
      </div>
      <div className="savannah__translation">
        <ul className="svannah__translation-list">
          {
            words.map((word, i) => {
              if (i <= NUMBER_OF_WORDS - 1) {
                return (
                  <li key={word.word + i} className="savannah__translation-item">
                    <span>{i + 1}. </span>
                    {
                      words[Math.floor(Math.random() * words.length)].wordTranslate
                    }
                  </li>
                )
              }
              return null;
            })
          }
        </ul>
      </div>
    </main>
  )
}

export { Savannah };