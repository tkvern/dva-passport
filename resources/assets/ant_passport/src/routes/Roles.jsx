import React, { Component, PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import MainLayout from '../components/layout/MainLayout';
import RoleList from '../components/role/RoleList';
import RoleSearch from '../components/role/RoleSearch';
import RolePanel from '../components/role/RolePanel';
import RoleModal from '../components/role/RoleModal';

function Roles({ location, dispatch, roles }) {
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
  } = roles;

  const roleListProps = {
    total,
    current,
    loading,
    dataSource: list,
    onPageChange(page) {
      dispatch(
        routerRedux.push({
          pathname: '/roles',
          query: { keyword, page },
        }),
      );
    },
    onDeleteItem(id) {
      dispatch({
        type: 'roles/delete',
        payload: id,
      });
    },
    onEditItem(item) {
      dispatch({
        type: 'roles/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      });
    },
    onDeny(id, enable) {
      dispatch({
        type: 'roles/deny',
        payload: {
          id: id,
          enable: enable,
        },
      })
    },
  }

  const roleSearchProps = {
    keyword,
    expand,
    onExpand() {
      dispatch({
        type: 'roles/collapseExpand',
        payload: {
          expand: !expand,
        },
      });
    },

    onSearch(fieldsValue) {
      dispatch(
        routerRedux.push({
          pathname: '/roles',
          query: { page: 1, ...fieldsValue },
        }),
      );
    },
  }

  const roleModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: `roles/${modalType}`,
        payload: data,
      });
    },

    onCancel() {
      dispatch({
        type: 'roles/hideModal',
      });
    },

  }

  const rolePanelProps = {
    onAdd() {
      dispatch({
        type: 'roles/showModal',
        payload: {
          modalType: 'create',
        },
      });
    },
  }

  const RoleModalGen = () =>
    <RoleModal {...roleModalProps} />;

  return (
    <MainLayout>
      <div>
        <RolePanel {...rolePanelProps} />
        <RoleSearch {...roleSearchProps} />
        <RoleList {...roleListProps} />
        <RoleModalGen />
      </div>
    </MainLayout>
  );
}

Roles.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  roles: PropTypes.object,
}

function mapStateToProps({ roles }) {
  return { roles };
}

export default connect(mapStateToProps)(Roles);
