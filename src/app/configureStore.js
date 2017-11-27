import { browserHistory } from 'react-router-dom';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
// import { reducer as formReducer } from "redux-form";
import createSagaMiddleware from 'redux-saga';


const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  // form: formReducer,
  routing: routerReducer,
});

export default () => {
  const store = createStore(
    reducer,
    window.developerMode
    /* eslint-disable */
      ? window["__REDUX_DEVTOOLS_EXTENSION__"] && window["__REDUX_DEVTOOLS_EXTENSION__"]()
      : undefined,
    compose(applyMiddleware(routerMiddleware(browserHistory), sagaMiddleware)));
    /* eslint-enable */

  store.runSaga = sagaMiddleware.run;

  return store;
};
