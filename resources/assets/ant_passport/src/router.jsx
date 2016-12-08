import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import { authenticated } from './utils/auth';
import Dashboard from './routes/Dashboard';
import Users from './routes/Users';
import Roles from './routes/Roles';
import Permissions from './routes/Permissions';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Dashboard} onEnter={authenticated} />
      <Route path="/users" component={Users} onEnter={authenticated} />
      <Route path="/roles" component={Roles} onEnter={authenticated} />
      <Route path="/permissions" component={Permissions} onEnter={authenticated} />
    </Router>
  );
}
