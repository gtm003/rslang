import React, {useEffect, useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import {getDataPage, urlBackend} from "../../data";


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

interface ItemSliderProps {
  item: WordsProps,
}

const WordSlider: React.FC<WordSliderProps> = ({group, page}) => {
  const [words, setWords] = useState<WordsProps[]>([]);

  useEffect(() => {
    getDataPage(group, page).then((res: WordsProps[]) => setWords(res));
  }, [page]);

  const ItemSlider: React.FC<ItemSliderProps> = ({item}) => {
    return (
      <div>
        <img src={urlBackend + item.image}/>
        <p className="legend">{item.word}</p>
      </div>
    )
  }

  return (
    <div className="word-slider">
      {console.log(words)}
      {
        words.length ?
          <React.Fragment>
            <Carousel>
              {words.map((item: WordsProps) => {
                return (
                  <div>
                    <img src={urlBackend + item.image}/>
                    <div className="carousel__content">
                      <p className="word">{item.word} {item.transcription} {item.wordTranslate}</p>
                      <div className='meaning'>
                        <p className="meaning__value">{item.textMeaning}</p>
                        <p className="meaning__translate">{item.textMeaningTranslate}</p>
                      </div>
                      <div className='example'>
                        <p className="example__value">{item.textExample}</p>
                        <p className="example__translate">{item.textExampleTranslate}</p>
                      </div>
                      <div className="audio"> <img src="/images/audio.png"/></div>
                    </div>
                  </div>
                )
              })}
            </Carousel>

          </React.Fragment> :
          <h1>Loading...</h1>
      }
    </div>
  )
}

export {WordSlider};