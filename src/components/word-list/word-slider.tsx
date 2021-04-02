import React, {useEffect, useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import {getDataPage, urlBackend} from "../../data";
import {Loader} from "../loader";
import {connect} from "react-redux";
import {WordsProps} from "../../common/ts/interfaces";

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
  isTranslate: boolean,
  areButtons: boolean
}

const audio = new Audio();

const WordSliderRedux: React.FC<WordSliderProps> = ({group, page, isTranslate, areButtons}) => {
  const [words, setWords] = useState<WordsProps[]>([]);

  useEffect(() => {
    setWords([]);
    getDataPage(group - 1, page).then((res: WordsProps[]) => setWords(res));
  }, [page, group]);

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

  const pathImg: string = `/images/group/${group - 1}.png`;

  return (
    <div className="word-slider">
      {
        (page < 0) ?
          <img src={pathImg} alt='level english'/>
          :
          words.length ?
            <Carousel dynamicHeight={false}>
              {words.map((item: WordsProps) => {
                return (
                  <div key={item.id}>
                    <img src={urlBackend + item.image} alt='figure of word'/>
                    <div className="carousel__content">
                      <div className="word">
                        <p className="word__value">{item.word} {item.transcription}</p>
                        {isTranslate && <p className="word__translate">({item.wordTranslate})</p>}
                      </div>
                      <div className='meaning'>
                        <p className="meaning__value" dangerouslySetInnerHTML={{__html: item.textMeaning}}></p>
                        {isTranslate && <p className="meaning__translate">({item.textMeaningTranslate})</p>}
                      </div>
                      <div className='example'>
                        <p className="example__value" dangerouslySetInnerHTML={{__html: item.textExample}}></p>
                        {isTranslate && <p className="example__translate">({item.textExampleTranslate})</p>}
                      </div>
                      <div className="carousel__content__btns">
                        <div className="audio"
                             onClick={() => playWord(item.audio, item.audioMeaning, item.audioExample)}>
                          <img src="/images/audio.png" alt='audio'/>
                        </div>
                        {areButtons &&
                        <div className='btn-difficult'>
                          Добавить в Сложные
                        </div>}
                        {areButtons &&
                        <div className='btn-delete'>
                          Удалить
                        </div>}
                      </div>
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

const mapStateToProps = (state: any) => ({
  isTranslate: state.setting.isTranslate,
  areButtons: state.setting.areButtons,
});


const WordSlider = connect(mapStateToProps)(WordSliderRedux);

export {WordSlider};
