import { WordsProps } from "../common/ts/interfaces";
import {urlBackend} from "./index";
import {stateUser} from "../common/redux/login-reducer";

export const getData = async (): Promise<Array<WordsProps>> => {
  const userId = stateUser.user.userId;
  const url: string = `${urlBackend}users/${userId}/words`;
console.log(stateUser.user.token)
  //const res = await fetch(`${url}`);
  const res = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${stateUser.user.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    //body: JSON.stringify()
  });

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};

const setData = (word:any, prop:any, value:any) => {

  word[prop] = value;
  console.log(stateUser.user.token)
  const userId = stateUser.user.userId;
  const {id: newId, ...rest} = word;
  const newWord = {_id: newId, ...rest};
  console.log(userId)
  if (newWord) {
    const setWordsToBack = async (newWord: any) => {
      const responce = await fetch(`${urlBackend}users/${userId}/words/${newWord._id}`, {
      //const responce = await fetch(`${urlBackend}words/${newWord._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${stateUser.user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newWord)
      });
    };
    setWordsToBack(newWord);
  }
}

const setStatistics = (word:any, prop:any, value:any) => {

  word[prop] = value;
  const userId = stateUser.user.userId;
  const {id: newId, ...rest} = word;
  const newWord = {_id: newId, ...rest};
  if (newWord) {
    const setWordsToBack = async (newWord: any) => {
      const responce = await fetch(`${urlBackend}users/${userId}/words/${newWord._id}`, {
      //const responce = await fetch(`${urlBackend}words/${newWord._id}`, {
        method: 'POST',
        headers: {
          //'Authorization': `Bearer ${stateUser.user.token}`,
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
