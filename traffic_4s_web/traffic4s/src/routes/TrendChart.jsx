import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import TrendPage from '../components/trend/TrendPage.jsx';


function TrendChart({location,dispatch,loading,trend}) {
  const models = {
    loading,...trend,
    querytype(values){
      //console.log(values);
      dispatch({
        type:'trend/loading',
      });
      dispatch({
        type:'trend/querytype',
        url: 'Apdata_cnt_day/getDayDate',
        style:values,
        dateType:'',
      })
    },
    queryday(values){
      //console.log(values);
      dispatch({
        type:'trend/loading',
      });
      dispatch({
        type:'trend/querytype',
        url: 'Apdata_cnt_day/getDayDate',
        style:'',
        dateType:values,
      })
    },
    querytimerange(values){
      dispatch({
        type:'trend/loading',
      });
      dispatch({
        type:'trend/querytimerange',
        url: 'Apdata_cnt_day/getDayDate',
        startTime:values[0].split('-')[0]+values[0].split('-')[1]+values[0].split('-')[2],
        endTime:values[1].split('-')[0]+values[1].split('-')[1]+values[1].split('-')[2],
      })
    },
    queryDealer(value){
      //console.log(value);
      dispatch({
        type:'trend/queryDealer',
        areaName:value,
      });
    },
    querynativeDealer(){
      //console.log('querynativeDealer');
      dispatch({
        type:'trend/querynativeDealer',
        //url:'/Ts_ap_device/getAllData',
      });
    },
    selectDealer(value){
      //console.log('querynativeDealer');
      //console.log(value);
      dispatch({
        type:'trend/loading',
      });
      dispatch({
        type:'trend/fetch',
        url: 'Apdata_cnt_day/getDayDate',
        dealer_id:value,
        //url:'/Ts_ap_device/getAllData',
      });
      dispatch({
        type:'trend/querynativegroup'
      });
    },
    //选择集团更新 选择框下面的提示
    queryGroup(e){
      dispatch({
        type:'trend/querygroup',
        group_name:e
      });
    },
    //没有选择集团 选择框下面显示全部的集团信息
    queryAllGroup(){
      dispatch({
        type:'trend/querynativegroup'
      });
    },
    //选择集团更新图表数据
    selectGroup(e){
      dispatch({
        type:'trend/loading'
      });
      dispatch({
        type:'trend/selectGroup',
        url:'Apdata_cnt_day/getDayDate',
        group_id:e
      });
      dispatch({
        type:'trend/querynativeDealer',
        //url:'/Ts_ap_device/getAllData',
      });
    },
    //清空集团更新图表数据
    group(){
      dispatch({
        type:'trend/loading'
      });
      dispatch({
        type:'trend/selectGroup',
        url:'Apdata_cnt_day/getDayDate',
        group_id:''
      });
    },
    selectArea(e) {
      dispatch({
        type:'trend/loading'
      });
      dispatch({
        type:'trend/selectArea',
        url:'Apdata_cnt_day/getDayDate',
        area:e
      });
      dispatch({
        type:'trend/querynativeDealer',
        //url:'/Ts_ap_device/getAllData',
      });
    },
    noArea() {
      dispatch({
        type:'trend/loading'
      });
      dispatch({
        type:'trend/selectArea',
        url:'Apdata_cnt_day/getDayDate',
        area:''
      });
    },
    focusDealer() {
      dispatch({
        type:'trend/focusDealer'
      });
    },
    download(style) {
      dispatch({
        type:'trend/download',
        style: style
      });
    }
  };
  return (
    <div>
          <TrendPage models={models}/>
    </div>
  );
}

TrendChart.propTypes = {
};
function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    trend:state.trend,
  };
}
export default connect(mapStateToProps)(TrendChart);
