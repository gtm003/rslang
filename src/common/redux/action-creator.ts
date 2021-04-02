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
};

export { ActionCreator };
