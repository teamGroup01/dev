import {query, create, update, remove} from '../services/requestData';
import { USER_DETAIL,DEALER_DETAIL,GROUP_DETAIL,AREA} from '../constants';

export default {

  namespace: 'trend',

  state: {
    date:[],
    count:[],
    dealer:[{}],
    cdealer:[{}],
    defaultdealer:'',
    dealerName:'',
    table:[],
    style:'3',
    dateType:'',
    selectTime:[],
    showLoading:true,
    radioname:'高意向潜客（批次）',
    area:'',
    selectArea:{},
    group_id:'',
    cgroupdata:'',
    groupdata:'',
    user_role:0,
    areaName:'',
    groupName:''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/trendpage') {
          //dispatch({
          //  type: 'fetch',
          //  url: 'Ts_area/getTrendData'
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
          //dispatch({
          //  type: 'quertOwnDetail',
          //  url:'/Ts_user/getOwnInformation',
          //});
          dispatch({
            type: 'loading',
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
    //选择dealer 更新数据
    *fetch({url, dealer_id,firstin=0}, { call, put,select }) {  // eslint-disable-line
      //const todos = yield select(state => state.realdata.defaultdealer);

      let style = style = yield select(state => state.trend.style);
      let dateType = yield select(state => state.trend.dateType);

      let params;
      if (firstin==1){
        params = {dealer_id:dealer_id,type:style,dateType:dateType};
      }else{
        let time = yield select(state => state.trend.selectTime);
        params = {dealer_id:dealer_id,type:style,dateType:dateType,startTime:time[2],endTime:time[1]};
      }


      const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'save',
          data: data.data,
          style:style,
          dateType:dateType,
          dealer_id:dealer_id,
          group_id: '',
          selectArea: '',
          areaName:undefined,
          groupName:''
        });
      }
    },
    //第一次查找全部dealer
    *fetchdata({url, dealer_id,group_id,selectArea,groupName,style='3',dateType='day' ,firstin=0,fdata}, { call, put,select }) {  // eslint-disable-line
      //const todos = yield select(state => state.realdata.defaultdealer);
      let params;
      if (firstin==1){
        params = {type:style,dateType:dateType};
      }else{
        let time = yield select(state => state.trend.selectTime);
        params = {type:style,dateType:dateType,startTime:time[2],endTime:time[1]};
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

      const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'fetchsave',
          data: data.data,
          style:style,
          dateType:dateType,
          dealer_id:dealer_id,
          group_id: group_id,
          groupName:groupName,
          selectArea: selectArea,
          areaName: areaName,
          fdata:fdata
        });
      }
    },
    *querytype({ url,style,dateType }, { call, put,select }) {  // eslint-disable-line
      let radioArray=['展厅流量（人次）', '展厅流量（批次）', '高意向潜客（批次）', '当日二次到店潜客（批次）', '三个月内二次到店潜客（批次）'];
      let time = yield select(state => state.trend.selectTime);
      let  dealer_id = yield select(state => state.trend.defaultdealer);
      let group_id = yield select(state => state.trend.group_id);
      let selectArea = yield select(state => state.trend.selectArea);
      let groupName = yield select(state => state.trend.groupName);
      let areaName = yield select(state => state.trend.areaName);
      if (dateType){}else {dateType = yield select(state => state.trend.dateType);}
      if (style)   {}else { style = yield select(state => state.trend.style);}
      const params = {type:style,dateType:dateType,startTime:time[2],endTime:time[1]};

      if (dealer_id != undefined && dealer_id != '') {
        params['dealer_id'] = dealer_id;
      } else {
        if (group_id != undefined && group_id != '') {
          params['group_id'] = group_id;
        }
        if (selectArea != undefined && selectArea != '') {

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
      if (data) {
        yield put({
          type: 'save',
          data: data.data,
          style:style,
          dateType:dateType,
          radioname:radioArray[style-1],
          group_id: group_id,
          selectArea: selectArea,
          dealer_id: dealer_id,
          groupName: groupName,
          areaName: areaName
        });
      }
    },
    *queryday({ url,payload }, { call, put }) {  // eslint-disable-line
      const params = {};
      const data = yield call(query,url,params);
      if (data) {
        yield put({
          type: 'save',
          data: data.data
        });
      }      },
    *querytimerange({ url,startTime,endTime }, { call, put ,select}) {  // eslint-disable-line
      let  dealer_id = yield select(state => state.trend.defaultdealer);
      let  dateType = yield select(state => state.trend.dateType);
      let style = yield select(state => state.trend.style);
      let group_id = yield select(state => state.trend.group_id);
      let selectArea = yield select(state => state.trend.selectArea);
      let groupName = yield select(state => state.trend.groupName);
      let areaName = yield select(state => state.trend.areaName);
      const params = {startTime:startTime,endTime:endTime,dateType:dateType,type:style};

      if (dealer_id != undefined && dealer_id != '') {
        params['dealer_id'] = dealer_id;
      } else {
        if (group_id != undefined && group_id != '') {
          params['group_id'] = group_id;
        }
        if (selectArea != undefined && selectArea != '') {
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
      if (data) {
        yield put({
          type: 'save',
          data: data.data,
          dateType:dateType,
          dealer_id:dealer_id,
          group_id: group_id,
          selectArea: selectArea,
          style:style,
          groupName:groupName,
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
        //yield put({
        //  type: 'dealersuccess',
        //});
        yield put({
          type: 'fetchdata',
          url: 'Apdata_cnt_day/getDayDate',
          dealer_id:dealer_id,
          group_id:group_id,
          groupName: groupName,
          selectArea: selectArea,
          firstin:1,
          fdata: data
        });
        //console.log(dealer_id?dealer_id:data.data[0].dealer_id);

      }
    },
    *queryDealer({areaName, groupID, area,url}, { call, put,select }) {  // eslint-disable-line

      //let todos = JSON.parse(localStorage.getItem(DEALER_DETAIL));
      const todos = yield select(state => state.trend.cdealer);

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
          data: data
        });
      }
    },
    //点击选择经销商时 显示下面选项
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
      let group_data = yield select(state => state.trend.cgroupdata);
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
          groupName: group_name
        });
      }
    },
    *querynativegroup({}, { call, put,select }) {  // eslint-disable-line
      //const {data} = yield call(query, url);
      let group_data = yield select(state => state.trend.cgroupdata);
      if (group_data) {
        yield put({
          type: 'querygroupsuccess',
          data: group_data,
          groupName: ''
        });
      }
    },
    *selectGroup({ url,group_id }, { call, put,select }) {  // eslint-disable-line
      let radioArray=['展厅流量（人次）', '展厅流量（批次）', '高意向潜客（批次）', '当日二次到店潜客（批次）', '三个月内二次到店潜客（批次）'];
      let time = yield select(state => state.trend.selectTime);
      let  dealer_id = '';
      let dateType = yield select(state => state.trend.dateType);
      let style = yield select(state => state.trend.style);
      let selectArea = yield select(state => state.trend.selectArea);
      let areaName = yield select(state => state.trend.areaName);
      console.log(style);
      const params = {type:style,dateType:dateType,startTime:time[2],endTime:time[1]};
      if (group_id != '') {
        params['group_id'] = group_id;
      }

      //if (selectArea != undefined && selectArea != '') {
      //  if (selectArea['barea_id']) {
      //    params['barea_id'] = selectArea['barea_id'];
      //  }
      //  if (selectArea['sarea_id']) {
      //    params['sarea_id'] = selectArea['sarea_id'];
      //  }
      //  if (selectArea['province']) {
      //    params['province'] = selectArea['province'];
      //  }
      //}

      const data = yield call(query,url,params);
      if (data) {

        yield put({
          type: 'queryDealer',
          groupID: group_id
        });

        yield put({
          type: 'saveGroup',
          data: data.data,
          style:style,
          dealer_id:dealer_id,
          dateType:dateType,
          radioname:radioArray[style-1],
          selectArea: '',
          group_id: group_id,
          areaName: undefined
        });
      }
    },
    *selectArea({ url,area }, { call, put,select }) {  // eslint-disable-line
      let radioArray=['展厅流量（人次）', '展厅流量（批次）', '高意向潜客（批次）', '当日二次到店潜客（批次）', '三个月内二次到店潜客（批次）'];
      let time = yield select(state => state.trend.selectTime);
      let  dealer_id = '';
      let dateType = yield select(state => state.trend.dateType);
      let style = yield select(state => state.trend.style);
      let groupName = yield select(state => state.trend.groupName);
      const params = {type:style,dateType:dateType,startTime:time[2],endTime:time[1]};
      let group_id = yield select(state => state.trend.group_id);

      //if (group_id != undefined && group_id != '') {
      //  params['group_id'] = group_id;
      //}

      let areaName = undefined;
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
      const data = yield call(query,url,params);
      if (data) {

        yield put({
          type: 'queryDealer',
          area: area
        });

        yield put({
          type: 'saveArea',
          data: data.data,
          style:style,
          dealer_id:dealer_id,
          dateType:dateType,
          radioname:radioArray[style-1],
          group_id: '',
          selectArea: area,
          areaName: areaName,
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
    },
    //初始化 读取区域信息
    *homearea({ url ,params}, { call, put }) {  // eslint-disable-line
      const {data} = yield call(query, url, params);
      if (data) {
        yield put({
          type: 'queryareasuccess',
          data: data,
        });
      }
    },
    *download({style},{call, put, select}) {

      console.log(style);

      let time = yield select(state => state.trend.selectTime);
      let dealer_id = JSON.parse(localStorage.getItem('dealerID'));
      let group_id = JSON.parse(localStorage.getItem('groupID'));
      let selectArea = JSON.parse(localStorage.getItem('selectArea'));

      let url = 'Apdata_cnt_day/download';
      let dealer = '';
      let group = '';
      let barea_id = '';
      let sarea_id = '';
      let province = '';
      let startTime = time[2];
      let endTime = time[1];

      if (dealer_id != undefined && dealer_id != '') {
        dealer = dealer_id;
      } else {
        if (group_id != undefined && group_id != '') {
          group = group_id;
        }
        if (selectArea != undefined && selectArea != '') {

          if (selectArea['value'] != '全国') {
            if (selectArea['barea_id']) {
              barea_id = selectArea['barea_id'];
            }
            if (selectArea['sarea_id']) {
              sarea_id = selectArea['sarea_id'];
            }
            if (selectArea['province']) {
              province = selectArea['province'];
            }
          } else {
            barea_id = encodeURI('全国');
          }
        }
      }

      url = url + '?' + 'startTime=' + startTime + '&' + 'endTime=' + endTime + '&' + 'style=' + style;
      if (dealer != '') {
        url = url + '&' + 'dealer_id=' + dealer;
      }
      if (group != '') {
        url = url + '&' + 'group_id=' + group;
      }
      if (barea_id != '') {
        url = url + '&' + 'barea_id=' + barea_id;
      }
      if (sarea_id != '') {
        url = url + '&' + 'sarea_id=' + sarea_id;
      }
      if (province != '') {
        url = url + '&' + 'province=' + province;
      }
      window.location.href = url;
    }
  },
  reducers: {
    save(state, action) {
      localStorage.setItem('groupName', JSON.stringify(action.groupName));
      localStorage.setItem('dealerID', JSON.stringify(action.dealer_id));
      localStorage.setItem('groupID', JSON.stringify(action.group_id));
      localStorage.setItem('selectArea', JSON.stringify(action.selectArea));
      return {
        ...state,
        date: action.data.date,
        count: action.data.count,
        table: action.data.table,
        dealerName: action.data.dealerName,
        selectTime: action.data.selectTime,
        style: action.style,
        dateType: action.dateType,
        defaultdealer: action.dealer_id,
        showLoading: false,
        radioname: action.radioname,
        selectArea:action.selectArea,
        group_id:action.group_id,
        user_role:action.data.user_role,
        areaName:action.areaName,
        groupName:action.groupName
      };
    },
    fetchsave(state, action) {
      return {
        ...state,
        date: action.data.date,
        count: action.data.count,
        table: action.data.table,
        dealerName: action.data.dealerName,
        selectTime: action.data.selectTime,
        style: action.style,
        dateType: action.dateType,
        defaultdealer: action.dealer_id,
        dealer: action.fdata,
        cdealer: action.fdata,
        showLoading: false,
        radioname: '高意向潜客（批次）',
        group_id:action.group_id,
        user_role:action.data.user_role,
        selectArea:action.selectArea,
        areaName:action.areaName,
        groupName:action.groupName
      };
    },
    saveArea(state, action) {

      localStorage.setItem('groupName', JSON.stringify(action.groupName));
      localStorage.setItem('dealerID', JSON.stringify(action.dealer_id));
      localStorage.setItem('groupID', JSON.stringify(action.group_id));
      localStorage.setItem('selectArea', JSON.stringify(action.selectArea));

      return {
        ...state,
        date: action.data.date,
        count: action.data.count,
        table: action.data.table,
        dealerName: action.data.dealerName,
        selectTime: action.data.selectTime,
        style: action.style,
        dateType: action.dateType,
        defaultdealer: action.dealer_id,
        showLoading: false,
        radioname: action.radioname,
        selectArea:action.selectArea,
        group_id:action.group_id,
        user_role:action.data.user_role,
        areaName:action.areaName,
        groupName:action.groupName
      };
    },
    saveGroup(state, action) {


      localStorage.setItem('dealerID', JSON.stringify(action.dealer_id));
      localStorage.setItem('groupID', JSON.stringify(action.group_id));
      localStorage.setItem('selectArea', JSON.stringify(action.selectArea));

      return {
        ...state,
        date: action.data.date,
        count: action.data.count,
        table: action.data.table,
        dealerName: action.data.dealerName,
        selectTime: action.data.selectTime,
        style: action.style,
        dateType: action.dateType,
        defaultdealer: action.dealer_id,
        showLoading: false,
        radioname: action.radioname,
        selectArea:action.selectArea,
        group_id:action.group_id,
        user_role:action.data.user_role,
        areaName:action.areaName
      };
    },
    dealersuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return {...state, dealer: action.data, cdealer: action.data};
    },
    querydealersuccess(state, action) {
      //alert(action.data[0].dealer_id);
      return {...state, dealer: action.data, dealerName:action.dealerName};
    },
    defaultdealer(state, action) {
      //alert(action.data[0].dealer_id);

      localStorage.setItem('groupID', JSON.stringify(action.dealer_id));
      return {...state, defaultdealer: action.dealer_id};
    },
    loading(state, action) {
      //alert(action.data[0].dealer_id);
      return {...state, showLoading: true};
    },
    querygroupsuccess(state, action) {
      //console.log(action.data);

      localStorage.setItem('groupName', JSON.stringify(action.groupName));

      return {...state, groupdata: action.data, dealerName: '',groupName:action.groupName};
    },
    //更新选择框下面显示的集团信息 赋值cgroupdata
    groupsuccess(state, action) {
      //console.log(action.data);

      return {...state, groupdata: action.data, cgroupdata: action.data};
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
