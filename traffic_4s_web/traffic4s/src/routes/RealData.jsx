import React from 'react';
import { connect } from 'dva';
import RealPage from '../components/realdata/RealPage.jsx';


function RealData({location,dispatch,loading,realdata}) {
  const models = {
    loading,...realdata,
    queryType(values){
      dispatch({
        type:'realdata/querytype',
        url: '/Apdata_cnt_hour/getChatData',
        style:values,
        first:0,
      });
    },
    queryarea(values){
      dispatch({
        type:'realdata/querycity',
        url:'',
      })
    },
    queryDealer(value){
      //console.log(value);
      dispatch({
        type:'realdata/queryDealer',
        areaName:value,
      });
    },
    selectDealer(value){
      //console.log(value);
      dispatch({
        type:'realdata/querytype',
        url: '/Apdata_cnt_hour/getChatData',
        dealer_id:value,
        first:1,
      });
      dispatch({
        type:'realdata/querynativegroup'
      });
    },
    querynativeDealer(){
      //console.log('querynativeDealer');
      dispatch({
        type:'realdata/querynativeDealer',
        //url:'/Ts_ap_device/getAllData',
      });
    },
    //选择集团更新 选择框下面的提示
    queryGroup(e){
      dispatch({
        type:'realdata/querygroup',
        group_name:e
      });
    },
    //没有选择集团 选择框下面显示全部的集团信息
    queryAllGroup(){
      dispatch({
        type:'realdata/querynativegroup'
      });
    },
    //选择集团更新图表数据
    selectGroup(e){
      dispatch({
        type:'realdata/selectGroup',
        url:'/Apdata_cnt_hour/getChatData',
        group_id:e
      });
      dispatch({
        type:'realdata/querynativeDealer',
      });
    },
    //清空集团更新图表数据
    group(){
      dispatch({
        type:'realdata/selectGroup',
        url:'/Apdata_cnt_hour/getChatData',
        group_id:''
      });
    },
    selectArea(e) {
      dispatch({
        type:'realdata/selectArea',
        url:'/Apdata_cnt_hour/getChatData',
        area:e
      });
      dispatch({
        type:'realdata/querynativeDealer',
      });
    },
    noArea() {
      dispatch({
        type:'realdata/selectArea',
        url:'/Apdata_cnt_hour/getChatData',
        area:''
      });
    },
    focusDealer() {
      dispatch({
        type:'realdata/focusDealer'
      });
    }
  };
  return (
    <div>
          <RealPage models={models}/>
    </div>
  );
}

RealData.propTypes = {
};
function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    realdata:state.realdata,

  };
}
export default connect(mapStateToProps)(RealData);
