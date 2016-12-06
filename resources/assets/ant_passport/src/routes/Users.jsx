import React, { Component, PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import MainLayout from '../components/layout/MainLayout';
import UserList from '../components/user/UserList';
import UserSearch from '../components/user/UserSearch';
import UserPanel from '../components/user/UserPanel';
import UserModal from '../components/user/UserModal';

function Users({ location, dispatch, users }) {
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
  } = users;

  const userListProps = {
    total,
    current,
    loading,
    dataSource: list,
    onPageChange(page) {
      dispatch(
        routerRedux.push({
          pathname: '/users',
          query: { keyword, page },
        }),
      );
    },
    onDeny(id, enable) {
      dispatch({
        type: 'users/deny',
        payload: {
          id: id,
          enable: enable,
        }
      })
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

  const userPanelProps = {
    onAdd() {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create',
        },
      });
    },
  }

  const UserModalGen = () =>
    <UserModal {...userModalProps} />;

  return (
    <MainLayout>
      <div>
        <UserSearch {...userSearchProps} />
        <UserList {...userListProps} />
        <UserModalGen />
      </div>
    </MainLayout>
  );
}

Users.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  users: PropTypes.object,
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(Users);
