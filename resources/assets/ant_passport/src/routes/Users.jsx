import React, { Component, PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import MainLayout from '../components/layout/MainLayout';
import UserList from '../components/user/UserList';
import UserSearch from '../components/user/UserSearch';
import UserModalGrant from '../components/user/UserModalGrant';
import UserModal from '../components/user/UserModal';

function Users({ dispatch, users, auth }) {
  const {
    list,
    keyword,
    expand,
    total,
    loading,
    current,
    currentItem,
    modalVisible,
    modalType,
    modalGrantVisible,
  } = users;

  const currentUser = auth.user;

  const userListProps = {
    total,
    current,
    loading,
    currentUser,
    dataSource: list,
    onPageChange(page) {
      dispatch(
        routerRedux.push({
          pathname: '/users',
          query: { keyword, page },
        }),
      );
    },
    onEdit(user) {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'update',
          currentItem: user,
        },
      });
    },
    onDeny(id, enable) {
      dispatch({
        type: 'users/deny',
        payload: {
          id: id,
          enable: enable,
        },
      })
    },
    onGrant(item) {
      dispatch({
        type: 'users/showModalGrant',
        payload: {
          currentItem: item,
        },
      });
    },
  }

  const userSearchProps = {
    keyword,
    expand,
    onExpand() {
      dispatch({
        type: 'users/collapseExpand',
        payload: {
          expand: !expand,
        },
      });
    },

    onSearch(fieldsValue) {
      dispatch(
        routerRedux.push({
          pathname: '/users',
          query: { page: 1, ...fieldsValue },
        }),
      );
    },

    onReset() {
      dispatch({
        type: 'users/updateQueryKey',
        payload: {
          keyword: '',
        },
      });
    },
  }

  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: `users/${modalType}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'users/hideModal',
      });
    },
  }

  const userModalGrantProps = {
    item: currentItem,
    visible: modalGrantVisible,
    onOk(data) {
      dispatch({
        type: 'users/grant',
        payload: data,
      });
    },

    onCancel() {
      dispatch({
        type: 'users/hideModalGrant',
      });
    },

  }

  const UserModalGen = () =>
    <UserModal {...userModalProps} />;

  const UserModalGrantGen = () =>
    <UserModalGrant {...userModalGrantProps} />;

  return (
    <MainLayout>
      <div>
        <UserSearch {...userSearchProps} />
        <UserList {...userListProps} />
        <UserModalGen />
        <UserModalGrantGen />
      </div>
    </MainLayout>
  );
}

Users.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  users: PropTypes.object,
}

function mapStateToProps({ users, auth }) {
  return { users, auth };
}

export default connect(mapStateToProps)(Users);
