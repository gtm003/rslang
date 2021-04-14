import {WordsProps} from "../ts/interfaces";
import {setData} from "../../data";
import {loginReducer} from "./login-reducer";

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
      //console.log(loginUser());

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
      const aa = console.log(loginReducer(undefined, {type: 'GET_STATE', payload: ''}));
      console.log(aa)
      setData(action.payload, 'hardWord', true, aa);
      return {
        ...state,
        hardWords: [...state.hardWords, action.payload],
      };
    case `REMOVE_HARD_WORD`:
      const updatedHardWords = state.hardWords.filter((word: WordsProps) => {
        if (word.id === action.payload) setData(word, 'hardWord', false, loginReducer(undefined, {type: 'GET_STATE', payload: ''}));
         return word.id !== action.payload
      });

      return {
        ...state,
        hardWords: updatedHardWords,
      };
    case `ADD_DELETED_WORD`:
      setData(action.payload, 'deletedWord', true);

      return {
        ...state,
        deletedWords: [...state.deletedWords, action.payload],
      };
    case `ADD_LEARNING_WORD`:
      // console.log(action.payload);
      return {
        ...state,
        learningWords: [...state.learningWords, action.payload],
      };
    default:
      return state;
  }
};

export { reducer };
