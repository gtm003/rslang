import { getData, setDataNewUser } from "../../data/service";
import { WordsProps } from "../ts/interfaces";

const ActionCreator = {
  getWords: () => (dispatch: any): void => {
    setDataNewUser().then((data: any) => {
       // getData().then((data: any) => {
        console.log(data)
       // const words = data;
          //let words;
//if (data)
  const words = data.length ? data[0].words : data;
        console.log(words)

        words.forEach((word: any) => {
          word._id = word.id;
        })
        console.log(words)
        dispatch({
          type: `SET_WORDS`,
          payload: words,
        });
      });
   // })
  },

  addHardWord: (word: WordsProps) => ({
    type: `ADD_HADR_WORD`,
    payload: word,
  }),

  removeHardWord: (id: string) => ({
    type: `REMOVE_HARD_WORD`,
    payload: id,
  }),

  addDeletedWord: (word: WordsProps) => ({
    type: `ADD_DELETED_WORD`,
    payload: word,
  }),

  addLearningWord: (word: WordsProps) => ({
    type: `ADD_LEARNING_WORD`,
    payload: word,
  }),
};

export { ActionCreator };
