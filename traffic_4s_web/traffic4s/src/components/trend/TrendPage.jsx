import React, { Component } from 'react';
import {Select ,Radio,Spin,Table,DatePicker,TreeSelect,Popover,Button,Dropdown,Menu } from 'antd';
import styles from './TrendPage.css';
import TrendChart from './TrendChart';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { PAGE_SIZE } from '../../constants';

const RangePicker = DatePicker.RangePicker;
const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class TrendPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(value) {
  }
  onChange(value)  {
  }
  onChangetype = (e) => {
    //alert(e.target.value);
    this.props.models.querytype(e.target.value);
  }
  onChangetime(e) {
    //alert(e.target.value);
  this.props.models.queryday(e.target.value);
  }

  dataChange(dates, dateStrings) {
    this.props.models.querytimerange(dateStrings);

  }
  selectChange = (e) => {

    console.log(e);

    const {querynativeDealer,queryDealer}=this.props.models;
    if (e == ''){
      querynativeDealer();
    }else{
      queryDealer(e);
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
  getselectoption = (area) => {
    //console.log(array)
    if(area){
      return area.map((item,index)=>{
        return (
          <Option key={index} value={item.dealer_name}>{item.dealer_name}</Option>
        );

      });
    }
  }
  onselect= (value, option) => {
    //console.log(array)
    this.props.models.dealer.map(item=>{
      if (item.dealer_name==value){
          let selectid=item.dealer_id;
        //console.log(selectid);
        this.props.models.selectDealer(selectid);
      }
    });
  }
  onFocusDealer= () => {
    this.props.models.focusDealer();
  }
  clearDate= (option,dateType) => {
    //console.log(array)
    return option.map(item=> {
      let year = parseInt(item / 10000);
      let day = item % 10000 % 100
      let month = (item % 10000 - item % 10000 % 100) / 100;
      day = day < 10 ? '0' + day : day;
      month = month < 10 ? '0' + month : month;
      if (dateType == 'month') {
        return year + '' + month + '-' + day;

      } else {
        return year + '-' + month + '-' + day;

      }
    });
  }

  downloadTable=(style) => {
    this.props.models.download(style['key']);
  }

  gestartTime(){
    let startTime;
    let myDate = new Date();
    let localTime = myDate.getTime();
    let localOffset = myDate.getTimezoneOffset() * 60000;
    let utc = localTime - localOffset - 3600000 * 24 * 7;
    let localDate = new Date(utc);
    if (localDate.getUTCMonth() > 8) {
      if (localDate.getUTCDate() > 9) {
        startTime = localDate.getUTCFullYear().toString() + (localDate.getUTCMonth() + 1) + localDate.getUTCDate();
      } else {
        startTime = localDate.getUTCFullYear().toString() + (localDate.getUTCMonth() + 1) + '0' + localDate.getUTCDate();
      }
    } else {
      if (localDate.getUTCDate() > 9) {
        startTime = localDate.getUTCFullYear().toString() + '0' + (localDate.getUTCMonth() + 1) + localDate.getUTCDate();
      } else {
        startTime = localDate.getUTCFullYear().toString() + '0' + (localDate.getUTCMonth() + 1) + '0' + localDate.getUTCDate();
      }
    }
    let year=parseInt(startTime/10000);
    let day=startTime%10000%100
    let month=(startTime%10000-startTime%10000%100)/100;
    day=day<10?'0'+day:day;
    month=month<10?'0'+month:month;
    return year+'-'+month+'-'+day;
  }
  getendTime(){
    let endTime;
    let myDate = new Date();
    let year=myDate.getFullYear();
    let day=myDate.getDate();
    let month=myDate.getMonth();
    day=day<10?'0'+day:day;
    month=month<10?'0'+month:month;
    return year+'-'+month+'-'+day;
  }

  render() {
    const {date,count,loading,dealerName,table,style,dateType,showLoading,radioname,group,selectGroup,queryGroup,queryAllGroup,groupdata,selectArea,noArea,user_role,area,groupName,areaName}=this.props.models;


    const menu = (
      <Menu onClick={this.downloadTable}>
        <Menu.Item key="0">
          <a>数据明细</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a>数据汇总</a>
        </Menu.Item>
      </Menu>
    );

    function getareaMenu(areaArray) {
      if (areaArray) {
        return areaArray.map(item=> {
          if (item.chiledren) {
            return (
              <TreeNode value={item.name} title={item.name} key={item.id+''}>
                {getareaMenu(item.chiledren)}
              </TreeNode>
            );
          }
          return (
            <TreeNode value={item.name} title={item.name} key={item.id+''}/>
          );
        });
      }
    }

    function getgroupselectoption(area) {
      //console.log(array)
      if(area.length>0){
        return area.map((item,index)=>{
          return (
            <Option key={index} value={item.group_name}>{item.group_name}</Option>
          );

        });
      }
    }

    function selectgroupChange  (e)  {
      console.log(e);
      if (e == ''){
        group();
        queryAllGroup();
      }else{
        groupdata.map(item=>{
          if (item.group_name==e){
            selectGroup(item.group_id);
          }
        });
        queryGroup(e);
      }
    }
    function onselectgroup (value, option)  {
      groupdata.map(item=>{
        if (item.group_name==value){
          selectGroup(item.group_id);
        }
      });
    }
    function selectAreaChange (value, label, extra) {

      let params = {};
      let isTrue = false;
      let level = 3;
      if (value) {
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
          if (user_role <= 3) {
            if (level == 1) {
              params = {barea_id: extra.triggerNode.props.eventKey};
            } else if (level == 2) {
              params = {sarea_id: extra.triggerNode.props.eventKey};
            } else {
              params = {province: extra.triggerNode.props.eventKey};
            }
          } else if (user_role == 4) {
            if (level == 1) {
              params = {sarea_id: extra.triggerNode.props.eventKey};
            } else if (level == 2) {
              params = {province: extra.triggerNode.props.eventKey};
            }
          } else if (user_role == 5) {
            params = {province: extra.triggerNode.props.eventKey};
          } else if (user_role == 6) {
            params = {province: extra.triggerNode.props.eventKey};
          }
        }
        params['value'] = value;
        selectArea(params);

      } else {
        noArea();
      }
    }

    let startTime=this.gestartTime();
    let endTime=this.getendTime();
    let da= this.clearDate(date,dateType);
    let options = {


      tooltip: {    //提示框组件

        trigger: 'axis'

      },



      xAxis: {       //直角坐标系 grid 中的 x 轴

        type: 'category',
        boundaryGap: false,
        data: da,
        axisLabel: {
          textStyle : {
            fontSize: 16,
            fontFamily: 'Microsoft YaHei',
            color: '#3b3b3b'
          }
        }
      },

      yAxis: {       //直角坐标系 grid 中的 y 轴
        type: 'value',
        axisLabel: {
          textStyle : {
            fontSize: 16,
            fontFamily: 'Microsoft YaHei',
            color: '#3b3b3b'
          }
        }
      },
      grid: {       //直角坐标系内绘图网格

        left: '3%',

        right: '4%',

        bottom: '3%',

        containLabel: true

      },
      legend: {     //图例组件
        data: [radioname],
        selectedMode:false,

      },
      series: [      //系列列表

        {

          name: radioname,

          type: 'line',

          stack: '总量',

          data: count

        }

      ]

    };
    const dateFormat = 'YYYY-MM-DD';
    const monthFormat = 'YYYY-MM';

    /*
    {
      title: '展厅流量（人次）',
        dataIndex: 'ctTotal',
      key: 'ctTotal',
      sorter: (a, b) => a.ctTotal-b.ctTotal,

    },
    {
      title: '高意向潜客（批次）',
        dataIndex: 'gpVIP',
      key: 'gpVIP',
      sorter: (a, b) => a.gpVIP-b.gpVIP,

    }
    */
    const columns = [
      {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
        render: (text, record) => {
         //console.log(dateType);
         // console.log(text);
          let year=parseInt(text/10000);
          let day=text%10000%100
          let month=(text%10000-text%10000%100)/100;
              day=day<10?'0'+day:day;
              month=month<10?'0'+month:month;
          if(dateType=='month'){
            return (<span>
            {year+''+month+'-'+day}
          </span>);
          }else{
            return (<span>
            {year+'-'+month+'-'+day}
          </span>);
          }
        }
    }, {
      title: '展厅流量（批次）',
      dataIndex: 'gpTotal',
      key: 'gpTotal',
        sorter: (a, b) => a.gpTotal-b.gpTotal,

      },{
        title: '当日二次到店潜客（批次）',
        dataIndex: 'gpRepeat',
        key: 'gpRepeat',
        sorter: (a, b) => a.gpRepeat-b.gpRepeat,

      },{
        title: '三个月内二次到店潜客（批次）',
        dataIndex: 'gpOld',
        key: 'gpOld',
        sorter: (a, b) => a.gpOld-b.gpOld,

      },

    ];

    const content=[
      (<div>
        <p>留店时长3分钟至2小时的客流人次</p>
        <p>（剔除工作人员、短时间到店停留人员以及留店2小时以上人员）</p>
      </div>)
      ,
      (<div>
        <p>到店时长10分钟至2小时同进同出的客流批次</p>
      </div>)
      ,
      (<div>
        <p>留店时长10分钟至2小时同进同出的客流批次</p>
      </div>)
      ,
      (<div>
        <p>当日二次及以上多次进出、进出间隔时长15分钟以上</p>
        <p>且到店停留时长10分钟-2小时的客流批次</p>
      </div>)
      ,
      (<div>
        <p>三个月内非当日二次及以上到店且停留时长</p>
        <p>10分钟至2小时的客流批次</p>
      </div>)
    ]

    return (

      <div className={styles.body}>
        <div className={styles.title}>
          <div className={styles.area}>
            <TreeSelect
              className={styles.treeselect}
              showSearch
              style={{ width: 200 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              allowClear
              onChange={selectAreaChange}
              placeholder="请选择区域"
              value = {areaName}
              //onSelect={this.onselect}
            >
              {getareaMenu(area)}
            </TreeSelect>
          </div>
          <div className={styles.title_left}>
            <Select
              mode="combobox"
              size='default'
              filterOption={false}
              style={{ width: 170 }}
              placeholder="集团搜索"
              onChange={selectgroupChange}
              onSelect={onselectgroup}
              value = {groupName}
              allowClear
            >
              {getgroupselectoption(groupdata)}

            </Select>
          </div>
          <div className={styles.title_left}>
            <Select
              mode="combobox"
              size='default'
              filterOption={false}
              style={{ width: 170 }}
              placeholder= '选择经销商'
              onChange={this.selectChange}
              onSelect={this.onselect}
              onFocus={this.onFocusDealer}
              value = {dealerName}
              allowClear
            >
              {this.getselectoption(this.props.models.dealer)}

            </Select>
          </div>
          <div className={styles.title_right}>
            <RangePicker
              ranges={{
              '本月': [moment().startOf('month'), moment().endOf('month')],
              '近一周':[moment().subtract(1, 'weeks'),moment()],
              '近两周':[moment().subtract(2, 'weeks'),moment()],
              '近三周':[moment().subtract(3, 'weeks'),moment()],
              '近一月': [moment().subtract(1, 'months'),moment()],
              '近两月': [moment().subtract(2, 'months'),moment()],
              '近三月': [moment().subtract(3, 'months'),moment()]
}

              }
              defaultValue={[moment().subtract(7, 'days'),moment()]}
              format={dateFormat}
              onChange={this.dataChange.bind(this)}
            />
          </div>
        </div>
        <div className={styles.trendchart}>
          <div className={styles.trendchart_rediobutton}>
            <div className={styles.redio_left}>
            <RadioGroup onChange={this.onChangetype.bind(this)} value={style} size="large">
              <Popover content={content[1]}>
                <RadioButton value="2">展厅流量（批次）</RadioButton>
              </Popover>
              <Popover content={content[3]}>
                <RadioButton value="4">当日二次到店潜客（批次）</RadioButton>
              </Popover>
              <Popover content={content[4]}>
                <RadioButton value="5">三个月内二次到店潜客（批次）</RadioButton>
              </Popover>
            </RadioGroup>
            </div>
            <div className={styles.redio_right}>
              <RadioGroup  onChange={this.onChangetime.bind(this)} value={dateType} size="large">
                <RadioButton value="day">天</RadioButton>
                <RadioButton value="week">周</RadioButton>
                <RadioButton value="month">月</RadioButton>
              </RadioGroup>
            </div>
          </div>
          <div className={styles.trendchart_chart}>
          <TrendChart showLoading={showLoading}option={options} time={date} data={count}/>
          </div>
        </div>
        <div>
          <div className={styles.detaildata}>
              <div className={styles.detaildata_title}><span>详细数据</span></div>
              <div className={styles.detaildata_button}>
                <Dropdown overlay={menu}>
                  <Button  shape="circle" icon="cloud-download-o" size="large"/>
                </Dropdown>
              </div>
          </div>
          <div className={styles.detaildata_table}>
            <Spin tip="加载中..." spinning={showLoading}>
            <Table dataSource={table} columns={columns} pagination={{ pageSize: PAGE_SIZE }}/>
          </Spin>
          </div>
        </div>
      </div>
    );
  }
}
TrendPage.propTypes = {
};
//loading={loading}

export default TrendPage;
