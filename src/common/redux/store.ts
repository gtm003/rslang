import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as dataReducer } from "./data-reducer";
import { settingsReducer } from "./settingReducer";

const reducers = {
  form: formReducer,
  data: dataReducer,
  setting: settingsReducer,
};

const reducer = combineReducers(reducers);

export { reducer };
