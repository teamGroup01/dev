//import React, { Component } from 'react';
//import styles from './TimeChat.css';
//import echarts from 'echarts'
//
//class TimeChat extends React.Component {
//  constructor(props) {
//    super(props);
//
//  }
//  componentDidMount(){
//    //this.drawCharts();
//    console.log('mount')
//    this.drawCharts();
//
//  }
//  componentDidUpdate( prevProps,  prevState){
//    //if (prevProps){
//
//     console.log('componentDidUpdate')
//
//    console.log(prevProps);
//    console.log(prevState);
//
//      this.drawCharts();
//    //}
//  }
//  drawCharts(){
//    var myChart = echarts.init(this.refs.charts);
//// 指定图表的配置项和数据
//    var options = {
//      tooltip: {
//        show:true
//      },
//      legend: {
//        show: false
//      },
//      grid: {
//        left: '1%',
//        right: '4%',
//        bottom: '3%',
//        containLabel: true
//      },
//      xAxis: [
//        {
//          type: 'category',
//          data: ''
//        }
//      ],
//      yAxis: [
//        {
//          type: 'value',
//          axisLine: {
//            lineStyle: {
//              color: '#8EB3E8'   //颜色更换
//            }
//          },
//          splitLine: {show: false}
//        }
//      ],
//      series: [
//        {
//          //name: '分享',
//          type: 'bar',
//          barWidth: '35%',
//          itemStyle: {normal:{color:'#8EB3E8'}},
//          data: ''
//        }
//      ]
//    };
//    let {min,total}=this.props.data;
//    //console.log(this.props.data);
//    options.xAxis[0].data=min,
//      options.series[0].data=total;
//// 绘制图表
//    myChart.setOption(options);
//    //myChart.showLoading(LoadStyle);
//    //if (total){
//    //  dealyTime(myChart,options);
//    //}
//  }
//  render() {
//    return (
//      <div ref="charts" className={styles.time_chart}>
//      </div>
//    );
//  }
//}
//TimeChat.propTypes = {
//};
//export default TimeChat;
import React, { PropTypes, Component } from 'react';
import echarts from 'echarts';
import elementResizeEvent from 'element-resize-event';
import styles from './TimeChat.css';
import {LoadStyle } from '../../constants';
import {bar,line,map,pie} from 'echarts';
import {Spin} from 'antd';



export default class TimeChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none',

    };
  }
  componentDidMount() {

    let echartObj = this.renderEchartDom();
    let onEvents = this.props.onEvents || [];

    for (let eventName in onEvents) {
      if (typeof eventName === 'string' && typeof onEvents[eventName] === 'function') {
        echartObj.on(eventName, param => {
          onEvents[eventName](param, echartObj);
        });
      }
    }
    
    if (typeof this.props.onChartReady === 'function') this.props.onChartReady(echartObj);
    elementResizeEvent(this.refs.echartsDom, function () {
      echartObj.resize();
    });
  }

  componentDidUpdate() {
    this.renderEchartDom()

  }

  componentWillUnmount() {
    echarts.dispose(this.refs.echartsDom)
  }

  renderEchartDom() {
    let {onquerycity,queryseccess,data}=this.props;
    let echartObj = this.getEchartsInstance();
    echartObj.setOption(this.props.option, this.props.notMerge || false, this.props.lazyUpdate || false);
    if (this.props.showLoading) {
     }
    else{
    //this.props.loadsuccess();
    }
    return echartObj;
  }

  getEchartsInstance() {
    return echarts.getInstanceByDom(this.refs.echartsDom) || echarts.init(this.refs.echartsDom, this.props.theme);
  }

  render() {
    let {showLoading}=this.props;
    let dis=showLoading?' ':'none';
    return (
      <div className={styles.content}>
        <Spin tip="加载中..." spinning={showLoading}>
          <div ref='echartsDom' className={styles.time_chart}/>
        </Spin>
      </div>
    );
  }
}

TimeChat.propTypes = {
  option: PropTypes.object.isRequired,
  notMerge: PropTypes.bool,
  lazyUpdate: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.string,
  onChartReady: PropTypes.func,
  showLoading: PropTypes.bool,
  onEvents: PropTypes.object,
};
