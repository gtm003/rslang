interface InitialState {
  words: [];
  hardWords: [];
  learningWords: [];
  learnedWords: [];
  deletedWords: [];
}

const initialState: InitialState = {
  words: [],
  hardWords: [],
  learningWords: [],
  learnedWords: [],
  deletedWords: [],
};

const reducer = (state: InitialState = initialState, action: any) => {
  switch (action.type) {
    case `SET_WORDS`:
      return {
        ...state,
        words: [...state.words, action.payload],
      };
    default:
      return state;
  }
};

export { reducer };
