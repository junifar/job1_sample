import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers';
import 'react-dates/lib/css/_datepicker.css';
import 'react-select/dist/react-select.css';
import './index.css';

const reducer = combineReducers(reducers);
// const finalCreateStore = applyMiddleware(thunk)(createStore);
// const store = finalCreateStore(reducer);
const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
