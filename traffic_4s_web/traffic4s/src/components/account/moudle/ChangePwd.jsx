import React, { Component } from 'react';
import { Modal, Form, Input  } from 'antd';
const FormItem = Form.Item;


class ChangePwd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      confirmDirty: false,
      autoCompleteResult: [],
    };

  }
  showModal = () => {
    this.setState({
      value: true,
    });
  }
  handleOk = (e) => {
    e.preventDefault();
    const {changepwd}=this.props;
    const {user_pass,user_id}=this.props.data;
    //console.log(this.props.data);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.user_id=user_id;
        changepwd(values);
        this.setState({
          value: false,
        });
      }
    });

  }
  handleCancel = () => {
    this.setState({
      value: false,
    });
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
    }
    callback();
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newpwd')) {
      callback('两次密码需填写一致!');
    } else {
      callback();
    }
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {user_pass,user_id}=this.props.data;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (

      <div>
        <a type="primary" onClick={this.showModal}>修改密码</a>
        <Modal
          visible={this.state.value}
          onOk={this.handleOk}
          title="修改密码"
          onCancel={this.handleCancel}>
          <Form >
            <FormItem
              {...formItemLayout}
              hasFeedback
              label="老密码"
            >
              {
                getFieldDecorator('oldpwd', {
                  initialValue: '',
                  rules: [{
                    required: true, message: '请输入旧密码!',
                  }],

                })(<Input type="password"/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              hasFeedback
              label="新密码"
            >
              {
                getFieldDecorator('newpwd', {
                  initialValue: '',
                  rules: [{
                    required: true, message: '请输入你的密码!',
                  }, {
                    validator: this.checkConfirm,
                  }],

                })(<Input type="password"/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              hasFeedback
              label="确认密码"
            >
              {
                getFieldDecorator('conpwd', {
                  initialValue: '',
                  rules: [{
                    required: true, message: '请确认你的密码!',
                  }, {
                    validator: this.checkPassword,
                  }],
                })(<Input type="password" onBlur={this.handleConfirmBlur}/>)
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(ChangePwd);
