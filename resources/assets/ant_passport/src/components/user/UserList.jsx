import React, { Component, PropTypes } from 'react';
import { Table, Popconfirm, Pagination, Badge } from 'antd';
import { getUserStatus, getIsAdminStatus } from '../../utils/helper';

const UserList = ({
  total,
  current,
  loading,
  dataSource,
  onPageChange,
  onDeny,
}) => {
  const columns = [{
    title: '',
    dataIndex: 'avatar',
    key: 'avatar',
    width: '47px',
    render: (text, record, index) => {
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
  }, {
    title: '手机',
    dataIndex: 'mobile',
    key: 'mobile',
  }, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record, index) => {
      const userStatus = getUserStatus(record.status);
      return (
        <Badge status={userStatus.status} text={userStatus.text} />
      );
    },
  }, {
    title: '管理员',
    dataIndex: 'isadmin',
    key: 'isadmin',
    render: (text, record, index) => {
      const adminStatus = getIsAdminStatus(record.isadmin);
      return (
        <Badge status={adminStatus.status} text={adminStatus.text} />
      );
    },
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record, index) => {
      const { id, status } = record;
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
        <Popconfirm title="你确定要执行该操作吗?" onConfirm={() => onDeny(id, enable)}>
          <a>{displayText}</a>
        </Popconfirm>
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
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
  onDeny: PropTypes.func,
}

export default UserList;
