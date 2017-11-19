import React, { Component } from 'react';
import { Modal, Select,Form, Input ,Button,Cascader } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


class APChangeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      selectid:'',
      selecttype:'',
      data:[],
    };
  }
  showModal = () => {
    const {ap_mac,ap_brand,ap_model,dealer_name,dealer_id}=this.props.record;
    this.props.form.setFieldsValue({
      ap_brand:ap_brand,
      ap_model:ap_model,
      ap_mac:ap_mac,
      dealer_id:dealer_name,
    });
    this.setState({
      value: true,
    });
  }
  onChange=(value)=> {
    console.log(value);
  }
  handleOk = (e) => {
    const {dealer_id}=this.props.record;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let d='';
        this.props.dealerid.map(item=>{

          if(item.dealer_name==values.dealer_id){
            //this.setState({
            //  selectid: item.dealer_id,
            //});
            d=item.dealer_id;
            //values.dealer_id=item.dealer_id;
          }
        });
        values.ap_id=this.props.record.ap_id;
        values.dealer_id=d;
        //console.log(values.dealer_id);

        this.props.type==1?this.props.onDevice(values):this.props.onInfo(values);
        this.setState({
          value: false,
        });
      }
    });

  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && isNaN(value)) {
      callback('请输入数字!');
    } else {
      callback();
    }

  }
  handleCancel = () => {
    const {ap_mac,ap_brand,ap_model,dealer_name}=this.props.record;
    this.props.form.setFieldsValue({
      ap_brand:ap_brand,
      ap_model:ap_model,
      ap_mac:ap_mac,
      dealer_id:dealer_name,
    });
    this.props.nativeDealer();
    this.setState({
      value: false,
    });
  }
  //onselect= (value, option) => {
  //  this.props.dealerid.map(item=>{
  //    if(item.dealer_name==value){
  //      this.setState({
  //        selectid: item.dealer_id,
  //      });
  //    }
  //  });
  //}
  selectchange = (e) => {

    if (e.length==0){
      this.props.nativeDealer();
    }else{
      this.props.querdyealer(e);
    }

    //if (e.length==0){
    //  this.setState({
    //    selecttype: 0,
    //  });
    //}else {
    //  const data=[];
    //  this.props.dealerid.map(item=>{
    //    //ap_brand
    //    if((item.dealer_name&&item.dealer_name.includes(e))||(item.dealer_code&&item.dealer_code.includes(e))||
    //      (item.province&&item.province.includes(e))||(item.address&&item.address.includes(e))
    //    ){
    //      data.push(
    //        <Option key={item.dealer_id}>{item.dealer_name}</Option>
    //      );
    //    }
    //  });
    //  this.setState({
    //    selecttype: 1,
    //    data:data,
    //  });
    //}
  }
  getselectoption = (areaArray) => {
    //console.log(array)
     return areaArray.map((item,index)=>{
      return (
        <Option key={index} value={item.dealer_name}>{item.dealer_name}</Option>
      );

  });
  }
  getdealername = (areaArray,dealer_id) => {
    //console.log(array)
    return areaArray.map((item,index)=>{
     if (item.dealer_id==dealer_id){
       console.log(item.dealer_name);
       return item.dealer_name;
     }

    });
  }
  componentDidUpdate( prevProps,  prevState){
    //this.setState({
    //  data: this.props.dealerid,
    //});
  }
  render() {

    //const {dealerid}=this.props.dealerid;
    //console.log(this.props.record);
    //const {ap_brand,ap_model,ap_mac,dealer_id,install_desc}=this.props.record;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {this.props.type==1?<Button type="primary"  onClick={this.showModal}>添加设备</Button>:<a type="primary" onClick={this.showModal}>修改信息</a>}
        <Modal
          visible={this.state.value}
          onOk={this.handleOk}
          title={this.props.type==1?"添加设备":"修改信息"}
          onCancel={this.handleCancel}>
          <Form>

            <FormItem
              {...formItemLayout}

              label="品牌"
            >
              {
                getFieldDecorator('ap_brand', {
                  initialValue: this.props.record.ap_brand?this.props.record.ap_brand:'',
                  rules: [
                    { required: true, message: '请输入品牌名称!' },
                  ],
                })(
                  <Input />                )
              }

            </FormItem>
            <FormItem
              {...formItemLayout}

              label="型号"
            >
              {
                getFieldDecorator('ap_model', {
                  initialValue: this.props.record.ap_model?this.props.record.ap_model:'',
                })(
                  <Input />                )
              }

            </FormItem>
            <FormItem
              {...formItemLayout}

              label="MC地址"
            >
              {
                getFieldDecorator('ap_mac', {
                  initialValue: this.props.record.ap_mac?this.props.record.ap_mac:'',
                  rules: [
                    { required: true, message: '请填写MAC地址!' },
                  ],
                })(
                  <Input />                )
              }

            </FormItem>
            <FormItem
              {...formItemLayout}

              label="经销商	"
            >
              {
                getFieldDecorator('dealer_id', {
                  initialValue: this.props.record.dealer_name,
                  //rules: [{
                  //  validator: this.checkConfirm,
                  //}],
                })(
                  <Select
                    mode="combobox"
                    size='default'
                    filterOption={false}
                    //placeholder="Please select"
                    //defaultValue={['a10', 'c12']}
                    onChange={this.selectchange}
                  >
                    {this.getselectoption(this.props.dealerid)}

                  </Select>
                )
                //<Cascader onCh
                //
                //
                //
                //
                //
                // ange={this.onChange} placeholder=""/>
              }

            </FormItem>

          </Form>
        </Modal>
      </div>
    );
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const {ap_id,ap_brand,ap_model,ap_mac,dealer_id,install_desc}=this.props.record;
  }
}
APChangeInfo.propTypes = {

};

export default Form.create()(APChangeInfo);
