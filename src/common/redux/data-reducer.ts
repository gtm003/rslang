import { WordsProps } from "../ts/interfaces";

interface InitialState {
  words: [];
  hardWords: [];
  deletedWords: [];
  learningWords: [];
}

const initialState: InitialState = {
  words: [],
  hardWords: [],
  deletedWords: [],
  learningWords: [],
};

const reducer = (state: InitialState = initialState, action: any) => {
  switch (action.type) {
    case `SET_WORDS`:
      const hardWords = action.payload.filter(
        (word: WordsProps) => word.hardWord === true
      );

      const deletedWords = action.payload.filter(
        (word: WordsProps) => word.deletedWord === true
      );

      // const learningWords = action.payload.filter(
      //   (word: WordsProps) => word.hardWord === true
      // );

      return {
        ...state,
        words: action.payload,
        hardWords: hardWords,
        deletedWords: deletedWords,
        // learningWords: learningWords,
      };
    default:
      return state;
  }
};

export { reducer };
