import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';

const RolePanel = ({
  onAdd,
}) => {
  return (
    <Button
      type="primary"
      onClick={onAdd}
      size="large"
      style={{ marginBottom: '15px' }}
    >
      创建角色
    </Button>
  );
}

RolePanel.propTypes = {
  onAdd: PropTypes.func,
}

export default RolePanel;
