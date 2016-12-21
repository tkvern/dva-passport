import React, { Component, PropTypes } from 'react';
import {
  Form, Row, Col, Input,
  Modal, Button, Icon,
  Radio, Checkbox, DatePicker,
  Tooltip, InputNumber, Switch } from 'antd';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;
const CheckboxGroup = Checkbox.Group;

const UserModal = ({
  item,
  onOk,
  visible,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  const user = item;

  function handleOk() {
    validateFields((errors) => {
      if (!!errors) {
        return;
      }
      const data = { ...getFieldsValue() };
      onOk(data);
    });
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  };

  const modalOpts = {
    title: '用户信息修改',
    visible,
    onOk: handleOk,
    onCancel,
    // width: 720,
  }

  const config = {
    rules: [{ type: 'string', required: true, message: '不能为空' }],
  };

  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="昵称">
              {getFieldDecorator('nickname', {
                rules: [{
                  required: true,
                  type: 'string',
                  message: '不能为空',
                }],
                initialValue: user.nickname,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="手机号">
              {getFieldDecorator('mobile', {
                rules: [{
                  required: true,
                  pattern: /^[0-9]{11}$/,
                  message: '必须填写正确的手机号',
                }],
                initialValue: user.mobile,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} hasFeedback label="邮箱地址">
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email',
                  required: 'true',
                  message: '必须填写正确的邮箱地址',
                }],
                initialValue: user.email,
              })(
                <Input placeholder="xyz@xx.com" />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="分机号">
              {getFieldDecorator('tel', {
                initialValue: user.tel,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="密码">
              {getFieldDecorator('password', {
              })(
                <Input type="password"/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                initialValue: user.remark
              })(
                <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

UserModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default Form.create()(UserModal);
