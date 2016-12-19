import React, { Component, PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import MainLayout from '../components/layout/MainLayout';
import UserList from '../components/user/UserList';
import UserSearch from '../components/user/UserSearch';
import UserPanel from '../components/user/UserPanel';
import UserModalGrant from '../components/user/UserModalGrant';

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
    modalGrantVisible,
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

  const userModalGrantProps = {
    item: currentItem,
    visible: modalGrantVisible,
    onOk(data) {
      dispatch({
        type: `users/grant`,
        payload: data,
      });
    },

    onCancel() {
      dispatch({
        type: 'users/hideModalGrant',
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

  const UserModalGrantGen = () =>
    <UserModalGrant {...userModalGrantProps} />;
  
  return (
    <MainLayout>
      <div>
        <UserSearch {...userSearchProps} />
        <UserList {...userListProps} />
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

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(Users);
