import { WordsProps,  StatisticsProps} from "../common/ts/interfaces";
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
// const setData = (word: any, prop: any, value: boolean) => { 
  word[prop] = value;
  const {id: newId, ...rest} = word;
  const newWord = {_id: newId, ...rest};
  if (newWord) {
    const setWordsToBack = async (newWord: any) => {
      console.log(newWord);
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
    //withCredentials: true,
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
    }
  });
  if (rawResponse.ok) {
    const content = await rawResponse.json();
    return await content;
  } else {
    setStatistics(user);
    return STATISTICS.statistics;
  }
};

export {getStatistics};

const setStatistics = async (user: any) => {
  const rawResponse = await fetch(`${urlBackend}users/${user.userId}/statistics`, {
    method: 'PUT',
    //withCredentials: true,
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(STATISTICS),
  });
  const content = await rawResponse.json();

  console.log(content);
};

export {setStatistics};

const STATISTICS = {
  "statistics": {
        "constructorWords": [
          {
              "data": "14.04.2021",
              "learningWords": ['dog', 'cat'],
              "winStreak": 2,
              "generalCountLearningWords": 0,
              "countRightAnswers": 2
          }
      ],
      "savannah": [
          {
              "data": "16.04.2021",
              "learningWords": ['dog', 'cat', 'pig'],
              "winStreak": 3,
              "generalCountLearningWords": 0,
              "countRightAnswers": 3
          }
      ],
      "audioCall": [
        {
            "data": "15.04.2021",
            "learningWords": ['dog', 'cat', 'clock', 'revert'],
            "winStreak": 4,
            "generalCountLearningWords": 0,
            "countRightAnswers": 4
        }
    ],
      "sprint": [
          {
              "data": "16.04.2021",
              "learningWords": ['dog', 'cat', 'strong', 'base'],
              "winStreak": 4,
              "generalCountLearningWords": 0,
              "countRightAnswers": 4
          }
      ]
  }
}