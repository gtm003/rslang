import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {settingsReducer} from "./settingReducer";
const reducers = {
    form: formReducer,
    setting: settingsReducer
}

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export {store};