import {query, create, update, remove} from '../services/requestData';
import { USER_DETAIL,DEALER_DETAIL,GROUP_DETAIL,AREA} from '../constants';

export default {

  namespace: 'time',

  state: {
    role:'1',
    dealer:'',
    cdealer:'',
    defaultdealer:'',
    dealerName:'',
    apdata:'',
    time:'',
    showLoading:true,
    area:'',
    selectArea:{},
    group_id:'',
    cgroupdata:'',
    groupdata:'',
    user_role:0,
    groupName:'',
    areaName:''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/timepage') {
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
    *fetch({ dealer_id,url,firstin=0 }, { call, put,select }) {  // eslint-disable-line
      let params;
      if (firstin==1){
        params = {dealer_id:dealer_id};
      }else{
        let time = yield select(state => state.time.time);
        params = {dealer_id:dealer_id,startTime:time[0],endTime:time[1]};
      }

      let data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'save',
          data:data.data,
          dealer_id:dealer_id,
          showLoading:false,
          group_id:'',
          selectArea:'',
          groupName:'',
          areaName:undefined
        });
        //yield put({
        //  type: 'defaultdealer',
        //});
      }
      },
    *fetchdata({ dealer_id,group_id,selectArea,groupName,url,firstin=0,fdata }, { call, put,select }) {  // eslint-disable-line
      let params;
      if (firstin==1){
        params = {};
      }else{
        let time = yield select(state => state.time.time);
        params = {startTime:time[0],endTime:time[1]};
      }

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

      let data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'savefetch',
          data:data.data,
          dealer_id:dealer_id,
          showLoading:false,
          group_id: group_id,
          groupName:groupName,
          selectArea: selectArea,
          areaName: areaName,
          fdata:fdata
        });

        //yield put({
        //  type: 'defaultdealer',
        //});
      }
    },
    *quertRange({ url,startTime,endTime,payload }, { call, put,select }) {  // eslint-disable-line
      let dealer_id = yield select(state => state.time.defaultdealer);
      let group_id = yield select(state => state.time.group_id);
      let area = yield select(state => state.time.selectArea);
      let groupName = '';
      let areaName = undefined;
      let params = {startTime:startTime,endTime:endTime};
      if (dealer_id != undefined && dealer_id != '') {
        params['dealer_id'] = dealer_id;
      } else {
        if (group_id != undefined && group_id != '') {
          groupName = yield select(state => state.time.groupName);
          params['group_id'] = group_id;
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

          }
          areaName = area['value'];
        }
      }
      let data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'save',
          data: data.data,
          dealer_id:dealer_id,
          showLoading:false,
          group_id:group_id,
          selectArea: area,
          groupName: groupName,
          areaName: areaName
        });

      }
    },
    *dealer({url}, { call, put,select }) {  // eslint-disable-line
      //const data = yield call(query,url);
      let data = JSON.parse(localStorage.getItem(DEALER_DETAIL));

      let groupName = JSON.parse(localStorage.getItem('groupName'));
      let dealer_id = JSON.parse(localStorage.getItem('dealerID'));
      let group_id = JSON.parse(localStorage.getItem('groupID'));
      let selectArea = JSON.parse(localStorage.getItem('selectArea'));

      if (!dealer_id && !group_id && !selectArea) {
        dealer_id = 44;
      }

      if (data) {
        yield put({
          type: 'fetchdata',
          url:'Apdata_cnt_length/getLengthData',
          dealer_id:dealer_id,
          group_id:group_id,
          groupName: groupName,
          selectArea: selectArea,
          firstin:1,
          fdata: data
        });
      }
    },
    *queryDealer({areaName, groupID, area, url}, { call, put,select }) {  // eslint-disable-line

      //let todos = JSON.parse(localStorage.getItem(DEALER_DETAIL));

      const todos = yield select(state => state.time.cdealer);

      const data=[];

      if (areaName) {
        todos.map(item=> {
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

      if (data) {
        yield put({
          type: 'querydealersuccess',
          data: data,
          dealerName: ''
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
    *querygroup({group_name}, { call, put,select }) {  // eslint-disable-line
      //const {data} = yield call(query, url);
      let group_data = yield select(state => state.time.cgroupdata);
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
      let group_data = yield select(state => state.time.cgroupdata);
      if (group_data) {
        yield put({
          type: 'querygroupsuccess',
          data: group_data,
          groupName:''
        });
      }
    },
    *selectGroup({ url,group_id,payload }, { call, put,select }) {  // eslint-disable-line
      let time = yield select(state => state.time.time);
      let areaName = undefined;
      let params = {startTime:time[0],endTime:time[1]};
      if (group_id != '') {
        params['group_id'] = group_id;
      }
      let data = yield call(query,url,params);

      yield put({
        type: 'queryDealer',
        groupID: group_id
      });

      if (data) {
        yield put({
          type: 'saveGroup',
          data: data.data,
          group_id:group_id,
          showLoading:false,
          dealer_id:'',
          selectArea: '',
          areaName: areaName
        });

      }
    },
    *selectArea({ url,area,payload }, { call, put,select }) {  // eslint-disable-line
      let time = yield select(state => state.time.time);
      let group_id = yield select(state => state.time.group_id);
      let groupName = '';
      let areaName = undefined;
      let params = {startTime:time[0],endTime:time[1]};
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

      //if (group_id != undefined && group_id != '') {
      //  groupName = yield select(state => state.time.groupName);
      //  params['group_id'] = group_id;
      //}

      let data = yield call(query,url,params);
      if (data) {

        yield put({
          type: 'queryDealer',
          area: area
        });

        yield put({
          type: 'save',
          data: data.data,
          selectArea:area,
          showLoading:false,
          dealer_id:'',
          group_id:'',
          groupName:'',
          areaName:areaName
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
    },
    //初始化 读取区域信息
    *homearea({ url ,params}, { call, put }) {  // eslint-disable-line
      const {data} = yield call(query, url,params);
      if (data) {
        yield put({
          type: 'queryareasuccess',
          data: data,
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      let time=['10分钟以下','10分钟-20分钟','20分钟-30分钟','30分钟-45分钟','45分钟-60分钟','1小时-1.5小时','1.5小时-2小时'];
      let min=[];
      let total=[];
      let date=[];
      //let start=action.data.selectTime[0].split('T')[0].split('-')[0]+''
      //  +action.data.selectTime[0].split('T')[0].split('-')[1]+''
      //  +action.data.selectTime[0].split('T')[0].split('-')[2];
      date.push(action.data.time[0].split('T')[0].split('-')[0]+''+action.data.time[0].split('T')[0].split('-')[1]+''+action.data.time[0].split('T')[0].split('-')[2]);
      date.push(action.data.time[1].split('T')[0].split('-')[0]+''+action.data.time[1].split('T')[0].split('-')[1]+''+action.data.time[0].split('T')[0].split('-')[2]);
      action.data.apdata.map(item=>{
        if (item.range<8){
          min[item.range-1] = time[item.range-1];
        }
        total[item.range-1] = item.group_total;
      });


      localStorage.setItem('groupName', JSON.stringify(action.groupName));
      localStorage.setItem('dealerID', JSON.stringify(action.dealer_id));
      localStorage.setItem('groupID', JSON.stringify(action.group_id));
      localStorage.setItem('selectArea', JSON.stringify(action.selectArea));

      return { ...state, apdata:{min:min,total:total},dealerName:action.data.dealerName,
        time:action.data.time,defaultdealer:action.dealer_id,showLoading:action.showLoading,
        selectArea:action.selectArea,group_id:action.group_id,user_role:action.data.user_role,
        groupName:action.groupName,areaName:action.areaName};
    },

    savefetch(state, action) {

      console.log('fetch');

      let time=['10分钟以下','10分钟-20分钟','20分钟-30分钟','30分钟-45分钟','45分钟-60分钟','1小时-1.5小时','1.5小时-2小时'];
      let min=[];
      let total=[];
      let date=[];
      //let start=action.data.selectTime[0].split('T')[0].split('-')[0]+''
      //  +action.data.selectTime[0].split('T')[0].split('-')[1]+''
      //  +action.data.selectTime[0].split('T')[0].split('-')[2];
      date.push(action.data.time[0].split('T')[0].split('-')[0]+''+action.data.time[0].split('T')[0].split('-')[1]+''+action.data.time[0].split('T')[0].split('-')[2]);
      date.push(action.data.time[1].split('T')[0].split('-')[0]+''+action.data.time[1].split('T')[0].split('-')[1]+''+action.data.time[0].split('T')[0].split('-')[2]);
      action.data.apdata.map(item=>{
        if (item.range<8){
          min[item.range-1] = time[item.range-1];
        }
        total[item.range-1] = item.group_total;
      });
      return { ...state, apdata:{min:min,total:total},dealerName:action.data.dealerName,
        time:action.data.time,defaultdealer:action.dealer_id,showLoading:action.showLoading,
        dealer:action.fdata,cdealer:action.fdata,
        selectArea:action.selectArea,group_id:action.group_id,user_role:action.data.user_role,
        groupName:action.groupName,areaName:action.areaName
      };
    },

    saveGroup(state, action) {
      let time=['10分钟以下','10分钟-20分钟','20分钟-30分钟','30分钟-45分钟','45分钟-60分钟','1小时-1.5小时','1.5小时-2小时'];
      let min=[];
      let total=[];
      let date=[];
      //let start=action.data.selectTime[0].split('T')[0].split('-')[0]+''
      //  +action.data.selectTime[0].split('T')[0].split('-')[1]+''
      //  +action.data.selectTime[0].split('T')[0].split('-')[2];
      date.push(action.data.time[0].split('T')[0].split('-')[0]+''+action.data.time[0].split('T')[0].split('-')[1]+''+action.data.time[0].split('T')[0].split('-')[2]);
      date.push(action.data.time[1].split('T')[0].split('-')[0]+''+action.data.time[1].split('T')[0].split('-')[1]+''+action.data.time[0].split('T')[0].split('-')[2]);
      action.data.apdata.map(item=>{
        if (item.range<8){
          min[item.range-1] = time[item.range-1];
        }
        total[item.range-1] = item.group_total;
      });

      localStorage.setItem('dealerID', JSON.stringify(action.dealer_id));
      localStorage.setItem('groupID', JSON.stringify(action.group_id));
      localStorage.setItem('selectArea', JSON.stringify(action.selectArea));

      return { ...state, apdata:{min:min,total:total},dealerName:action.data.dealerName,
        time:action.data.time,defaultdealer:action.dealer_id,showLoading:action.showLoading,
        selectArea:action.selectArea,group_id:action.group_id,user_role:action.data.user_role,
        areaName:action.areaName};
    },

    dealersuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, dealer:action.data,cdealer:action.data };
    },
    querydealersuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, dealer:action.data, dealerName:action.dealerName};
    },
    defaultdealer(state, action) {
      //alert(action.data[0].dealer_id);

      localStorage.setItem('dealerID', JSON.stringify(action.dealer_id));

      return { ...state, defaultdealer:action.dealer_id};
    },
    loadingSuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, showLoading:false};
    },
    loading(state, action) {
      //alert(action.data[0].dealer_id);
      return { ...state, showLoading:true};
    },
    querygroupsuccess(state, action) {
      //console.log(action.data);

      localStorage.setItem('groupName', JSON.stringify(action.groupName));

      return { ...state,groupdata:action.data,dealerName:'',groupName:action.groupName};
    },
    //更新选择框下面显示的集团信息 赋值cgroupdata
    groupsuccess(state, action) {
      //console.log(action.data);

      return { ...state,groupdata:action.data,cgroupdata:action.data};
    },
    queryareasuccess(state, action) {
      //console.log(action.data);

      return { ...state,area:action.data};
    },
    foucusSuccess(state, action) {
      return { ...state, dealer: action.data, cdealer: action.data};
    }
  }

};
