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
    id : 'sprint',
    name: 'Спринт',
    iconUrl: '/images/games/sprint.svg',
    imgUrl: '',
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
    id : 'constructor',
    name: 'Конструктор слов',
    iconUrl: '/images/games/constructor.svg',
    imgUrl: '',
    description: 'Учит быстро переводить с английского на ваш родной язык.',
  }]

const Games: React.FC = () => {
  const [level, setLevel] = useState<number>(0);
  const [game, setGame] = useState<string>('sprint');

  const onClickHandlerSelectGame = (gameId: string) => {
    setGame(gameId);
    console.log(game);
  }

  const onChangeHandlerSelectLevel = (levelId: number) => {
    setLevel(levelId);
    console.log(level);
  }

  return (
    <div className='games'>
      <div className='games__select'>
        {
          titleGames.map((item, index) => {
            return (
              <div key = {index} className = {`game game--${index+1}`}>
                <div className = 'game__head'>
                  <h3>{item.name}</h3>
                  <NavLink to={'/games/sprint'} key = {item.id}>
                    <div className = 'game__icon' >
                      <img src = {item.iconUrl} alt = {item.iconUrl} width='80%'
                        onClick = {() => onClickHandlerSelectGame(item.id)}/>
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
                <input type='radio' id={`${item.title}`} name='game' value={`${item.title}`} 
                onChange ={() => onChangeHandlerSelectLevel(item.id)}/>
                <label htmlFor={`${item.title}`}>
                  <span>{item.title}</span>
                  <span>{item.name}</span>
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