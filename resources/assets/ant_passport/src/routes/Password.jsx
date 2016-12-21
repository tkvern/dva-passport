import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';

import MainLayout from '../components/layout/MainLayout';
import UserPassword from '../components/user/UserPassword';


function Password({ location, dispatch, auth }) {
  const {
    user,
  } = auth;

  const userPasswordProps = {
    user: user,
    onUpdate(data) {
      dispatch({
        type: 'auth/password',
        payload: data,
      })
    },
  };

  return (
    <MainLayout>
      <UserPassword {...userPasswordProps} />
    </MainLayout>
  );
}


function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Password);
