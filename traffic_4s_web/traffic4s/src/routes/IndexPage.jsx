import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import FirstPage from '../components/account/FirstPage';
import { routerRedux } from 'dva/router';


function IndexPage({ location,dispatch,index }) {
  const models = {
    ...index,
    queryCity(values){
      dispatch({
        type:'index/loadchat'
      });
      dispatch({
        type:'index/querycity',
        url:'/Ts_home/getHomeChatInformation',
        cityname:values
      })
    },
    queryDealerid(value){
      dispatch(
        routerRedux.push(
          {pathname: '/realpage',
            query:{
              dealer_name:value
            }
        }
        ))
    },
    queryseccess(){
      dispatch({
        type:'index/queryseccess'
      });
    },
    querytable(value){
      dispatch({
        type:'index/querytable',
        dealer_name:value
      });
    },
    querynativetableseccess(){
      dispatch({
        type:'index/querynativetable'
      });
    },
    searchDealer(value){
      dispatch({
        type:'index/table',
        url:'/Ts_home/getHomeBotTable',
        params:value
      });
    },
    searchallDealer(){
      dispatch({
        type:'index/table',
        url:'/Ts_home/getHomeBotTable',
        params:' '
      });
    },
    queryGroup(e){
      dispatch({
        type:'index/querygroup',
        group_name:e
      });
    },
    queryAllGroup(){
      dispatch({
        type:'index/querynativegroup'
      });
    },
    selectGroup(e){
      dispatch({
        type:'index/table',
        url:'/Ts_home/getHomeBotTable',
        params:{group_id:e}
      });
    },
    group(){
      dispatch({
        type:'index/table',
        url:'/Ts_home/getHomeBotTable',
        params:''
      });
    }
  };
  return (
    <div>
          <FirstPage model={models}/>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect(({index})=>({index}))(IndexPage);
