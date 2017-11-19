import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import AP from '../components/ap/AP.jsx';


function APPage({ location,dispatch,loading,app}) {
  const models = {
    loading,
    ...app,
    addDevice(values){
      dispatch({
        type: 'app/loading',
      });
      dispatch({
        type: 'app/addDevice',
        url: '/Ts_ap_device/add',
        ap_id: values.ap_id,
        ap_brand: values.ap_brand,
        ap_model: values.ap_model,
        ap_mac: values.ap_mac,
        //dealer_id:values.dealer_id,
        dealer_id: values.dealer_id,
        install_desc: values.install_desc,
      })
    },
    changeInfo(values){
      //alert(values.ap_id);
      //alert(values.ap_brand);
      //alert(values.ap_model);
      //alert(values.ap_mac);
      //alert(values.dealer_id);
      //alert(values.install_desc);
      dispatch({
        type: 'app/loading',
      });
      dispatch({
        type: 'app/changeInfo',
        url: '/Ts_ap_device/update',
        ap_id: values.ap_id,
        ap_brand: values.ap_brand,
        ap_model: values.ap_model,
        ap_mac: values.ap_mac,
        dealer_id: values.dealer_id,
        install_desc: values.install_desc,
      })
    },
    deleteDevice(values){
      dispatch({
        type: 'app/loading',
      });
      dispatch({
        type: 'app/deleteDevice',
        url: '/Ts_ap_device/delete',
        ap_id: values,
      })
    },
    searchDevice(values){

      dispatch({
        type: 'app/searchDevice',
        url: '/Ts_ap_device/search',
        ap_id: values,
      })
    },
    fetchDevice(values){

      dispatch({
        type: 'app/queryallnativedata',
      })
    },
    searchArea(values){
      dispatch({
        type: 'app/loading',
      });
      dispatch({
        type: 'app/searchAreaDevice',
        url: '/Ts_ap_device/getAllData',
        areaName: values,
      })
    },
    queryData(){
      dispatch({
        type: 'app/loading',
      });
      dispatch({
        type: 'app/fetch',
        url: '/Ts_ap_device/getAllData',
      })
    },
    queryDealer(value){
      //console.log(value);
      dispatch({
        type: 'app/queryDealer',
        areaName: value,
      });
    },
    querynativeDealer(){
      //console.log('querynativeDealer');
      dispatch({
        type: 'app/querynativeDealer',
        //url:'/Ts_ap_device/getAllData',
      });
    },
    queryonline(){
      dispatch({
        type: 'app/queryonline',
        //url:'/Ts_ap_device/getAllData',
      });
    },
    queryoutline(){
      dispatch({
        type: 'app/queryoutline',
        //url:'/Ts_ap_device/getAllData',
      });
    },
    queryprevious(){
      dispatch({
        type: 'app/queryprevious',
        //url:'/Ts_ap_device/getAllData',
      });
    },
  };
  return (
          <AP models={models}/>
  );
}

APPage.propTypes = {
};
function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    app:state.app,
  };
}
export default connect(mapStateToProps)(APPage);
