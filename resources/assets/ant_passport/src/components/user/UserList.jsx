import React, { Component, PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Badge } from 'antd';
import { getUserStatus, getIsAdminStatus } from '../../utils/helper';

const UserList = ({
  total,
  current,
  loading,
  currentUser,
  dataSource,
  onPageChange,
  onEdit,
  onDeny,
  onGrant,
}) => {
  const columns = [{
    title: '',
    dataIndex: 'avatar',
    key: 'avatar',
    width: '47px',
    render: (text, record) => {
      const imgUrl = record.avatar || 'https://gtms03.alicdn.com/tps/i3/TB1opXxHXXXXXahXpXXvBLt6FXX-230-230.png';
      return (
        <img
          src={imgUrl}
          width={30}
          height={30}
          style={{ borderRadius: '50%' }}
          role="presentation"
        />
      );
    },
  }, {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => {
      const cname = record.name;
      return (
        cname
      );
    }
  }, {
    title: '手机',
    dataIndex: 'mobile',
    key: 'mobile',
    render: (text, record) => {
      const mobile = record.mobile || '未填写';
      return (
        mobile
      );
    }
  }, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    render: (text, record) => {
      const email = record.email || '未填写';
      return (
        email
      );
    }
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      const userStatus = getUserStatus(record.status);
      return (
        <Badge status={userStatus.status} text={userStatus.text} />
      );
    },
  }, {
    title: '管理员',
    dataIndex: 'isadmin',
    key: 'isadmin',
    render: (text, record) => {
      const adminStatus = getIsAdminStatus(record.isadmin);
      return (
        <Badge status={adminStatus.status} text={adminStatus.text} />
      );
    },
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => {
      const { id, status } = record;
      const active = currentUser.id === id;
      let enable;
      let displayText;

      if (status === 1) {
        enable = true;
        displayText = '禁用';
      } else {
        enable = false;
        displayText = '启用';
      }

      return (
        <div>
          <a onClick={() => onEdit(record)} disabled={active}>编辑</a>
          &nbsp;&nbsp;
          <a onClick={() => onGrant(record)}>授权</a>
          &nbsp;&nbsp;
          <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => onDeny(id, enable)}>
            <a disabled={active}>{displayText}</a>
          </Popconfirm>
        </div>
      );
    },
  }];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={10}
        onChange={onPageChange}
      />
    </div>
  );
}

UserList.propTypes = {
  total: PropTypes.number,
  current: PropTypes.number,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDeny: PropTypes.func,
  onGrant: PropTypes.func,
}

export default UserList;
