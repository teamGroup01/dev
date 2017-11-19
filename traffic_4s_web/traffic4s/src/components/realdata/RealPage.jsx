import React, { Component } from 'react';
import styles from './RealPage.css';
import {  Select,Radio,Table ,Spin,Popover,TreeSelect} from 'antd';
import TrendChart from './TrendChart';
import { PAGE_SIZE_Real } from '../../constants';
const TreeNode = TreeSelect.TreeNode;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class RealPage extends React.Component {
  state = {
    value: undefined,
    type: 0,
    data: [],
  }

  constructor(props) {
    super(props);

  }

  selectChange = (e) => {
    //this.props.models.dealer.map(item=>{
    //  if (item.dealer_name==e){
    //    this.setState({
    //      selectid: item.dealer_id,
    //    });
    //  }
    //});
    const {querynativeDealer,queryDealer}=this.props.models;
    if (e == undefined || e == '') {
      querynativeDealer();
    } else {
      queryDealer(e);
    }
  }
  getselectoption = (area) => {
    //console.log(array)
    if (area.length > 0) {
      return area.map((item, index)=> {
        return (
          <Option key={index} value={item.dealer_name}>{item.dealer_name}</Option>
        );

      });
    }
  }
  onselect = (value, option) => {
    const {selectDealer}=this.props.models;

    this.props.models.dealer.map(item=> {
      if (item.dealer_name == value) {
        selectDealer(item.dealer_id);
      }
    });
  }
  onFocusDealer= () => {
    this.props.models.focusDealer();
  }
  onChangeGroup = (e) => {
    this.props.models.queryType(e.target.value);
  }

  handleChange(value) {
    this.props.models.queryarea(value);
  }

  onChange = (value) => {
    this.setState({value});
  }
  getTime = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    //return y + '-' + m + '-' + d+' '+h+':'+minute;
    let miao = date.getSeconds();
    miao = miao < 10 ? ('0' + miao) : miao;
    let da = year + '-' + month + '-' + day + '   ' + h + ':' + minute + ':' + miao;
    return da;
  }

  render() {

    const {loading,style,dealerName,hour,count,table,defaultdealer,showLoading,radioname,area,group,selectGroup,queryGroup,queryAllGroup,groupdata,selectArea,noArea,user_role,areaName,groupName}=this.props.models;

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
      if (area.length > 0) {
        return area.map((item, index)=> {
          return (
            <Option key={index} value={item.group_name}>{item.group_name}</Option>
          );

        });
      }
    }

    function selectgroupChange(e) {
      console.log(e);
      if (e == '') {
        queryAllGroup();
        group();
      } else {
        groupdata.map(item=> {
          if (item.group_name == e) {
            selectGroup(item.group_id);
          }
        });
        queryGroup(e);
      }
    }

    function onselectgroup(value, option) {
      groupdata.map(item=> {
        if (item.group_name == value) {
          selectGroup(item.group_id);
        }
      });
    }

    function selectAreaChange(value, label, extra) {

      console.log(value);
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

    let options = {

//        title: {      //标题组件
//
//            text: '折线图堆叠'
//
//        },
      tooltip: {    //提示框组件
        trigger: 'axis'
      },
      legend: {     //图例组件
        data: [radioname],
        selectedMode: false,

      },
      grid: {       //直角坐标系内绘图网格
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true

      },
//        toolbox: {     //工具栏
//
//            feature: {
//
//                saveAsImage: {}
//
//            }
//
//        },
      xAxis: {       //直角坐标系 grid 中的 x 轴
        type: 'category',
        boundaryGap: false,
        data: hour,
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
          textStyle :{
            fontSize: 16,
            fontFamily: 'Microsoft YaHei',
            color: '#3b3b3b'
          }
        }
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
    /*
    {
      title: '展厅流量（人次）',
        dataIndex: 'ctTotal',
      key: 'ctTotal',
      sorter: (a, b) => a.ctTotal - b.ctTotal,

    },
    {
      title: '高意向潜客（批次）',
        dataIndex: 'gpVIP',
      key: 'gpVIP',
      sorter: (a, b) => a.gpVIP - b.gpVIP,

    },
    */
    const columns = [{
      title: '时间',
      dataIndex: 'hour',
      key: 'hour',
      render: (text, record) => {
        //let year=parseInt(text/10000);
        //let day=text%10000%100
        //let month=(text%10000-text%10000%100)/100;
        //day=day<10?'0'+day:day;
        //month=month<10?'0'+month:month;
        let time_data = ['8-9点', '9-10点', '10-11点', '11-12点', '12-13点', '13-14点', '14-15点', '15-16点', '16-17点', '17-18点', '18-19点', '19点往后'];
        return (<span>
            {time_data[text - 8]}
          </span>);
      }
    }, {
      title: '展厅流量（批次）',
      dataIndex: 'gpTotal',
      key: 'gpTotal',
      sorter: (a, b) => a.gpTotal - b.gpTotal,

    }, {
      title: '当日二次到店潜客（批次）',
      dataIndex: 'gpRepeat',
      key: 'gpRepeat',
      sorter: (a, b) => a.gpRepeat - b.gpRepeat,

    }, {
      title: '三个月内二次到店潜客（批次）',
      dataIndex: 'gpOld',
      key: 'gpOld',
      sorter: (a, b) => a.gpOld - b.gpOld,

    },
    ];
    const content = [
      (<div>
        <p>留店时长3分钟至2小时的客流人次</p>
        <p>（剔除工作人员、短时间到店停留人员以及留店2小时以上人员）</p>
      </div>)
      ,
      (<div>
        <p>到店时长10分钟至2小时同进同出的客流批次 </p>
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
              value={areaName}
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
              value={groupName}
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
              placeholder='选择经销商'
              onChange={this.selectChange}
              onSelect={this.onselect}
              onFocus={this.onFocusDealer}
              value={dealerName}
              allowClear
            >
              {this.getselectoption(this.props.models.dealer)}

            </Select>
          </div>
          <div className={styles.title_right}>
            <div className={styles.title_right_data}>数据更新时间:{this.getTime()}</div>
          </div>
        </div>
        <div className={styles.trendchart}>
          <div className={styles.trendchart_rediobutton}>
            <RadioGroup onChange={this.onChangeGroup.bind(this)} value={style} size="large">
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
          <div className={styles.trendchart_chart}>
            <TrendChart radioname={radioname} showLoading={showLoading} option={options}/>
          </div>
        </div>
        <div>
          <h2 className={styles.detaildata_title}>
            详细数据
          </h2>
          <div className={styles.detaildata_table}>

            <Spin tip="加载中..." spinning={showLoading}>
              <Table dataSource={table} columns={columns} pagination={{ pageSize: PAGE_SIZE_Real }}/>
            </Spin>
          </div>
        </div>
      </div>
    );
  }
}
RealPage.propTypes = {
};
//loading={loading}

export default RealPage;
