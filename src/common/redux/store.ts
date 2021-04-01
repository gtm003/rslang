import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as dataReducer } from "./data-reducer";

const reducers = {
  form: formReducer,
  data: dataReducer,
};

const reducer = combineReducers(reducers);

export { reducer };
