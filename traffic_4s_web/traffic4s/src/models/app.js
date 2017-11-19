import {query, create, update, remove} from '../services/requestData';
import { USER_DETAIL,DEALER_DETAIL,GROUP_DETAIL,AREA} from '../constants';

export default {
  //localhost:1337/Ts_ap_device/add?ap_id=1&ap_brand=sdfsdfs&ap_model=sdfdsfsdfsdf&ap_mac=dfsfsdfsdf&dealer_id=1&install_desc=fggggg
  namespace: 'app',

  state: {
    data:[{
      ap_id:'',
      ap_brand:'',
      ap_model:'',
      ap_mac:'',
      dealer_id:'',
      install_desc:'',
    }],
    area:[{
    }],
    cdata:[{
    }],
    dealer:[{}],
    cdealer:[{}],
    title:{},
    showLoading:true,
    areadevice:'',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/appage') {
          dispatch({
            type: 'loading',
          });
          //dispatch({
          //  type: 'quertOwnDetail',
          //  url:'/Ts_user/getOwnInformation',
          //});
          dispatch({
            type: 'dealer',
            url:'/Ts_dealer/getAllData',
          });
          dispatch({
            type: 'fetch',
            url:'/Ts_ap_device/getAllData',
          });
          dispatch({
            type: 'area',
            url:'/Ts_area/getAreaData',
          });
          dispatch({
            type: 'title',
            url:'/Ts_ap_device/getAPInformation',
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
    //      type: 'dealer',
    //      url:'/Ts_dealer/getAllData',
    //      user_id:data[0].user_id,
    //    });
    //  }
    //
    //},
    *fetch({ url ,areadevice=' ',areaName=''}, { call, put }) {  // eslint-disable-line
      const data = yield call(query,url,areaName);
      if (data) {
        yield put({
          type: 'save',
          data: data.data,
          areadevice:areadevice,
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
    *title({url}, { call, put }) {  // eslint-disable-line
      const data = yield call(query,url);
      if (data) {
        yield put({
          type: 'titlesuccess',
          data: data.data
        });
      }
    },
    *dealer({url}, { call, put }) {  // eslint-disable-line
      //const data = yield call(query,url);
      let data = JSON.parse(localStorage.getItem(DEALER_DETAIL));
      if (data) {
        yield put({
          type: 'dealersuccess',
          data: data,
        });
      }
    },
    *addDevice({ ap_brand,ap_mac,ap_model,dealer_id,url,payload }, { call, put }) {  // eslint-disable-line
      let params = {ap_brand:ap_brand,ap_mac:ap_mac,ap_model:ap_model};
      if (dealer_id){
        params = Object.assign(params,{dealer_id:dealer_id});
      }
      const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'title',
          url:'/Ts_ap_device/getAPInformation',
        });
        yield put({
          type: 'fetch',
          url:'/Ts_ap_device/getAllData',
        });
      }
    },
    *changeInfo({ ap_id,ap_brand,ap_mac,ap_model,dealer_id,url,payload }, { call, put,select }) {  // eslint-disable-line
      let areadevice = yield select(state => state.app.areadevice);
      let params = {ap_id:ap_id,ap_brand:ap_brand,ap_mac:ap_mac,ap_model:ap_model};
      if (dealer_id){
        params = Object.assign(params,{dealer_id:dealer_id});
      }
      const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'fetch',
          url:'/Ts_ap_device/getAllData',
          areaName:areadevice?areadevice:'',
        });
      }
    },
    *deleteDevice({ap_id, url }, { call, put,select }) {  // eslint-disable-line
      let areadevice = yield select(state => state.app.areadevice);
      const params = {ap_id:ap_id};
      const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'fetch',
          url:'/Ts_ap_device/getAllData',
          areaName:areadevice?areadevice:'',

        });
        yield put({
          type: 'title',
          url:'/Ts_ap_device/getAPInformation',
        });
      }
    },
    *searchDevice({ ap_id,url }, { call, put,select }) {  // eslint-disable-line
      const params = {ap_id:ap_id};
      const todos = yield select(state => state.app.cdata);
      const data=[];
        todos.map(item=>{

          //ap_brand
        if((item.ap_mac&&item.ap_mac.includes(ap_id))||(item.ap_brand&&item.ap_brand.includes(ap_id))
          ||(item.dealer_name&&item.dealer_name.includes(ap_id))){
          data.push(item);
        }
      });
      //const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'dataseccess',
          data: data
        });
      }
    },
    *queryallnativedata({}, { call, put,select }) {  // eslint-disable-line
      const data = yield select(state => state.app.cdata);

      //const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'dataseccess',
          data: data
        });
      }
    },
    *searchAreaDevice({areaName,url}, { call, put,select }) {  // eslint-disable-line
      //let user_id = yield select(state => state.app.user_id);
      //areaName = Object.assign(areaName,{user_id: user_id});
      const data = yield call(query,url,areaName);
      //const data = yield call(query,url,params);
      if (data.data) {
        yield put({
          type: 'save',
          data: data.data,
          areadevice:areaName,
        });
      }
    },
    *queryDealer({areaName,url}, { call, put,select }) {  // eslint-disable-line
      const todos = yield select(state => state.app.cdealer);
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
      const todos = yield select(state => state.app.cdealer);
      //const data = yield call(query,url,params);
      if (todos) {
        yield put({
          type: 'querydealersuccess',
          data: todos
        });
      }
    },
    *queryonline({url}, { call, put,select }) {  // eslint-disable-line
      let todos = yield select(state => state.app.cdata);
      //const data = yield call(query,url,params);
      let data=[];
      todos.map(item=>{
        if (item.online==1){
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
    *queryoutline({url}, { call, put,select }) {  // eslint-disable-line
      let todos = yield select(state => state.app.cdata);
      //const data = yield call(query,url,params);
      let data=[];
      todos.map(item=>{
        if (item.online==0){
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
    *queryprevious({url}, { call, put,select }) {  // eslint-disable-line
      let todos = yield select(state => state.app.cdata);
      //const data = yield call(query,url,params);
      let data=[];
      todos.map(item=>{
        if (item.online==2){
          data.push(item);
        }
      });
      if (data) {
        yield put({
          type: 'dataseccess',
          data: data
        });
      }
    }
  },

  reducers: {
    titlesuccess(state, action) {
      return { ...state,  title:action.data};
    },
    save(state, action) {
      return { ...state,  data:action.data,cdata:action.data,showLoading:false,areadevice:action.areadevice };
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
      return { ...state, dealer:action.data,cdealer:action.data};
    },
    querydealersuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, dealer:action.data};
    },
    loading(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, showLoading:true};
    },

  },

};
