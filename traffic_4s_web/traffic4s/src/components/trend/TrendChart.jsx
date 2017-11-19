//import React, { Component } from 'react';
//import styles from './TrendChart.css';
//import {  Select } from 'antd';
//import echarts from 'echarts'
//
//class TrendChart extends React.Component {
//  constructor(props) {
//    super(props);
//
//  }
//  componentDidMount(){
//    this.drawCharts();
//
//}
//  componentDidUpdate( prevProps,  prevState){
//    this.drawCharts();
//  }
//  drawCharts(){
//  var myChart = echarts.init(this.refs.charts);
//    //myChart.showLoading(LoadStyle);
//    // 指定图表的配置项和数据
//    // 指定图表的配置项和数据
//    var options = {
//
//
//      tooltip: {    //提示框组件
//
//        trigger: 'axis'
//
//      },
//
//
//
//      xAxis: {       //直角坐标系 grid 中的 x 轴
//
//        type: 'category',
//
//        boundaryGap: false,
//
//        data: [
//          //'2017-04-26',
//          //'2017-04-27',
//          //'2017-04-28',
//          //'2017-04-29',
//          //'2017-04-30',
//          //'2017-05-1',
//          //'2017-05-2',
//          //'2017-05-3',
//          //'2017-05-4',
//          //'2017-05-5',
//          //'2017-05-6',
//          //'2017-05-7',
//          //'2017-05-8',
//          //'2017-05-9',
//          //'2017-05-10',
//          //'2017-05-11',
//          //'2017-05-12',
//        ]
//
//      },
//
//      yAxis: {       //直角坐标系 grid 中的 y 轴
//
//        type: 'value'
//
//      },
//      grid: {       //直角坐标系内绘图网格
//
//        left: '3%',
//
//        right: '4%',
//
//        bottom: '3%',
//
//        containLabel: true
//
//      },
//      series: [      //系列列表
//
//        {
//
//          name: '客流数',
//
//          type: 'line',
//
//          stack: '总量',
//
//          data: [
//            //355,290,210,236,187,200,175,220,196,203,270,235,183,365,331,339,259
//          ]
//
//        }
//
//      ]
//
//    };
//    let {data,time}=this.props;
//    options.xAxis.data=time;
//    options.series[0].data=data;
//// 绘制图表
//    myChart.setOption(options);
////    if (data){
////      dealyTime(myChart,options);
////    }
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
    echartObj.setOption(this.props.option, this.props.notMerge || false, this.props.lazyUpdate || false);
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
  </Spin>
    </div>
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
