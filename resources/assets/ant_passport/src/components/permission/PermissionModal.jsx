import React, { Component, PropTypes } from 'react';
import {
  Form, Row, Col, Input,
  Modal,
} from 'antd';

const FormItem = Form.Item;

const PermissionModal = ({
  item = {},
  visible,
  onOk,
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

  const modalOpts = {
    title: '角色',
    visible,
    onOk: handleOk,
    onCancel,
    width: 720,
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  };

  const config = {
    rules: [{ type: 'string', required: true, message: '不能为空' }],
  };

  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout} label="scope">
              {getFieldDecorator('scope', {
                ...config,
                initialValue: item.scope,
              })(
                <Input placeholder="请输入权限 scope" disabled={!!item.scope ? true : false} />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="key">
              {getFieldDecorator('key', {
                ...config,
                initialValue: item.key,
              })(
                <Input placeholder="请输入权限 key" disabled={!!item.key ? true : false} />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="名称">
              {getFieldDecorator('name', {
                ...config,
                initialValue: item.name,
              })(
                <Input placeholder="请输入权限名称" />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default Form.create()(PermissionModal);
