import React, { PropTypes } from 'react';
import {
  Form, Row, Col, Input, 
  Button
} from 'antd';

const FormItem = Form.Item;

let passwordDirty = false;

const UserPassword = ({
  onUpdate,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
    resetFields,
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
      resetFields();
    });
  }

  function handlePasswordBlur(e) {
    const value = e.target.value;
    passwordDirty = passwordDirty || !!value;
  }

  function checkConfirm(rule, value, callback) {
    if (value && passwordDirty) {
      validateFields(['confirm_password'], { force: true });
    }
    callback();
  }

  function checkPassword(rule, value, callback) {
    if (value && value !== getFieldValue('new_password')) {
      callback('两次密码输入不一致');
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
              rules: []
            })(
              <Input type="password" placeholder="如果没有设置过初始秘密留空" />
            )}
          </FormItem>
        </Col>
        <Col>
          <FormItem {...formItemLayout} hasFeedback label="新密码">
            {getFieldDecorator('new_password', {
              rules: [{
                type: "string",
                required: true,
                range: {min: 6}
              }, {
                validator: checkConfirm,
              }],
            })(
              <Input placeholder="新密码" type="password" onBlur={handlePasswordBlur}/>
            )}
          </FormItem>
        </Col>
        <Col>
          <FormItem {...formItemLayout} hasFeedback label="确认新密码">
            {getFieldDecorator('confirm_password', {
              rules: [{
                required: true,
              }, {
                validator: checkPassword,
              }],
            })(
              <Input placeholder="确认新密码" type="password" />
            )}
          </FormItem>
        </Col>
        <Col>
          <FormItem wrapperCol={{ span: 8, offset: 5 }}>
            <Button type="primary" htmlType="submit">
              更新
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={() => { resetFields() }}>
              清空
            </Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
}

UserPassword.propTypes = {
  onUpdate: PropTypes.func,
}

export default Form.create()(UserPassword);
