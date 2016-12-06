import React, { Component, PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import MainLayout from '../components/layout/MainLayout';


function Dashboard({ location, dispatch }) {
  return (
    <MainLayout>
      <div>
        应用中心
      </div>
    </MainLayout>
  );
}

export default Dashboard;
