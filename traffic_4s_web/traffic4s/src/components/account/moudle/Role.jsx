import React, { Component } from 'react';
import { Modal, Select,Form, Input  } from 'antd';
const FormItem = Form.Item;


class ChangePwd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
    };
  }
  showModal = () => {
    const {user_id,user_name,user_role}=this.props.records;
    this.props.form.setFieldsValue({
      user_id:user_id,
      user_name:user_name,
      user_role:user_role,
      change_role:'',
    });
    this.setState({
      value: true,
    });
  }
  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onRole(values);
        this.setState({
          value: false,
        });
      }
    });

  }
  handleCancel = () => {
    const {user_id,user_name,user_role}=this.props.records;
    this.props.form.setFieldsValue({
      user_id:user_id,
      user_name:user_name,
      user_role:user_role,
      change_role:'',
    });
    this.setState({
      value: false,
    });
  }

  render() {
    const {user_id,user_name,user_role}=this.props.records;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (

      <div>
        <span><a type="primary" onClick={this.showModal}>角色</a>&nbsp;|&nbsp;</span>
        <Modal
          visible={this.state.value}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <Form >
            <FormItem
              {...formItemLayout}

              label="用户ID"
            >
              {
                getFieldDecorator('user_id', {
                  initialValue: user_id,
                })(
                  <span>{user_id}</span>
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}

              label="用户名称"
            >
              {
                getFieldDecorator('user_name', {
                  initialValue: user_name,
                })(
                  <span>{user_name}</span>
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}

              label="用户角色"
            >
              {
                getFieldDecorator('user_role', {
                  initialValue: user_role,
                })(
                  <span>{user_role}</span>
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}

              label="修改用户角色为"
            >
              {
                getFieldDecorator('change_role', {
                  rules: [{ required: true,message: 'Please input your note!'}],
                  //onChange: this.handleSelectChange,
                })(
                  <Select>
                    <Option value="1">超级管理员</Option>
                    <Option value="2">总部</Option>
                    <Option value="3">大区经理</Option>
                    <Option value="4">小区经理</Option>
                    <Option value="5">经销商总经理</Option>
                    <Option value="6">集团账号</Option>
                  </Select>)
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(ChangePwd);
