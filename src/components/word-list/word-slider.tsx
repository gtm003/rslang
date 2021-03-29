import React, {useEffect, useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import {getDataPage, urlBackend} from "../../data";
import {Loader} from "../loader";

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

interface WordSliderProps {
  group: number,
  page: number,
}

const audio = new Audio();

const WordSlider: React.FC<WordSliderProps> = ({group, page}) => {
  const [words, setWords] = useState<WordsProps[]>([]);

  useEffect(() => {
    getDataPage(group, page).then((res: WordsProps[]) => setWords(res));
  }, [page]);

  const playWord = (audioWord: string, audioMeaning: string, audioExample: string) => {
    const tracks: Array<string> = [urlBackend + audioWord, urlBackend + audioMeaning, urlBackend + audioExample];
    let current: number = 0;
    audio.src = tracks[0];
    audio.play();

    audio.onended = function () {
      current += 1;
      if (current < tracks.length) {
        audio.src = tracks[current];
        audio.play();
      }
    }
  };

  return (
    <div className="word-slider">
      {
        (page < 0) ?
        <img src="/images/startPageWords.png" alt='start page of words'/>
        :
        words.length ?
          <Carousel dynamicHeight={false}>
            {words.map((item: WordsProps) => {
              return (
                <div key={item.id}>
                  <img src={urlBackend + item.image}/>
                  <div className="carousel__content">
                    <div className="word">
                      <p className="word__value">{item.word} {item.transcription}</p>
                      <p className="word__translate">({item.wordTranslate})</p>
                    </div>
                    <div className='meaning'>
                      <p className="meaning__value">{item.textMeaning}</p>
                      <p className="meaning__translate">({item.textMeaningTranslate})</p>
                    </div>
                    <div className='example'>
                      <p className="example__value">{item.textExample}</p>
                      <p className="example__translate">({item.textExampleTranslate})</p>
                    </div>
                    <div className="audio" onClick={() => playWord(item.audio, item.audioMeaning, item.audioExample)}>
                      <img src="/images/audio.png"/></div>
                  </div>
                </div>
              )
            })}
          </Carousel> :
          <Loader/>
      }
      </div>
  )
}

export {WordSlider};
