import React, { Component } from 'react';
import { Modal, Select,Form,TreeSelect, Col, Input, Button, Icon,Cascader} from 'antd';
const FormItem = Form.Item;
import styles from './ChangeInfomation.css';
const TreeNode = TreeSelect.TreeNode;

const Option = Select.Option;


class ChangeInfomation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      selectid:'',
      groupid:'',
      barea_id:'',
      isSelect:false,
    };
  }
  showModal = () => {
    let {user_id,areaName,groupName,dealerName,realname,levelArr,user_name,barea_id,user_role,group_id,dealer_id}=this.props.records;
    this.props.form.setFieldsValue({
      user_name:user_name,
      barea_id:areaName,
      user_role:user_role,
      group_id:groupName,
      dealer_id:dealerName,
      realname:realname,
      pwd:'',
    });
    this.setState({
      value: true,
      isSelect:false,
    });
  }
  handleOk = () => {
    const array=['超级管理员','总部','大区经理','小区经理','经销商总经理','集团账号'];
    let {user_id,areaName,groupName,dealerName,realname,levelArr,user_name,barea_id,user_role,group_id,dealer_id}=this.props.records;
    let {groupdata,dealerid}=this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params=this.state.barea_id;
        if (!this.state.isSelect){
          if (levelArr){
            let length=levelArr.length;
            if (length==1){
              params={barea_id:levelArr[0]};
            }else if(length==2){
              params={sarea_id:levelArr[1],barea_id:levelArr[0]};
            }else if (length==3){
              params = {province:levelArr[2]};
            }
          }
        }

        array.map((item,index)=>{
          if (item==values.user_role){
            values.user_role=index+1;
          }
        });
        let group='';
        //console.log(groupdata);
        groupdata.map(item=>{
          if(item.group_name==values.group_id){
            group=item.group_id;
          }
        });
        //console.log(values.group_id);
        let dealer='';
       dealerid.map(item=>{
          if(item.dealer_name==values.dealer_id){
            dealer= item.dealer_id;
          }
        });
        values.user_id=user_id;
        values.dealer_id=dealer;
        values.group_id=group;
        values.barea_id=params;
        let {type}=this.props;

        console.log(type);
        if (type==1){
          this.props.onaddUser(values);
        }else if(type==2){
          this.props.onchangeHost(values);}
        else {
          this.props.onchangeUserInfo(values);}
        //this.props.type==1?this.props.onaddUser(values):this.props.onchangeUserInfo(values);
        this.setState({
          value: false,
        });
      }
    });

  }
  groupChange= (e) => {

    if (e.length==0){
      this.props.querynativegroup();
    }else{
      this.props.querygroup(e);
    }
  }
  selectChange = (e) => {

    if (e.length==0){
      this.props.nativeDealer();
    }else{
      this.props.querdyealer(e);
    }
  }
  handleCancel = (e) => {
    let {user_id,areaName,groupName,dealerName,realname,levelArr,user_name,barea_id,user_role,group_id,dealer_id}=this.props.records;
    this.props.form.setFieldsValue({
      user_name:user_name,
      barea_id:areaName,
      user_role:user_role,
      group_id:groupName,
      dealer_id:dealerName,
      realname:realname,
      pwd:'',
    });
    this.props.querynativegroup();
    this.props.nativeDealer();
    this.setState({
      value: false,
    });
    //let ref = Modal.info();
    //ref.destroy();
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && isNaN(value)) {
      callback('请输入数字!');
    } else {
      callback();
    }

  }
  getselectoption = (areaarray) => {
    if (areaarray){
      return areaarray.map((item,index)=>{
        return (
          <Option key={' '+index} value={item.dealer_name}>{item.dealer_name}</Option>
        );

      });
    }
  }
  getgroupoption = (areaarray) => {
    if (areaarray){
      return areaarray.map((item,index)=>{
        return (
          <Option key={' '+index} value={item.group_name}>{item.group_name}</Option>
        );

      });
    }
  }
  areaMenu=(areaArray)=> {
    if (areaArray){
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

  }
  getareaMenu=(areaArray)=> {

    return areaArray.map(item=>{
      if (item.chiledren){

        return (
          <TreeNode value={item.name} title={item.name} key={item.id+','+item.pid}>
            {this.getareaMenu(item.chiledren)}
          </TreeNode>
        );
      }
      return (
        <TreeNode value={item.name} title={item.name} key={item.id+','+item.pid} />
      );
    });
  }
  onChange=(value, label, extra)=> {
    const {areadata}=this.props;
    let params='';
    let level=3;
    if (value){
      for (let item of areadata) {
        if (item.name==value){
          level=1;
          break;
        }
        if (item.chiledren){
          item.chiledren.map(item=>{
            if (item.name==value){
              level=2;
            }
          });
        }
      }
    }
    let key_id;
    let key_array;
    if (extra.triggerNode){
       key_id=extra.triggerNode.props.eventKey;
       key_array=key_id.split(',');
    }
      if (level==1){
        params={barea_id:key_array[0]};
      }else if(level==2){
        params={sarea_id:key_array[0],barea_id:key_array[1]};
      }
      //else if (level==3){
      //  if(extra.triggerNode) {
      //    params = {province: extra.triggerNode.props.eventKey};
      //  }
      //}
    //alert(value[value.length-1]);
    this.setState({
      barea_id: params,
      isSelect:true,
    });
  }
  ondealidChange=(value)=> {
  }
  onselect=(value, node, extra)=> {
  }
  render() {
    let {user_id,areaName,groupName,dealerName,mail,realname,levelArr,user_name,barea_id,telephone,user_role,group_id,dealer_id}=this.props.records;
    let {areadata}=this.props;
    let areaItem=this.getareaMenu(areadata);
    let { getFieldDecorator } = this.props.form;
    let formItemLayout = {
      labelCol: {
        xs: { span: 30 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 30 },
        sm: { span: 16 },
      },

    };
    return (

      <div >
        {this.props.type==1?<Button type="primary" onClick={this.showModal}>增加成员</Button>:<a onClick={this.showModal}>修改信息</a>}
        <Modal
          width="900px"
          visible={this.state.value}
          onOk={this.handleOk}
          title={this.props.type==1?"增加成员":"修改信息"}
          onCancel={this.handleCancel}>
          <Form >
            <Col span={8} key='d'>
              <FormItem
                {...formItemLayout}
                label="用户名"
              >
                {
                  getFieldDecorator('user_name', {
                    initialValue: user_name,
                    rules: [
                      { required: true, message: '请输入用户名!' },
                    ],
                  })(<Input disabled={this.props.type==1?false:true}/>)
                }
              </FormItem>
            </Col>
            <Col span={8} key='e'>
              <FormItem
                {...formItemLayout}
                label="所在区域"
              >
                {
                  getFieldDecorator('barea_id', {
                    initialValue: areaName,
                    //onChange: this.handleSelectChange,
                    //<Cascader onChange={this.onChange} options={areaItem} placeholder="" />
                  })(
                    <TreeSelect
                      className={styles.treeselect}
                      showSearch
                      //value={this.state.value}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      allowClear
                      onChange={this.onChange}
                      //treeData={treeData}
                      placeholder="请选择区域"
                      onSelect={this.onselect}
                    >
                      {areaItem}
                    </TreeSelect>
                  )
                }
              </FormItem>
            </Col>



            <Col span={8} key='g'>
              <FormItem
                {...formItemLayout}
                label="用户角色"
              >
                {
                  getFieldDecorator('user_role', {
                    initialValue: user_role,
                    rules: [
                      { required: true, message: '请选择角色!' },
                    ],
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
            </Col>
            <Col span={8} key='h'>
              <FormItem
                {...formItemLayout}
                label="所属集团"
              >
                {
                  getFieldDecorator('group_id', {
                    initialValue: groupName,
                    //onChange: this.handleSelectChange,
                  })(<Select
                    mode="combobox"
                    size='default'
                    filterOption={false}
                    onChange={this.groupChange}
                  >
                    {this.getgroupoption(this.props.groupdata)}

                  </Select>)
                }
              </FormItem>
            </Col>
            <Col span={8} key='j'>
              <FormItem
                {...formItemLayout}
                label="所属经销商"
              >
                {
                  getFieldDecorator('dealer_id', {
                    //onChange: this.handleSelectChange,
                    initialValue: dealerName,

                  })(
                    <Select
                      mode="combobox"
                      size='default'
                      filterOption={false}
                      //placeholder="Please select"
                      //defaultValue={['a10', 'c12']}
                      onChange={this.selectChange}
                    >
                      {this.getselectoption(this.props.dealerid)}

                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8} key='i'>

              <FormItem
                {...formItemLayout}

                label="姓名"
              >
                {
                  getFieldDecorator('realname', {
                    initialValue: realname,
                  })(<Input />)
                }
              </FormItem>
            </Col>



            <Col span={8} key='l'>

              {
                this.props.type==1?<FormItem
                  {...formItemLayout}

                  label="密码"
                >
                  {
                    getFieldDecorator('pwd', {
                      initialValue: realname,
                    })(<Input />)
                  }
                </FormItem>:''
              }
            </Col>


          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(ChangeInfomation);
