import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';

const PermissionPanel = ({
  onAdd,
}) => {
  return (
    <Button type="primary" onClick={onAdd} size="large" style={{ marginBottom: '15px' }}>
      创建权限
    </Button>
  );
}

export default PermissionPanel;
