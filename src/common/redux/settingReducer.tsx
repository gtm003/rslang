import {initialState} from './initialState';

interface Action {
  type: string,
  value: boolean,
  payload: boolean,
}

const settingsReducer = (state = initialState, action: Action) => {

  switch (action.type) {
    case 'TOGGLE_TRANSLATE':
      return {...state, isTranslate: action.value}
    case 'TOGGLE_BUTTONS':
      return {...state, areButtons: action.value}
    default:
      return state;
  }
};

export {settingsReducer};
