import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {App} from './components/app';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {createStore, compose} from 'redux';
import settingsReducer from "./common/redux";

// @ts-ignore
const storeSettings = createStore(
  settingsReducer,
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

ReactDOM.render(
  <Provider store={storeSettings} >
    {/*<Provider store={store} >*/}
      <Router >
        <App />
      </Router >
    {/*</Provider >*/}
  </Provider >,
  document.getElementById('root')
);
