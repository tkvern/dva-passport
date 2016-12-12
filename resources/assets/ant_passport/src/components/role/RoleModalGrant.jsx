import React, { Component, PropTypes } from 'react';
import {
  Form, Row, Col, Checkbox, Card,
  Modal,
} from 'antd';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const RoleModalGrant = ({
  currentPermissions,
  listPermissions,
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

  const defaultCheckedList = [];
  const plainOptions = [];
  let map = {};
  let dest = [];

  currentPermissions.map((item) => {
    defaultCheckedList.push(item.id);
  });
  listPermissions.map((item) => {
    plainOptions.push({
      label: item.name,
      value: item.id,
    })
  })

  for (let i = 0; i < listPermissions.length; i++){
    let permission = listPermissions[i];
    if (!map[permission.scope]){
        dest.push({
            scope: permission.scope,
            children: [permission],
            options: [{
              label: permission.name,
              value: permission.id,
            }]
        });
        map[permission.scope] = permission;
    }else{
        for (let j = 0; j < dest.length; j++){
            let dj = dest[j];
            if (dj.scope == permission.scope){
                dj.children.push(permission);
                dj.options.push({
                  label: permission.name,
                  value: permission.id,
                })
                break;
            }
        }
    }
  }

  const loop = data => data.map((item) => {
    if (item.children) {
      return (
        <Card title={item.scope} bordered={false} key={item.scope}>
          <Col span={24} className="checkboxItem">
            {getFieldDecorator('permission_ids', { initialValue: defaultCheckedList })(
                <CheckboxGroup options={item.options} />
            )}
          </Col>
        </Card>
      );
    }
  });

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
            {loop(dest)}
          </Row>
      </Form>
    </Modal>
  );
}

export default Form.create()(RoleModalGrant);
