import React, { Component, PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import MainLayout from '../components/layout/MainLayout';
import PermissionList from '../components/permission/PermissionList';
import PermissionSearch from '../components/permission/PermissionSearch';
import PermissionPanel from '../components/permission/PermissionPanel';
import PermissionModal from '../components/permission/PermissionModal';

function Permissions({ dispatch, permissions }) {
  const {
    list,
    keyword,
    total,
    loading,
    current,
    currentItem,
    modalVisible,
    modalType,
  } = permissions;

  const permissionListProps = {
    total,
    current,
    loading,
    dataSource: list,
    onPageChange(page) {
      dispatch(
        routerRedux.push({
          pathname: '/permissions',
          query: { keyword, page },
        }),
      );
    },
    onDeleteItem(id) {
      dispatch({
        type: 'permissions/delete',
        payload: id,
      });
    },
    onEditItem(item) {
      dispatch({
        type: 'permissions/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      });
    },
  }

  const permissionSearchProps = {
    keyword,
    onSearch(fieldsValue) {
      dispatch(
        routerRedux.push({
          pathname: '/permissions',
          query: { page: 1, ...fieldsValue },
        }),
      );
    },

    onReset() {
      dispatch({
        type: 'permissions/updateQueryKey',
        payload: {
          keyword: '',
        },
      });
    },
  }

  const permissionModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: `permissions/${modalType}`,
        payload: data,
      });
    },

    onCancel() {
      dispatch({
        type: 'permissions/hideModal',
      });
    },

  }

  const permissionPanelProps = {
    onAdd() {
      dispatch({
        type: 'permissions/showModal',
        payload: {
          modalType: 'create',
        },
      });
    },
  }

  const PermissionModalGen = () =>
    <PermissionModal {...permissionModalProps} />;

  return (
    <MainLayout>
      <div>
        <PermissionPanel {...permissionPanelProps} />
        <PermissionSearch {...permissionSearchProps} />
        <PermissionList {...permissionListProps} />
        <PermissionModalGen />
      </div>
    </MainLayout>
  );
}

Permissions.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  permissions: PropTypes.object,
}

function mapStateToProps({ permissions }) {
  return { permissions };
}

export default connect(mapStateToProps)(Permissions);
