import {WordsProps} from "../ts/interfaces";

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
    case `ADD_HADR_WORD`:
      console.log(action.payload);

      return {
        ...state,
        hardWords: [...state.hardWords, action.payload],
      };
    case `REMOVE_HARD_WORD`:
      const updatedHardWords = state.hardWords.filter((word: WordsProps) => word.id !== action.payload);

      return {
        ...state,
        hardWords: updatedHardWords,
      };
    case `ADD_DELETED_WORD`:
      console.log(action.payload);
      return {
        ...state,
        deletedWords: [...state.deletedWords, action.payload],
      };
    case `ADD_LEARNING_WORD`:
      console.log(action.payload);
      return {
        ...state,
        learningWords: [...state.learningWords, action.payload],
      };
    default:
      return state;
  }
};

export {reducer};