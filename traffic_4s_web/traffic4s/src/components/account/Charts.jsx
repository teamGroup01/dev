import React, { PropTypes, Component } from 'react';
import echarts from 'echarts';
import elementResizeEvent from 'element-resize-event';
import styles from './CityDistribution.css';
require("./china.js");
import { Spin} from 'antd';

export default class Charts extends Component {

  componentDidMount() {
    let echartObj = this.renderEchartDom();
    let onEvents = this.props.onEvents || [];
    for (let eventName in onEvents) {
      console.log("onEvents:", eventName)
      if (typeof eventName === 'string' && typeof onEvents[eventName] === 'function') {
        echartObj.on(eventName, param => {
          onEvents[eventName](param, echartObj);
        });
      }
    }

    let {onquerycity,queryseccess,data}=this.props;
    echartObj.on('click', function (params) {
      var city = params.name;
      console.log(city)
      onquerycity(city);
    });
    if (typeof this.props.onChartReady === 'function') this.props.onChartReady(echartObj);
    elementResizeEvent(this.refs.echartsDom, function () {
      echartObj.resize();
    });
  }

  componentDidUpdate() {

    let echartObj=this.renderEchartDom();
    echartObj.off('click');
    let {data,onquerycity}=this.props;

    echartObj.on('click', function (params) {
      //querychart(params);
      var city = params.name;
      if (data){
      data.map(item=>{
        if (item.name==city&&item.value>0){
          onquerycity(item.id);
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
        <Spin tip="加载中..." spinning={this.props.showLoading}>
          <div ref='echartsDom' className={styles.content}/>
        </Spin>    
      </div>
    );
  }
}

Charts.propTypes = {
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
