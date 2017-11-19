import {query, create, update, remove} from '../services/requestData';
import { USER_DETAIL,DEALER_DETAIL,GROUP_DETAIL,AREA} from '../constants';
import { message,Modal } from 'antd';

export default {

  namespace: 'account',

  state: {
    data:[{
      user_id:'',
      user_name :'',
      user_role :0,
      barea_id :'',
      group_id :'',
      dealer_id :'',
      mail:'',
      wechat:'',
      telephone:'',
      qq :'',
      crt_date:'',
      upd_date:'',
      areaName:[],
      dealerName:'',
    }],
    area:[{
    }],
    cdata:[{}],
    dealer:[{}],
    cdealer:[{}],
    group:[],
    cgroup:[],
    userDetail:{
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
      groupName:'',
      showLoading:true,
    },
    userroleid:'',
    resetpwd:'',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/accountpage') {
          if (query.frommain==1){
            dispatch({
              type: 'updateuserdetail',
              url:'/Ts_user/getOwnInformation',
            });
          }else{
            dispatch({
              type: 'userdetail',
              //url:'/Ts_user/getOwnInformation',
            });
          }
          dispatch({
            type: 'loading',
          });
          dispatch({
            type: 'fetch',
            url:'/Ts_user/getAllData',
            params:'',
          });
          dispatch({
            type: 'area',
            url:'/Ts_area/getAreaForUser',
          });

          dispatch({
            type: 'group',
            url:'/Ts_group/getAllGroup',
          });

        }
      });
    },
  },

  effects: {
    *fetch({ url ,params,pwd=''}, { call, put }) {  // eslint-disable-line
      const data = yield call(query,url,params);
      if (data) {


        yield put({
          type: 'save',
          data: data.data,
          userroleid:params,
        });
        if(pwd){
          Modal.success({
            title: '密码重置为',
            content: pwd,
          });
        }
      }
    },
    *userdetail({ url }, { call, put }) {  // eslint-disable-line
      //const data = yield call(query,url);
      let value = JSON.parse(localStorage.getItem(USER_DETAIL));
      if (value) {
        yield put({
          type: 'dealer',
          url:'/Ts_dealer/getAllData',
          //user_id:data.data[0].user_id,
        });
        yield put({
          type: 'queryuserdetailseccess',
          data: value,
        });
      }
    },
    *updateuserdetail({ url }, { call, put }) {  // eslint-disable-line
      const data = yield call(query,url);
      //let value = JSON.parse(localStorage.getItem(USER_DETAIL));
      if (data) {
        yield put({
          type: 'dealer',
          url:'/Ts_dealer/getAllData',
          //user_id:data.data[0].user_id,
        });
        yield put({
          type: 'queryuserdetailseccess',
          data: data.data,
        });
      }
    },
    *resetPwd({ url,user_id }, { call, put }) {  // eslint-disable-line
      const params = {user_id:user_id};
      const data = yield call(query,url,params);
      if (data) {
        let pwd=data.data.password;
        //console.log(data.data);
        //message.success('重置密码:'+pwd, 5,true);

        yield put({
          type: 'fetch',
          url:'/Ts_user/getAllData',
          pwd:pwd,
        });
        //yield put({
        //  type: 'resetsuccess',
        //  pwd:pwd
        //});
      }
    },
    *group({ url }, { call, put }) {  // eslint-disable-line
      //const data = yield call(query,url);
      let data = JSON.parse(localStorage.getItem(GROUP_DETAIL));
      //console.log(data)
      if (data) {
        yield put({
          type: 'groupsuccess',
          data: data
        });
      }
    },
    *area({url}, { call, put }) {  // eslint-disable-line
      //const data = yield call(query,url);
      let data = JSON.parse(localStorage.getItem(AREA));
      if (data) {
        yield put({
          type: 'areasuccess',
          data: data
        });
      }
    },
    *addUser({user_pass,url,user_name, user_role,pamar,dealer_id,group_id,realname}, {call, put}) {
      let params = {};
      if (dealer_id){
        params=Object.assign(params,{dealer_id: dealer_id})
      }
      if (user_role){
        params=Object.assign(params,{user_role: user_role})
      }
      if (user_name){
        params=Object.assign(params,{user_name: user_name})
      }
      //
      if (pamar){
        params=Object.assign(params,pamar)
      }
      if (realname){
        params=Object.assign(params,{realname: realname})
      }
      if (group_id){
        params=Object.assign(params,{group_id: group_id})
      }
      if (user_pass){
        params=Object.assign(params,{user_pass: user_pass})
      }
      //console.log(params);
      const {data} = yield call(query, url, params);
      //if (data) {
      yield put({
        type: 'addUserResult' ,
        data:data
      });
      yield put({
        type: 'fetch',
        url:'/Ts_user/getAllData',
      });
      //}
    },
    *searchUser({ url,user_id }, { call, select,put }) {  // eslint-disable-line
      const params = {user_id:user_id};
      const todos = yield select(state => state.account.cdata);
      const data=[];
      todos.map(item=>{
        if (item.user_name&&item.user_name.includes(user_id)||item.realname&&item.realname.includes(user_id)){
          data.push(item);
        }
        //console.log(data);
        //if(item.user_id==user_id){
        //  data.push(item);
        //}
      });
      if (data) {
        yield put({
          type: 'dataseccess',
          data: data
        });
      }
    },
    *deleteUser({ url,user_id }, { call, put }) {  // eslint-disable-line
      const params = {user_id:user_id};
      const data = yield call(query,url,params);
      //if (data) {
      yield put({
        type: 'fetch',
        url:'/Ts_user/getAllData',
      });
      //}
    },
    *role({ url,user_id }, { call, put }) {  // eslint-disable-line
      //const params = {user_id:user_id};
      //const data = yield call(query,url,params);
      //if (data) {
      //yield put({
      //  type: 'fetch',
      //  url:'/Ts_user/getAllData',
      //});
      //}
    },
    *queryallnativedata({}, { call, put,select }) {  // eslint-disable-line
      const data = yield select(state => state.account.cdata);

      //const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'dataseccess',
          data: data
        });
      }
    },
    *changeUserInfo({ url, user_id,user_name, user_role,pamar,dealer_id,group_id,realname}, { call, put ,select}) {  // eslint-disable-line
      //let queryroleid = yield select(state => state.account.queryroleid);
      const userroleid = yield select(state => state.account.userroleid);
      let params= {user_id:user_id,user_name:user_name};;
      if (pamar){
        params = Object.assign(params,pamar);
      }
      if (dealer_id){
        params=Object.assign(params,{dealer_id: dealer_id})
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
          type: 'fetch',
          url: '/Ts_user/getAllData',
          params: userroleid ? userroleid : '',
        });
      }
    },
    *changeHost({ mail,url, user_id,user_name, user_role,barea_id,sarea_id,dealer_id,group_id,realname,telephone,mobile}, { call, put }) {  // eslint-disable-line
      let params= {mail:mail,user_id:user_id,user_name: user_name, user_role: user_role,sarea_id:sarea_id,group_id:group_id,realname:realname,telephone:telephone,mobile:mobile};;
      if (barea_id){
        params = Object.assign(params,{barea_id:barea_id});
      }
      if (dealer_id){
        params=Object.assign(params,{dealer_id: dealer_id})
      }
      const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'userdetail',
          url:'/Ts_user/getOwnInformation',
        });
      }
    },
    *dealer({url,user_id}, { call, put }) {  // eslint-disable-line
      //const params = {user_id,user_id};
      //const data = yield call(query,url);
      let data = JSON.parse(localStorage.getItem(DEALER_DETAIL));
      if (data) {
        yield put({
          type: 'dealersuccess',
          data: data
        });
      }
    },
    *queryDealer({areaName,url}, { call, put,select }) {  // eslint-disable-line
      const todos = yield select(state => state.account.cdealer);
      //const data = yield call(query,url,params);
      const data=[];

      todos.map(item=>{
        //ap_brand
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
    *querynativeDealer({areaName,url}, { call, put,select }) {  // eslint-disable-line
      const todos = yield select(state => state.account.cdealer);
      //const data = yield call(query,url,params);
      if (todos) {
        yield put({
          type: 'querydealersuccess',
          data: todos
        });
      }
    },


    *querygroup({groupName,url}, { call, put,select }) {  // eslint-disable-line
      const todos = yield select(state => state.account.cgroup);
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
      const todos = yield select(state => state.account.cgroup);
      //const data = yield call(query,url,params);
      if (todos) {
        yield put({
          type: 'querygroupsuccess',
          data: todos
        });
      }
    },
    *updaterole({user_id,user_role,url}, { call, put,select }) {  // eslint-disable-line
      const params = {user_id:user_id,user_role,user_role};

      const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'fetch',
          url:'/Ts_user/getAllData',
        });
      }
    },
    *changePwd({user_id,user_pass,url}, { call, put,select }) {  // eslint-disable-line
      const params = {user_id:user_id,user_pass:user_pass};

      const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'userdetail',
          url:'/Ts_user/getOwnInformation',
        });
      }
    },

  },

  reducers: {
    save(state, action) {
      const array=['超级管理员','总部','大区经理','小区经理','经销商总经理','集团账号'];
      action.data.map(item=>{
        item.user_role=array[item.user_role-1];
      });
      return { ...state,  data:action.data,cdata:action.data,showLoading:false,userroleid:action.userroleid};
    },
    areasuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, area:action.data, };
    },
    dataseccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, data:action.data, };
    },
    dealersuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, dealer:action.data,cdealer:action.data };
    },
    querydealersuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, dealer:action.data};
    },
    groupsuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, group:action.data,cgroup:action.data };
    },
    querygroupsuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, group:action.data};
    },
    queryuserdetailseccess(state, action) {
      const array=['超级管理员','总部','大区经理','小区经理','经销商总经理','集团账号'];
      action.data[0].user_role=array[action.data[0].user_role-1];
      return { ...state, userDetail:action.data[0] };
    },
    loading(state, action) {

      return { ...state,  showLoading:true};
    },
resetsuccess(state, action) {

      return { ...state,  resetpwd:action.pwd};
    },
    addUserResult(state, action) {
      //alert(action.data[0].dealer_id);
      //if (action.data.code==1){
      message.success(action.data.code);
      //}
      return { ...state};
    }
  },

};
