import React, { Component, PropTypes } from 'react';
import {
  Form, Row, Col, Input, Tree,
  Modal,
} from 'antd';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const keys = ['0-0-0', '0-0-1'];
const defaultExpandedKeys = keys;
const defaultSelectedKeys = keys;
const defaultCheckedKeys = keys;


const treeData = [{
  label: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    label: 'Child Node1',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    label: 'Child Node2',
    value: '0-0-2',
    key: '0-0-2',
  }],
}, {
  label: 'Node2',
  value: '0-1',
  key: '0-1',
}];

const RoleModalGrant = ({
  item = {},
  onOk,
  visible,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (!!errors) {
        return;
      }
      const data = { ...getFieldsValue() };
      onOk(data);
    });
  }

  function onSelect(info) {
    console.log('selected', info);
  }

  function onCheck(info) {
    console.log('onCheck', info);
  }

  const modalOpts = {
    title: '授权',
    visible,
    onOk: handleOk,
    onCancel,
    width: 720,
  }

  const formItemLayout = {
    // labelCol: { span: 5 },
    wrapperCol: { span: 24 },
  };

  const config = {
    rules: [{ type: 'string', required: true, message: '不能为空' }],
  };

  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          <Col span={24}>
            <Tree className="myCls" showLine checkable
              defaultExpandedKeys={defaultExpandedKeys}
              defaultSelectedKeys={defaultSelectedKeys}
              defaultCheckedKeys={defaultCheckedKeys}
              onSelect={onSelect} onCheck={onCheck}
              treeData={treeData}
            >
            </Tree>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default Form.create()(RoleModalGrant);
