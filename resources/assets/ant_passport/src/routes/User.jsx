import React, { Component, PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import MainLayout from '../components/layout/MainLayout';
import UserInfo from '../components/user/UserInfo';


function User({ location, dispatch, auth }) {
  const {
    user,
  } = auth;

  const userInfoProps = {
    user: user,
    onUpdate(data) {
      dispatch({
        type: 'auth/update',
        payload: data,
      })
    },
  }

  return (
    <MainLayout>
      <UserInfo {...userInfoProps} />
    </MainLayout>
  );
}


function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(User);
