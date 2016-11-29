import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import Tasks from './routes/task/Tasks';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Tasks} />
      <Route path="/tasks" component={Tasks} />
    </Router>
  );
}
