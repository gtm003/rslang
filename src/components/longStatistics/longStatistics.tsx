import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StatisticsProps, GameStatisticDailyProps } from '../../common/ts/interfaces';
import { titleGames, getStatistics } from '../../data';
import Chart from "react-google-charts";
import { compareDates} from '../../data/utils';

interface ShortStatisticsProps {
  user: any;
  correct?: number;
  error?: number;
  seriesLength?: number;
}

const emptyStatistic: GameStatisticDailyProps = {
  data: '',
  learningWords: [],
  winStreak: 0,
  generalCountLearningWords: 0,
  countRightAnswers: 0,
}

let statisticBack: StatisticsProps;

const LongStatisticsRedux: React.FC<ShortStatisticsProps> = ({user}) => {
  const [gameNumber, setGameNumber] = useState<number>(4);
  const [countLearningWords, setCountLearningWords] = useState<number>(0);
  const [error, setError] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [winStreak, setWinStreak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
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
    getStatistics(user).then((res: any) => {
      statisticBack = res.statistics;
      setLoading(false);
    });
  }, []);

  const getLastDay = (arr: GameStatisticDailyProps[]) => {
    return arr.length ? arr[arr.length -1] : emptyStatistic;
  }
  
  const getSummaryStatistic = () => {
    const todaySummaryStatistics = [];
    let countAnswer: number = 0;
    let countRightAnswers: number = 0;
    let winStreak: number = 0;
    for (let game in statisticBack) {
      if (!compareDates(getLastDay(statisticBack[game as keyof StatisticsProps]).data))
      todaySummaryStatistics.push(getLastDay(statisticBack[game as keyof StatisticsProps]))
    }
    const summaryLearningWords = new Set<string>();
    todaySummaryStatistics.forEach(game => {
      game.learningWords.forEach(word => summaryLearningWords.add(word));
      if (game.winStreak > winStreak) winStreak = game.winStreak;
      countRightAnswers += game.countRightAnswers;
      countAnswer += game.generalCountLearningWords;
    })
    setWinStreak(winStreak);
    setCountLearningWords(summaryLearningWords.size);
    setCorrect(countRightAnswers);
    setError(countAnswer - countRightAnswers);
  }

  const getGameStatisticLastDay = (index: number) : GameStatisticDailyProps => {
    const gameName = titleStatistic[index].id;
    let gameStatistic; 
      switch (gameName) {
      case 'sprint':
        gameStatistic = getLastDay(statisticBack!.sprint);
        break;
      case 'audio':
        gameStatistic = getLastDay(statisticBack!.audioCall);
        break;
      case 'savannah':
          gameStatistic = getLastDay(statisticBack!.savannah);
        break;
      case 'constructor':
        gameStatistic = getLastDay(statisticBack!.constructorWords);
        break;
      default:
        gameStatistic = emptyStatistic;
    }
    return gameStatistic;
  }

  const onChangeGameNumber = (index: number) => {
    console.log(statisticBack);
    setGameNumber(index);
    const gameStatistic = getGameStatisticLastDay(index);
    if (index !== 4) {
      setDate(gameStatistic.data);
      setWinStreak(gameStatistic.winStreak);
      setCountLearningWords(gameStatistic.learningWords.length);
      setCorrect(gameStatistic.countRightAnswers);
      setError(gameStatistic.generalCountLearningWords - gameStatistic.countRightAnswers);
    } else getSummaryStatistic();
  }

  return (
  <React.Fragment>
    <div className='long-statistic'>
      <p className='long-statistic__title'>Долгосрочная статистика</p>
      <div className='long-statistic__body'>
        {loading ?
        <span>Сейчас посчитаем</span> :
        <React.Fragment>
                  <Chart
    width={'100%'}
    height={450}
    chartType="ColumnChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Количество изучаемых слов', 'общее', 'за день'],
      ['15.04.2021', 20, 20],
      ['16.04.2021', 40, 20],
      ['17.04.2021', 70, 30],
    ]}
    options={{
      //title: 'Долгосрочная статистика',
      legend: { position: 'bottom', maxLines: 3 },
      chartArea: { width: '60%' },
      hAxis: {
        //title: 'Даты',
        minValue: 0,
      },
      vAxis: {
        //title: 'Количество изучаемых слов',
      },
    }}
    legendToggle
  />  
        </React.Fragment>}
      </div>
    </div>
  </React.Fragment>)
};

const mapStateToProps = (state: any) => ({
  user: state.login.user,
});

const LongStatistics = connect(mapStateToProps)(LongStatisticsRedux);

export { LongStatistics };