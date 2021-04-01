import initialState from './initialState';

const settingsReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case 'TOGGLE_TRANSLATE':
      return { ...state, isTranslate: [action.value] }
    case 'TOGGLE_BUTTONS':
      return { ...state, areButtons: [action.value] }
    default: return state;
  }
};

export default settingsReducer;