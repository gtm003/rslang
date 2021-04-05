import React, {useState } from 'react';
import { NavLink } from 'react-router-dom';
import { levelsEnglish } from '../../data';

interface GamesProps {
  id : string;
  name: string;
  iconUrl: string;
  imgUrl: string;
  description: string;
}

const titleGames : GamesProps[] = [
  {
    id : 'constructor',
    name: 'Конструктор слов',
    iconUrl: '/images/games/constructor.svg',
    imgUrl: '/images/games/constructor.png',
    description: 'Учит быстро переводить с английского на ваш родной язык.',
  }, {
    id : 'savannah',
    name: 'Саванна',
    iconUrl: '/images/games/savannah.svg',
    imgUrl: '/images/games/savannah.png',
    description: 'Учит быстро переводить с английского на ваш родной язык.',
  }, {
    id : 'audio',
    name: 'Аудиовызов',
    iconUrl: '/images/games/audio.svg',
    imgUrl: '/images/games/audio.png',
    description: 'Учит быстро переводить с английского на ваш родной язык.',
  }, {
    id : 'sprint',
    name: 'Спринт',
    iconUrl: '/images/games/sprint.svg',
    imgUrl: '/images/games/sprint.png',
    description: 'Учит быстро переводить с английского на ваш родной язык.',
  },
]

const Games: React.FC = () => {
  const [level, setLevel] = useState<number>(0);

  const onChangeHandlerSelectLevel = (levelId: number) => {
    setLevel(levelId);
  }

  return (
    <div className='games'>
      <div className='games__select'>
        {
          titleGames.map((item, index) => {
            return (
              <div key = {index} className = {`game game--${index+1}`}>
                <div className = 'game__head'>
                  <div className = 'game__title'>{item.name}</div>
                  <NavLink to={`/games/${item.id}${level}`} key = {item.id}>
                    <div className = 'game__icon' >
                      <img src = {item.iconUrl} alt = {item.iconUrl} width='80%'/>
                    </div>
                  </NavLink>
                </div>
                <div className = 'game__img'>
                  <img src = {item.imgUrl} alt = {item.imgUrl} height='100%' width='100%'/>
                </div>
              </div>
            )
          })
        }
        <div className = 'games__select--level'>
          {
            levelsEnglish.map((item, index) => {
              return (
                <div key = {index} className = {`level__item level__item--${index + 1}`} >
                  <input type='radio' id={`${item.title}`} name='game' value={`${item.id}`} className='level-item__input'
                         checked = {index === level} onChange ={(e) => onChangeHandlerSelectLevel(+e.target.value)} />
                  <label className='level-item__label' htmlFor={`${item.title}`}>
                    <span className='label__item label__title'>{item.title}</span>
                    <span className='label__item label__name'>{item.name}</span>
                  </label>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
};

export {Games};