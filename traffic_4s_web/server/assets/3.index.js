webpackJsonp([3,8],{

/***/ 2020:
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (obj) {
	  if (obj == null) throw new TypeError("Cannot destructure undefined");
	};

/***/ }),

/***/ 2051:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(480);

	var _extends3 = _interopRequireDefault(_extends2);

	var _stringify = __webpack_require__(2049);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _objectDestructuringEmpty2 = __webpack_require__(2020);

	var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

	var _regenerator = __webpack_require__(396);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _requestData = __webpack_require__(2021);

	var _constants = __webpack_require__(1978);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.default = {

	  namespace: 'trend',

	  state: {
	    date: [],
	    count: [],
	    dealer: [{}],
	    cdealer: [{}],
	    defaultdealer: '',
	    dealerName: '',
	    table: [],
	    style: '3',
	    dateType: '',
	    selectTime: [],
	    showLoading: true,
	    radioname: '高意向潜客（批次）',
	    area: '',
	    selectArea: {},
	    group_id: '',
	    cgroupdata: '',
	    groupdata: '',
	    user_role: 0,
	    areaName: '',
	    groupName: ''
	  },

	  subscriptions: {
	    setup: function setup(_ref) {
	      var dispatch = _ref.dispatch,
	          history = _ref.history;

	      return history.listen(function (_ref2) {
	        var pathname = _ref2.pathname,
	            query = _ref2.query;

	        if (pathname === '/trendpage') {
	          //dispatch({
	          //  type: 'fetch',
	          //  url: 'Ts_area/getTrendData'
	          //});
	          dispatch({
	            type: 'dealer',
	            url: '/Ts_dealer/getAllData'
	          });
	          dispatch({
	            type: 'homearea',
	            url: '/Ts_area/getAreaData'
	          });
	          dispatch({
	            type: 'group',
	            url: '/Ts_group/getAllGroup'
	          });
	          //dispatch({
	          //  type: 'quertOwnDetail',
	          //  url:'/Ts_user/getOwnInformation',
	          //});
	          dispatch({
	            type: 'loading'
	          });
	        }
	      });
	    }
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
	    fetch: /*#__PURE__*/_regenerator2.default.mark(function fetch(_ref3, _ref4) {
	      var url = _ref3.url,
	          dealer_id = _ref3.dealer_id,
	          _ref3$firstin = _ref3.firstin,
	          firstin = _ref3$firstin === undefined ? 0 : _ref3$firstin;
	      var call = _ref4.call,
	          put = _ref4.put,
	          select = _ref4.select;
	      var style, dateType, params, time, data;
	      return _regenerator2.default.wrap(function fetch$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _context.next = 2;
	              return select(function (state) {
	                return state.trend.style;
	              });

	            case 2:
	              style = style = _context.sent;
	              _context.next = 5;
	              return select(function (state) {
	                return state.trend.dateType;
	              });

	            case 5:
	              dateType = _context.sent;
	              params = void 0;

	              if (!(firstin == 1)) {
	                _context.next = 11;
	                break;
	              }

	              params = { dealer_id: dealer_id, type: style, dateType: dateType };
	              _context.next = 15;
	              break;

	            case 11:
	              _context.next = 13;
	              return select(function (state) {
	                return state.trend.selectTime;
	              });

	            case 13:
	              time = _context.sent;

	              params = { dealer_id: dealer_id, type: style, dateType: dateType, startTime: time[2], endTime: time[1] };

	            case 15:
	              _context.next = 17;
	              return call(_requestData.query, url, params);

	            case 17:
	              data = _context.sent;

	              if (!data) {
	                _context.next = 21;
	                break;
	              }

	              _context.next = 21;
	              return put({
	                type: 'save',
	                data: data.data,
	                style: style,
	                dateType: dateType,
	                dealer_id: dealer_id,
	                group_id: '',
	                selectArea: '',
	                areaName: undefined,
	                groupName: ''
	              });

	            case 21:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, fetch, this);
	    }),

	    //第一次查找全部dealer
	    fetchdata: /*#__PURE__*/_regenerator2.default.mark(function fetchdata(_ref5, _ref6) {
	      var url = _ref5.url,
	          dealer_id = _ref5.dealer_id,
	          group_id = _ref5.group_id,
	          selectArea = _ref5.selectArea,
	          groupName = _ref5.groupName,
	          _ref5$style = _ref5.style,
	          style = _ref5$style === undefined ? '3' : _ref5$style,
	          _ref5$dateType = _ref5.dateType,
	          dateType = _ref5$dateType === undefined ? 'day' : _ref5$dateType,
	          _ref5$firstin = _ref5.firstin,
	          firstin = _ref5$firstin === undefined ? 0 : _ref5$firstin,
	          fdata = _ref5.fdata;
	      var call = _ref6.call,
	          put = _ref6.put,
	          select = _ref6.select;
	      var params, time, areaName, data;
	      return _regenerator2.default.wrap(function fetchdata$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              // eslint-disable-line
	              //const todos = yield select(state => state.realdata.defaultdealer);
	              params = void 0;

	              if (!(firstin == 1)) {
	                _context2.next = 5;
	                break;
	              }

	              params = { type: style, dateType: dateType };
	              _context2.next = 9;
	              break;

	            case 5:
	              _context2.next = 7;
	              return select(function (state) {
	                return state.trend.selectTime;
	              });

	            case 7:
	              time = _context2.sent;

	              params = { type: style, dateType: dateType, startTime: time[2], endTime: time[1] };

	            case 9:
	              areaName = undefined;

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

	              _context2.next = 13;
	              return call(_requestData.query, url, params);

	            case 13:
	              data = _context2.sent;

	              if (!data) {
	                _context2.next = 17;
	                break;
	              }

	              _context2.next = 17;
	              return put({
	                type: 'fetchsave',
	                data: data.data,
	                style: style,
	                dateType: dateType,
	                dealer_id: dealer_id,
	                group_id: group_id,
	                groupName: groupName,
	                selectArea: selectArea,
	                areaName: areaName,
	                fdata: fdata
	              });

	            case 17:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, fetchdata, this);
	    }),
	    querytype: /*#__PURE__*/_regenerator2.default.mark(function querytype(_ref7, _ref8) {
	      var url = _ref7.url,
	          style = _ref7.style,
	          dateType = _ref7.dateType;
	      var call = _ref8.call,
	          put = _ref8.put,
	          select = _ref8.select;
	      var radioArray, time, dealer_id, group_id, selectArea, groupName, areaName, params, data;
	      return _regenerator2.default.wrap(function querytype$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              // eslint-disable-line
	              radioArray = ['展厅流量（人次）', '展厅流量（批次）', '高意向潜客（批次）', '当日二次到店潜客（批次）', '三个月内二次到店潜客（批次）'];
	              _context3.next = 3;
	              return select(function (state) {
	                return state.trend.selectTime;
	              });

	            case 3:
	              time = _context3.sent;
	              _context3.next = 6;
	              return select(function (state) {
	                return state.trend.defaultdealer;
	              });

	            case 6:
	              dealer_id = _context3.sent;
	              _context3.next = 9;
	              return select(function (state) {
	                return state.trend.group_id;
	              });

	            case 9:
	              group_id = _context3.sent;
	              _context3.next = 12;
	              return select(function (state) {
	                return state.trend.selectArea;
	              });

	            case 12:
	              selectArea = _context3.sent;
	              _context3.next = 15;
	              return select(function (state) {
	                return state.trend.groupName;
	              });

	            case 15:
	              groupName = _context3.sent;
	              _context3.next = 18;
	              return select(function (state) {
	                return state.trend.areaName;
	              });

	            case 18:
	              areaName = _context3.sent;

	              if (!dateType) {
	                _context3.next = 22;
	                break;
	              }

	              _context3.next = 25;
	              break;

	            case 22:
	              _context3.next = 24;
	              return select(function (state) {
	                return state.trend.dateType;
	              });

	            case 24:
	              dateType = _context3.sent;

	            case 25:
	              if (!style) {
	                _context3.next = 28;
	                break;
	              }

	              _context3.next = 31;
	              break;

	            case 28:
	              _context3.next = 30;
	              return select(function (state) {
	                return state.trend.style;
	              });

	            case 30:
	              style = _context3.sent;

	            case 31:
	              params = { type: style, dateType: dateType, startTime: time[2], endTime: time[1] };

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

	              _context3.next = 35;
	              return call(_requestData.query, url, params);

	            case 35:
	              data = _context3.sent;

	              if (!data) {
	                _context3.next = 39;
	                break;
	              }

	              _context3.next = 39;
	              return put({
	                type: 'save',
	                data: data.data,
	                style: style,
	                dateType: dateType,
	                radioname: radioArray[style - 1],
	                group_id: group_id,
	                selectArea: selectArea,
	                dealer_id: dealer_id,
	                groupName: groupName,
	                areaName: areaName
	              });

	            case 39:
	            case 'end':
	              return _context3.stop();
	          }
	        }
	      }, querytype, this);
	    }),
	    queryday: /*#__PURE__*/_regenerator2.default.mark(function queryday(_ref9, _ref10) {
	      var url = _ref9.url,
	          payload = _ref9.payload;
	      var call = _ref10.call,
	          put = _ref10.put;
	      var params, data;
	      return _regenerator2.default.wrap(function queryday$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              // eslint-disable-line
	              params = {};
	              _context4.next = 3;
	              return call(_requestData.query, url, params);

	            case 3:
	              data = _context4.sent;

	              if (!data) {
	                _context4.next = 7;
	                break;
	              }

	              _context4.next = 7;
	              return put({
	                type: 'save',
	                data: data.data
	              });

	            case 7:
	            case 'end':
	              return _context4.stop();
	          }
	        }
	      }, queryday, this);
	    }),
	    querytimerange: /*#__PURE__*/_regenerator2.default.mark(function querytimerange(_ref11, _ref12) {
	      var url = _ref11.url,
	          startTime = _ref11.startTime,
	          endTime = _ref11.endTime;
	      var call = _ref12.call,
	          put = _ref12.put,
	          select = _ref12.select;
	      var dealer_id, dateType, style, group_id, selectArea, groupName, areaName, params, data;
	      return _regenerator2.default.wrap(function querytimerange$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              _context5.next = 2;
	              return select(function (state) {
	                return state.trend.defaultdealer;
	              });

	            case 2:
	              dealer_id = _context5.sent;
	              _context5.next = 5;
	              return select(function (state) {
	                return state.trend.dateType;
	              });

	            case 5:
	              dateType = _context5.sent;
	              _context5.next = 8;
	              return select(function (state) {
	                return state.trend.style;
	              });

	            case 8:
	              style = _context5.sent;
	              _context5.next = 11;
	              return select(function (state) {
	                return state.trend.group_id;
	              });

	            case 11:
	              group_id = _context5.sent;
	              _context5.next = 14;
	              return select(function (state) {
	                return state.trend.selectArea;
	              });

	            case 14:
	              selectArea = _context5.sent;
	              _context5.next = 17;
	              return select(function (state) {
	                return state.trend.groupName;
	              });

	            case 17:
	              groupName = _context5.sent;
	              _context5.next = 20;
	              return select(function (state) {
	                return state.trend.areaName;
	              });

	            case 20:
	              areaName = _context5.sent;
	              params = { startTime: startTime, endTime: endTime, dateType: dateType, type: style };

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

	              _context5.next = 25;
	              return call(_requestData.query, url, params);

	            case 25:
	              data = _context5.sent;

	              if (!data) {
	                _context5.next = 29;
	                break;
	              }

	              _context5.next = 29;
	              return put({
	                type: 'save',
	                data: data.data,
	                dateType: dateType,
	                dealer_id: dealer_id,
	                group_id: group_id,
	                selectArea: selectArea,
	                style: style,
	                groupName: groupName,
	                areaName: areaName
	              });

	            case 29:
	            case 'end':
	              return _context5.stop();
	          }
	        }
	      }, querytimerange, this);
	    }),
	    dealer: /*#__PURE__*/_regenerator2.default.mark(function dealer(_ref13, _ref14) {
	      var url = _ref13.url;
	      var call = _ref14.call,
	          put = _ref14.put,
	          select = _ref14.select;
	      var data, groupName, dealer_id, group_id, selectArea;
	      return _regenerator2.default.wrap(function dealer$(_context6) {
	        while (1) {
	          switch (_context6.prev = _context6.next) {
	            case 0:
	              // eslint-disable-line
	              //const data = yield call(query,url);
	              data = JSON.parse(localStorage.getItem(_constants.DEALER_DETAIL));
	              groupName = JSON.parse(localStorage.getItem('groupName'));
	              dealer_id = JSON.parse(localStorage.getItem('dealerID'));
	              group_id = JSON.parse(localStorage.getItem('groupID'));
	              selectArea = JSON.parse(localStorage.getItem('selectArea'));

	              if (!dealer_id && !group_id && !selectArea) {
	                dealer_id = 44;
	              }

	              if (!data) {
	                _context6.next = 9;
	                break;
	              }

	              _context6.next = 9;
	              return put({
	                type: 'fetchdata',
	                url: 'Apdata_cnt_day/getDayDate',
	                dealer_id: dealer_id,
	                group_id: group_id,
	                groupName: groupName,
	                selectArea: selectArea,
	                firstin: 1,
	                fdata: data
	              });

	            case 9:
	            case 'end':
	              return _context6.stop();
	          }
	        }
	      }, dealer, this);
	    }),
	    queryDealer: /*#__PURE__*/_regenerator2.default.mark(function queryDealer(_ref15, _ref16) {
	      var areaName = _ref15.areaName,
	          groupID = _ref15.groupID,
	          area = _ref15.area,
	          url = _ref15.url;
	      var call = _ref16.call,
	          put = _ref16.put,
	          select = _ref16.select;
	      var todos, data;
	      return _regenerator2.default.wrap(function queryDealer$(_context7) {
	        while (1) {
	          switch (_context7.prev = _context7.next) {
	            case 0:
	              _context7.next = 2;
	              return select(function (state) {
	                return state.trend.cdealer;
	              });

	            case 2:
	              todos = _context7.sent;
	              data = [];

	              if (areaName) {
	                todos.map(function (item) {
	                  //ap_brand
	                  var dealerName = areaName.toUpperCase();
	                  if (item.dealer_name && item.dealer_name.includes(dealerName) || item.dealer_code && item.dealer_code.includes(dealerName) || item.province && item.province.includes(dealerName) || item.address && item.address.includes(dealerName) || item.install_desc && item.install_desc.includes(dealerName)) {
	                    data.push(item);
	                  }
	                });
	              }
	              if (groupID) {
	                todos.map(function (item) {
	                  if (item.group_id == groupID) {
	                    data.push(item);
	                  }
	                });
	              }
	              if (area) {
	                if (area['value'] != '全国') {
	                  todos.map(function (item) {
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
	                  todos.map(function (item) {
	                    data.push(item);
	                  });
	                }
	              }

	              if (!data) {
	                _context7.next = 10;
	                break;
	              }

	              _context7.next = 10;
	              return put({
	                type: 'querydealersuccess',
	                data: data,
	                dealerName: areaName
	              });

	            case 10:
	            case 'end':
	              return _context7.stop();
	          }
	        }
	      }, queryDealer, this);
	    }),
	    querynativeDealer: /*#__PURE__*/_regenerator2.default.mark(function querynativeDealer(_ref17, _ref18) {
	      var areaName = _ref17.areaName,
	          url = _ref17.url;
	      var call = _ref18.call,
	          put = _ref18.put,
	          select = _ref18.select;
	      var todos, groupID, area, data;
	      return _regenerator2.default.wrap(function querynativeDealer$(_context8) {
	        while (1) {
	          switch (_context8.prev = _context8.next) {
	            case 0:
	              // eslint-disable-line
	              todos = JSON.parse(localStorage.getItem(_constants.DEALER_DETAIL));
	              groupID = JSON.parse(localStorage.getItem('groupID'));
	              area = JSON.parse(localStorage.getItem('selectArea'));
	              data = [];

	              if (groupID) {
	                todos.map(function (item) {
	                  if (item.group_id == groupID) {
	                    data.push(item);
	                  }
	                });
	              }
	              if (area) {
	                if (area['value'] != '全国') {
	                  todos.map(function (item) {
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
	                  todos.map(function (item) {
	                    data.push(item);
	                  });
	                }
	              }

	              if (!data) {
	                _context8.next = 9;
	                break;
	              }

	              _context8.next = 9;
	              return put({
	                type: 'querydealersuccess',
	                data: data
	              });

	            case 9:
	            case 'end':
	              return _context8.stop();
	          }
	        }
	      }, querynativeDealer, this);
	    }),

	    //点击选择经销商时 显示下面选项
	    focusDealer: /*#__PURE__*/_regenerator2.default.mark(function focusDealer(_ref19, _ref20) {
	      var call = _ref20.call,
	          put = _ref20.put,
	          select = _ref20.select;
	      var todos, groupID, area, data;
	      return _regenerator2.default.wrap(function focusDealer$(_context9) {
	        while (1) {
	          switch (_context9.prev = _context9.next) {
	            case 0:
	              (0, _objectDestructuringEmpty3.default)(_ref19);
	              todos = JSON.parse(localStorage.getItem(_constants.DEALER_DETAIL));
	              groupID = JSON.parse(localStorage.getItem('groupID'));
	              area = JSON.parse(localStorage.getItem('selectArea'));
	              data = [];

	              if (groupID) {
	                todos.map(function (item) {
	                  if (item.group_id == groupID) {
	                    data.push(item);
	                  }
	                });
	              }
	              if (area) {
	                todos.map(function (item) {
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

	              if (!(data.length != 0)) {
	                _context9.next = 12;
	                break;
	              }

	              _context9.next = 10;
	              return put({
	                type: 'foucusSuccess',
	                data: data
	              });

	            case 10:
	              _context9.next = 14;
	              break;

	            case 12:
	              _context9.next = 14;
	              return put({
	                type: 'foucusSuccess',
	                data: todos
	              });

	            case 14:
	            case 'end':
	              return _context9.stop();
	          }
	        }
	      }, focusDealer, this);
	    }),
	    querygroup: /*#__PURE__*/_regenerator2.default.mark(function querygroup(_ref21, _ref22) {
	      var group_name = _ref21.group_name;
	      var call = _ref22.call,
	          put = _ref22.put,
	          select = _ref22.select;
	      var group_data, data;
	      return _regenerator2.default.wrap(function querygroup$(_context10) {
	        while (1) {
	          switch (_context10.prev = _context10.next) {
	            case 0:
	              _context10.next = 2;
	              return select(function (state) {
	                return state.trend.cgroupdata;
	              });

	            case 2:
	              group_data = _context10.sent;
	              data = [];

	              group_data.map(function (item) {
	                if (item.group_name && item.group_name.includes(group_name)) {
	                  data.push(item);
	                }
	              });

	              if (!data) {
	                _context10.next = 8;
	                break;
	              }

	              _context10.next = 8;
	              return put({
	                type: 'querygroupsuccess',
	                data: data,
	                groupName: group_name
	              });

	            case 8:
	            case 'end':
	              return _context10.stop();
	          }
	        }
	      }, querygroup, this);
	    }),
	    querynativegroup: /*#__PURE__*/_regenerator2.default.mark(function querynativegroup(_ref23, _ref24) {
	      var call = _ref24.call,
	          put = _ref24.put,
	          select = _ref24.select;
	      var group_data;
	      return _regenerator2.default.wrap(function querynativegroup$(_context11) {
	        while (1) {
	          switch (_context11.prev = _context11.next) {
	            case 0:
	              (0, _objectDestructuringEmpty3.default)(_ref23);
	              _context11.next = 3;
	              return select(function (state) {
	                return state.trend.cgroupdata;
	              });

	            case 3:
	              group_data = _context11.sent;

	              if (!group_data) {
	                _context11.next = 7;
	                break;
	              }

	              _context11.next = 7;
	              return put({
	                type: 'querygroupsuccess',
	                data: group_data,
	                groupName: ''
	              });

	            case 7:
	            case 'end':
	              return _context11.stop();
	          }
	        }
	      }, querynativegroup, this);
	    }),
	    selectGroup: /*#__PURE__*/_regenerator2.default.mark(function selectGroup(_ref25, _ref26) {
	      var url = _ref25.url,
	          group_id = _ref25.group_id;
	      var call = _ref26.call,
	          put = _ref26.put,
	          select = _ref26.select;
	      var radioArray, time, dealer_id, dateType, style, selectArea, areaName, params, data;
	      return _regenerator2.default.wrap(function selectGroup$(_context12) {
	        while (1) {
	          switch (_context12.prev = _context12.next) {
	            case 0:
	              // eslint-disable-line
	              radioArray = ['展厅流量（人次）', '展厅流量（批次）', '高意向潜客（批次）', '当日二次到店潜客（批次）', '三个月内二次到店潜客（批次）'];
	              _context12.next = 3;
	              return select(function (state) {
	                return state.trend.selectTime;
	              });

	            case 3:
	              time = _context12.sent;
	              dealer_id = '';
	              _context12.next = 7;
	              return select(function (state) {
	                return state.trend.dateType;
	              });

	            case 7:
	              dateType = _context12.sent;
	              _context12.next = 10;
	              return select(function (state) {
	                return state.trend.style;
	              });

	            case 10:
	              style = _context12.sent;
	              _context12.next = 13;
	              return select(function (state) {
	                return state.trend.selectArea;
	              });

	            case 13:
	              selectArea = _context12.sent;
	              _context12.next = 16;
	              return select(function (state) {
	                return state.trend.areaName;
	              });

	            case 16:
	              areaName = _context12.sent;

	              console.log(style);
	              params = { type: style, dateType: dateType, startTime: time[2], endTime: time[1] };

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

	              _context12.next = 22;
	              return call(_requestData.query, url, params);

	            case 22:
	              data = _context12.sent;

	              if (!data) {
	                _context12.next = 28;
	                break;
	              }

	              _context12.next = 26;
	              return put({
	                type: 'queryDealer',
	                groupID: group_id
	              });

	            case 26:
	              _context12.next = 28;
	              return put({
	                type: 'saveGroup',
	                data: data.data,
	                style: style,
	                dealer_id: dealer_id,
	                dateType: dateType,
	                radioname: radioArray[style - 1],
	                selectArea: '',
	                group_id: group_id,
	                areaName: undefined
	              });

	            case 28:
	            case 'end':
	              return _context12.stop();
	          }
	        }
	      }, selectGroup, this);
	    }),
	    selectArea: /*#__PURE__*/_regenerator2.default.mark(function selectArea(_ref27, _ref28) {
	      var url = _ref27.url,
	          area = _ref27.area;
	      var call = _ref28.call,
	          put = _ref28.put,
	          select = _ref28.select;
	      var radioArray, time, dealer_id, dateType, style, groupName, params, group_id, areaName, data;
	      return _regenerator2.default.wrap(function selectArea$(_context13) {
	        while (1) {
	          switch (_context13.prev = _context13.next) {
	            case 0:
	              // eslint-disable-line
	              radioArray = ['展厅流量（人次）', '展厅流量（批次）', '高意向潜客（批次）', '当日二次到店潜客（批次）', '三个月内二次到店潜客（批次）'];
	              _context13.next = 3;
	              return select(function (state) {
	                return state.trend.selectTime;
	              });

	            case 3:
	              time = _context13.sent;
	              dealer_id = '';
	              _context13.next = 7;
	              return select(function (state) {
	                return state.trend.dateType;
	              });

	            case 7:
	              dateType = _context13.sent;
	              _context13.next = 10;
	              return select(function (state) {
	                return state.trend.style;
	              });

	            case 10:
	              style = _context13.sent;
	              _context13.next = 13;
	              return select(function (state) {
	                return state.trend.groupName;
	              });

	            case 13:
	              groupName = _context13.sent;
	              params = { type: style, dateType: dateType, startTime: time[2], endTime: time[1] };
	              _context13.next = 17;
	              return select(function (state) {
	                return state.trend.group_id;
	              });

	            case 17:
	              group_id = _context13.sent;

	              //if (group_id != undefined && group_id != '') {
	              //  params['group_id'] = group_id;
	              //}

	              areaName = undefined;

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
	              _context13.next = 22;
	              return call(_requestData.query, url, params);

	            case 22:
	              data = _context13.sent;

	              if (!data) {
	                _context13.next = 28;
	                break;
	              }

	              _context13.next = 26;
	              return put({
	                type: 'queryDealer',
	                area: area
	              });

	            case 26:
	              _context13.next = 28;
	              return put({
	                type: 'saveArea',
	                data: data.data,
	                style: style,
	                dealer_id: dealer_id,
	                dateType: dateType,
	                radioname: radioArray[style - 1],
	                group_id: '',
	                selectArea: area,
	                areaName: areaName,
	                groupName: ''
	              });

	            case 28:
	            case 'end':
	              return _context13.stop();
	          }
	        }
	      }, selectArea, this);
	    }),

	    //初始化 读取集团信息
	    group: /*#__PURE__*/_regenerator2.default.mark(function group(_ref29, _ref30) {
	      var url = _ref29.url;
	      var call = _ref30.call,
	          put = _ref30.put;

	      var _ref31, data;

	      return _regenerator2.default.wrap(function group$(_context14) {
	        while (1) {
	          switch (_context14.prev = _context14.next) {
	            case 0:
	              _context14.next = 2;
	              return call(_requestData.query, url);

	            case 2:
	              _ref31 = _context14.sent;
	              data = _ref31.data;

	              if (!data) {
	                _context14.next = 7;
	                break;
	              }

	              _context14.next = 7;
	              return put({
	                type: 'groupsuccess',
	                data: data
	              });

	            case 7:
	            case 'end':
	              return _context14.stop();
	          }
	        }
	      }, group, this);
	    }),

	    //初始化 读取区域信息
	    homearea: /*#__PURE__*/_regenerator2.default.mark(function homearea(_ref32, _ref33) {
	      var url = _ref32.url,
	          params = _ref32.params;
	      var call = _ref33.call,
	          put = _ref33.put;

	      var _ref34, data;

	      return _regenerator2.default.wrap(function homearea$(_context15) {
	        while (1) {
	          switch (_context15.prev = _context15.next) {
	            case 0:
	              _context15.next = 2;
	              return call(_requestData.query, url, params);

	            case 2:
	              _ref34 = _context15.sent;
	              data = _ref34.data;

	              if (!data) {
	                _context15.next = 7;
	                break;
	              }

	              _context15.next = 7;
	              return put({
	                type: 'queryareasuccess',
	                data: data
	              });

	            case 7:
	            case 'end':
	              return _context15.stop();
	          }
	        }
	      }, homearea, this);
	    }),
	    download: /*#__PURE__*/_regenerator2.default.mark(function download(_ref35, _ref36) {
	      var style = _ref35.style;
	      var call = _ref36.call,
	          put = _ref36.put,
	          select = _ref36.select;
	      var time, dealer_id, group_id, selectArea, url, dealer, group, barea_id, sarea_id, province, startTime, endTime;
	      return _regenerator2.default.wrap(function download$(_context16) {
	        while (1) {
	          switch (_context16.prev = _context16.next) {
	            case 0:

	              console.log(style);

	              _context16.next = 3;
	              return select(function (state) {
	                return state.trend.selectTime;
	              });

	            case 3:
	              time = _context16.sent;
	              dealer_id = JSON.parse(localStorage.getItem('dealerID'));
	              group_id = JSON.parse(localStorage.getItem('groupID'));
	              selectArea = JSON.parse(localStorage.getItem('selectArea'));
	              url = 'Apdata_cnt_day/download';
	              dealer = '';
	              group = '';
	              barea_id = '';
	              sarea_id = '';
	              province = '';
	              startTime = time[2];
	              endTime = time[1];

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

	            case 23:
	            case 'end':
	              return _context16.stop();
	          }
	        }
	      }, download, this);
	    })
	  },
	  reducers: {
	    save: function save(state, action) {
	      localStorage.setItem('groupName', (0, _stringify2.default)(action.groupName));
	      localStorage.setItem('dealerID', (0, _stringify2.default)(action.dealer_id));
	      localStorage.setItem('groupID', (0, _stringify2.default)(action.group_id));
	      localStorage.setItem('selectArea', (0, _stringify2.default)(action.selectArea));
	      return (0, _extends3.default)({}, state, {
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
	        selectArea: action.selectArea,
	        group_id: action.group_id,
	        user_role: action.data.user_role,
	        areaName: action.areaName,
	        groupName: action.groupName
	      });
	    },
	    fetchsave: function fetchsave(state, action) {
	      return (0, _extends3.default)({}, state, {
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
	        group_id: action.group_id,
	        user_role: action.data.user_role,
	        selectArea: action.selectArea,
	        areaName: action.areaName,
	        groupName: action.groupName
	      });
	    },
	    saveArea: function saveArea(state, action) {

	      localStorage.setItem('groupName', (0, _stringify2.default)(action.groupName));
	      localStorage.setItem('dealerID', (0, _stringify2.default)(action.dealer_id));
	      localStorage.setItem('groupID', (0, _stringify2.default)(action.group_id));
	      localStorage.setItem('selectArea', (0, _stringify2.default)(action.selectArea));

	      return (0, _extends3.default)({}, state, {
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
	        selectArea: action.selectArea,
	        group_id: action.group_id,
	        user_role: action.data.user_role,
	        areaName: action.areaName,
	        groupName: action.groupName
	      });
	    },
	    saveGroup: function saveGroup(state, action) {

	      localStorage.setItem('dealerID', (0, _stringify2.default)(action.dealer_id));
	      localStorage.setItem('groupID', (0, _stringify2.default)(action.group_id));
	      localStorage.setItem('selectArea', (0, _stringify2.default)(action.selectArea));

	      return (0, _extends3.default)({}, state, {
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
	        selectArea: action.selectArea,
	        group_id: action.group_id,
	        user_role: action.data.user_role,
	        areaName: action.areaName
	      });
	    },
	    dealersuccess: function dealersuccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { dealer: action.data, cdealer: action.data });
	    },
	    querydealersuccess: function querydealersuccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { dealer: action.data, dealerName: action.dealerName });
	    },
	    defaultdealer: function defaultdealer(state, action) {
	      //alert(action.data[0].dealer_id);

	      localStorage.setItem('groupID', (0, _stringify2.default)(action.dealer_id));
	      return (0, _extends3.default)({}, state, { defaultdealer: action.dealer_id });
	    },
	    loading: function loading(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { showLoading: true });
	    },
	    querygroupsuccess: function querygroupsuccess(state, action) {
	      //console.log(action.data);

	      localStorage.setItem('groupName', (0, _stringify2.default)(action.groupName));

	      return (0, _extends3.default)({}, state, { groupdata: action.data, dealerName: '', groupName: action.groupName });
	    },

	    //更新选择框下面显示的集团信息 赋值cgroupdata
	    groupsuccess: function groupsuccess(state, action) {
	      //console.log(action.data);

	      return (0, _extends3.default)({}, state, { groupdata: action.data, cgroupdata: action.data });
	    },
	    queryareasuccess: function queryareasuccess(state, action) {
	      //console.log(action.data);

	      return (0, _extends3.default)({}, state, { area: action.data });
	    },
	    foucusSuccess: function foucusSuccess(state, action) {
	      return (0, _extends3.default)({}, state, { dealer: action.data, cdealer: action.data });
	    }
	  }
	};
	module.exports = exports['default'];

/***/ })

});