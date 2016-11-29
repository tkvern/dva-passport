import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';

const TaskPanel = ({
  onAdd
}) => {
  return(
    <Button type="primary" 
            onClick={onAdd} 
            size="large" 
            style={{ marginBottom: '15px' }}>创建任务</Button>
  );
}

export default TaskPanel;