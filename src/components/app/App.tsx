import React, {useEffect, useState} from 'react';
import {Footer} from '../footer';
import {Header} from '../header';
import {Switcher} from "../../common/navigation";
import {BrowserRouter} from "react-router-dom";
import {Settings} from "../settings";
import {LoginForm} from '../loginform';
import {SignUpForm} from '../signupform';
import {WordsProps} from "../../common/ts/interfaces";
import {ActionCreator} from "../../common/redux/action-creator";
import {connect} from "react-redux";
import {urlBackend} from "../../data";

interface AppProps {
  hardWords: [],
  deletedWords: [],
  words: WordsProps[],
}

const AppRedux: React.FC<AppProps> = ({words, hardWords, deletedWords}) => {

  useEffect(() => {
    console.log(hardWords);
    if (hardWords) {
      hardWords.forEach(({id}) => {
        const ind = words.findIndex((word: WordsProps) => {
          return word.id === id;
        });
        console.log(ind);
        if (ind !== -1) words[ind].hardWord = true;
      });
    }
    console.log(words);
  }, [hardWords]);

  useEffect(() => {
    console.log(deletedWords);
    if (deletedWords) {
      deletedWords.forEach(({id}) => {
        const ind = words.findIndex((word: WordsProps) => {
          return word.id === id;
        });
        console.log(ind);
        if (ind !== -1) words[ind].deletedWord = true;
      });
    }
  }, [deletedWords]);

  window.addEventListener('unload', () => {
    // if (words.length) {
    //   const data = words.map((item: any) => {
    //       const {id: newId, ...rest} = item;
    //       return {_id: newId, ...rest}
    //     }
    //   );
    //
    //   if (data.length) {
    //     console.log(data);
    //     //setWordsToBack(data);
    //     const setWordsToBack = async (wordsArr: WordsProps[]) => {
    //       await fetch(`${urlBackend}words`, {
    //         method: 'POST',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({words: wordsArr})
    //       });
    //     };
    //     setWordsToBack(data);
    //   }
    // }
  });

  return (
    <BrowserRouter>
      <Header/>
      <div className="main-wrapper">
        <Switcher/>
      </div>
      <Settings/>
      <LoginForm/>
      <SignUpForm/>
      <Footer/>
    </BrowserRouter>
  );
}
const mapStateToProps = (state: any) => ({
  hardWords: state.data.hardWords,
  deletedWords: state.data.deletedWords,
  words: state.data.words,
});

const mapDispatchToProps = (dispatch: any) => ({
  onHardWordClick: (word: WordsProps) => {
    dispatch(ActionCreator.addHardWord(word));
  },
  onDeleteHardWordClick: (id: string) => {
    dispatch(ActionCreator.removeHardWord(id));
  },
  onDeleteWordClick: (word: WordsProps) => {
    dispatch(ActionCreator.addDeletedWord(word));
  },
});


const App = connect(mapStateToProps, mapDispatchToProps)(AppRedux);

export {App};
