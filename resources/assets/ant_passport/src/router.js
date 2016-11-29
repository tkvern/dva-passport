import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import Users from './routes/user/Users';
import { getCookie } from './utils/helper';

export default function({ history }) {
  console.log(getCookie('sso_token'));
  return (
    <Router history={history}>
      <Route path="/" component={Users} />
      <Route path="/users" component={Users} />
    </Router>
  );
}
