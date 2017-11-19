import React from 'react';
import styles from './Dealer.css';
import { TreeSelect,Spin,Button,Input,Table,Icon,Popconfirm } from 'antd';
import ActionModal from './ActionModal'
import DeleteModal from './DeleteModal'
import { PAGE_SIZE } from '../../constants';

const TreeNode = TreeSelect.TreeNode;


class Dealer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: false,
      data:null,
    };
  }
  componentWillMount(){
    const {data}=this.props.models;
    //  this.setState({
    //    data: data,
    //  });
  }
  componentDidMount(){
    const {data}=this.props.models;
    //this.setState({
    //  data: data,
    //});
  }
  componentDidUpdate( prevProps,  prevState){
    const {data}=this.props.models;
    //this.setState({
    //  data: data,
    //});
  }
  convertDateFromString=(dateString) =>{
    if (dateString) {
      var arr1 = dateString.split(" ");
      var sdate = arr1[0].split('-');
      var date = new Date(sdate[0], sdate[1]-1, sdate[2]);
      return date;
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
  }
  deleteHandler=(id)=> {
    const {deleteDealer}=this.props.models;
    deleteDealer(id);
  }
  handleInputChange=(e)=> {
    const {data,searchDealer,queryDealer}=this.props.models;
    if (e.target.value.length==0){
      queryDealer(e.target.value);
    }else{
      searchDealer(e.target.value);
    }
  }
  onChange=(value, label, extra)=> {
    let {area,searchArea,queryData}=this.props.models;
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
      //console.log(params);
      params['value'] = value;
      searchArea(params);

    }else{
      queryData();
    }


  }
  onselect=(value, node, extra)=> {


  }
  //this.getareaMenu(item.chiledren)
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
  render() {
    const {showLoading,group,queryGroup,queryNativeGroup,area,data,addDealer,changeDealer,loading}=this.props.models;

    const columns = [ {
      title: '经销商店名',
      dataIndex: 'dealer_name',
      key: 'dealer_name',

    }, {
      title: '代码',
      dataIndex: 'dealer_code',
      key: 'dealer_code',

      sorter: (a, b) => {
        let dateA=a.dealer_code;
        let dateB=b.dealer_code;
        return dateA < dateB ? -1 : 1;
      },

      render: (text, record) => (
        <span>
          {
            text
          }
        </span>
      )


    }, {
      title: '所属集团',
      dataIndex: 'groupName',
      key: 'groupName',

    }, {
      title: '所属区域',
      dataIndex: 'areaName',
      key: 'areaName',

    }, {
      title: '城市',
      dataIndex: 'city',
      key: 'city',

    },  {
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
    }, {
      title: '修改时间',
      dataIndex: 'upd_date',
      key: 'upd_date',
      sorter: (a, b) => {
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
      key: 'action',
      render: (text, record) => (
        <span>
      <div>
        <ActionModal
          groupdata={group}
          querygroup={queryGroup}
          querynativegroup={queryNativeGroup}
          areadata={area}
          onDealer={changeDealer}
          record={record}/>
        <span className="ant-divider"/>
        <Popconfirm title="确认删除?" onConfirm={this.deleteHandler.bind(null, record.dealer_id)}>
          <a href="">删除</a>
        </Popconfirm>
      </div>
    </span>
      )
    }];

    const areaItem=this.getareaMenu(area);
    areaItem.unshift(<TreeNode value={'全国'} title={'全国'} key={0+''} />);

    return (
      <div className={styles.base}>
        <div className={styles.title}>
          <h2 className={styles.title_title}>
            经销商管理
          </h2>
          <div className={styles.title_right}>
            <ActionModal
              groupdata={group}
              querygroup={queryGroup}
              querynativegroup={queryNativeGroup}
              areadata={area}
              onaddDealer={addDealer}
              type='1'
              record={{}}/>
            <TreeSelect
              className={styles.treeselect}
              showSearch
              style={{ width: 300 }}
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
            <span className={styles.addInput}><Input onChange={this.handleInputChange.bind(this)} placeholder="搜索经销商,代码"/></span>
          </div>
        </div>
        <div className={styles.deal_table}>

          <Spin tip="加载中..." spinning={showLoading}>
            <Table columns={columns} dataSource={data}  pagination={{ pageSize: PAGE_SIZE }}/>
          </Spin>
        </div>
      </div>
    );
  }
}
Dealer.propTypes = {
};

export default Dealer;
