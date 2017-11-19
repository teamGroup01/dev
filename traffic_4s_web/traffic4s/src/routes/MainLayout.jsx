import React from 'react';
import styles from './MainLayout.css';
import Header from '../components/header/Headerindex';
import Menu from '../components/menu/SkateMenuindex';
import { connect } from 'dva';

function MainLayout({children,main,dispatch,location}) {


  const {user_role}=main.data[0];

  const models = {
    location,
    ...main,
    changePwd(values){
      dispatch({
        type: 'main/changePwd',
        url:'Ts_user/updatePassword',
        user_id:values.user_id,
        user_pass:values.newpwd,
        oldpwd:values.oldpwd,
      });
    },
    queryGroup(values){
      dispatch({
        type:'main/querygroup',
        groupName:values,
      });
    },
    queryNativeGroup(values){
      dispatch({
        type:'main/querynativegroup',
        //url:'/Ts_ap_device/getAllData',
      });
    },
    querynativeDealer(values){
      dispatch({
        type:'main/querynativeDealer',
        //url:'/Ts_ap_device/getAllData',
      });
    },
    queryDealer(value){
      dispatch({
        type:'main/queryDealer',
        areaName:value,
      });
    },
    changeHost(values){
      dispatch({
        type: 'main/changeHost',
        url:'/Ts_user/update',
        user_id:values.user_id,
        user_role:values.user_role,
        user_name:  values.user_name,
        pamar:values.barea_id,
        dealer_id: values.dealer_id,
        group_id:values.group_id,
        realname:values.realname,
        pname:location.pathname,
        dispatch:dispatch,
      });
    },
    addUser(value){
      dispatch({

      })
    },
    logout(value){
      //alert('a');
      dispatch({
        type:'main/logout',
        url:'/Ts_user/logout',
      });
    },
  };
  return (
    <div className={styles.body}>
            <Header model={models}/>
          <div className={styles.content}>
          <div className={styles.leftmenu}>
            <Menu user_role ={user_role}  location={location}/>
          </div>
          <div className={styles.rightcontent}>
            {children}
          </div>
          </div>
    </div>
  );
}

export default connect(({ main}) => ({ main}))(MainLayout)
