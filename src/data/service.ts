import {WordsProps} from "../common/ts/interfaces";
import {urlBackend} from "./index";
import {stateUser} from "../common/redux/login-reducer";

const setDataNewUser = async () => {
  const temp = {
    audio: "files/01_0002.mp3",
    audioExample: "files/01_0002_example.mp3",
    audioMeaning: "files/01_0002_meaning.mp3",
    corrects: 0,
    deletedWord: false,
    errorsCount: 0,
    group: 5,
    hardWord: false,
    id: "5e9f5ee35eb9e72bc21af000",
    _id: "5e9f5ee35eb9e72bc21af000",
    image: "files/01_0002.jpg",
    learningWord: false,
    page: 0,
    textExample: "A person should not drive a car after he or she has been drinking <b>alcohol</b>.",
    textExampleTranslate: "Человек не должен водить машину после того, как он выпил алкоголь",
    textMeaning: "<i>Alcohol</i> is a type of drink that can make people drunk.",
    textMeaningTranslate: "Алкоголь - это тип напитка, который может сделать людей пьяными",
    transcription: "[ǽlkəhɔ̀ːl]",
    word: "alcohol",
    wordTranslate: "алкоголь"
  };
  await setData(temp, 'group', 0);
  return getData();
}

const getData = async (): Promise<Array<WordsProps>> => {
  let res;
  const userId = stateUser.user.userId;
  const auth: boolean = stateUser.isAuth;
  const url: string = auth ? `${urlBackend}users/${userId}/words` : `${urlBackend}words?all=true`;

  res = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${stateUser.user.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};

const setData = (word: any, prop: any, value: any) => {
  word[prop] = value;
  const userId: string = stateUser.user.userId;
  const auth: boolean = stateUser.isAuth;
  if (!word._id) word._id = word.id;

  const url: string = auth ? `${urlBackend}users/${userId}/words/${word._id}` : `${urlBackend}words/${word._id}`;
  const method: string = auth ? 'PUT' : 'POST';
  if (word) {
    const setWordsToBack = async (word: any) => {
      const responce = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${stateUser.user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
      });
    };
    return setWordsToBack(word);
  }
}

export {setData, setDataNewUser, getData};
