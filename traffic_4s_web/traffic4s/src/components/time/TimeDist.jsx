import React, { Component } from 'react';
import styles from './TimeDist.css';
import TimeChat from './TimeChat.jsx';

import echarts from 'echarts'
import {Select,DatePicker,TreeSelect,Popover } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class TimeDist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selecttype: 0,
      data:[],
    };
  }
  componentDidMount(){
    //this.drawCharts();

  }
  componentDidUpdate( prevProps,  prevState){
    //if (prevProps){
    //  this.drawCharts();
    //console.log('componentDidUpdate');
    //}
  }
  selectChange = (e) => {
    const {querynativeDealer,queryDealer}=this.props.model;
    //if (e == undefined || e == '') {
    //  querynativeDealer();
    //} else {
    //  queryDealer(e);
    //}

    //this.props.model.dealer.map(item=>{
    //  if (item.dealer_name == e){
    //    this.setState({
    //      selectid: item.dealer_id
    //    });
    //  }
    //});
    console.log(e);

    if (e == undefined){
      querynativeDealer();
      this.setState({
        selecttype: 0
      });
    }else {
      queryDealer(e);
      const data=[];
      this.props.model.cdealer.map((item,index)=>{
        //ap_brand
        e = e.toUpperCase();
        if((item.dealer_name&&item.dealer_name.includes(e))||(item.dealer_code&&item.dealer_code.includes(e))||
          (item.province&&item.province.includes(e))||(item.address&&item.address.includes(e))
        ){
          data.push(
            <Option value={item.dealer_name} key={' '+index}>{item.dealer_name}</Option>
          );
        }
      });
      this.setState({
        selecttype: 1,
        data:data
      });
    }
  }
  getselectoption = (area) => {
    if(area){
      return area.map((item,index)=>{
        return (
          <Option key={index} value={item.dealer_name}>{item.dealer_name}</Option>
        );

      });
    }
  }

  gettime = (text) => {
    if (text!=undefined) {
      let year=parseInt(text/10000);
      let day=text%10000%100
      let month=(text%10000-text%10000%100)/100;
      day=day<10?'0'+day:day;
      month=month<10?'0'+month:month;
      return year+'-'+month+'-'+day;
    }
  }
  onChange(value)  {

  }
  onselect=(value, option)=>{
    let {selectDealer}=this.props.model;
    this.props.model.dealer.map(item=>{
      if (item.dealer_name==value){
        selectDealer(item.dealer_id);
      }
    });
  }
  onFocusDealer= () => {
    this.props.model.focusDealer();
  }
  dataChange(dates, dateStrings) {
    this.props.model.quertRange(dateStrings);
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
    month=month<9?'0'+month:month;
    return year+'-'+month+'-'+day;
  }
  render() {
    let {apdata,showLoading,loadsuccess,time,group,selectGroup,queryGroup,queryAllGroup,groupdata,selectArea,noArea,user_role,area,areaName,groupName}=this.props.model;


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
      if (e == ''){
        queryAllGroup();
        group();
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

    let start=this.gestartTime();
    let end=this.getendTime();
    //let st=this.gettime(this.props.model.time[0]);
    //let en=this.gettime(this.props.model.time[1]);
    let options = {
      tooltip: {
        show:true
      },
      legend: {
        show: false
      },
      grid: {
        left: '1%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: apdata.min,
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#8EB3E8'   //颜色更换
            }
          },
          splitLine: {show: false}
        }
      ],
      series: [
        {
          //name: '分享',
          type: 'bar',
          barWidth: '35%',
          itemStyle: {normal:{color:'#8EB3E8'}},
          data: apdata.total,
        }
      ]
    };


    const dateFormat = 'YYYY-MM-DD';
    const monthFormat = 'YYYY-MM';
    return (
      <div className={styles.body}>
        <div className={styles.time_top}>
          <div className={styles.area}>
            <TreeSelect
              className={styles.treeselect}
              showSearch
              style={{ width: 200 }}
              //value={this.state.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              allowClear
              onChange={selectAreaChange}
              value = {areaName}
              placeholder="请选择区域"
              //onSelect={this.onselect}
            >
              {getareaMenu(area)}
            </TreeSelect>
          </div>
          <div className={styles.time_top_lable}>
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
          <div className={styles.time_top_lable}>
            <Select
              mode="combobox"
              size='default'
              filterOption={false}
              style={{ width: 170 }}
              placeholder = '选择经销商'
              onChange={this.selectChange}
              onSelect={this.onselect}
              onFocus={this.onFocusDealer}
              value = {this.props.model.dealerName}
              allowClear
            >
              {this.state.selecttype==0?this.getselectoption(this.props.model.dealer):this.state.data}
            </Select>
          </div>
          <div className={styles.time_top_time}>
            <RangePicker
              ranges={{
                '本月': [moment().startOf('month'), moment().endOf('month')],
                '近一周':[moment().subtract(1, 'weeks'),moment()],
                '近两周':[moment().subtract(2, 'weeks'),moment()],
                '近三周':[moment().subtract(3, 'weeks'),moment()],
                '近一月': [moment().subtract(1, 'months'),moment()],
                '近两月': [moment().subtract(2, 'months'),moment()],
                '近三月': [moment().subtract(3, 'months'),moment()]
               }}
              defaultValue={[moment().subtract(7, 'days'),moment()]}
              format={dateFormat}
              onChange={this.dataChange.bind(this)}
            />
          </div>
        </div>
        <div className={styles.time_chart}>
          <TimeChat option={options} loadsuccess={loadsuccess} showLoading={showLoading}/>
        </div>
      </div>
    );
  }
}
TimeDist.propTypes = {
};
export default TimeDist;
