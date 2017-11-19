/**
 * Created by apple on 2017/5/19.
 */

import React, { Component } from 'react';
import { Button,Modal,Select,Form,Col,Row,Input,Icon } from 'antd';
import styles from './DeleteModal.css'
const Option = Select.Option;
const FormItem = Form.Item;

class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false
    });
  }




  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <span>
        <a onClick={this.showModal}>删除</a>
        <Modal title="删除" visible={this.state.visible}
               onOk={this.handleOk} onCancel={this.handleCancel}>
          <p>确定要删除吗？</p>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(DeleteModal);
