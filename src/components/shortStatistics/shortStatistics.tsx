import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StatisticsProps, GameStatisticDailyProps } from '../../common/ts/interfaces';
import { titleGames, getStatistics, setStatistics } from '../../data';
import { ResultPercent } from '../games/resultPercent/resultPercent';
import { formatDate, compareDates} from '../../data/utils'

const NAMES_GAMES_BACK: string[] = ['savannah', 'audioCall', 'sprint', 'constructorWords'];

interface ShortStatisticsProps {
  user: any;
  correct?: number;
  error?: number;
  seriesLength?: number;
}

let error: number = 0;
let correct: number = 0;

const emptyStatistic: GameStatisticDailyProps = {
  data: '',
  learningWords: [],
  winStreak: 0,
  generalCountLearningWords: 0,
  countRightAnswers: 0,
}

const ShortStatisticsRedux: React.FC<ShortStatisticsProps> = ({user}) => {
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

  useEffect(() => {
    getStatistics(user).then((res: any) => setStatisticCurrent(res.statistics));
  }, []);

  const getLastDay = (arr: GameStatisticDailyProps[]) => {
    return arr.length ? arr[arr.length -1] : emptyStatistic
  }
  
  const getSummaryStatistic = () => {
    const today = formatDate(new Date());
    const todaySummaryStatistics = [];
    if (compareDates(getLastDay(statisticCurrent!.sprint).data)) todaySummaryStatistics.push(statisticCurrent!.sprint);
    if (compareDates(getLastDay(statisticCurrent!.audioCall).data)) todaySummaryStatistics.push(statisticCurrent!.audioCall);
    if (compareDates(getLastDay(statisticCurrent!.savannah).data)) todaySummaryStatistics.push(statisticCurrent!.savannah);
    if (compareDates(getLastDay(statisticCurrent!.constructorWords).data)) todaySummaryStatistics.push(statisticCurrent!.constructorWords);
    /*
    for (let game:string in statisticCurrent) {
      console.log(statisticCurrent[game]);
    }*/
    console.log(todaySummaryStatistics);
  }

  const getGameStatisticLastDay = (index: number) : GameStatisticDailyProps => {
    const gameName = titleStatistic[index].id;
    getSummaryStatistic();
    let gameStatistic; 
      switch (gameName) {
      case 'sprint':
        gameStatistic = getLastDay(statisticCurrent!.sprint);
        break;
      case 'audio':
        gameStatistic = getLastDay(statisticCurrent!.audioCall);
        break;
      case 'savannah':
          gameStatistic = getLastDay(statisticCurrent!.savannah);
        break;
      case 'constructor':
        gameStatistic = getLastDay(statisticCurrent!.constructorWords);
        break;
      case 'summary':
        gameStatistic = emptyStatistic;
        break;
      default:
        gameStatistic = emptyStatistic;
    }
    console.log(gameName);
    return gameStatistic;
  }

  const onChangeGameNumber = (index: number) => {
    setGameNumber(index);
    setGameStatistic(getGameStatisticLastDay(index));
    console.log(gameStatistic);
    correct = gameStatistic?.countRightAnswers!;
    error = (gameStatistic?.learningWords.length!) - correct;
  }

  return (
  <React.Fragment>
    <div className='short-statistic'>
      <p className='short-statistic__title'>{titleStatistic[gameNumber].name}</p>
      <div className='short-statistic__body'>
        <p className='short-statistic__body__subtitle'>Последняя тренровка: {gameStatistic?.data}</p>
        <p className='short-statistic__body__series'>Самая длинная серия: {gameStatistic?.winStreak}</p>
        <p className='short-statistic__body__repeat'>Повторено слов: {gameStatistic?.learningWords.length}</p>
        <ResultPercent  error = {error} correct = {correct}/>
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