import React, {useState} from "react";
import {connect} from "react-redux";
import {useLocation} from "react-router-dom";
import {Crumbs} from "../../common/navigation/crumbs";
import {titleGames} from "../../data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  Legend,
  CartesianAxis,
  LineChart,
  CartesianGrid,
  Line
} from 'recharts';

interface StatisticsProps {
  isAuth: boolean,
}

interface StatisticsCardsProps {
  learnedWords?: number,
  rightWords?: number
}

const GenaralStatisticsCards: React.FC<StatisticsCardsProps> = ({}) => {
  return (
    <div >
      <p className='statistics__title' >ваш прогресс</p >
      <div className='statistics__cards inner-wrapper' >
        <div >
          <p className='number-learned' >300</p >
          <p >Слов изучено</p >
        </div >
        <div >
          <p className='number-right' >89%</p >
          <p >Правильных ответов</p >
        </div >
      </div >
    </div >
  )
};

interface GameStatisticsCardsProps {
  item: any,
  index: number,
}

const GameStatisticsCards: React.FC<GameStatisticsCardsProps> = ({item, index}) => {
  return (
    <div className='item-settings'>
      <div className={`settings-icon game__icon game__icon--${index + 1}`} >
        <img src={item.iconUrl} alt={item.iconUrl} title={item.name} className='tutorial__icon' />
      </div >
      <p >300</p >
      <p >89%</p >
      <p >5</p >
    </div >
  )
};

const StatisticsRedux: React.FC<StatisticsProps> = ({isAuth}) => {
  const location = useLocation();
  const data = [
    {name: 'Page A', uv: 400, pv: 2400},
    {name: 'Page B', uv: 300, pv: 4567},
    {name: 'Page C', uv: 300, pv: 1398},
    {name: 'Page D', uv: 200, pv: 9800},
    {name: 'Page E', uv: 278, pv: 3908},
    {name: 'Page F', uv: 189, pv: 4800}];

  return (
    <>
      <Crumbs path={location.pathname} />
      <div className='statistics' >
        <div className='' >
          <GenaralStatisticsCards />
        </div >
        <div className='tutorial__icons statistics__cards inner-statistics' >
          <div className='items'>
            <div className='game__icon settings-icon '></div>
            <p>Слов изучено</p>
            <p>Правильных ответов</p>
            <p>Лучшая серия</p>
          </div >
          {
            titleGames.map((item, index) => {
              return (
                <GameStatisticsCards item={item} index={index} key={item.name} />
              )
            })
          }
        </div >
        {/*{nameGame && <StatisticsCards name={nameGame} isGame />}*/}
        {isAuth &&
				<div className='diagramms' >
					<LineChart
						width={400}
						height={400}
						data={data}
						margin={{top: 20, right: 20, left: 10, bottom: 20}}
					>
						<XAxis dataKey="name" />
						<Tooltip />
						<CartesianGrid stroke="#f5f5f5" />
						<Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
					</LineChart >
					<LineChart
						width={400}
						height={400}
						data={data}
						margin={{top: 20, right: 20, left: 10, bottom: 20}}
					>
						<XAxis dataKey="name" />
						<Tooltip />
						<CartesianGrid stroke="#f5f5f5" />
						<Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
					</LineChart >
				</div >}
      </div >
    </>
  )
};

const mapStateToProps = (state: any) => ({
  isAuth: state.login.isAuth,
});

const Statistics = connect(mapStateToProps)(StatisticsRedux);

export {Statistics};