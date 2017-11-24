import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import Master from '../containers/Master';
import SearchClassification from '../containers/SearchClassification';

export default (
  <Route path="/" component={Master}>
    <IndexRoute component={SearchClassification} />
  </Route>
);
