import { WordsProps } from "../common/ts/interfaces";
import {urlBackend} from "./index";

const url: string = `${urlBackend}words?all=true`;

export const getData = async (): Promise<Array<WordsProps>> => {

  const res = await fetch(`${url}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};

interface setDataProps {
  word: any,
  prop: any,
  value: any,
  userId?: any,
  token?: any,
}

const setData = (word:any, prop:any, value:any, stateUser?:any) => {

  word[prop] = value;
  console.log(stateUser.user.userId)
  console.log(stateUser.user.token)
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
