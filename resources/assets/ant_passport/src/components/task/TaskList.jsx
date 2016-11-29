import React, { Component, PropTypes } from 'react';
import { Table, message, Popconfirm, Pagination, Menu, Dropdown, Icon, Progress, Badge } from 'antd';
import { getTaskStatus, getProcessStatus } from '../../utils/helper';

const TaskList = ({
  total,
  current,
  loading,
  dataSource,
  onPageChange,
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="#">重试</a>
      </Menu.Item>
      <Menu.Item key="4">删除</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">生成顶</Menu.Item>
      <Menu.Item key="2">生成底</Menu.Item>
      <Menu.Item key="3">生成顶和底</Menu.Item>
    </Menu>
  );

  const columns = [{
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
  }, {
    title: '管理员',
    dataIndex: 'isadmin',
    key: 'isadmin',
  }, {
    title: '操作',
    key: 'operation',
    render: () => (
      <div>
        <a onClick={()=>{}}>详情</a>
        &nbsp;&nbsp;&nbsp;
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            更多 <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    ),
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

TaskList.propTypes = {
  total: PropTypes.any,
  current: PropTypes.any,
  loading: PropTypes.any,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default TaskList;