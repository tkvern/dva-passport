import React, { Component, PropTypes } from 'react';
import {
  Form, Row, Col, Checkbox, Card,
  Modal,
} from 'antd';

import { getLocalStorage } from '../../utils/helper';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const UserModalGrant = ({
  item,
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

  const roles = item.roles || [];
  const listRoles = getLocalStorage('roles') || [];
  const defaultCheckedList = [];
  const plainOptions = [];
  let map = {};
  let dest = [];
  roles.map((role) => {
    return defaultCheckedList.push(role.id);
  });

  listRoles.map((role) => {
    return plainOptions.push({
      label: role.name,
      value: role.id,
    })
  })

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
          <Col span={24} className="checkboxItem">
            {getFieldDecorator('role_ids', { initialValue: defaultCheckedList })(
              <CheckboxGroup options={plainOptions} />
            )}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default Form.create()(UserModalGrant);
