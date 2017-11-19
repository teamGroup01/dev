import React, { Component } from 'react';
import { Modal, Select,Form, Input  } from 'antd';
const FormItem = Form.Item;


class ChangePwd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      change:0,
    };
  }
  showModal = () => {
    //this.props.form.setFieldsValue({
    //  rpwd:' ',
    //});
    this.setState({
      value: true,
    });
  }
  handleOk = () => {
    const {resetpwd}=this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        resetpwd(this.props.records.user_id);
      }
    });
    this.setState({
      change:1,
    });
    this.setState({
      value: false,
    });
  }
  handleCancel = () => {
    this.setState({
      value: false,
      change:0,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {user_pass,user_id,user_name}=this.props.records;
    const {resetpwd}=this.props.resetpwd;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const passwd=this.state.change==0?' ':user_pass;
    return (

      <div>
       <span> &nbsp;|&nbsp;<a type="primary" onClick={this.showModal}>重置密码</a>&nbsp;|&nbsp;</span>
        <Modal
          visible={this.state.value}
          onOk={this.handleOk}
          title="重置密码"
          onCancel={this.handleCancel}>
          <Form horizontal>
            <FormItem
              {...formItemLayout}

              label="用户名"
            >
              {
                getFieldDecorator('user_id', {
                })(
                  <span>{user_name}</span>
                )
              }

            </FormItem>

          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(ChangePwd);
