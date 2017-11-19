import {query, create, update, remove} from '../services/requestData';
import { USER_DETAIL,DEALER_DETAIL,GROUP_DETAIL,AREA} from '../constants';

export default {

  namespace: 'dealer',

  state: {
    data:[
      {
        dealer_id:'',
        dealer_name:'',
        dealer_code:'',
        brand_id:'',
        barea_id:'',
        sarea_id:'',
        group_id:'',
        province:'',
        city:'',
        address:'',
        plan_path:'',

}
    ],
    area:[{
    }],
    cdata:[{}],
    group:[],
    cgroup:[],
    showLoading:true,
    user_id:'',
    areadealer:'',

  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/dealerpage') {
          dispatch({
            type: 'loading',
          });
          //dispatch({
          //  type: 'quertOwnDetail',
          //  url:'/Ts_user/getOwnInformation',
          //});
          dispatch({
            type: 'searchArea',
            url:'/Ts_dealer/getAllData',
            params:'',
          });
          dispatch({
            type: 'area',
            url:'/Ts_area/getAreaData',
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
    //*quertOwnDetail({ url }, { call, put }) {  // eslint-disable-line
    //  const params = {};
    //  const {data} = yield call(query, url);
    //  if (data) {
    //    yield put({
    //      type: 'fetch',
    //      url:'/Ts_dealer/getAllData',
    //      user_id:data[0].user_id,
    //    });
    //  }
    //
    //},
    *fetch({url,}, { call, put,select }) {  // eslint-disable-line
      const data = yield call(query,url);
      if (data) {
        yield put({
          type: 'save',
          data: data.data,
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
    *addDealer({province,dealer_name,dealer_code,group_id,barea_id,city,url}, { call, put }) {  // eslint-disable-line
      let params = {dealer_name:dealer_name};
      if (group_id){
        params = Object.assign(params,{group_id:group_id});
      }
      if (barea_id){
        params = Object.assign(params,{barea_id:barea_id});
      }
      if (dealer_code){
        params = Object.assign(params,{dealer_code:dealer_code});
      }
      if (city){
        params = Object.assign(params,{city:city});
      }
      const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'fetch',
          url:'/Ts_dealer/getAllData',
        });
      }
    },
    *changeDealer({province,dealer_id,dealer_name,dealer_code,brand_id,group_id,barea_id,city,url}, { call, put,select }) {  // eslint-disable-line
      const areadealer = yield select(state => state.dealer.areadealer);
      let params= {
        dealer_id: dealer_id,
        dealer_name: dealer_name,
      };
      if (barea_id) {
         params = Object.assign(params,{barea_id: barea_id});
      }
      if (group_id){
        params = Object.assign(params,{group_id:group_id});
      }
      if (dealer_code){
        params = Object.assign(params,{dealer_code:dealer_code});
      }
      if (city){
        params = Object.assign(params,{city:city});
      }
      const data = yield call(query,url,params);
      //if (data) {
        yield put({
          type: 'searchArea',
          url:'/Ts_dealer/getAllData',
          params:areadealer?areadealer:'',
        });
      //}
    },
    *deleteDealer({dealer_id,url}, { call, put,select }) {  // eslint-disable-line
      const areadealer = yield select(state => state.dealer.areadealer);
      const params = {dealer_id:dealer_id};
      const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'searchArea',
          url:'/Ts_dealer/getAllData',
          params:areadealer?areadealer:'',
        });
      }
    },
    *searchDealer({dealer_id,url}, { call,select, put }) {  // eslint-disable-line
      const params = {dealer_id:dealer_id};
      const todos = yield select(state => state.dealer.cdata);
      const data=[];
      todos.map(item=>{
        //if(item.dealer_id==dealer_id){
        //  data.push(item);
        //}
        if((item.dealer_name&&item.dealer_name.includes(dealer_id))||
          (item.dealer_code&&item.dealer_code.includes(dealer_id))||
          (item.city&&item.city.includes(dealer_id))||
          (item.address&&item.address.includes(dealer_id))){
          data.push(item);
        }
      });
      if (data) {
        yield put({
          type: 'dataseccess',
          data: data
        });
      }
    },
    *queryallnativedata({}, { call, put,select }) {  // eslint-disable-line
      const data = yield select(state => state.dealer.cdata);

      //const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'dataseccess',
          data: data
        });
      }
    },
    *searchArea({params='',url}, { call, put ,select}) {  // eslint-disable-line
      const data = yield call(query,url,params);
      //const data = yield call(query,url,params);
      if (data.data) {
        yield put({
          type: 'save',
          data: data.data,
          areadealer:params,
        });
      }
    },
    *group({ url }, { call, put }) {  // eslint-disable-line
      //const data = yield call(query,url);
      let data = JSON.parse(localStorage.getItem(GROUP_DETAIL));

      if (data) {
        yield put({
          type: 'groupsuccess',
          data: data
        });
      }
    },

    *querygroup({groupName,url}, { call, put,select }) {  // eslint-disable-line
      const todos = yield select(state => state.dealer.cgroup);
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
      const todos = yield select(state => state.dealer.cgroup);
      //const data = yield call(query,url,params);
      if (todos) {
        yield put({
          type: 'querygroupsuccess',
          data: todos
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      //console.log(action.user_id);
      return { ...state,  data:action.data,cdata:action.data ,showLoading:false,areadealer:action.areadealer};
    },
    areasuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, area:action.data, };
    },
    dataseccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, data:action.data, };
    },
    groupsuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, group:action.data,cgroup:action.data };
    },
    querygroupsuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, group:action.data};
    },
    loading(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, showLoading:true};
    },

  },

};
