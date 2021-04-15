import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StatisticsProps, GameStatisticDailyProps } from '../../common/ts/interfaces';
import { titleGames, getStatistics, setStatistics } from '../../data';
import { ResultPercent } from '../games/resultPercent/resultPercent';


interface ShortStatisticsProps {
  user: any;
  correct: number;
  error: number;
  seriesLength?: number;
}

const STATISTICS = {
  "statistics": {
        "constructorWord": [
          {
              "data": "14.04.2021",
              "countLearningWords": 15,
              "winStreak": 24,
              "generalCountLearningWords": 25,
              "countRightAnswers": 30
          },
          {
              "data": "15.04.2021",
              "countLearningWords": 20,
              "winStreak": 19,
              "generalCountLearningWords": 40,
              "countRightAnswers": 10
          }
      ],
      "savannah": [
          {
              "data": "14.04.2021",
              "countLearningWords": 15,
              "winStreak": 24,
              "generalCountLearningWords": 25,
              "countRightAnswers": 30
          },
          {
              "data": "15.04.2021",
              "countLearningWords": 20,
              "winStreak": 19,
              "generalCountLearningWords": 40,
              "countRightAnswers": 10
          }
      ],
      "audioCall": [
        {
            "data": "14.04.2021",
            "countLearningWords": 15,
            "winStreak": 24,
            "generalCountLearningWords": 25,
            "countRightAnswers": 30
        },
        {
            "data": "15.04.2021",
            "countLearningWords": 20,
            "winStreak": 19,
            "generalCountLearningWords": 40,
            "countRightAnswers": 10
        }
    ],
      "sprint": [
          {
              "data": "11.04.2021",
              "countLearningWords": 15,
              "winStreak": 24,
              "generalCountLearningWords": 25,
              "countRightAnswers": 30
          }
      ]
  }
}

const ShortStatisticsRedux: React.FC<ShortStatisticsProps> = ({user, correct, error, seriesLength}) => {
  //const gameScore = score ? score : correctList.length * 10;
  const [gameNumber, setGameNumber] = useState<number>(4);
  const [statisticCurrent, setStatisticCurrent] = useState<StatisticsProps>();
  const [gameStatistic, setGameStatistic] = useState<GameStatisticDailyProps>();
  const titleStatistic = titleGames.concat(
    {
      id: 'summary',
      name: 'Общая статистика',
      iconUrl: '/images/games/constructor.svg',
      imgUrl: '',
      description: '',
    }
  );
    setStatistics(user);
  useEffect(() => {
    getStatistics(user).then((res: any) => setStatisticCurrent(res.statistics));
    console.log(statisticCurrent?.constructorWords[0]);
  }, []);
  getStatistics(user);

  const onChangeGameNumber = (index: number) => {
    setGameNumber(index);
    const gameName = titleStatistic[index].id;
    //setGameStatistic(statistic[index]);
    
    let gameStatistic; 
      switch (gameName) {
      case 'sprint':
        gameStatistic = statisticCurrent?.sprint[statisticCurrent?.sprint.length - 1];
        break;
      case 'audio':
        gameStatistic = statisticCurrent?.audioCall[statisticCurrent?.audioCall.length - 1];
        break;
      case 'savannah':
          gameStatistic = statisticCurrent?.savannah[statisticCurrent?.savannah.length - 1];
        break;
      case 'constractor':
        gameStatistic = statisticCurrent?.constructorWords[statisticCurrent?.constructorWords.length - 1];
        break;
      case 'summary':
        //gameStatistic = statisticCurrent?.constructor[statisticCurrent?.constructor.length - 1];
        break;
    }
    setGameStatistic(gameStatistic);
    console.log(gameStatistic);
  }

  return (
  <React.Fragment>
    <div className='short-statistic'>
      <p className='short-statistic__title'>Последняя тренровка: {gameStatistic?.data}</p>
      <div className='short-statistic__body'>
        <p className='short-statistic__body__subtitle'>{titleStatistic[gameNumber].name}</p>
        {
          (seriesLength !== undefined) ? <p className='short-statistic__body__series'>
            Самая длинная серия: {gameStatistic?.winStreak}</p> : null
        }
        <p className='short-statistic__body__repeat'>Повторено слов: {gameStatistic ? gameStatistic.countLearningWords : 0}</p>
        <ResultPercent  error = {gameStatistic ? gameStatistic.countLearningWords - gameStatistic.countRightAnswers : 0} correct = {gameStatistic ? gameStatistic.countRightAnswers : 0}/>
        <div className='short-statistic__body__control'>
          {
            titleStatistic.map((item, index) => {
              return (index === gameNumber ? 
                <div className='short-statistic__body__control__item short-statistic__body__control__item--active' key = {index}>
                  <img src={item.iconUrl} alt={item.iconUrl} height='60%'/>
                </div> :
                <div className='short-statistic__body__control__item' key = {index}
                  onClick = {() => onChangeGameNumber(index)}>
                  <img src={item.iconUrl} alt={item.iconUrl} height='60%'/>
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  </React.Fragment>)
};

const mapStateToProps = (state: any) => ({
  user: state.login.user,
});

const ShortStatistics = connect(mapStateToProps)(ShortStatisticsRedux);

export { ShortStatistics };

