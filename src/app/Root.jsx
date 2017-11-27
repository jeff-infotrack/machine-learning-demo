import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import Master from '../components/Master';

import configureStore from './configureStore';
import routes from './routes';
import sagas from './sagas';

const store = configureStore();
store.runSaga(sagas);
// const history = syncHistoryWithStore(browserHistory, store);
const history = syncHistoryWithStore(createBrowserHistory(), store);

export default function Root() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Master>
          {routes}
        </Master>
      </Router>
    </Provider>
  );
}
