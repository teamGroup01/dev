import {query, create, update, remove} from '../services/requestData';

export default {

  namespace: 'index',

  state: {
    title:{
      custom_total:'',
      custom_new:'',
      custom_old:'',
      group_total:'',
      group_vip:'',
      group_old:'',
      group_repeat:'',
      areaName:'',
    },
    data:[{
    }],
    chat:{
    },
    map:[{}],
    showMapLoading:true,
    showChatLoading:true,
    max:'',
    table:[],
    ctable:[],
    count:[{custom_total:'', group_total:'', group_vip:'', group_old:'', group_repeat:''}],
    ccount:[{custom_total:'', group_total:'', group_vip:'', group_old:'', group_repeat:''}],
    area:'',
    titlename:'',
    groupdata:'',
    cgroupdata:'',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({
            type: 'loadall',
          });
          //dispatch({
          //  type: 'quertOwnDetail',
          //  url:'/Ts_user/getOwnInformation',
          //});
          dispatch({
            type: 'querycity',
            url:'/Ts_home/getHomeChatInformation',
            cityname:'',
          });
          dispatch({
            type: 'fetch',
            url:'/Ts_home/getHomeHeadInformation',
          });
          dispatch({
            type: 'map',
            url:'/Ts_home/getHomeMapInformation',
          });
          dispatch({
            type: 'table',
            url:'/Ts_home/getHomeBotTable',
            params:'',
          });
          dispatch({
            type: 'homearea',
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
    *fetch({ url }, { call, put }) {  // eslint-disable-line
      const {data} = yield call(query, url);
      if (data) {
        yield put({
        type: 'save',
        data: data,
      });
      }
    },
    *group({ url }, { call, put }) {  // eslint-disable-line

      const {data} = yield call(query, url);
      if (data) {
        yield put({
        type: 'groupsuccess',
        data: data,
      });
      }

    },
    *selectgroup({ url,group_id }, { call, put }) {  // eslint-disable-line
      let params='';
      if (group_id){
        params = Object.assign(params,{group_id: group_id});
      }
      const {data} = yield call(query, url,params);
      console.log(data);
      //if (data) {
      //  yield put({
      //  type: 'groupsuccess',
      //  data: data,
      //});
      //}

    },

    *table({ url ,params}, { call, put }) {  // eslint-disable-line
      const {data} = yield call(query, url,params);
      //console.log(data);
      if (data) {
        yield put({
        type: 'tablesuccess',
        data: data,
      });
      }
    },
    *quertOwnDetail({ url }, { call, put }) {  // eslint-disable-line
      const {data} = yield call(query, url);
      if (data) {
        yield put({
          type: 'querycity',
          url:'/Ts_home/getHomeChatInformation',
          cityname:'',
        });
        yield put({
          type: 'fetch',
          url:'/Ts_home/getHomeHeadInformation',
           });
        yield put({
          type: 'map',
          url:'/Ts_home/getHomeMapInformation',
        });
        yield put({
          type: 'homearea',
          url:'/Ts_home/getHomeBotTable',
          params:'',
        });


      }

          },

    *querycity({ url,cityname }, { call, put }) {  // eslint-disable-line
      let params='';
      if (cityname){
        params = Object.assign(params,{province: cityname});

      }
      const {data} = yield call(query, url,params);
      let role_id=data.user_role;
      if (data) {
        yield put({
          type: 'querycitysuccess',
          data: data,
          titlename:role_id<=2?cityname?'经销商列表':'全国经销商TOP10':'经销商列表',
        });
      }
    },
    *map({ url }, { call, put }) {  // eslint-disable-line
      const {data} = yield call(query, url);
      if (data) {
      yield put({
        type: 'querymapsuccess',
        data: data,
      });
      }
    },
    *homearea({ url ,params}, { call, put }) {  // eslint-disable-line
      const {data} = yield call(query, url,params);
      if (data) {
      yield put({
        type: 'queryareasuccess',
        data: data,
      });
      }
    },
    *querytable({ dealer_name }, { call, put,select }) {  // eslint-disable-line
      //const {data} = yield call(query, url);
      //const {data} = yield call(query, url);
      let dealer_data = yield select(state => state.index.ctable);
      let data=[];
      let count=[{custom_total:'', group_total:'', group_vip:'', group_old:'', group_repeat:''}]
      let sum1=0;
      let sum2=0;
      let sum3=0;
      let sum4=0;
      let sum5=0;
      dealer_data.map(item=>{
        dealer_name = dealer_name.toUpperCase();
        if (item.dealer_name&&item.dealer_name.includes(dealer_name)||item.dealer_code&&item.dealer_code.includes(dealer_name)){
          data.push(item);
        }
      });
      data.map(item=>{
        sum1+=item.custom_total;
        sum2+=item.group_total;
        sum3+=item.group_vip;
        sum4+=item.group_old;
        sum5+=item.group_repeat;
      });
      count[0].custom_total=sum1;
      count[0].group_total=sum2;
      count[0].group_vip=sum3;
      count[0].group_old=sum4;
      count[0].group_repeat=sum5;
      if (data) {
      yield put({
        type: 'querytablesuccess',
        data: data,
        count:count,
      });
      }
    },
    *querynativetable({}, { call, put,select }) {  // eslint-disable-line
      //const {data} = yield call(query, url);
      let dealer_data = yield select(state => state.index.ctable);
      let ccount = yield select(state => state.index.ccount);
      if (dealer_data) {
      yield put({
        type: 'querytablesuccess',
        data: dealer_data,
        count:ccount,
      });
      }
    },
    *querygroup({group_name}, { call, put,select }) {  // eslint-disable-line
      //const {data} = yield call(query, url);
      let group_data = yield select(state => state.index.cgroupdata);
      let data=[];
      group_data.map(item=>{
        if (item.group_name&&item.group_name.includes(group_name)){
          data.push(item);
        }
      });
      if (data) {
      yield put({
        type: 'querygroupsuccess',
        data: data,
      });
      }
    },
    *querynativegroup({}, { call, put,select }) {  // eslint-disable-line
      //const {data} = yield call(query, url);
      let group_data = yield select(state => state.index.cgroupdata);
      if (group_data) {
      yield put({
        type: 'querygroupsuccess',
        data: group_data,
      });
      }
    },

  },

  reducers: {
    save(state, action) {
      return { ...state, title:action.data };
    },
    querycitysuccess(state, action) {
      return { ...state, chat:action.data,showChatLoading:false,titlename:action.titlename };
    },
    querymapsuccess(state, action) {
      //console.log(action.data);
      let data=action.data;
      let max;
      data.map((item,index)=>{
          if (index==0){
            max=item.value;
          }else{
            if (item.value>=max){
              max=item.value
            }
          }
      });
      max=parseInt(max*0.1+max+10);
      //console.log(action.data);
      //let map_data=[];
      //action.data.map(item=>{
      //  map_data.push({"name":item.name,"value":item.value});
      //});
      return { ...state, map:action.data,showMapLoading:false,max:max};
    },
    queryseccess(state, action) {
      //console.log(action.data);

      return { ...state, showLoading:false };
    },
    loadchat(state, action) {
      //console.log(action.data);

      return { ...state, showChatLoading:true };
    },
    loadall(state, action) {
      //console.log(action.data);

      return { ...state, showChatLoading:true,showMapLoading:true };
    },
    tablesuccess(state, action) {
      //console.log(action.data);
      let count =action.data.count;
      let mcount=[];
      mcount.push(count);
      return { ...state,table:action.data.data,ctable:action.data.data,count:mcount,ccount:mcount};
    },
    querytablesuccess(state, action) {
      //console.log(action.data);
      let count=action.count;
      return { ...state,table:action.data,count:count};
    },
    queryareasuccess(state, action) {
      //console.log(action.data);

      return { ...state,area:action.data};
    },
    groupsuccess(state, action) {
      //console.log(action.data);

      return { ...state,groupdata:action.data,cgroupdata:action.data};
    },
    querygroupsuccess(state, action) {
      //console.log(action.data);

      return { ...state,groupdata:action.data};
    },
  },

};
