import {query, create, update, remove} from '../services/requestData';
import {getLocalStorage, setLocalStorage} from '../utils/LocalCookie';
import { USER_DETAIL,DEALER_DETAIL,GROUP_DETAIL,AREA} from '../constants';
import {message} from 'antd';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'main',

  state: {
    data:[{
      user_id:'',
      user_role:'',
      user_name:'',
      user_pass:'',
      brand_id:'',
      barea_id:'',
      sarea_id:'',
      dealer_id:'',
      group_id:'',
      realname:'',
      telephone:'',
      mobile:'',
      qq:'',
      wechat:'',
      create_user:'',
      crt_date:'',
      upd_date:'',
      areaName:'',
      levelArr:'',
      dealerName:'',
      groupName:'',}],
    area:[{
    }],
    dealer:[{}],
    cdealer:[{}],
    group:[],
    cgroup:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        //if (pathname === '/') {
        //getLocalStorage('userD')
        dispatch({
            type: 'fetch',
            url:'/Ts_user/getOwnInformation',
          });
        dispatch({
          type: 'dealer',
          url:'/Ts_dealer/getAllData',
        });
        dispatch({
          type: 'group',
          url:'/Ts_group/getAllGroup',
        });
        //dispatch({
        //  type: 'allarea',
        //  url:'/Ts_area/getAreaData',
        //});
        dispatch({
          type: 'area',
          url:'/Ts_area/getAreaForUser',
        });
      //}
      });
    },
  },

  effects: {
    *querynativeDealer({areaName,url}, { call, put,select }) {  // eslint-disable-line
      const todos = yield select(state => state.main.cdealer);
      //const data = yield call(query,url,params);
      if (todos) {
        yield put({
          type: 'querydealersuccess',
          data: todos
        });
      }
    },
    *queryDealer({areaName,url}, { call, put,select }) {  // eslint-disable-line
      const todos = yield select(state => state.main.cdealer);
      //const data = yield call(query,url,params);
      const data=[];

      todos.map(item=>{
        //ap_brand
        areaName = areaName.toUpperCase();
        if((item.dealer_name&&item.dealer_name.includes(areaName))||(item.dealer_code&&item.dealer_code.includes(areaName))||
          (item.province&&item.province.includes(areaName))||(item.address&&item.address.includes(areaName))||
          (item.install_desc&&item.install_desc.includes(areaName))
        ){
          data.push(item);
        }
      });
      if (data) {
        yield put({
          type: 'querydealersuccess',
          data: data
        });
      }
    },
    *querygroup({groupName,url}, { call, put,select }) {  // eslint-disable-line

      const todos = yield select(state => state.main.cgroup);
      //const data = yield call(query,url,params);
      const data=[];

      todos.map(item=>{
        //ap_brand
        if((item.group_name&&item.group_name.includes(groupName))
        ){
          data.push(item);
        }
      });
      if (data) {
        yield put({
          type: 'querygroupsuccess',
          data: data
        });
      }
    },
    *querynativegroup({url}, { call, put,select }) {  // eslint-disable-line
      const todos = yield select(state => state.main.cgroup);
      //const data = yield call(query,url,params);
      if (todos) {
        yield put({
          type: 'querygroupsuccess',
          data: todos
        });
      }
    },
    *area({url}, { call, put }) {  // eslint-disable-line
      const data = yield call(query,url);
      if (data) {
        yield put({
          type: 'areasuccess',
          data: data.data
        });
      }
    },
    *group({ url }, { call, put }) {  // eslint-disable-line
      const data = yield call(query,url);
      if (data) {
        yield put({
          type: 'groupsuccess',
          data: data.data
        });
      }
    },
    *changePwd({user_id,oldpwd,user_pass,url}, { call, put,select }) {  // eslint-disable-line
      const params = {user_pass:user_pass,oldpwd:oldpwd};
      //console.log(params);
      const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'fetch',
          url:'/Ts_user/getOwnInformation',
        });
        yield put({
          type: 'changepwdsuccess' ,
          data:data.data,
        });
      }
    },

    *fetch({ url }, { call, put }) {  // eslint-disable-line
      const {data} = yield call(query, url);
      if (data){
        yield put({
          type: 'save' ,
          data:data,
        });
      }
    },
    *dealer({url}, { call, put }) {  // eslint-disable-line
      const data = yield call(query,url);
      if (data) {
        let sortData = data.data;
        for (var i = 0; i < sortData.length - 1; i++) {//比较的次数是length-1
          for (var j = 0; j < sortData.length - 1 - i; j++) {
            if (sortData[j]['dealer_name'].substr(0, 1) > sortData[j + 1]['dealer_name'].substr(0, 1)) {
              var tmp = sortData[j];
              sortData[j] = sortData[j + 1];
              sortData[j + 1] = tmp;
            }
          }
        }
        yield put({
          type: 'dealersuccess',
          data: sortData
        });
      }
    },
    *logout({ url }, { call, put }) {  // eslint-disable-line
      const {data} = yield call(query, url);
      yield put({ type: 'save' });
    },
    *changeHost({dispatch,pname,url, user_id,user_name, user_role,pamar,dealer_id,group_id,realname}, { call, put }) {  // eslint-disable-line

      let params= {user_id:user_id};;
      if (pamar){
        params = Object.assign(params,pamar);
      }
      if (dealer_id){
        params=Object.assign(params,{dealer_id: dealer_id})
      }
      if (user_name){
        params=Object.assign(params,{user_name: user_name})
      }
      if (user_role){
        params=Object.assign(params,{user_role: user_role})
      }
      if (group_id){
        params=Object.assign(params,{group_id: group_id})
      }
      if (realname){
        params=Object.assign(params,{realname: realname})
      }
      const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'changepwdsuccess' ,
          data:data.data,
        });
        yield put({
          type: 'fetch',
          url:'/Ts_user/getOwnInformation',
        });
        if (pname=='/accountpage'){
          dispatch(
            routerRedux.push(
              {pathname: '/accountpage',
                query:{
                  frommain:1,
                },
              }
            ));
        }
      } else {
        yield put({
          type: 'changepwdsuccess' ,
          data:data.data,
        });
      }
    },

  },

  reducers: {
    save(state, action) {
      let local=localStorage.setItem(USER_DETAIL, JSON.stringify(action.data));
      const array=['超级管理员','总部','大区经理','小区经理','经销商总经理','集团账号'];
      action.data[0].user_role=array[action.data[0].user_role-1];

      return { ...state, data:action.data };
    },
    dealersuccess(state, action) {
      //alert(action.data[0].dealer_id);
      let local=localStorage.setItem(DEALER_DETAIL, JSON.stringify(action.data));
      return { ...state, dealer:action.data,cdealer:action.data };
    },
    querygroupsuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, group:action.data};
    },
    groupsuccess(state, action) {
      //alert(action.data[0].dealer_id);
      let local=localStorage.setItem(GROUP_DETAIL, JSON.stringify(action.data));
      return { ...state, group:action.data,cgroup:action.data };
    },
    areasuccess(state, action) {
      //alert(action.data[0].dealer_id);
      let local=localStorage.setItem(AREA, JSON.stringify(action.data));
      return { ...state, area:action.data, };
    },
    querydealersuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, dealer:action.data};
    },
    changepwdsuccess(state, action) {
      //alert(action.data[0].dealer_id);
      //if (action.data.code==1){
        message.success(action.data.code);
      //}
      return { ...state};
    },
  },

};
