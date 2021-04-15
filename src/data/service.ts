import { WordsProps } from "../common/ts/interfaces";
import {urlBackend} from "./index";
import {stateUser} from "../common/redux/login-reducer";

export const getData = async (): Promise<Array<WordsProps>> => {
  const userId = stateUser.user.userId;
  const url: string = `${urlBackend}users/${userId}/words`;
  const res = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${stateUser.user.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  if (!res.ok) {
    //throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};

const setData = (word:any, prop:any, value:any) => {

  word[prop] = value;
 // console.log(stateUser.user.token)
  const userId = stateUser.user.userId;
  if (!word._id)  word._id = word.id;

  if (word) {
    const setWordsToBack = async (word: any) => {
      const responce = await fetch(`${urlBackend}users/${userId}/words/${word._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${stateUser.user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
      });
    };
    setWordsToBack(word);
  }
}

// const setStatistics = (word:any, prop:any, value:any) => {
//
//   word[prop] = value;
//   const userId = stateUser.user.userId;
//   if (!word._id) {
//     const {id: newId, ...rest} = word;
//     word = {_id: newId, ...rest};
//   }
//   if (word) {
//     const setWordsToBack = async (word: any) => {
//       const responce = await fetch(`${urlBackend}users/${userId}/words/${word._id}`, {
//       //const responce = await fetch(`${urlBackend}words/${newWord._id}`, {
//         method: 'POST',
//         headers: {
//           //'Authorization': `Bearer ${stateUser.user.token}`,
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(word)
//       });
//     };
//     setWordsToBack(word);
//   }
// }


export {setData};
