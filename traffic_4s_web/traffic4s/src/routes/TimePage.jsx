import React from 'react';
import { connect } from 'dva';
import styles from './TimePage.css';
import TimeDist from '../components/time/TimeDist.jsx';


function TimePage({location,dispatch,time }) {
  const  models= {
    ...time,
    quertRange(values){
      dispatch({
        type:'time/loading'
      });
      dispatch({
        type:'time/quertRange',
        url:'Apdata_cnt_length/getLengthData',
        startTime:values[0].split('-')[0]+values[0].split('-')[1]+values[0].split('-')[2],
        endTime:values[1].split('-')[0]+values[1].split('-')[1]+values[1].split('-')[2],
      });
    },
    queryDealer(value){
      //console.log(value);
      dispatch({
        type:'time/queryDealer',
        areaName:value
      });
    },
    querynativeDealer(){
      //console.log('querynativeDealer');
      dispatch({
        type:'time/querynativeDealer'
        //url:'/Ts_ap_device/getAllData',
      });
    },
    selectDealer(value){
      //console.log('querynativeDealer');
      dispatch({
        type:'time/loading'
      });
      dispatch({
        type:'time/fetch',
        url:'Apdata_cnt_length/getLengthData',
        dealer_id: value
      });
      dispatch({
        type:'time/querynativegroup'
      });
    },
    loadsuccess(){
      dispatch({
        type:'time/loadingSuccess'
      });
    },
    loading(){
      dispatch({
        type:'time/loading'
      });
    },
    //选择集团更新 选择框下面的提示
    queryGroup(e){
      dispatch({
        type:'time/querygroup',
        group_name:e
      });
    },
    //没有选择集团 选择框下面显示全部的集团信息
    queryAllGroup(){
      dispatch({
        type:'time/querynativegroup'
      });
    },
    //选择集团更新图表数据
    selectGroup(e){
      dispatch({
        type:'time/loading'
      });
      dispatch({
        type:'time/selectGroup',
        url:'Apdata_cnt_length/getLengthData',
        group_id:e
      });
      dispatch({
        type:'time/querynativeDealer'
        //url:'/Ts_ap_device/getAllData',
      });
    },
    //清空集团更新图表数据
    group(){
      dispatch({
        type:'time/loading'
      });
      dispatch({
        type:'time/selectGroup',
        url:'Apdata_cnt_length/getLengthData',
        group_id:''
      });
    },
    selectArea(e) {
      dispatch({
        type:'time/loading'
      });
      dispatch({
        type:'time/selectArea',
        url:'Apdata_cnt_length/getLengthData',
        area:e
      });
      dispatch({
        type:'time/querynativeDealer'
        //url:'/Ts_ap_device/getAllData',
      });
    },
    noArea() {
      dispatch({
        type:'time/loading'
      });
      dispatch({
        type:'time/selectArea',
        url:'Apdata_cnt_length/getLengthData',
        area:''
      });
    },
    focusDealer() {
      dispatch({
        type:'time/focusDealer'
      });
    }
  };
  return (
    <div className={styles.body}>
      <TimeDist model={models}/>
    </div>
  );
}

TimePage.propTypes = {
};

export default connect(({time})=>({time}))(TimePage);
