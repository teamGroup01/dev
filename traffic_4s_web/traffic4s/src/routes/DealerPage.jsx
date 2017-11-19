import React from 'react';
import { connect } from 'dva';
import styles from './DealerPage.css';
import Dealer from '../components/dealer/Dealer.jsx';


function DealerPage({location,dispatch,loading,dealer }) {
  const models = {
    loading,...dealer,
    addDealer(values){
      //console.log(values.barea_id);
      dispatch({
        type:'dealer/loading',
      });
      dispatch({
        type:'dealer/addDealer',
        url:'/Ts_dealer/add',
        dealer_name:values.dealer_name,
        dealer_code:values.dealer_code,
        group_id:values.group_id,
        barea_id:values.barea_id,
        city:values.city,

      });
    },
    changeDealer(values){
      dispatch({
        type:'dealer/loading',
      });
      dispatch({
        type:'dealer/changeDealer',
        url:'/Ts_dealer/update',
        dealer_id:values.dealer_id,
        dealer_name:values.dealer_name,
        dealer_code:values.dealer_code,
        barea_id:values.barea_id,
        group_id:values.group_id,
        city:values.city,
      })
    },
    deleteDealer(values){
      dispatch({
        type:'dealer/loading',
      });
      dispatch({
        type:'dealer/deleteDealer',
        url:'/Ts_dealer/delete',
        dealer_id:values,
      })
    },
    searchDealer(values){

      dispatch({
        type:'dealer/searchDealer',
        url:'/Ts_dealer/search',
        dealer_id:values,
      })
    },
    queryDealer(values){
      dispatch({
        type:'dealer/queryallnativedata',
      })
    },
    searchArea(params){
      dispatch({
        type:'dealer/loading',
      });
        dispatch({
          type:'dealer/searchArea',
          url:'Ts_dealer/getAllData',
          params:params,
        });
      //}
    },
    queryData(){
      dispatch({
        type:'dealer/loading',
      });
      dispatch({
        type:'dealer/searchArea',
        url:'/Ts_dealer/getAllData',
      })
    },
    queryGroup(value){
      //console.log(value);
      //console.log('queryGroup');

      dispatch({
        type:'dealer/querygroup',
        groupName:value,
      });
    },
    queryNativeGroup(){
      //console.log('queryNativeGroup');
      dispatch({
        type:'dealer/querynativegroup',
        //url:'/Ts_ap_device/getAllData',
      });
    },
  };
  return (
    <div className={styles.body}>
          <Dealer models={models}/>
    </div>
  );
}

DealerPage.propTypes = {
};
function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    dealer:state.dealer,
  };
}
export default connect(mapStateToProps)(DealerPage);
