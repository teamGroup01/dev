import {query, create, update, remove} from '../services/requestData';
import { setDealertid } from '../constants';
import { USER_DETAIL,DEALER_DETAIL,GROUP_DETAIL,AREA} from '../constants';

export default {

  namespace: 'realdata',

  state: {
    dealer:[{}],
    user_role:0,
    cdealer:[{}],
    chart:{},
    defaultdealer:'',
    hour:[],
    count:[],
    table:[{}],
    dealerName:'',
    style:'3',
    showLoading:true,
    radioname:'高意向潜客（批次）',
    area:[],
    selectArea:'',
    group_id:'',
    cgroupdata:'',
    groupdata:'',
    groupName:'',
    areaName:''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/realpage') {
          //if (query.dealer_name){
          dispatch({
            type: 'loading',
            style: 3
          });
          dispatch({
            type: 'dealer',
            url:'/Ts_dealer/getAllData',
            dealer_id:query.dealer_name,
          });
          dispatch({
            type: 'homearea',
            url:'/Ts_area/getAreaData',
          });
          dispatch({
            type: 'group',
            url:'/Ts_group/getAllGroup',
          });
          //dispatch({
          //  type: 'quertOwnDetail',
          //  url:'/Ts_user/getOwnInformation',
          //  dealer_id:query.dealer_name,
          //});

          //}else{
          //  dispatch({
          //    type: 'dealer',
          //    url:'/Ts_dealer/getAllData',
          //  });
          //}
          //dispatch({
          //  type: 'querytype',
          //  url: '/Apdata_cnt_day/getChatData',
          //});

        }
      });
    },
  },

  effects: {
    *fetch({url,style }, { call, put }) {  // eslint-disable-line
      console.log('fetch');
      const data = yield call(query,url);
      if (data) {
        yield put({
          type: 'save',
          data: data.data,
        });
      }
    },
    *quertOwnDetail({ url ,dealer_id}, { call, put }) {  // eslint-disable-line
      console.log('quertOwnDetail');
      const params = {};
      const {data} = yield call(query, url);
      if (data) {
        yield put({
          type: 'dealer',
          url:'/Ts_dealer/getAllData',
          dealer_id:dealer_id,
        });

      }

    },
    *querytype({ url,style='3',dealer_id ,first}, { call, put ,select}) {  // eslint-disable-line
      console.log('querytype');
      let radioArray = ['展厅流量（人次）', '展厅流量（批次）', '高意向潜客（批次）', '当日二次到店潜客（批次）', '三个月内二次到店潜客（批次）'];
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
      let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      let da = year + '' + month + '' + day;
      let params = {};
      let groupName = '';
      let areaName = undefined;
      let group_id = '';
      let area = '';
      if (first==1){
        style = yield select(state => state.realdata.style);
        params = {dealer_id:dealer_id,date:da};
        params['type'] = style;
      }else {
        dealer_id = yield select(state => state.realdata.defaultdealer);
        group_id = yield select(state => state.realdata.group_id);
        area = yield select(state => state.realdata.selectArea);
        params = {type: style, date: da};
        if (group_id != undefined && group_id != '') {
          params['group_id'] = group_id;
          groupName = yield select(state => state.realdata.groupName);
        }
        if (area != undefined && area != '') {
          if (area['value'] != '全国') {
            if (area['barea_id']) {
              params['barea_id'] = area['barea_id'];
            }
            if (area['sarea_id']) {
              params['sarea_id'] = area['sarea_id'];
            }
            if (area['province']) {
              params['province'] = area['province'];
            }
          } else {
            params['barea_id'] = '全国';
          }
          areaName = area['value'];
        }
        if (dealer_id != undefined && dealer_id != '') {
          params['dealer_id'] = dealer_id;
        }
      }

      const data = yield call(query, url, params);
      //if (data) {
      //  yield put({
      //    type: 'defaultdealer',
      //    dealer_id:dealer_id,
      //    style:style,
      //  });
      yield put({
        type: 'querytypesuccess',
        dealer_id: dealer_id,
        style: style,
        group_id: group_id,
        data: data.data,
        radioname: radioArray[style - 1],
        selectArea: area,
        groupName: groupName,
        areaName: areaName
      });
      //}
    },
    *querytypedata({ url,style='3',dealer_id,group_id,selectArea,groupName,first,fdata}, { call, put ,select}) {  // eslint-disable-line
      console.log('querytypedata');

      const date = new Date();
      let year=date.getFullYear();
      let month=date.getMonth()<9?'0'+(date.getMonth()+1):(date.getMonth()+1);
      let day=date.getDate()<10?'0'+date.getDate():date.getDate();
      let da=year+''+month+''+day;
      let params = {type:style,date:da};
      let areaName = undefined;
      if (dealer_id && dealer_id != '') {
        params['dealer_id'] = dealer_id;
      } else {
        if (group_id && group_id != '') {
          params['group_id'] = group_id;
        }
        if (selectArea && selectArea != '') {
          if (selectArea['value'] != '全国') {
            if (selectArea['barea_id']) {
              params['barea_id'] = selectArea['barea_id'];
            }
            if (selectArea['sarea_id']) {
              params['sarea_id'] = selectArea['sarea_id'];
            }
            if (selectArea['province']) {
              params['province'] = selectArea['province'];
            }
          } else {
            params['barea_id'] = '全国';
          }
          areaName = selectArea['value'];
        }
      }

      const data = yield call(query,url,params);
        yield put({
          type: 'querytypedatasuccess',
          dealer_id:dealer_id,
          group_id: group_id,
          groupName:groupName,
          selectArea: selectArea,
          areaName: areaName,
          style:style,
          data: data.data,
          fdata:fdata,
          showLoading:false,
        });
      //}
    },
    *queryarea({ url,payload }, { call, put }) {  // eslint-disable-line
      console.log('queryarea');

      const params = {};
      const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'save',
          data: data.data
        });
      }
    },
    *homearea({ url ,params}, { call, put }) {  // eslint-disable-line
      console.log('homearea');
      const {data} = yield call(query, url,params);
      if (data) {
        yield put({
          type: 'queryareasuccess',
          data: data,
        });
      }
    },
    *dealer({url,dealer_id}, { call, put ,select}) {  // eslint-disable-line
      console.log('dealer');

      let data = JSON.parse(localStorage.getItem(DEALER_DETAIL));

      let groupName = '';
      let group_id = '';
      let selectArea = '';


      if (!dealer_id) {
        groupName = JSON.parse(localStorage.getItem('groupName'));
        dealer_id = JSON.parse(localStorage.getItem('dealerID'));
        group_id = JSON.parse(localStorage.getItem('groupID'));
        selectArea = JSON.parse(localStorage.getItem('selectArea'));
        if (!dealer_id && !group_id && !selectArea) {
          dealer_id = 44;
        }
      } else {
        console.log(dealer_id);
        localStorage.setItem('groupName', JSON.stringify(''));
        localStorage.setItem('groupID', JSON.stringify(''));
        localStorage.setItem('selectArea', JSON.stringify(''));
        localStorage.setItem('dealerID', JSON.stringify(dealer_id));
      }

      //const data = yield call(query,url);
      if (data) {
        //yield put({
        //  type: 'dealersuccess',
        //  data: data.data,
        //});
        yield put({
          type: 'querytypedata',
          url: '/Apdata_cnt_hour/getChatData',
          dealer_id:dealer_id,
          group_id:group_id,
          groupName: groupName,
          selectArea: selectArea,
          first:1,
          fdata: data,
        });
      }
    },
    *queryDealer({areaName, groupID, area, url}, { call, put,select }) {  // eslint-disable-line
      console.log('queryDealer');

      const todos = yield select(state => state.realdata.cdealer);

      const data=[];
      if (areaName) {
        todos.map(item=> {
          //ap_brand
          var dealerName = areaName.toUpperCase();
          if ((item.dealer_name && item.dealer_name.includes(dealerName)) || (item.dealer_code && item.dealer_code.includes(dealerName)) ||
            (item.province && item.province.includes(dealerName)) || (item.address && item.address.includes(dealerName)) ||
            (item.install_desc && item.install_desc.includes(dealerName))
          ) {
            data.push(item);
          }
        });
      }
      if (groupID) {
        todos.map(item=> {
          if (item.group_id == groupID) {
            data.push(item);
          }
        });
      }
      if (area) {
        if (area['value'] != '全国') {
          todos.map(item=> {
            if (area['barea_id']) {
              if (item.barea_id == area['barea_id']) {
                data.push(item);
              }
            }
            if (area['sarea_id']) {
              if (item.sarea_id == area['sarea_id']) {
                data.push(item);
              }
            }
            if (area['province']) {
              if (item.province == area['province']) {
                data.push(item);
              }
            }
          });
        } else {
          todos.map(item=> {
            data.push(item);
          });
        }
      }
      if (data) {
        yield put({
          type: 'querydealersuccess',
          data: data,
          dealerName: areaName
        });
      }
    },
    *querynativeDealer({areaName,url}, { call, put,select }) {  // eslint-disable-line
      console.log('querynativeDealer');

      const todos = JSON.parse(localStorage.getItem(DEALER_DETAIL));

      var groupID = JSON.parse(localStorage.getItem('groupID'));
      var area = JSON.parse(localStorage.getItem('selectArea'));

      const data=[];

      if (groupID) {
        todos.map(item=> {
          if (item.group_id == groupID) {
            data.push(item);
          }
        });
      }
      if (area) {
        if (area['value'] != '全国') {
          todos.map(item=> {
            if (area['barea_id']) {
              if (item.barea_id == area['barea_id']) {
                data.push(item);
              }
            }
            if (area['sarea_id']) {
              if (item.sarea_id == area['sarea_id']) {
                data.push(item);
              }
            }
            if (area['province']) {
              if (item.province == area['province']) {
                data.push(item);
              }
            }
          });
        } else {
          todos.map(item=> {
            data.push(item);
          });
        }
      }

      //const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'querydealersuccess',
          data: data
        });
      }
    },
    *focusDealer({},{ call, put,select }) {

      let todos = JSON.parse(localStorage.getItem(DEALER_DETAIL));
      let groupID = JSON.parse(localStorage.getItem('groupID'));
      let area = JSON.parse(localStorage.getItem('selectArea'));

      const data=[];

      if (groupID) {
        todos.map(item=> {
          if (item.group_id == groupID) {
            data.push(item);
          }
        });
      }
      if (area) {
        todos.map(item=> {
          if (area['barea_id']) {
            if (item.barea_id == area['barea_id']) {
              data.push(item);
            }
          }
          if (area['sarea_id']) {
            if (item.sarea_id == area['sarea_id']) {
              data.push(item);
            }
          }
          if (area['province']) {
            if (item.province == area['province']) {
              data.push(item);
            }
          }
        });
      }

      if (data.length != 0) {
        yield put({
          type: 'foucusSuccess',
          data: data
        });
      } else {
        yield put({
          type: 'foucusSuccess',
          data: todos
        });
      }
    },
    *selectGroup({ url,group_id}, { call, put ,select}) {  // eslint-disable-line
      console.log('selectGroup');
      let radioArray = ['展厅流量（人次）', '展厅流量（批次）', '高意向潜客（批次）', '当日二次到店潜客（批次）', '三个月内二次到店潜客（批次）'];
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
      let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      let da = year + '' + month + '' + day;
      let style = yield select(state => state.realdata.style);
      let areaName = undefined;

      let params = {type:style,date:da};

      if (group_id != '') {
        params['group_id'] = group_id;
      }

      //if (area != undefined && area != '') {
      //  if (area['barea_id']) {
      //    params['barea_id'] = area['barea_id'];
      //  }
      //  if (area['sarea_id']) {
      //    params['sarea_id'] = area['sarea_id'];
      //  }
      //  if (area['province']) {
      //    params['province'] = area['province'];
      //  }
      //  areaName = area['value'];
      //}

      const data = yield call(query, url, params);

      yield put({
        type: 'queryDealer',
        groupID: group_id
      });
      yield put({
        type: 'selectGroupSuccess',
        dealer_id: '',
        style: style,
        group_id: group_id,
        data: data.data,
        radioname: radioArray[style - 1],
        selectArea: '',
        areaName: areaName
      });
      //}
    },
    *selectArea({ url,area}, { call, put ,select}) {  // eslint-disable-line
      console.log('selectArea');
      let radioArray = ['展厅流量（人次）', '展厅流量（批次）', '高意向潜客（批次）', '当日二次到店潜客（批次）', '三个月内二次到店潜客（批次）'];
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
      let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      let da = year + '' + month + '' + day;

      let group_id = yield select(state => state.realdata.group_id);
      let style = yield select(state => state.realdata.style);
      let groupName = yield select(state => state.realdata.groupName);
      let areaName = undefined;
      let params = {type:style,date:da};

      //if (group_id != undefined && group_id != '') {
      //  params['group_id'] = group_id;
      //}

      if (area != '') {
        if (area['value'] != '全国') {
          if (area['barea_id']) {
            params['barea_id'] = area['barea_id'];
          }
          if (area['sarea_id']) {
            params['sarea_id'] = area['sarea_id'];
          }
          if (area['province']) {
            params['province'] = area['province'];
          }
        } else {
          params['barea_id'] = '全国';
        }
        areaName = area['value'];
      }

      const data = yield call(query, url, params);
      //if (data) {
      //  yield put({
      //    type: 'defaultdealer',
      //    dealer_id:dealer_id,
      //    style:style,
      //  });
      yield put({
        type: 'queryDealer',
        area: area
      });
      yield put({
        type: 'querytypesuccess',
        dealer_id: '',
        style: style,
        group_id: '',
        data: data.data,
        radioname: radioArray[style - 1],
        selectArea: area,
        areaName: areaName,
        groupName: ''
      });
      //}
    },
    *querygroup({group_name}, { call, put,select }) {  // eslint-disable-line
      //const {data} = yield call(query, url);
      let group_data = yield select(state => state.realdata.cgroupdata);
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
          groupName:group_name
        });
      }
    },
    *querynativegroup({}, { call, put,select }) {  // eslint-disable-line
      //const {data} = yield call(query, url);
      let group_data = yield select(state => state.realdata.cgroupdata);
      if (group_data) {
        yield put({
          type: 'querygroupsuccess',
          data: group_data,
          groupName:''
        });
      }
    },
    //初始化 读取集团信息
    *group({ url }, { call, put }) {  // eslint-disable-line
      const {data} = yield call(query, url);
      if (data) {
        yield put({
          type: 'groupsuccess',
          data: data,
        });
      }
    }
  },

  reducers: {
    save(state, action) {

      return { ...state, data:action.data};
    },
    dealersuccess(state, action) {
      //alert(action.data[0].dealer_id);

      return { ...state, dealer:action.data,cdealer:action.data,defaultdealer:action.defaultdealer };
    },
    querydealersuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, dealer:action.data, dealerName:action.dealerName};
    },
    querytypesuccess(state, action) {
      //alert(action.data[0].dealer_id);
      //console.log(action.data);
      let time=[8,9,10,11,12,13,14,15,16,17,18,19];
      let time_data=['8-9点','9-10点','10-11点','11-12点','12-13点','13-14点','14-15点','15-16点','16-17点','17-18点','18-19点','19点往后'];
      let sum= [0,0,0,0,0,0,0,0,0,0,0,0];
      let count=action.data.count;
      action.data.hour.map((item,index)=>{
        sum[item-8]=count[index];
      });
      for (let a = 0; a < 12; a++) {
        if (sum[11 - a] == 0) {
          sum.pop();
        } else {
          break;
        }
      }

      localStorage.setItem('groupName', JSON.stringify(action.groupName));
      localStorage.setItem('dealerID', JSON.stringify(action.dealer_id));
      localStorage.setItem('groupID', JSON.stringify(action.group_id));
      localStorage.setItem('selectArea', JSON.stringify(action.selectArea));

      return { ...state, dealerName:action.data.dealerName,hour:time_data,count:sum,table:action.data.table,
        style:action.style,defaultdealer:action.dealer_id,showLoading:false,radioname:action.radioname,
        selectArea:action.selectArea,group_id:action.group_id,user_role:action.data.user_role,
      areaName:action.areaName,groupName:action.groupName};
    },
    querytypedatasuccess(state, action) {
      //alert(action.data[0].dealer_id);
      //console.log(action.data);
      let time=[8,9,10,11,12,13,14,15,16,17,18,19];
      let time_data=['8-9点','9-10点','10-11点','11-12点','12-13点','13-14点','14-15点','15-16点','16-17点','17-18点','18-19点','19点往后'];
      let sum= [0,0,0,0,0,0,0,0,0,0,0,0];
      let count=action.data.count;
      action.data.hour.map((item,index)=>{
        sum[item-8]=count[index];
      });
      for (let a = 0; a < 12; a++) {
        if (sum[11 - a] == 0) {
          sum.pop();
        } else {
          break;
        }
      }
      return { ...state, dealerName:action.data.dealerName,hour:time_data,count:sum,table:action.data.table,
        style:action.style,defaultdealer:action.dealer_id,
        dealer:action.fdata,cdealer:action.fdata,showLoading:action.showLoading,radioname:'高意向潜客（批次）',
        user_role:action.data.user_role,areaName:action.areaName,groupName:action.groupName,
        selectArea:action.selectArea,group_id:action.group_id};
    },
    loading(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, style:action.style, showLoading:true,
      };
    },
    selectGroupSuccess(state, action) {
      //alert(action.data[0].dealer_id);
      //console.log(action.data);
      let time=[8,9,10,11,12,13,14,15,16,17,18,19];
      let time_data=['8-9点','9-10点','10-11点','11-12点','12-13点','13-14点','14-15点','15-16点','16-17点','17-18点','18-19点','19点往后'];
      let sum= [0,0,0,0,0,0,0,0,0,0,0,0];
      let count=action.data.count;
      action.data.hour.map((item,index)=>{
        sum[item-8]=count[index];
      });
      for (let a = 0; a < 12; a++) {
        if (sum[11 - a] == 0) {
          sum.pop();
        } else {
          break;
        }
      }

      localStorage.setItem('dealerID', JSON.stringify(action.dealer_id));
      localStorage.setItem('groupID', JSON.stringify(action.group_id));
      localStorage.setItem('selectArea', JSON.stringify(action.selectArea));

      return { ...state, dealerName:action.data.dealerName,hour:time_data,count:sum,table:action.data.table,
        style:action.style,defaultdealer:action.dealer_id,showLoading:false,radioname:action.radioname,
        selectArea:action.selectArea,group_id:action.group_id,user_role:action.data.user_role,
        areaName:action.areaName};
    },
    queryareasuccess(state, action) {
      //console.log(action.data);

      return { ...state,area:action.data};
    },
    //更新选择框下面显示的集团信息 赋值cgroupdata
    groupsuccess(state, action) {
      //console.log(action.data);

      return { ...state,groupdata:action.data,cgroupdata:action.data};
    },
    querygroupsuccess(state, action) {
      //console.log(action.data);

      localStorage.setItem('groupName', JSON.stringify(action.groupName));

      return { ...state,groupdata:action.data,dealerName:'',groupName:action.groupName};
    },
    foucusSuccess(state, action) {
      return { ...state, dealer: action.data, cdealer: action.data};
    }
  }

};
