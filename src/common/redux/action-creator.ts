import { getData } from "../../data/service";
import { WordsProps } from "../ts/interfaces";

const ActionCreator = {
  getWords: () => (dispatch: any): void => {
    getData().then((data: WordsProps[]) => {
      dispatch({
        type: `SET_WORDS`,
        payload: data,
      });
    });
  },

  addHardWord: (word: WordsProps) => ({
    type: `ADD_HADR_WORD`,
    payload: word,
  }),

  deleteHardWord: (word: WordsProps) => ({
    type: `DELETE_HADR_WORD`,
    payload: word,
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