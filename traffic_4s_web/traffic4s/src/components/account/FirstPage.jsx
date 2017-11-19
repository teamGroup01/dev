import React from 'react';
import NumberCard from './NumberCard';
import styles from './FirstPage.css';
import { Icon,Table,Spin ,Input,Select,TreeSelect} from 'antd';
//import CityDistribution from './CityDistribution';
import CityTop from './CityTop';
import { PAGE_SIZE } from '../../constants';
import Charts from './Charts.jsx';
const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;


const FirstPage = ({model}) => {
  const {group,selectGroup,queryGroup,queryAllGroup,groupdata,titlename,count,searchDealer,searchallDealer,area,querytable,querynativetableseccess,queryDealerid,title,map,chat,data,queryCity ,showLoading,citytop,queryseccess,max,showChatLoading,showMapLoading,table}=model;

  function gettime() {
    let data = new Date();
    let day = data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate();
    return day;
  }

  function selectgroupChange(e) {
    //this.props.models.dealer.map(item=>{
    //  if (item.dealer_name==e){
    //    this.setState({
    //      selectid: item.dealer_id,
    //    });
    //  }
    //});
    //const {querynativeDealer,queryDealer}=this.props.models;
    if (e.length == 0) {
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
    //const {selectDealer}=this.props.models;
    //
    groupdata.map(item=> {
      if (item.group_name == value) {
        selectGroup(item.group_id);
      }
    });
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

  function getareaMenu(areaArray) {

    if (areaArray && areaArray.length != 0) {

  /*  if (areaArray[0]['name'] == '全国') {
        areaArray = areaArray.shift();
      }
  */
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

  //let onevents=[queryChart];
  function onChange(value, label, extra) {


    //if (value){
    //  searchArea(extra.triggerNode.props.eventKey);
    //}else{
    //  queryData();
    //}
    let params = '';
    let isTrue = false;
    let level = 3;
    if (value) {
      //area.map(item=>{
      //  if (item.name==value){
      //    isTrue=true;
      //  }
      //});
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
      if (chat.user_role <= 3) {
        if (level == 1) {
          params = {barea_id: extra.triggerNode.props.eventKey};
        } else if (level == 2) {
          params = {sarea_id: extra.triggerNode.props.eventKey};
        } else {
          params = {province: extra.triggerNode.props.eventKey};
        }
      } else if (chat.user_role == 4) {
        if (level == 1) {
          params = {sarea_id: extra.triggerNode.props.eventKey};
        } else if (level == 2) {
          params = {province: extra.triggerNode.props.eventKey};
        }
      } else if (chat.user_role == 5) {
        params = {province: extra.triggerNode.props.eventKey};
      } else if (chat.user_role == 6) {
        params = {province: extra.triggerNode.props.eventKey};
      }

      searchDealer(params);

    } else {
      searchallDealer();
    }

  }

  function handleInputChange(e) {
    if (e.target.value.length == 0) {
      querynativetableseccess();
    } else {
      querytable(e.target.value);
    }
  }

  function jumpToreal(record) {
    queryDealerid(record.dealer_id);
  }

  function jumpReal(e) {
    queryDealerid(e);

  }

  /*
  {
    title: '展厅流量（人次）',
      dataIndex: 'custom_total',
    key: 'custom_total', width: '15%',

    sorter: (a, b) => a.custom_total - b.custom_total,

  },
  {
    title: '高意向潜客（批次）',
      dataIndex: 'group_vip',
    key: 'group_vip', width: '15%',

    sorter: (a, b) => a.group_vip - b.group_vip,

  },
  */
  const columns = [
    {
      title: '经销商',
      dataIndex: 'dealer_name',
      key: 'dealer_name',
      width: '15%',
      render: (text, record) => {
        return (
          <span className={styles.dealer_name} onClick={jumpReal.bind(null,record.dealer_id)}>
            {text}
          </span>
        )
      }
    }, {
      title: '展厅流量（批次）',
      dataIndex: 'group_total',
      key: 'group_total', width: '15%',

      sorter: (a, b) => a.group_total - b.group_total,

    }, {
      title: '当日二次到店潜客（批次）',
      dataIndex: 'group_repeat',
      key: 'group_repeat', width: '15%',

      sorter: (a, b) => a.group_old - b.group_old,

    }, {
      title: '三个月内二次到店潜客（批次）',
      dataIndex: 'group_old',
      key: 'group_old', width: '15%',

      sorter: (a, b) => a.group_repeat - b.group_repeat,

    },

  ];

  /*
  {
    dataIndex: 'custom_total',
      key: 'custom_total',
    width: '15%',
    render: (text, record) => {
    return (
      <h3>
        {text}
      </h3>
    )
  }
  },
   {
   dataIndex: 'group_vip',
   key: 'group_vip',
   width: '15%',
   render: (text, record) => {
   return (
   <h3>
   {text}
   </h3>
   )
   }
   },
   */

  const columnsfooter = [
    {
      dataIndex: 'dealer_name',
      key: 'dealer_name', width: '15%',

      render: (text, record) => {
        return (
          <h3>
            总计
          </h3>
        )
      }
    }, {
      dataIndex: 'group_total',
      key: 'group_total',
      width: '15%',
      render: (text, record) => {
        return (
          <h3>
            {text}
          </h3>
        )
      }
    }, {
      dataIndex: 'group_repeat',
      key: 'group_repeat',
      width: '15%',
      render: (text, record) => {
        return (
          <h3>
            {text}
          </h3>
        )
      }
    }, {
      dataIndex: 'group_old',
      key: 'group_old',
      width: '15%',
      render: (text, record) => {
        return (
          <h3>
            {text}
          </h3>
        )
      }
    },

  ];
  const mapParams = {
    title: {
      //text : '销售排布',
      // subtext: '纯属虚构',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    //legend : {
    //      orient : 'vertical',
    //        left : 'left',
    //        data : [ '客流热度' ]
    //  },
    grid: {
      left: '1%',

    },
    default: {
      text: 'loading',
      color: '#c23531',
      textColor: '#000',
      maskColor: 'rgba(255, 255, 255, 0.8)',
      zlevel: 0
    },

    dataRange: {
      min: 0,
      max: max,
      x: 'left',
      selectedMode: false,
      y: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      color: ['#2A60E4', '#ecf1f3']
    },
    series: [{
      name: '高意向潜客（批次）',
      type: 'map',
      mapType: 'china',
      center: ['100%', '100%'],
      roam: false,
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      data: [],
      itemStyle: {
        normal: {
          areaColor: "#ecf1f3",//区域颜色
          //color : '',
          borderWidth: 0.5,
          borderColor: 'black',
          //color: '',
          label: {
            show: false
          }
        },
        emphasis: {
          //borderWidth: .5,
          //borderColor: '#4b0082',
          areaColor: "#ecf1f3",
          label: {
            show: false
          }
        }

      }
    }]
  };
  mapParams.series[0].data = map;

  //    //横向柱状图
  const options = {
    title: {},
    tooltip: {},
    legend: {
      data: ['高意向潜客（批次）'],
      selectedMode: false,
    },
    xAxis: {
      left: '20rem'
    },
    yAxis: {
      data: chat.title ? chat.title : [],
      triggerEvent: true,
      labels: {
        style: { // 此处可设置样式
          fontSize: 16,
          width: 200,
        }
      }
    },
    grid: { // 控制图的大小，调整下面这些值就可以，
      y: 50,
      y2: 200,
      x: 110// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
    },
    series: [{
      barWidth: '30',
      itemStyle: {normal: {color: '#2A60E4'}},
      name: '高意向潜客（批次）',
      type: 'bar',
      data: chat.mdata ? chat.mdata : [],
    }]
  };

  //options.yAxis.data=chat.title;
  //options.series[0].data=chat.mdata;
  return (
    <div className={styles.body}>
      <div>
        <div className={styles.first_title}>
          <div>
            <span className={styles.title}> <h2><Icon type="line-chart"/></h2><h2>{title.areaName}当天客流情况</h2></span>
          </div>
          <div className={styles.first_title_time}>
            <div className={styles.first_title_time1}>
              时间:
            </div>
            <div className={styles.first_title_time2}>
              {gettime()}
            </div>
          </div>
        </div>
        <div className={styles.firstcard}>
          <NumberCard data={title}/>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.title}><h2>区域分布</h2></div>
        <div >
          <div className={styles.citydistubition}>
            <div className={styles.allmap}>
              <Charts option={mapParams} showLoading={showMapLoading} data={map} onquerycity={queryCity}/></div>
            <div className={styles.top10}>
              <CityTop title={titlename} option={options} showLoading={showChatLoading} queryseccess={queryseccess} queryDeal={queryDealerid} mmdata={chat}/>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.search}>
        <TreeSelect
          className={styles.treeselect}
          showSearch
          style={{ width: 300 }}
          //value={this.state.value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          allowClear
          onChange={onChange}
          //treeData={treeData}
          placeholder="请选择区域"
          //onSelect={this.onselect}
        >
          {getareaMenu(area)}
        </TreeSelect>
        <Select
          mode="combobox"
          size='default'
          filterOption={false}
          style={{ width: 170 }}
          //placeholder={dealerName}
          //defaultValue={[dealerName]}
          placeholder="集团搜索"
          onChange={selectgroupChange}
          onSelect={onselectgroup}
          allowClear
        >
          {getgroupselectoption(groupdata)}

        </Select>
        <span className={styles.addInput}><Input allowClear onChange={handleInputChange.bind(this)}
                                                 placeholder="搜索经销商"/></span>

      </div>
      
      <div className={styles.first_table}>
        <Spin tip="加载中..." spinning={showMapLoading}>
        <Table columns={columns}
            dataSource={table}
            pagination={{ pageSize: PAGE_SIZE }}
            footer={() => <Table className={styles.table_with_summary_footer}
            columns={columnsfooter} dataSource={count} pagination={false} showHeader={false} />}
        />
        </Spin>
      </div>
    </div>
  );
};

FirstPage.propTypes = {
};
//<div className={styles.map}><CityDistribution showLoading={showMapLoading}max={max} data={map} dataid=''onquerycity={queryCity}/></div>

export default FirstPage;
