import React from 'react';
import {TreeSelect, Spin,Icon, Card ,Popover,Button,Input,Table,Popconfirm} from 'antd'
import styles from './APTable.css';
import APChangeInfo from './APChangeInfo.jsx';
import { PAGE_SIZE } from '../../constants';

const TreeNode = TreeSelect.TreeNode;



function APTable  ({number=100,models}){
  const {showLoading,querynativeDealer,queryDealer,dealer,searchArea,queryData,area,fetchDevice,addDevice,changeInfo,deleteDevice,searchDevice,data,loading}=models;
  function deleteHandler(e) {
    deleteDevice(e);
    //alert(e);
  }
  function fTime  (adate) {
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
  }
  function getareaMenu(areaArray) {
    return areaArray.map(item=>{
      if (item.chiledren){
        return (
          <TreeNode value={item.name} title={item.name} key={item.id+''}>
            {getareaMenu(item.chiledren)}
          </TreeNode>
        );
      }
      return (
        <TreeNode value={item.name} title={item.name} key={item.id+''} />
      );
    });
  }
 function onChange (value, label, extra)  {
   //if (value){
   //  searchArea(extra.triggerNode.props.eventKey);
   //}else{
   //  queryData();
   //}
   let params={};
   let isTrue=false;
   let level=3;
   if (value){
     //area.map(item=>{
     //  if (item.name==value){
     //    isTrue=true;
     //  }
     //});
     if (value != '全国') {
       for (let item of area) {
         if (item.name == value) {
           level = 1;
           //isTrue=true;
           break;
         }
         if (item.chiledren) {
           item.chiledren.map(item=> {
             if (item.name == value) {
               level = 2;
             }
           });
         }
       }
       if (level == 1) {
         params = {barea_id: extra.triggerNode.props.eventKey};
       } else if (level == 2) {
         params = {sarea_id: extra.triggerNode.props.eventKey};
       } else {
         params = {province: extra.triggerNode.props.eventKey};
       }
     }
     params['value'] = value;
     searchArea(params);

   }else{
     queryData();
   }

 }
  function onselect (value, option)  {

  }

  function handleInputChange(e){
    if (e.target.value.length==0){
      fetchDevice();
    }else{
      searchDevice(e.target.value);
    }
  }
  const columns = [ {
    title: '品牌',
    dataIndex: 'ap_brand',
    key: 'ap_brand',

  }, {
    title: '型号',
    dataIndex: 'ap_model',
    key: 'ap_model',

  },
    {
      title: 'MAC 地址',
      dataIndex: 'ap_mac',
      key: 'ap_mac',

    },
    {
      title: '部署经销商',
      dataIndex: 'dealer_name',
      key: 'dealer_name',
      sorter: (a, b) => {
        let dateA=a.dealer_name;
        let dateB=b.dealer_name;
        return dateA<dateB ? -1 : 1;
      },

      render: (text, record) => (
        <span>
          {
            text
          }
        </span>
      )

    },
    {
      title: '在线状态',
      dataIndex: 'online',
      key: 'online',

      render: (text, record) => {
        if(text==1){
          return (
            <span className={styles.online}>
            在线
          </span>)
        } else if(text==2){
          return (
            <span className={styles.online}>
            预警
          </span>)
        } else {
          return (
            <span className={styles.outline}>
            离线
          </span>)
        }


      }
    },
    {
      title: '连线时间',
      dataIndex: 'last_date',
      key: 'last_date',
      sorter: (a, b) => {
        let dateA=new Date(a.last_date);
        let dateB=new Date(b.last_date);
        return dateA.getTime()-dateB.getTime();
      },

      render: (text, record) => (
        <span>
          {
            fTime(text)
          }
        </span>
      )
    },
    {
      title: '掉线时间',
      dataIndex: 'last_err_date',
      key: 'last_err_date',
      sorter: (a, b) => {
        let dateA=new Date(a.last_err_date);
        let dateB=new Date(b.last_err_date);
        return dateA.getTime()-dateB.getTime();
      },

      render: (text, record) => (
        <span>
          {
            fTime(text)
          }
        </span>
      )
    },
    {
    title: '操作',
    key: 'operator',
    render: (text, record) => (
      <span className={styles.operator}>
        <APChangeInfo record={record} nativeDealer={querynativeDealer} querdyealer={queryDealer} onInfo={changeInfo} dealerid={dealer}/>
         <Popconfirm title="确认删除?" onConfirm={deleteHandler.bind(null, record.ap_id)}>
           <a href="">&nbsp;|&nbsp;删除</a>
         </Popconfirm>
    </span>
    ),
  }];
  const areaItem=getareaMenu(area);

  return (
    <div className={styles.body}>
      <div className={styles.ap_table_top}>
        <div className={styles.ap_table_top_button}>
          <APChangeInfo type='1' nativeDealer={querynativeDealer} querdyealer={queryDealer} onDevice={addDevice} record={{}} dealerid={dealer}/>
        </div>
        <TreeSelect
          className={styles.treeselect}
          showSearch
          style={{ width: 300 }}
          //value={this.state.value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          allowClear
          placeholder="请选择区域"
          onChange={onChange}
          onSelect={onselect}
          //treeData={treeData}
        >
          {areaItem}
        </TreeSelect>
        <div className={styles.ap_table_top_input}>
          <Input onChange={handleInputChange.bind(this)} placeholder="搜索MAC地址"/>
        </div>
      </div>
      <div className={styles.ap_table}>
       <Spin tip="加载中..." spinning={showLoading}>

       <Table columns={columns}
               dataSource={data}
               pagination={{ pageSize: PAGE_SIZE }}/>
       </Spin>
      </div>
    </div>
  );
};

APTable.propTypes = {
};

export default APTable;
