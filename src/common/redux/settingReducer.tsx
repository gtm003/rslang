interface Action {
  type: string,
  value: boolean,
  payload: boolean,
}

interface Initial {
  isTranslate: boolean,
  areButtons: boolean,
  isOpen: boolean,
}

const initialState: Initial = {
  isTranslate: true,
  areButtons: true,
  isOpen: false,
};

const settingsReducer = (state = initialState, action: Action) => {

  switch (action.type) {
    case 'TOGGLE_TRANSLATE':
      return { ...state, isTranslate: action.value }
    case 'TOGGLE_BUTTONS':
      return { ...state, areButtons: action.value }
    case 'TOGGLE_OPEN':
      return { ...state, isOpen: action.value }
    default:
      return state;
  }
};

export { settingsReducer };