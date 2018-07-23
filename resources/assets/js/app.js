
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

/*import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Master from './components/Master';
import CreateItem from './components/CreateItem';

render(
  <Router history={browserHistory}>
      <Route path="/" component={Master}>
        <Route path="/add-item" component={CreateItem} />
        </Route>
    </Router>,
        document.getElementById('root'));
*/
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers';
import 'react-dates/lib/css/_datepicker.css';
import 'react-select/dist/react-select.css';
/*import './index.css';*/
import './index.css';
import './index-alpha.css';

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
