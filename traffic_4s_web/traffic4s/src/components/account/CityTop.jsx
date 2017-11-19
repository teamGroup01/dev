import React, { PropTypes, Component } from 'react';
import echarts from 'echarts';
import elementResizeEvent from 'element-resize-event';
import styles from './CityTop.css';
import {Spin} from 'antd';

export default class CityTop extends Component {

  componentDidMount() {

    let echartObj = this.renderEchartDom();
    let {mmdata,queryDeal}=this.props;
    echartObj.on('click', function (params) {

      //queryDeal(mmdata.id[params.dataIndex]);
      //alert(city);
    });
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

    let echartObj = this.renderEchartDom();
    echartObj.off('click')
    let {mmdata,queryDeal}=this.props;
    echartObj.on('click', function (params) {
      //let {data,queryDeal}=this.props;
      let type=params.componentType;
      //console.log(params);
      //console.log(type);
      if (type=='yAxis'){
        mmdata.title.map((item,index)=>{
          if (item==params.value){
            queryDeal(mmdata.id[index]);
          }
        });
      }else{
        let indexdata=params.dataIndex;
        mmdata.id.map((item,index)=>{
          if (index==indexdata){
            queryDeal(item);
          }
        });
      }

    });
  }

  componentWillUnmount() {
    echarts.dispose(this.refs.echartsDom)
  }

  renderEchartDom() {
    let {onquerycity,queryseccess,data}=this.props;

    let echartObj = this.getEchartsInstance();
    echartObj.setOption(this.props.option, this.props.notMerge || false, this.props.lazyUpdate || false);

    return echartObj;
  }

  getEchartsInstance() {
    return echarts.getInstanceByDom(this.refs.echartsDom) || echarts.init(this.refs.echartsDom, this.props.theme);
  }

  render() {
    return (
      <div  className={styles.content}>
        <div className={styles.top_title}>
          <h2>{this.props.title}</h2>
        </div>
        <div className={styles.top_chart}>
          <Spin tip="加载中..." spinning={this.props.showLoading}>
            <div className={styles.top_chart} ref='echartsDom'/>
          </Spin>
        </div>
      </div>
    );
  }
}

CityTop.propTypes = {
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

