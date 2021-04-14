import { WordsProps } from "../common/ts/interfaces";
import {urlBackend} from "./index";
import {connect, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {loginUser, setLoginError, toggleLoginOpen} from "../common/redux/login-action-creator";
import {toggleSignUpOpen} from "../common/redux/signup-action-creator";
import {applyMiddleware, compose, createStore} from "redux";
import {reducer, RootState} from "../common/redux/store";
import thunk from "redux-thunk";
import {ActionCreator} from "../common/redux/action-creator";

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
const mapStateToProps = (state: any) => ({
  userId: state.login.user.userId,
  token: state.login.token,
});
// const aa = useSelector(state => state.login.user.userId);
// //console.log(mapStateToProps(store));
// console.log(aa)

//const setData  = (word:any, prop:any, value:any, userId?:any, token?:any) => {
const setData = (word:any, prop:any, value:any, userId?:any, token?:any) => {
  const useMyHook = () => {
    const [aa, setAa] = useState();
    useEffect(() => {
      //setAa(useSelector((state: RootState) => state.login.user.userId));
    });
    return aa;
  }

  word[prop] = value;
  console.log(userId)
 // console.log(token)
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


//const setData = connect(mapStateToProps)(setDataRedux);

export {setData};
