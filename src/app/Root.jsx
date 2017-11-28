import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Master from '../components/Master';
import Home from '../components/Home';
import SearchClassification from '../components/SearchClassification';

import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();

const reducers = combineReducers({
  // form: formReducer,
  routing: routerReducer,
});

const store = createStore(
  reducers,
  window.developerMode
  /* eslint-disable */
    ? window["__REDUX_DEVTOOLS_EXTENSION__"] && window["__REDUX_DEVTOOLS_EXTENSION__"]()
    : undefined,
  compose(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  /* eslint-enable */
);

sagaMiddleware.run(sagas);

// const history = syncHistoryWithStore(browserHistory, store);
const syncHistory = syncHistoryWithStore(history, store);

export default function Root() {
  return (
    <Provider store={store}>
      <Router history={syncHistory}>
        <Master>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={SearchClassification} />
          </Switch>
        </Master>
      </Router>
    </Provider>
  );
}
