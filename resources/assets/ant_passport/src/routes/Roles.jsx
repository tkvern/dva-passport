import React, { Component, PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import MainLayout from '../components/layout/MainLayout';
import RoleList from '../components/role/RoleList';
import RoleSearch from '../components/role/RoleSearch';
import RolePanel from '../components/role/RolePanel';
import RoleModal from '../components/role/RoleModal';
import RoleModalGrant from '../components/role/RoleModalGrant';

function Roles({ location, dispatch, roles }) {
  const {
    list,
    keyword,
    total,
    loading,
    current,
    currentItem,
    modalVisible,
    modalType,
    modalGrantVisible,
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
    onGrant(item) {
      dispatch({
        type: 'roles/showModalGrant',
        payload: {
          currentItem: item,
        },
      });
    },
  }

  const roleSearchProps = {
    keyword,
    onSearch(fieldsValue) {
      dispatch(
        routerRedux.push({
          pathname: '/roles',
          query: { page: 1, ...fieldsValue },
        }),
      );
    },

    onReset() {
      dispatch({
        type: 'roles/updateQueryKey',
        payload: {
          keyword: '',
        },
      });
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

  const roleModalGrantProps = {
    item: currentItem,
    visible: modalGrantVisible,
    onOk(data) {
      dispatch({
        type: 'roles/grant',
        payload: data,
      });
    },

    onCancel() {
      dispatch({
        type: 'roles/hideModalGrant',
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

  const RoleModalGrantGen = () =>
    <RoleModalGrant {...roleModalGrantProps} />;

  return (
    <MainLayout>
      <div>
        <RolePanel {...rolePanelProps} />
        <RoleSearch {...roleSearchProps} />
        <RoleList {...roleListProps} />
        <RoleModalGen />
        <RoleModalGrantGen />
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
