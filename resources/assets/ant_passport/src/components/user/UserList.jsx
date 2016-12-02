import React, { Component, PropTypes } from 'react';
import { Table, message, Popconfirm, Pagination, Menu, Dropdown, Icon, Progress, Badge } from 'antd';
import { getUserStatus, getIsAdminStatus } from '../../utils/helper';

const UserList = ({
  total,
  current,
  loading,
  dataSource,
  onPageChange,
  onDeny,
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a>重试</a>
      </Menu.Item>
      <Menu.Item key="4">删除</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">生成顶</Menu.Item>
      <Menu.Item key="2">生成底</Menu.Item>
      <Menu.Item key="3">生成顶和底</Menu.Item>
    </Menu>
  );

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
      if (record.status == 1) {
        return (<a onClick={() => onDeny(record.id)}>禁用</a>);
      } else {
        return (<a onClick={() => {}}>启用</a>);
      }
     
        {/*&nbsp;&nbsp;&nbsp;
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link">
            更多 <Icon type="down" />
          </a>
        </Dropdown>
        */}
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
}

export default UserList;
