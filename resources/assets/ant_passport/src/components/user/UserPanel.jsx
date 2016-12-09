import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';

const UserPanel = ({
  onAdd,
}) => {
  return (
    <Button type="primary" onClick={onAdd} size="large" style={{ marginBottom: '15px' }}>
      创建用户
    </Button>
  );
}

UserPanel.propTypes = {
  onAdd: PropTypes.func,
}

export default UserPanel;
