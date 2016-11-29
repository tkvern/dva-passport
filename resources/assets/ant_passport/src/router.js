import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import Users from './routes/user/Users';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Users} />
      <Route path="/users" component={Users} />
    </Router>
  );
}
