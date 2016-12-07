import React, { Component, PropTypes } from 'react';
import { Table, message, Popconfirm, Pagination, Menu, Dropdown, Icon, Progress, Badge, Link } from 'antd';
import { getRoleStatus, getIsAdminStatus } from '../../utils/helper';

const RoleList = ({
  total,
  current,
  loading,
  dataSource,
  onPageChange,
  onDeleteItem,
  onEditItem,
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
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'key',
    dataIndex: 'key',
    key: 'key',
  }, {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
  }, {
    title: '更新时间',
    dataIndex: 'updated_at',
    key: 'updated_at',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record, index) => {
      return (
        <div>
          <a onClick={() => onEditItem(record)}>编辑</a>
          &nbsp;&nbsp;
          <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
            <a>删除</a>
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

RoleList.propTypes = {
}

export default RoleList;
