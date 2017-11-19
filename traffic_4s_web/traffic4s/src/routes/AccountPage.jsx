import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import Account from '../components/account/Accountindex';


function AccountPage({location,dispatch,loading,account}) {

  const models = {
    loading,...account,
    addUser(values){
      dispatch({
        type: 'account/loading',
      });
      dispatch({
        type: 'account/addUser',
        url:'/Ts_user/add',
        user_role: values.user_role,
        user_name: values.user_name,
        dealer_id: values.dealer_id,
        group_id:values.group_id,
        realname:values.realname,
        pamar:values.barea_id,
        user_pass:values.pwd,
      });
    },
    searchUser(values){
      dispatch({
        type: 'account/searchUser',
        url:'/Ts_user/search',
        user_id:values,
      })
    },
    changeUserInfo(values){
      dispatch({
        type: 'account/loading',
      });
      dispatch({
        type: 'account/changeUserInfo',
        url:'/Ts_user/update',
        user_id:values.user_id,
        user_role:values.user_role,
        user_name:  values.user_name,
        pamar:values.barea_id,
        dealer_id: values.dealer_id,
        group_id:values.group_id,
        realname:values.realname,
      })
    },
    resetPwd(values){
      dispatch({
        type: 'account/loading',
      });
      dispatch({
        type: 'account/resetPwd',
        url:'/Ts_user/resetPassword',
        user_id:values,
      });
    },
    role(values){
      dispatch({
        type: 'account/loading',
      });
      dispatch({
        type: 'account/updaterole',
        url:'Ts_user/updateUserRole',
        user_id:values.user_id,
        user_role:values.change_role,
      })
    },
    deleteUser(values){
      dispatch({
        type: 'account/loading',
      });
      dispatch({
        type: 'account/deleteUser',
        url:'/Ts_user/delete',
        user_id:values,
      })
    },
    changePwd(values){
      dispatch({
        type: 'account/changePwd',
        url:'Ts_user/updatePassword',
        user_id:values.user_id,
        user_pass:values.newpwd,
      });
    },
    changeHost(values){
      dispatch({
        type: 'account/changeHost',
        url:'/Ts_user/update',
        user_id:values.user_id,
        user_role:values.user_role,
        user_name:  values.user_name,
        barea_id:values.barea_id,
        sarea_id: values.sarea_id,
        dealer_id: values.dealer_id,
        group_id:values.group_id,
        telephone:values.telephone,
        mail:values.mail,
        mobile:values.mobile,
        realname:values.realname,
      });
    },
    queryUser(values){
      dispatch({
        type: 'account/queryallnativedata',
      })
    },
    queryDealer(value){
      //console.log(value);
      dispatch({
        type:'account/queryDealer',
        areaName:value,
      });
    },
    querynativeDealer(){
      //console.log('querynativeDealer');
      dispatch({
        type:'account/querynativeDealer',
        //url:'/Ts_ap_device/getAllData',
      });
    },
    queryGroup(value){
      //console.log(value);
      //console.log('queryGroup');

      dispatch({
        type:'account/querygroup',
        groupName:value,
      });
    },
    queryNativeGroup(){
      //console.log('queryNativeGroup');
      dispatch({
        type:'account/querynativegroup',
        //url:'/Ts_ap_device/getAllData',
      });
    },
    queryRole(value){
      //console.log('queryNativeGroup');
      dispatch({
        type:'account/fetch',
        url:'/Ts_user/getAllData',
        params:value,
      });
    },
    queryAllRole(value){
      //console.log('queryNativeGroup');
      dispatch({
        type:'account/fetch',
        url:'/Ts_user/getAllData',
        params:'',
      });
    },
  };

  return (<Account models={models}/>);
}

AccountPage.propTypes = {
};
function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    account:state.account,
  };
}
export default connect(mapStateToProps)(AccountPage);
