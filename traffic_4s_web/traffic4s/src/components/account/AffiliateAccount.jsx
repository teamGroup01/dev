import styles from './AffiliateAccount.css';
import Adam from './Adam';
import React, { Component } from 'react';
import { TreeSelect,Table,Input,Spin,Button,Popconfirm } from 'antd';
import AddUser from './moudle/AddUser';
import ChangeInfomation from './moudle/ChangeInfomation';
import ResetPwd from './moudle/ResetPwd';
import Role from './moudle/Role';
import { PAGE_SIZE } from '../../constants';
const TreeNode = TreeSelect.TreeNode;

class AffiliateAccount extends Component {
  state = {
    filterDropdownVisible: false,
    data:this.props.models.data,
    searchText: '',
    filtered: false,
  };
  constructor(props) {
    super(props);

  }
  onChange=(value, label, extra)=> {
    let {queryRole,queryAllRole}=this.props.models;
    let params='';
    let level=3;
    if (value){
        params={user_role:extra.triggerNode.props.eventKey};
      queryRole(params);

    }else{
      queryAllRole();
    }


  }
  getareaMenu=(areaArray)=> {
    return areaArray.map(item=>{
      if (item.chiledren){
        return (
          <TreeNode value={item.name} title={item.name} key={item.id}>
            {this.getareaMenu(item.chiledren)}
          </TreeNode>
        );
      }
      return (
        <TreeNode value={item.name} title={item.name} key={item.id} />
      );
    });
  }
   handleInputChange=(e)=> {
     const {data}=this.props.models.data;
  if (e.target.value.length==0){
    this.props.models.queryUser();
  }else{
    this.props.models.searchUser(e.target.value);
  }
}
  fTime = (adate)=> {
    let date=new Date(adate);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h=h<10?('0'+h):h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    //return y + '-' + m + '-' + d+' '+h+':'+minute;
    let miao=date.getSeconds();
    miao=miao<10?('0'+miao):miao;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+miao;
  };
  handler(){
  }
   deleteHandler= (id)=> {
     this.props.models.deleteUser(id);
}
  render() {
    const {showLoading,area,dealer,group,loading,resetPwd,resetpwd}=this.props.models;

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};


    let role_data=[{name:'超级管理员',id:1},{name:'总部',id:2},{name:'大区经理',id:3},
      {name:'小区经理',id:4},{name:'经销商总经理',id:5},{name:'集团账号',id:6}];
    const areaItem=this.getareaMenu(role_data);

    const dataSource = [{
      user_id: '1',
      user_name: 'user_id',
      user_role: 32,
      brand_id: '西湖区湖底公园1号',
      barea_id: '1',
      dealer_id: 'user_id',
      group_id: 32,
      mobile: '西湖区湖底公园1号',
      qq: '1',
      wechat: 'user_id',
      create_user: 32,
      crt_date: '西湖区湖底公园1号',
      upd_date: '西湖区湖底公园1号',

    }
    ];

    const columns = [{
      title: '用户名',
      dataIndex: 'user_name',
      key: 'user_name',
    }, {
      title: '用户角色',
      dataIndex: 'user_role',
      key: 'user_role',
    },{
        title: '所属区域',
        dataIndex: 'areaName',
        key: 'areaName',

    }, {
        title: '所属集团',
        dataIndex: 'groupName',
        key: 'groupName',


    },
      {
        title: '所属经销商',
        dataIndex: 'dealerName',
        key: 'dealerName',

      }, {
        title: '姓名',
        dataIndex: 'realname',
        key: 'realname',

      },
      {
        title: '创建时间',
        dataIndex: 'crt_date',
        key: 'crt_date',
        sorter: (a, b) => {
          let dateA=new Date(a.crt_date);
          let dateB=new Date(b.crt_date);
          return dateA.getTime()-dateB.getTime();
        },
        render: (text, record) => (
          <span>
          {
            this.fTime(text)
          }
        </span>
        )
      },
      {
        title: '修改时间',
        dataIndex: 'upd_date',
        key: 'upd_date',
        sorter: (a, b) => {
          //console.log(b.upd_date);
          let dateA=new Date(a.upd_date);
          let dateB=new Date(b.upd_date);
         return dateA.getTime()-dateB.getTime();


        },
        render: (text, record) => (
          <span>
          {
            this.fTime(text)
          }
        </span>
        )
      }, {
        title: '操作',
        key: 'operater',
        render:(text,record)=>(
          <span className={styles.operator}>
            <ChangeInfomation
                              querygroup={this.props.models.queryGroup}
                              querynativegroup={this.props.models.queryNativeGroup}
                              groupdata={group}
                              areadata={area}
                              dealerid={dealer}
                              nativeDealer={this.props.models.querynativeDealer}
                              querdyealer={this.props.models.queryDealer}
                              onchangeUserInfo={this.props.models.changeUserInfo}
                              onaddUser={this.props.models.addUser}
                              records={record}
            />
            <ResetPwd resetpwd={resetPwd} records={record}/>
            <Role onRole={this.props.models.role} records={record}/>
            <Popconfirm title="确认删除?" onConfirm={this.deleteHandler.bind(null, record.user_id)}>
            <a href="">删除</a>
          </Popconfirm>
          </span>),
      },
    ];
    return (
      <div className={styles.body}>
        <div className={styles.top}>
          <div>
          <h2 className={styles.affiliate}>从属账号</h2>
          </div>
        <div className={styles.rightlable}>
          <ChangeInfomation
            querygroup={this.props.models.queryGroup}
            querynativegroup={this.props.models.queryNativeGroup}
            groupdata={group}
            areadata={area}
            dealerid={dealer}
            nativeDealer={this.props.models.querynativeDealer}
            querdyealer={this.props.models.queryDealer}
            onchangeUserInfo={this.props.models.changeUserInfo}
            onaddUser={this.props.models.addUser}
            type='1'
            records={{}}/>
          <TreeSelect
            className={styles.treeselect}
            showSearch
            style={{ width: 300 }}
            //value={this.state.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            allowClear
            onChange={this.onChange}
            //treeData={treeData}
            placeholder="请选择角色"
            showSearch={false}
            //onSelect={this.onselect}
          >
            {areaItem}

          </TreeSelect>
          <div className={styles.righinput}>
            <Input onChange={this.handleInputChange.bind(this)} placeholder="搜索用户名,姓名"/>
          </div>
        </div>
        </div>
        <div className={styles.affiliatecontent}>
          <Spin tip="加载中..." spinning={showLoading}>

          <Table dataSource={this.props.models.data} columns={columns} pagination={{ pageSize: PAGE_SIZE }}/>
            </Spin>
        </div>
      </div>
    );
  }
}
AffiliateAccount.propTypes = {
};

export default AffiliateAccount;
