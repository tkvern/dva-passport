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

const UserPassword = ({
  user,
  onUpdate,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
  },
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (!!errors) {
        return;
      }
      const data = { ...getFieldsValue() };
      onUpdate(data);
    });
  }

  function checkConfirm(rule, value, callback) {
    if (value) {
      validateFields(['confirm'], { force: true });
    }
    callback();
  }

  function checkNew(rule, value, callback) {
    // debugger
    if (value && value !== getFieldValue('new_password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
  };

  return (
    <Form style={{ width: 720 }} onSubmit={handleSubmit}>
      <Row>
        <Col>
          <FormItem {...formItemLayout} hasFeedback label="原始密码">
            {getFieldDecorator('old_password', {
              rules: [{
                required: true,
              }],
            })(
              <Input placeholder="如果没有设置过初始秘密留空" />
            )}
          </FormItem>
        </Col>
        <Col>
          <FormItem {...formItemLayout} hasFeedback label="新密码">
            {getFieldDecorator('new_password', {
              rules: [{
                required: true,
              }, {
                validator: checkConfirm,
              }],
            })(
              <Input placeholder="请输入新密码" />
            )}
          </FormItem>
        </Col>
        <Col>
          <FormItem {...formItemLayout} hasFeedback label="确认新密码">
            {getFieldDecorator('confirm_password', {
              rules: [{
                required: true,
              }, {
                validator: checkNew,
              }],
            })(
              <Input placeholder="请输入确认新密码" />
            )}
          </FormItem>
        </Col>
        <Col>
          <FormItem wrapperCol={{ span: 8, offset: 5 }}>
            <Button type="primary" htmlType="submit">
              更新
            </Button>
            <Button style={{ marginLeft: 8 }}>
              取消
            </Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
}

UserPassword.propTypes = {
}

export default Form.create()(UserPassword);
