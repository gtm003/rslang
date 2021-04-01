import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {App} from './components/app';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './common/redux';

ReactDOM.render(
    <Provider store={store} >
      <Router >
        <App />
      </Router >
    </Provider >,
  document.getElementById('root')
);
