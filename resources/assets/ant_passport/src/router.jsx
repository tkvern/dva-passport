import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import Users from './routes/Users';
import Roles from './routes/Roles';
import Dashboard from './routes/Dashboard';
import { authenticated } from './utils/auth';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Dashboard} onEnter={authenticated} />
      <Route path="/users" component={Users} onEnter={authenticated} />
      <Route path="/roles" component={Roles} onEnter={authenticated} />
    </Router>
  );
}
