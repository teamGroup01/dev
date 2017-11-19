import React, { Component } from 'react';
import { Modal, Form, Input ,Select, Col,Button } from 'antd';
const FormItem = Form.Item;


class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,

    };
  }
  showModal = () => {
    this.setState({
      value: true,
    });
  }
  handleOk = (e) => {
    const { models } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        models.addUser(values);
      }
    });
    this.setState({
      value: false,
    });
  }
  handleCancel = () => {
    this.setState({
      value: false,
    });
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const formbuttonItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
      },

    };
    return (

      <div>
        <Button type="primary" onClick={this.showModal}>增加成员</Button>
        <Modal
          visible={this.state.value}
          onOk={this.handleOk}
          width="700px"
          title="增加成员"
          onCancel={this.handleCancel}>
          <Form horizontal>

            <FormItem
              {...formItemLayout}
              label="用户名称"
            >
              {
                getFieldDecorator('user_name', {
                  initialValue: 'fsdfs',
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}

              label="用户角色"
            >
              {
                getFieldDecorator('user_role', {
                  rules: [{ required: true,message: 'Please input your note!'}],
                  //onChange: this.handleSelectChange,
                })(<Select>
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                </Select>)
              }
            </FormItem>

            <Col span={12} key='i'>
            <FormItem
              {...formbuttonItemLayout}

              label="所属品牌"
            >
              {
                getFieldDecorator('brand_id', {
                  rules: [{ required: true,message: 'Please input your note!'}],
                  //onChange: this.handleSelectChange,
                })(<Select>
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                </Select>)
              }
            </FormItem>
              </Col>
            <Col span={12} key='j'>

              <FormItem
                {...formbuttonItemLayout}

                label="所属集团"
              >
                {
                  getFieldDecorator('barea_id', {
                    rules: [{ required: true,message: 'Please input your note!'}],
                    //onChange: this.handleSelectChange,
                  })(<Select>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                  </Select>)
                }
              </FormItem>
            </Col>


            <Col span={12} key='k'>

              <FormItem
                {...formbuttonItemLayout}

                label="所属区域"
              >
                {
                  getFieldDecorator('sarea_id', {
                    rules: [{ required: true,message: 'Please input your note!'}],
                    //onChange: this.handleSelectChange,
                  })(<Select>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                  </Select>)
                }
              </FormItem>
            </Col>
            <Col span={12} key='l'>

              <FormItem
                {...formbuttonItemLayout}

                label="所属经销商ID"
              >
                {
                  getFieldDecorator('dealer_id', {
                    rules: [{ required: true,message: 'Please input your note!'}],
                    //onChange: this.handleSelectChange,
                  })(<Select>
                    <Option value="0">male</Option>
                    <Option value="1">female</Option>
                  </Select>)
                }
              </FormItem>
            </Col>


          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(AddUser);
