import * as React from "react";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import configureStore from "./configureStore";
import routes from "./routes";
import sagas from "./sagas";

const store = configureStore();
store.runSaga(sagas);
const history = syncHistoryWithStore(browserHistory, store);

export default function Root() {
  return (
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  );
}
