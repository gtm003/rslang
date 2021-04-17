import {WordsProps, StatisticsProps, StatisticBackProps} from "../common/ts/interfaces";
import {urlBackend} from "./index";

const url: string = `${urlBackend}words?all=true`;

export const getData = async (): Promise<Array<WordsProps>> => {

  const res = await fetch(`${url}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};

const setData = (word: any, prop: any, value: any) => {
  word[prop] = value;
  const {id: newId, ...rest} = word;
  const newWord = {_id: newId, ...rest};
  if (newWord) {
    const setWordsToBack = async (newWord: any) => {
      const responce = await fetch(`${urlBackend}words/${newWord._id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newWord)
      });
    };
    setWordsToBack(newWord);
  }
}

export {setData};

const getStatistics = async (user: any): Promise<StatisticsProps> => {

  const rawResponse = await fetch(`${urlBackend}users/${user.userId}/statistics`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
    }
  });
  if (rawResponse.ok) {
    const content = await rawResponse.json();
    if (!content.statistics.audioCall && !content.statistics.constructorWords && !content.statistics.savannah && !content.statistics.sprint) {
      setStatistics(user, STATISTICS);
      return STATISTICS.statistics;
    } else return await content;
  } else {
    setStatistics(user, STATISTICS);
    return STATISTICS.statistics;
  }
};

export {getStatistics};

const setStatistics = async (user: any, statistic: StatisticBackProps) => {

  const rawResponse = await fetch(`${urlBackend}users/${user.userId}/statistics`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistic),
  });
};

export {setStatistics};

const STATISTICS: StatisticBackProps = {
  "statistics": {
    "constructorWords": [
      {
        "data": "",
        "learningWords": [],
        "winStreak": 0,
        "generalCountLearningWords": 0,
        "countRightAnswers": 0
      }
    ],
    "savannah": [
      {
        "data": "",
        "learningWords": [],
        "winStreak": 0,
        "generalCountLearningWords": 0,
        "countRightAnswers": 0
      }
    ],
    "audioCall": [
      {
        "data": "",
        "learningWords": [],
        "winStreak": 0,
        "generalCountLearningWords": 0,
        "countRightAnswers": 0
      }
    ],
    "sprint": [
      {
        "data": "0",
        "learningWords": [],
        "winStreak": 0,
        "generalCountLearningWords": 0,
        "countRightAnswers": 0
      }
    ]
  }
}