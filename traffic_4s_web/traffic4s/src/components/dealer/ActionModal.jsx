/**
 * Created by apple on 2017/5/16.
 */
import React, { Component } from 'react';
import { Button,Modal,Select,Form,Col,Row,Input,Icon,Cascader } from 'antd';
import styles from './ActionModal.css'
const Option = Select.Option;
const FormItem = Form.Item;

class ActionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      barea_id:'',
      groupid:'',
    };
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && isNaN(value)) {
      callback('请输入数字!');
    } else {
      callback();
    }
  }
  showModal = () => {
    const {dealer_id,levelArr,groupName,group_id,dealer_name,dealer_code,brand_id,sarea_id,barea_id,city}=this.props.record;
    this.props.form.setFieldsValue({
      dealer_name:dealer_name,
      dealer_code:dealer_code,
      group_id:groupName,
      barea_id:levelArr,
      city:city,
    });
    this.setState({
      visible: true,
      barea_id:'',
      groupid:'',
    });
  }

  getgroupoption = (areaarray) => {
    //console.log(areaarray[0].length);
    if (areaarray){
      return areaarray.map((item,index)=>{
        return (
          <Option key={' '+index} value={item.group_name}>{item.group_name}</Option>
        );

      });
    }
  }
  groupChange= (e) => {

    if (e.length==0){
      this.props.querynativegroup();
    }else{
      this.props.querygroup(e);
    }
  }
  handleOk = (e) => {
    const {dealer_id,levelArr,groupName,group_id,dealer_name,dealer_code,brand_id,sarea_id,barea_id,city}=this.props.record;
    const {onaddDealer,onDealer}=this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var g=0;
        this.props.groupdata.map(item=>{
          if(item.group_name==values.group_id){
            g= item.group_id;

          }
        });
        values.group_id=g;
        values.barea_id=this.state.barea_id;
        values.dealer_id=this.props.record.dealer_id;
        this.props.type==1?onaddDealer(values):onDealer(values);
        this.setState({
          visible: false
        });
      }
    });

  }
  handleCancel = (e) => {
    const {dealer_id,levelArr,groupName,group_id,dealer_name,dealer_code,brand_id,sarea_id,barea_id,city}=this.props.record;
    this.props.form.setFieldsValue({
      dealer_name:dealer_name,
      dealer_code:dealer_code,
      group_id:groupName,
      barea_id:levelArr,
      city:city,
    });
    //console.log(e);
    this.props.querynativegroup();
    this.setState({
      visible: false
    });
  }

   onChange=(value)=> {
     //alert(value[value.length-1]);
     //console.log(value.toString());
     this.setState({
       barea_id: value.toString(),
     });
}

  areaMenu=(areaArray)=> {

    if (areaArray[0].name == '全国') {
      areaArray =  areaArray.shift();
    }


    return areaArray.map(item=>{

      if (item.chiledren){
        return (
        {
          value:item.id,
          label:item.name,
          children:this.areaMenu(item.chiledren),
        }
        );
      }
      return ({
          value:item.id,
          label:item.name
      });
    });
  }
  render() {
    const options = [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake',
        }],
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
          value: 'zhonghuamen',
          label: 'Zhong Hua Men',
        }],
      }],
    }];
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 30 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 30 },
        sm: { span: 16 },
      },

    };
    const {dealer_id,levelArr,groupName,group_id,dealer_name,dealer_code,brand_id,sarea_id,barea_id,address,city}=this.props.record;
    const {areadata}=this.props
    const areaItem=this.areaMenu(areadata);

    return (
      <span>
        {this.props.type==1?<Button type="primary" onClick={this.showModal} >添加经销商</Button>:<a onClick={this.showModal}>修改信息</a>}
        <Modal width="900px"
               height="100rem" title={this.props.type==1?"添加经销商":"修改信息"}
               visible={this.state.visible}
               onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <Form>


            <Col span={8} key='b'>
              <FormItem
                {...formItemLayout}
                label="经销商店名	"
              >
                {
                  getFieldDecorator('dealer_name', {
                    //rules: [{ required: true,message: 'Please input your note!'}],
                    initialValue: dealer_name,
                    rules: [
                      { required: true, message: '请输入经销商名称!' },
                    ],
                    //onChange: this.handleSelectChange,
                  })(
                    <Input />

                  )
                }
              </FormItem>
            </Col>
            <Col span={8} key='c'>

              <FormItem
                {...formItemLayout}
                label="代码"
              >
                {
                  getFieldDecorator('dealer_code', {
                    initialValue: dealer_code,
                    rules: [
                      { required: true, message: '请填写代码!' },
                    ],
                  })(<Input />)
                }
              </FormItem>
            </Col>

            <Col span={8} key='e'>
              <FormItem
                {...formItemLayout}
                label="所属集团	"
              >
                {
                  getFieldDecorator('group_id', {
                    initialValue: groupName,
                    //onChange: this.handleSelectChange,
                  })(
                    <Select
                      mode="combobox"
                      size='default'
                      filterOption={false}
                      onChange={this.groupChange}
                    >
                      {this.getgroupoption(this.props.groupdata)}

                    </Select>                  )
                }
              </FormItem>
            </Col>
            <Col span={8} key='f'>

              <FormItem
                {...formItemLayout}

                label="所属区域	"
              >
                {
                  getFieldDecorator('barea_id', {
                    initialValue: levelArr,
                    rules: [
                      { required: true, message: '请选择区域!' },
                    ],
                    //rules: [{
                    //  validator: this.checkConfirm,
                    //}],
                  })(<Cascader onChange={this.onChange}  options={areaItem} placeholder=""/>)
                }
              </FormItem>
            </Col>
            <Col span={8} key='j'>
              <FormItem
                {...formItemLayout}
                label="城市"
              >
                {
                  getFieldDecorator('city', {
                    initialValue: city,

                    //onChange: this.handleSelectChange,
                  })(                  <Input />
                  )
                }
              </FormItem>
            </Col>

            <Col span={8} key='k'>
            </Col>


          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ActionModal);
