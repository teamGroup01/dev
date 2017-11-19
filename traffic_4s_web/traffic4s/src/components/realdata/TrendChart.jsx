//import React, { Component } from 'react';
//import styles from './TrendChart.css';
//import {  Select } from 'antd';
//import echarts from 'echarts'
//import { dealyTime,LoadStyle } from '../../constants';
//
//class TrendChart extends React.Component {
//  constructor(props) {
//    super(props);
//
//  }
//  componentDidMount(){
//  this.drawCharts();
//
//}
//  componentDidUpdate( prevProps,  prevState){
//    this.drawCharts();
//  }
//  drawCharts(){
//  var myChart = echarts.init(this.refs.charts);
//    // 指定图表的配置项和数据
//    var options = {
//
////        title: {      //标题组件
////
////            text: '折线图堆叠'
////
////        },
//      tooltip: {    //提示框组件
//        trigger: 'axis'
//      },
//        legend: {     //图例组件
//            data: ['客流数']
//        },
//      grid: {       //直角坐标系内绘图网格
//        left: '3%',
//        right: '4%',
//        bottom: '3%',
//        containLabel: true
//
//      },
////        toolbox: {     //工具栏
////
////            feature: {
////
////                saveAsImage: {}
////
////            }
////
////        },
//      xAxis: {       //直角坐标系 grid 中的 x 轴
//        type: 'category',
//        boundaryGap: false,
//        data: []
//
//      },
//      yAxis: {       //直角坐标系 grid 中的 y 轴
//
//        type: 'value'
//
//      },
//      series: [      //系列列表
//
//        {
//          name: '客流数',
//
//          type: 'line',
//
//          stack: '总量',
//
//          data: []
//
//        }
//
//      ]
//
//    };
//    const {lable,data}=this.props;
//    lable?options.xAxis.data=lable:[];
//    data?options.series[0].data=data:[];
//    //myChart.showLoading(LoadStyle);
//    //if (data){
//    //  dealyTime(myChart,options);
//    //}
//// 绘制图表
//    myChart.setOption(options);
//}
//  render() {
//
//    return (
//
//      <div ref="charts" className={styles.content}>
//      </div>
//    );
//  }
//}
//
//TrendChart.propTypes = {
//};
//export default TrendChart;
import React, { PropTypes, Component } from 'react';
import echarts from 'echarts';
import elementResizeEvent from 'element-resize-event';
import styles from './TrendChart.css';
import {LoadStyle } from '../../constants';
import {Spin} from 'antd';

export default class TrendChart extends Component {

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
    echartObj.setOption(this.props.option, false, this.props.lazyUpdate || false);
    //if (this.props.showLoading) echartObj.showLoading(LoadStyle);
    //else echartObj.hideLoading();
    return echartObj;
  }

  getEchartsInstance() {
    return echarts.getInstanceByDom(this.refs.echartsDom) || echarts.init(this.refs.echartsDom, this.props.theme);
  }

  render() {
    return (
      <div>
        <Spin tip="加载中..." spinning={this.props.showLoading}>

        <div ref='echartsDom' className={styles.content}/>
</Spin>  </div>
    );
  }
}

TrendChart.propTypes = {
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
