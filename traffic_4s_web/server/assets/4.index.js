webpackJsonp([4,8],{

/***/ 2020:
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (obj) {
	  if (obj == null) throw new TypeError("Cannot destructure undefined");
	};

/***/ }),

/***/ 2052:
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

	  namespace: 'time',

	  state: {
	    role: '1',
	    dealer: '',
	    cdealer: '',
	    defaultdealer: '',
	    dealerName: '',
	    apdata: '',
	    time: '',
	    showLoading: true,
	    area: '',
	    selectArea: {},
	    group_id: '',
	    cgroupdata: '',
	    groupdata: '',
	    user_role: 0,
	    groupName: '',
	    areaName: ''
	  },

	  subscriptions: {
	    setup: function setup(_ref) {
	      var dispatch = _ref.dispatch,
	          history = _ref.history;

	      return history.listen(function (_ref2) {
	        var pathname = _ref2.pathname,
	            query = _ref2.query;

	        if (pathname === '/timepage') {
	          dispatch({
	            type: 'loading'
	          });
	          //dispatch({
	          //  type: 'quertOwnDetail',
	          //  url:'/Ts_user/getOwnInformation',
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
	    fetch: /*#__PURE__*/_regenerator2.default.mark(function fetch(_ref3, _ref4) {
	      var dealer_id = _ref3.dealer_id,
	          url = _ref3.url,
	          _ref3$firstin = _ref3.firstin,
	          firstin = _ref3$firstin === undefined ? 0 : _ref3$firstin;
	      var call = _ref4.call,
	          put = _ref4.put,
	          select = _ref4.select;
	      var params, time, data;
	      return _regenerator2.default.wrap(function fetch$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              // eslint-disable-line
	              params = void 0;

	              if (!(firstin == 1)) {
	                _context.next = 5;
	                break;
	              }

	              params = { dealer_id: dealer_id };
	              _context.next = 9;
	              break;

	            case 5:
	              _context.next = 7;
	              return select(function (state) {
	                return state.time.time;
	              });

	            case 7:
	              time = _context.sent;

	              params = { dealer_id: dealer_id, startTime: time[0], endTime: time[1] };

	            case 9:
	              _context.next = 11;
	              return call(_requestData.query, url, params);

	            case 11:
	              data = _context.sent;

	              if (!data) {
	                _context.next = 15;
	                break;
	              }

	              _context.next = 15;
	              return put({
	                type: 'save',
	                data: data.data,
	                dealer_id: dealer_id,
	                showLoading: false,
	                group_id: '',
	                selectArea: '',
	                groupName: '',
	                areaName: undefined
	              });

	            case 15:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, fetch, this);
	    }),
	    fetchdata: /*#__PURE__*/_regenerator2.default.mark(function fetchdata(_ref5, _ref6) {
	      var dealer_id = _ref5.dealer_id,
	          group_id = _ref5.group_id,
	          selectArea = _ref5.selectArea,
	          groupName = _ref5.groupName,
	          url = _ref5.url,
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
	              params = void 0;

	              if (!(firstin == 1)) {
	                _context2.next = 5;
	                break;
	              }

	              params = {};
	              _context2.next = 9;
	              break;

	            case 5:
	              _context2.next = 7;
	              return select(function (state) {
	                return state.time.time;
	              });

	            case 7:
	              time = _context2.sent;

	              params = { startTime: time[0], endTime: time[1] };

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
	                type: 'savefetch',
	                data: data.data,
	                dealer_id: dealer_id,
	                showLoading: false,
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
	    quertRange: /*#__PURE__*/_regenerator2.default.mark(function quertRange(_ref7, _ref8) {
	      var url = _ref7.url,
	          startTime = _ref7.startTime,
	          endTime = _ref7.endTime,
	          payload = _ref7.payload;
	      var call = _ref8.call,
	          put = _ref8.put,
	          select = _ref8.select;
	      var dealer_id, group_id, area, groupName, areaName, params, data;
	      return _regenerator2.default.wrap(function quertRange$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              _context3.next = 2;
	              return select(function (state) {
	                return state.time.defaultdealer;
	              });

	            case 2:
	              dealer_id = _context3.sent;
	              _context3.next = 5;
	              return select(function (state) {
	                return state.time.group_id;
	              });

	            case 5:
	              group_id = _context3.sent;
	              _context3.next = 8;
	              return select(function (state) {
	                return state.time.selectArea;
	              });

	            case 8:
	              area = _context3.sent;
	              groupName = '';
	              areaName = undefined;
	              params = { startTime: startTime, endTime: endTime };

	              if (!(dealer_id != undefined && dealer_id != '')) {
	                _context3.next = 16;
	                break;
	              }

	              params['dealer_id'] = dealer_id;
	              _context3.next = 22;
	              break;

	            case 16:
	              if (!(group_id != undefined && group_id != '')) {
	                _context3.next = 21;
	                break;
	              }

	              _context3.next = 19;
	              return select(function (state) {
	                return state.time.groupName;
	              });

	            case 19:
	              groupName = _context3.sent;

	              params['group_id'] = group_id;

	            case 21:
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
	                } else {}
	                areaName = area['value'];
	              }

	            case 22:
	              _context3.next = 24;
	              return call(_requestData.query, url, params);

	            case 24:
	              data = _context3.sent;

	              if (!data) {
	                _context3.next = 28;
	                break;
	              }

	              _context3.next = 28;
	              return put({
	                type: 'save',
	                data: data.data,
	                dealer_id: dealer_id,
	                showLoading: false,
	                group_id: group_id,
	                selectArea: area,
	                groupName: groupName,
	                areaName: areaName
	              });

	            case 28:
	            case 'end':
	              return _context3.stop();
	          }
	        }
	      }, quertRange, this);
	    }),
	    dealer: /*#__PURE__*/_regenerator2.default.mark(function dealer(_ref9, _ref10) {
	      var url = _ref9.url;
	      var call = _ref10.call,
	          put = _ref10.put,
	          select = _ref10.select;
	      var data, groupName, dealer_id, group_id, selectArea;
	      return _regenerator2.default.wrap(function dealer$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
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
	                _context4.next = 9;
	                break;
	              }

	              _context4.next = 9;
	              return put({
	                type: 'fetchdata',
	                url: 'Apdata_cnt_length/getLengthData',
	                dealer_id: dealer_id,
	                group_id: group_id,
	                groupName: groupName,
	                selectArea: selectArea,
	                firstin: 1,
	                fdata: data
	              });

	            case 9:
	            case 'end':
	              return _context4.stop();
	          }
	        }
	      }, dealer, this);
	    }),
	    queryDealer: /*#__PURE__*/_regenerator2.default.mark(function queryDealer(_ref11, _ref12) {
	      var areaName = _ref11.areaName,
	          groupID = _ref11.groupID,
	          area = _ref11.area,
	          url = _ref11.url;
	      var call = _ref12.call,
	          put = _ref12.put,
	          select = _ref12.select;
	      var todos, data;
	      return _regenerator2.default.wrap(function queryDealer$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              _context5.next = 2;
	              return select(function (state) {
	                return state.time.cdealer;
	              });

	            case 2:
	              todos = _context5.sent;
	              data = [];

	              if (areaName) {
	                todos.map(function (item) {
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
	                _context5.next = 10;
	                break;
	              }

	              _context5.next = 10;
	              return put({
	                type: 'querydealersuccess',
	                data: data,
	                dealerName: areaName
	              });

	            case 10:
	            case 'end':
	              return _context5.stop();
	          }
	        }
	      }, queryDealer, this);
	    }),
	    querynativeDealer: /*#__PURE__*/_regenerator2.default.mark(function querynativeDealer(_ref13, _ref14) {
	      var areaName = _ref13.areaName,
	          url = _ref13.url;
	      var call = _ref14.call,
	          put = _ref14.put,
	          select = _ref14.select;
	      var todos, groupID, area, data;
	      return _regenerator2.default.wrap(function querynativeDealer$(_context6) {
	        while (1) {
	          switch (_context6.prev = _context6.next) {
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
	                _context6.next = 9;
	                break;
	              }

	              _context6.next = 9;
	              return put({
	                type: 'querydealersuccess',
	                data: data,
	                dealerName: ''
	              });

	            case 9:
	            case 'end':
	              return _context6.stop();
	          }
	        }
	      }, querynativeDealer, this);
	    }),
	    focusDealer: /*#__PURE__*/_regenerator2.default.mark(function focusDealer(_ref15, _ref16) {
	      var call = _ref16.call,
	          put = _ref16.put,
	          select = _ref16.select;
	      var todos, groupID, area, data;
	      return _regenerator2.default.wrap(function focusDealer$(_context7) {
	        while (1) {
	          switch (_context7.prev = _context7.next) {
	            case 0:
	              (0, _objectDestructuringEmpty3.default)(_ref15);
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
	                _context7.next = 12;
	                break;
	              }

	              _context7.next = 10;
	              return put({
	                type: 'foucusSuccess',
	                data: data
	              });

	            case 10:
	              _context7.next = 14;
	              break;

	            case 12:
	              _context7.next = 14;
	              return put({
	                type: 'foucusSuccess',
	                data: todos
	              });

	            case 14:
	            case 'end':
	              return _context7.stop();
	          }
	        }
	      }, focusDealer, this);
	    }),
	    querygroup: /*#__PURE__*/_regenerator2.default.mark(function querygroup(_ref17, _ref18) {
	      var group_name = _ref17.group_name;
	      var call = _ref18.call,
	          put = _ref18.put,
	          select = _ref18.select;
	      var group_data, data;
	      return _regenerator2.default.wrap(function querygroup$(_context8) {
	        while (1) {
	          switch (_context8.prev = _context8.next) {
	            case 0:
	              _context8.next = 2;
	              return select(function (state) {
	                return state.time.cgroupdata;
	              });

	            case 2:
	              group_data = _context8.sent;
	              data = [];

	              group_data.map(function (item) {
	                if (item.group_name && item.group_name.includes(group_name)) {
	                  data.push(item);
	                }
	              });

	              if (!data) {
	                _context8.next = 8;
	                break;
	              }

	              _context8.next = 8;
	              return put({
	                type: 'querygroupsuccess',
	                data: data,
	                groupName: group_name
	              });

	            case 8:
	            case 'end':
	              return _context8.stop();
	          }
	        }
	      }, querygroup, this);
	    }),
	    querynativegroup: /*#__PURE__*/_regenerator2.default.mark(function querynativegroup(_ref19, _ref20) {
	      var call = _ref20.call,
	          put = _ref20.put,
	          select = _ref20.select;
	      var group_data;
	      return _regenerator2.default.wrap(function querynativegroup$(_context9) {
	        while (1) {
	          switch (_context9.prev = _context9.next) {
	            case 0:
	              (0, _objectDestructuringEmpty3.default)(_ref19);
	              _context9.next = 3;
	              return select(function (state) {
	                return state.time.cgroupdata;
	              });

	            case 3:
	              group_data = _context9.sent;

	              if (!group_data) {
	                _context9.next = 7;
	                break;
	              }

	              _context9.next = 7;
	              return put({
	                type: 'querygroupsuccess',
	                data: group_data,
	                groupName: ''
	              });

	            case 7:
	            case 'end':
	              return _context9.stop();
	          }
	        }
	      }, querynativegroup, this);
	    }),
	    selectGroup: /*#__PURE__*/_regenerator2.default.mark(function selectGroup(_ref21, _ref22) {
	      var url = _ref21.url,
	          group_id = _ref21.group_id,
	          payload = _ref21.payload;
	      var call = _ref22.call,
	          put = _ref22.put,
	          select = _ref22.select;
	      var time, areaName, params, data;
	      return _regenerator2.default.wrap(function selectGroup$(_context10) {
	        while (1) {
	          switch (_context10.prev = _context10.next) {
	            case 0:
	              _context10.next = 2;
	              return select(function (state) {
	                return state.time.time;
	              });

	            case 2:
	              time = _context10.sent;
	              areaName = undefined;
	              params = { startTime: time[0], endTime: time[1] };

	              if (group_id != '') {
	                params['group_id'] = group_id;
	              }
	              _context10.next = 8;
	              return call(_requestData.query, url, params);

	            case 8:
	              data = _context10.sent;
	              _context10.next = 11;
	              return put({
	                type: 'queryDealer',
	                groupID: group_id
	              });

	            case 11:
	              if (!data) {
	                _context10.next = 14;
	                break;
	              }

	              _context10.next = 14;
	              return put({
	                type: 'saveGroup',
	                data: data.data,
	                group_id: group_id,
	                showLoading: false,
	                dealer_id: '',
	                selectArea: '',
	                areaName: areaName
	              });

	            case 14:
	            case 'end':
	              return _context10.stop();
	          }
	        }
	      }, selectGroup, this);
	    }),
	    selectArea: /*#__PURE__*/_regenerator2.default.mark(function selectArea(_ref23, _ref24) {
	      var url = _ref23.url,
	          area = _ref23.area,
	          payload = _ref23.payload;
	      var call = _ref24.call,
	          put = _ref24.put,
	          select = _ref24.select;
	      var time, group_id, groupName, areaName, params, data;
	      return _regenerator2.default.wrap(function selectArea$(_context11) {
	        while (1) {
	          switch (_context11.prev = _context11.next) {
	            case 0:
	              _context11.next = 2;
	              return select(function (state) {
	                return state.time.time;
	              });

	            case 2:
	              time = _context11.sent;
	              _context11.next = 5;
	              return select(function (state) {
	                return state.time.group_id;
	              });

	            case 5:
	              group_id = _context11.sent;
	              groupName = '';
	              areaName = undefined;
	              params = { startTime: time[0], endTime: time[1] };

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

	              _context11.next = 12;
	              return call(_requestData.query, url, params);

	            case 12:
	              data = _context11.sent;

	              if (!data) {
	                _context11.next = 18;
	                break;
	              }

	              _context11.next = 16;
	              return put({
	                type: 'queryDealer',
	                area: area
	              });

	            case 16:
	              _context11.next = 18;
	              return put({
	                type: 'save',
	                data: data.data,
	                selectArea: area,
	                showLoading: false,
	                dealer_id: '',
	                group_id: '',
	                groupName: '',
	                areaName: areaName
	              });

	            case 18:
	            case 'end':
	              return _context11.stop();
	          }
	        }
	      }, selectArea, this);
	    }),

	    //初始化 读取集团信息
	    group: /*#__PURE__*/_regenerator2.default.mark(function group(_ref25, _ref26) {
	      var url = _ref25.url;
	      var call = _ref26.call,
	          put = _ref26.put;

	      var _ref27, data;

	      return _regenerator2.default.wrap(function group$(_context12) {
	        while (1) {
	          switch (_context12.prev = _context12.next) {
	            case 0:
	              _context12.next = 2;
	              return call(_requestData.query, url);

	            case 2:
	              _ref27 = _context12.sent;
	              data = _ref27.data;

	              if (!data) {
	                _context12.next = 7;
	                break;
	              }

	              _context12.next = 7;
	              return put({
	                type: 'groupsuccess',
	                data: data
	              });

	            case 7:
	            case 'end':
	              return _context12.stop();
	          }
	        }
	      }, group, this);
	    }),

	    //初始化 读取区域信息
	    homearea: /*#__PURE__*/_regenerator2.default.mark(function homearea(_ref28, _ref29) {
	      var url = _ref28.url,
	          params = _ref28.params;
	      var call = _ref29.call,
	          put = _ref29.put;

	      var _ref30, data;

	      return _regenerator2.default.wrap(function homearea$(_context13) {
	        while (1) {
	          switch (_context13.prev = _context13.next) {
	            case 0:
	              _context13.next = 2;
	              return call(_requestData.query, url, params);

	            case 2:
	              _ref30 = _context13.sent;
	              data = _ref30.data;

	              if (!data) {
	                _context13.next = 7;
	                break;
	              }

	              _context13.next = 7;
	              return put({
	                type: 'queryareasuccess',
	                data: data
	              });

	            case 7:
	            case 'end':
	              return _context13.stop();
	          }
	        }
	      }, homearea, this);
	    })
	  },

	  reducers: {
	    save: function save(state, action) {
	      var time = ['10分钟以下', '10分钟-20分钟', '20分钟-30分钟', '30分钟-45分钟', '45分钟-60分钟', '1小时-1.5小时', '1.5小时-2小时'];
	      var min = [];
	      var total = [];
	      var date = [];
	      //let start=action.data.selectTime[0].split('T')[0].split('-')[0]+''
	      //  +action.data.selectTime[0].split('T')[0].split('-')[1]+''
	      //  +action.data.selectTime[0].split('T')[0].split('-')[2];
	      date.push(action.data.time[0].split('T')[0].split('-')[0] + '' + action.data.time[0].split('T')[0].split('-')[1] + '' + action.data.time[0].split('T')[0].split('-')[2]);
	      date.push(action.data.time[1].split('T')[0].split('-')[0] + '' + action.data.time[1].split('T')[0].split('-')[1] + '' + action.data.time[0].split('T')[0].split('-')[2]);
	      action.data.apdata.map(function (item) {
	        if (item.range < 8) {
	          min[item.range - 1] = time[item.range - 1];
	        }
	        total[item.range - 1] = item.group_total;
	      });

	      localStorage.setItem('groupName', (0, _stringify2.default)(action.groupName));
	      localStorage.setItem('dealerID', (0, _stringify2.default)(action.dealer_id));
	      localStorage.setItem('groupID', (0, _stringify2.default)(action.group_id));
	      localStorage.setItem('selectArea', (0, _stringify2.default)(action.selectArea));

	      return (0, _extends3.default)({}, state, { apdata: { min: min, total: total }, dealerName: action.data.dealerName,
	        time: action.data.time, defaultdealer: action.dealer_id, showLoading: action.showLoading,
	        selectArea: action.selectArea, group_id: action.group_id, user_role: action.data.user_role,
	        groupName: action.groupName, areaName: action.areaName });
	    },
	    savefetch: function savefetch(state, action) {

	      console.log('fetch');

	      var time = ['10分钟以下', '10分钟-20分钟', '20分钟-30分钟', '30分钟-45分钟', '45分钟-60分钟', '1小时-1.5小时', '1.5小时-2小时'];
	      var min = [];
	      var total = [];
	      var date = [];
	      //let start=action.data.selectTime[0].split('T')[0].split('-')[0]+''
	      //  +action.data.selectTime[0].split('T')[0].split('-')[1]+''
	      //  +action.data.selectTime[0].split('T')[0].split('-')[2];
	      date.push(action.data.time[0].split('T')[0].split('-')[0] + '' + action.data.time[0].split('T')[0].split('-')[1] + '' + action.data.time[0].split('T')[0].split('-')[2]);
	      date.push(action.data.time[1].split('T')[0].split('-')[0] + '' + action.data.time[1].split('T')[0].split('-')[1] + '' + action.data.time[0].split('T')[0].split('-')[2]);
	      action.data.apdata.map(function (item) {
	        if (item.range < 8) {
	          min[item.range - 1] = time[item.range - 1];
	        }
	        total[item.range - 1] = item.group_total;
	      });
	      return (0, _extends3.default)({}, state, { apdata: { min: min, total: total }, dealerName: action.data.dealerName,
	        time: action.data.time, defaultdealer: action.dealer_id, showLoading: action.showLoading,
	        dealer: action.fdata, cdealer: action.fdata,
	        selectArea: action.selectArea, group_id: action.group_id, user_role: action.data.user_role,
	        groupName: action.groupName, areaName: action.areaName
	      });
	    },
	    saveGroup: function saveGroup(state, action) {
	      var time = ['10分钟以下', '10分钟-20分钟', '20分钟-30分钟', '30分钟-45分钟', '45分钟-60分钟', '1小时-1.5小时', '1.5小时-2小时'];
	      var min = [];
	      var total = [];
	      var date = [];
	      //let start=action.data.selectTime[0].split('T')[0].split('-')[0]+''
	      //  +action.data.selectTime[0].split('T')[0].split('-')[1]+''
	      //  +action.data.selectTime[0].split('T')[0].split('-')[2];
	      date.push(action.data.time[0].split('T')[0].split('-')[0] + '' + action.data.time[0].split('T')[0].split('-')[1] + '' + action.data.time[0].split('T')[0].split('-')[2]);
	      date.push(action.data.time[1].split('T')[0].split('-')[0] + '' + action.data.time[1].split('T')[0].split('-')[1] + '' + action.data.time[0].split('T')[0].split('-')[2]);
	      action.data.apdata.map(function (item) {
	        if (item.range < 8) {
	          min[item.range - 1] = time[item.range - 1];
	        }
	        total[item.range - 1] = item.group_total;
	      });

	      localStorage.setItem('dealerID', (0, _stringify2.default)(action.dealer_id));
	      localStorage.setItem('groupID', (0, _stringify2.default)(action.group_id));
	      localStorage.setItem('selectArea', (0, _stringify2.default)(action.selectArea));

	      return (0, _extends3.default)({}, state, { apdata: { min: min, total: total }, dealerName: action.data.dealerName,
	        time: action.data.time, defaultdealer: action.dealer_id, showLoading: action.showLoading,
	        selectArea: action.selectArea, group_id: action.group_id, user_role: action.data.user_role,
	        areaName: action.areaName });
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

	      localStorage.setItem('dealerID', (0, _stringify2.default)(action.dealer_id));

	      return (0, _extends3.default)({}, state, { defaultdealer: action.dealer_id });
	    },
	    loadingSuccess: function loadingSuccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { showLoading: false });
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

/***/ }),

/***/ 2053:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _assign = __webpack_require__(481);

	var _assign2 = _interopRequireDefault2(_assign);

	function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var _react = __webpack_require__(328);

	var _react2 = _interopRequireDefault(_react);

	var _dva = __webpack_require__(364);

	var _TimePage = __webpack_require__(2054);

	var _TimePage2 = _interopRequireDefault(_TimePage);

	var _TimeDist = __webpack_require__(2055);

	var _TimeDist2 = _interopRequireDefault(_TimeDist);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function TimePage(_ref) {
	  var location = _ref.location,
	      dispatch = _ref.dispatch,
	      time = _ref.time;

	  var models = _extends({}, time, {
	    quertRange: function quertRange(values) {
	      dispatch({
	        type: 'time/loading'
	      });
	      dispatch({
	        type: 'time/quertRange',
	        url: 'Apdata_cnt_length/getLengthData',
	        startTime: values[0].split('-')[0] + values[0].split('-')[1] + values[0].split('-')[2],
	        endTime: values[1].split('-')[0] + values[1].split('-')[1] + values[1].split('-')[2]
	      });
	    },
	    queryDealer: function queryDealer(value) {
	      //console.log(value);
	      dispatch({
	        type: 'time/queryDealer',
	        areaName: value
	      });
	    },
	    querynativeDealer: function querynativeDealer() {
	      //console.log('querynativeDealer');
	      dispatch({
	        type: 'time/querynativeDealer'
	        //url:'/Ts_ap_device/getAllData',
	      });
	    },
	    selectDealer: function selectDealer(value) {
	      //console.log('querynativeDealer');
	      dispatch({
	        type: 'time/loading'
	      });
	      dispatch({
	        type: 'time/fetch',
	        url: 'Apdata_cnt_length/getLengthData',
	        dealer_id: value
	      });
	      dispatch({
	        type: 'time/querynativegroup'
	      });
	    },
	    loadsuccess: function loadsuccess() {
	      dispatch({
	        type: 'time/loadingSuccess'
	      });
	    },
	    loading: function loading() {
	      dispatch({
	        type: 'time/loading'
	      });
	    },

	    //选择集团更新 选择框下面的提示
	    queryGroup: function queryGroup(e) {
	      dispatch({
	        type: 'time/querygroup',
	        group_name: e
	      });
	    },

	    //没有选择集团 选择框下面显示全部的集团信息
	    queryAllGroup: function queryAllGroup() {
	      dispatch({
	        type: 'time/querynativegroup'
	      });
	    },

	    //选择集团更新图表数据
	    selectGroup: function selectGroup(e) {
	      dispatch({
	        type: 'time/loading'
	      });
	      dispatch({
	        type: 'time/selectGroup',
	        url: 'Apdata_cnt_length/getLengthData',
	        group_id: e
	      });
	      dispatch({
	        type: 'time/querynativeDealer'
	        //url:'/Ts_ap_device/getAllData',
	      });
	    },

	    //清空集团更新图表数据
	    group: function group() {
	      dispatch({
	        type: 'time/loading'
	      });
	      dispatch({
	        type: 'time/selectGroup',
	        url: 'Apdata_cnt_length/getLengthData',
	        group_id: ''
	      });
	    },
	    selectArea: function selectArea(e) {
	      dispatch({
	        type: 'time/loading'
	      });
	      dispatch({
	        type: 'time/selectArea',
	        url: 'Apdata_cnt_length/getLengthData',
	        area: e
	      });
	      dispatch({
	        type: 'time/querynativeDealer'
	        //url:'/Ts_ap_device/getAllData',
	      });
	    },
	    noArea: function noArea() {
	      dispatch({
	        type: 'time/loading'
	      });
	      dispatch({
	        type: 'time/selectArea',
	        url: 'Apdata_cnt_length/getLengthData',
	        area: ''
	      });
	    },
	    focusDealer: function focusDealer() {
	      dispatch({
	        type: 'time/focusDealer'
	      });
	    }
	  });
	  return _react2.default.createElement('div', { className: _TimePage2.default.body }, _react2.default.createElement(_TimeDist2.default, { model: models }));
	}

	TimePage.propTypes = {};

	exports.default = (0, _dva.connect)(function (_ref2) {
	  var time = _ref2.time;
	  return { time: time };
	})(TimePage);
	module.exports = exports['default'];

/***/ }),

/***/ 2054:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"body":"TimePage__body___2Nvpt"};

/***/ }),

/***/ 2055:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _getIterator2 = __webpack_require__(485);

	var _getIterator3 = _interopRequireDefault2(_getIterator2);

	var _getPrototypeOf = __webpack_require__(733);

	var _getPrototypeOf2 = _interopRequireDefault2(_getPrototypeOf);

	var _setPrototypeOf = __webpack_require__(736);

	var _setPrototypeOf2 = _interopRequireDefault2(_setPrototypeOf);

	var _create = __webpack_require__(740);

	var _create2 = _interopRequireDefault2(_create);

	var _typeof2 = __webpack_require__(399);

	var _typeof3 = _interopRequireDefault2(_typeof2);

	var _defineProperty = __webpack_require__(540);

	var _defineProperty2 = _interopRequireDefault2(_defineProperty);

	function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;(0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _react = __webpack_require__(328);

	var _react2 = _interopRequireDefault(_react);

	var _TimeDist = __webpack_require__(2056);

	var _TimeDist2 = _interopRequireDefault(_TimeDist);

	var _TimeChat = __webpack_require__(2057);

	var _TimeChat2 = _interopRequireDefault(_TimeChat);

	var _echarts = __webpack_require__(1541);

	var _echarts2 = _interopRequireDefault(_echarts);

	var _antd = __webpack_require__(745);

	var _moment = __webpack_require__(841);

	var _moment2 = _interopRequireDefault(_moment);

	__webpack_require__(958);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var TreeNode = _antd.TreeSelect.TreeNode;
	var Option = _antd.Select.Option;
	var RangePicker = _antd.DatePicker.RangePicker;

	var TimeDist = function (_React$Component) {
	  _inherits(TimeDist, _React$Component);

	  function TimeDist(props) {
	    _classCallCheck(this, TimeDist);

	    var _this = _possibleConstructorReturn(this, (TimeDist.__proto__ || (0, _getPrototypeOf2.default)(TimeDist)).call(this, props));

	    _this.selectChange = function (e) {
	      var _this$props$model = _this.props.model,
	          querynativeDealer = _this$props$model.querynativeDealer,
	          queryDealer = _this$props$model.queryDealer;
	      //if (e == undefined || e == '') {
	      //  querynativeDealer();
	      //} else {
	      //  queryDealer(e);
	      //}

	      //this.props.model.dealer.map(item=>{
	      //  if (item.dealer_name == e){
	      //    this.setState({
	      //      selectid: item.dealer_id
	      //    });
	      //  }
	      //});

	      console.log(e);

	      if (e == undefined) {
	        querynativeDealer();
	        _this.setState({
	          selecttype: 0
	        });
	      } else {
	        queryDealer(e);
	        var data = [];
	        _this.props.model.cdealer.map(function (item, index) {
	          //ap_brand
	          e = e.toUpperCase();
	          if (item.dealer_name && item.dealer_name.includes(e) || item.dealer_code && item.dealer_code.includes(e) || item.province && item.province.includes(e) || item.address && item.address.includes(e)) {
	            data.push(_react2.default.createElement(Option, { value: item.dealer_name, key: ' ' + index }, item.dealer_name));
	          }
	        });
	        _this.setState({
	          selecttype: 1,
	          data: data
	        });
	      }
	    };

	    _this.getselectoption = function (area) {
	      if (area) {
	        return area.map(function (item, index) {
	          return _react2.default.createElement(Option, { key: index, value: item.dealer_name }, item.dealer_name);
	        });
	      }
	    };

	    _this.gettime = function (text) {
	      if (text != undefined) {
	        var year = parseInt(text / 10000);
	        var day = text % 10000 % 100;
	        var month = (text % 10000 - text % 10000 % 100) / 100;
	        day = day < 10 ? '0' + day : day;
	        month = month < 10 ? '0' + month : month;
	        return year + '-' + month + '-' + day;
	      }
	    };

	    _this.onselect = function (value, option) {
	      var selectDealer = _this.props.model.selectDealer;

	      _this.props.model.dealer.map(function (item) {
	        if (item.dealer_name == value) {
	          selectDealer(item.dealer_id);
	        }
	      });
	    };

	    _this.onFocusDealer = function () {
	      _this.props.model.focusDealer();
	    };

	    _this.state = {
	      selecttype: 0,
	      data: []
	    };
	    return _this;
	  }

	  _createClass(TimeDist, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      //this.drawCharts();

	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      //if (prevProps){
	      //  this.drawCharts();
	      //console.log('componentDidUpdate');
	      //}
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(value) {}
	  }, {
	    key: 'dataChange',
	    value: function dataChange(dates, dateStrings) {
	      this.props.model.quertRange(dateStrings);
	    }
	  }, {
	    key: 'gestartTime',
	    value: function gestartTime() {
	      var startTime = void 0;
	      var myDate = new Date();
	      var localTime = myDate.getTime();
	      var localOffset = myDate.getTimezoneOffset() * 60000;
	      var utc = localTime - localOffset - 3600000 * 24 * 7;
	      var localDate = new Date(utc);
	      if (localDate.getUTCMonth() > 8) {
	        if (localDate.getUTCDate() > 9) {
	          startTime = localDate.getUTCFullYear().toString() + (localDate.getUTCMonth() + 1) + localDate.getUTCDate();
	        } else {
	          startTime = localDate.getUTCFullYear().toString() + (localDate.getUTCMonth() + 1) + '0' + localDate.getUTCDate();
	        }
	      } else {
	        if (localDate.getUTCDate() > 9) {
	          startTime = localDate.getUTCFullYear().toString() + '0' + (localDate.getUTCMonth() + 1) + localDate.getUTCDate();
	        } else {
	          startTime = localDate.getUTCFullYear().toString() + '0' + (localDate.getUTCMonth() + 1) + '0' + localDate.getUTCDate();
	        }
	      }
	      var year = parseInt(startTime / 10000);
	      var day = startTime % 10000 % 100;
	      var month = (startTime % 10000 - startTime % 10000 % 100) / 100;
	      day = day < 10 ? '0' + day : day;
	      month = month < 10 ? '0' + month : month;
	      return year + '-' + month + '-' + day;
	    }
	  }, {
	    key: 'getendTime',
	    value: function getendTime() {
	      var endTime = void 0;
	      var myDate = new Date();
	      var year = myDate.getFullYear();
	      var day = myDate.getDate();
	      var month = myDate.getMonth();
	      day = day < 10 ? '0' + day : day;
	      month = month < 9 ? '0' + month : month;
	      return year + '-' + month + '-' + day;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props$model = this.props.model,
	          apdata = _props$model.apdata,
	          showLoading = _props$model.showLoading,
	          loadsuccess = _props$model.loadsuccess,
	          time = _props$model.time,
	          group = _props$model.group,
	          selectGroup = _props$model.selectGroup,
	          queryGroup = _props$model.queryGroup,
	          queryAllGroup = _props$model.queryAllGroup,
	          groupdata = _props$model.groupdata,
	          selectArea = _props$model.selectArea,
	          noArea = _props$model.noArea,
	          user_role = _props$model.user_role,
	          area = _props$model.area,
	          areaName = _props$model.areaName,
	          groupName = _props$model.groupName;

	      function getareaMenu(areaArray) {
	        if (areaArray) {
	          return areaArray.map(function (item) {
	            if (item.chiledren) {
	              return _react2.default.createElement(TreeNode, { value: item.name, title: item.name, key: item.id + '' }, getareaMenu(item.chiledren));
	            }
	            return _react2.default.createElement(TreeNode, { value: item.name, title: item.name, key: item.id + '' });
	          });
	        }
	      }

	      function getgroupselectoption(area) {
	        //console.log(array)
	        if (area.length > 0) {
	          return area.map(function (item, index) {
	            return _react2.default.createElement(Option, { key: index, value: item.group_name }, item.group_name);
	          });
	        }
	      }

	      function selectgroupChange(e) {
	        if (e == '') {
	          queryAllGroup();
	          group();
	        } else {
	          groupdata.map(function (item) {
	            if (item.group_name == e) {
	              selectGroup(item.group_id);
	            }
	          });
	          queryGroup(e);
	        }
	      }
	      function onselectgroup(value, option) {
	        groupdata.map(function (item) {
	          if (item.group_name == value) {
	            selectGroup(item.group_id);
	          }
	        });
	      }
	      function selectAreaChange(value, label, extra) {

	        var params = {};
	        var isTrue = false;
	        var level = 3;
	        if (value) {
	          if (value != '全国') {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	              for (var _iterator = (0, _getIterator3.default)(area), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var item = _step.value;

	                if (item.name == value) {
	                  level = 1;
	                  //isTrue=true;
	                  break;
	                }
	                if (item.chiledren) {
	                  item.chiledren.map(function (item) {
	                    if (item.name == value) {
	                      level = 2;
	                    }
	                  });
	                }
	              }
	            } catch (err) {
	              _didIteratorError = true;
	              _iteratorError = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                  _iterator.return();
	                }
	              } finally {
	                if (_didIteratorError) {
	                  throw _iteratorError;
	                }
	              }
	            }

	            if (user_role <= 3) {
	              if (level == 1) {
	                params = { barea_id: extra.triggerNode.props.eventKey };
	              } else if (level == 2) {
	                params = { sarea_id: extra.triggerNode.props.eventKey };
	              } else {
	                params = { province: extra.triggerNode.props.eventKey };
	              }
	            } else if (user_role == 4) {
	              if (level == 1) {
	                params = { sarea_id: extra.triggerNode.props.eventKey };
	              } else if (level == 2) {
	                params = { province: extra.triggerNode.props.eventKey };
	              }
	            } else if (user_role == 5) {
	              params = { province: extra.triggerNode.props.eventKey };
	            } else if (user_role == 6) {
	              params = { province: extra.triggerNode.props.eventKey };
	            }
	          }

	          params['value'] = value;
	          selectArea(params);
	        } else {
	          noArea();
	        }
	      }

	      var start = this.gestartTime();
	      var end = this.getendTime();
	      //let st=this.gettime(this.props.model.time[0]);
	      //let en=this.gettime(this.props.model.time[1]);
	      var options = {
	        tooltip: {
	          show: true
	        },
	        legend: {
	          show: false
	        },
	        grid: {
	          left: '1%',
	          right: '4%',
	          bottom: '3%',
	          containLabel: true
	        },
	        xAxis: [{
	          type: 'category',
	          data: apdata.min
	        }],
	        yAxis: [{
	          type: 'value',
	          axisLine: {
	            lineStyle: {
	              color: '#8EB3E8' //颜色更换
	            }
	          },
	          splitLine: { show: false }
	        }],
	        series: [{
	          //name: '分享',
	          type: 'bar',
	          barWidth: '35%',
	          itemStyle: { normal: { color: '#8EB3E8' } },
	          data: apdata.total
	        }]
	      };

	      var dateFormat = 'YYYY-MM-DD';
	      var monthFormat = 'YYYY-MM';
	      return _react2.default.createElement('div', { className: _TimeDist2.default.body }, _react2.default.createElement('div', { className: _TimeDist2.default.time_top }, _react2.default.createElement('div', { className: _TimeDist2.default.area }, _react2.default.createElement(_antd.TreeSelect, {
	        className: _TimeDist2.default.treeselect,
	        showSearch: true,
	        style: { width: 200
	          //value={this.state.value}
	        }, dropdownStyle: { maxHeight: 400, overflow: 'auto' },
	        allowClear: true,
	        onChange: selectAreaChange,
	        value: areaName,
	        placeholder: "\u8BF7\u9009\u62E9\u533A\u57DF"
	        //onSelect={this.onselect}
	      }, getareaMenu(area))), _react2.default.createElement('div', { className: _TimeDist2.default.time_top_lable }, _react2.default.createElement(_antd.Select, {
	        mode: 'combobox',
	        size: 'default',
	        filterOption: false,
	        style: { width: 170 },
	        placeholder: "\u96C6\u56E2\u641C\u7D22",
	        onChange: selectgroupChange,
	        onSelect: onselectgroup,
	        value: groupName,
	        allowClear: true
	      }, getgroupselectoption(groupdata))), _react2.default.createElement('div', { className: _TimeDist2.default.time_top_lable }, _react2.default.createElement(_antd.Select, {
	        mode: 'combobox',
	        size: 'default',
	        filterOption: false,
	        style: { width: 170 },
	        placeholder: "\u9009\u62E9\u7ECF\u9500\u5546",
	        onChange: this.selectChange,
	        onSelect: this.onselect,
	        onFocus: this.onFocusDealer,
	        value: this.props.model.dealerName,
	        allowClear: true
	      }, this.state.selecttype == 0 ? this.getselectoption(this.props.model.dealer) : this.state.data)), _react2.default.createElement('div', { className: _TimeDist2.default.time_top_time }, _react2.default.createElement(RangePicker, {
	        ranges: {
	          '本月': [(0, _moment2.default)().startOf('month'), (0, _moment2.default)().endOf('month')],
	          '近一周': [(0, _moment2.default)().subtract(1, 'weeks'), (0, _moment2.default)()],
	          '近两周': [(0, _moment2.default)().subtract(2, 'weeks'), (0, _moment2.default)()],
	          '近三周': [(0, _moment2.default)().subtract(3, 'weeks'), (0, _moment2.default)()],
	          '近一月': [(0, _moment2.default)().subtract(1, 'months'), (0, _moment2.default)()],
	          '近两月': [(0, _moment2.default)().subtract(2, 'months'), (0, _moment2.default)()],
	          '近三月': [(0, _moment2.default)().subtract(3, 'months'), (0, _moment2.default)()]
	        },
	        defaultValue: [(0, _moment2.default)().subtract(7, 'days'), (0, _moment2.default)()],
	        format: dateFormat,
	        onChange: this.dataChange.bind(this)
	      }))), _react2.default.createElement('div', { className: _TimeDist2.default.time_chart }, _react2.default.createElement(_TimeChat2.default, { option: options, loadsuccess: loadsuccess, showLoading: showLoading })));
	    }
	  }]);

	  return TimeDist;
	}(_react2.default.Component);

	TimeDist.propTypes = {};
	exports.default = TimeDist;
	module.exports = exports['default'];

/***/ }),

/***/ 2056:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"body":"TimeDist__body___1zcQ1","time_top":"TimeDist__time_top___10EMZ","time_top_lable":"TimeDist__time_top_lable___NxStl","area":"TimeDist__area___3EAy3","time_top_time":"TimeDist__time_top_time___1NtaH","time_top_icon":"TimeDist__time_top_icon___1fbXO","time_top_start":"TimeDist__time_top_start___2wijS","time_top_end":"TimeDist__time_top_end___vZQz_","time_chart":"TimeDist__time_chart___1eqNM"};

/***/ }),

/***/ 2057:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _getPrototypeOf = __webpack_require__(733);

	var _getPrototypeOf2 = _interopRequireDefault2(_getPrototypeOf);

	var _setPrototypeOf = __webpack_require__(736);

	var _setPrototypeOf2 = _interopRequireDefault2(_setPrototypeOf);

	var _create = __webpack_require__(740);

	var _create2 = _interopRequireDefault2(_create);

	var _typeof2 = __webpack_require__(399);

	var _typeof3 = _interopRequireDefault2(_typeof2);

	var _defineProperty = __webpack_require__(540);

	var _defineProperty2 = _interopRequireDefault2(_defineProperty);

	function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;(0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _react = __webpack_require__(328);

	var _react2 = _interopRequireDefault(_react);

	var _echarts = __webpack_require__(1541);

	var _echarts2 = _interopRequireDefault(_echarts);

	var _elementResizeEvent = __webpack_require__(1976);

	var _elementResizeEvent2 = _interopRequireDefault(_elementResizeEvent);

	var _TimeChat = __webpack_require__(2058);

	var _TimeChat2 = _interopRequireDefault(_TimeChat);

	var _constants = __webpack_require__(1978);

	var _antd = __webpack_require__(745);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	} //import React, { Component } from 'react';
	//import styles from './TimeChat.css';
	//import echarts from 'echarts'
	//
	//class TimeChat extends React.Component {
	//  constructor(props) {
	//    super(props);
	//
	//  }
	//  componentDidMount(){
	//    //this.drawCharts();
	//    console.log('mount')
	//    this.drawCharts();
	//
	//  }
	//  componentDidUpdate( prevProps,  prevState){
	//    //if (prevProps){
	//
	//     console.log('componentDidUpdate')
	//
	//    console.log(prevProps);
	//    console.log(prevState);
	//
	//      this.drawCharts();
	//    //}
	//  }
	//  drawCharts(){
	//    var myChart = echarts.init(this.refs.charts);
	//// 指定图表的配置项和数据
	//    var options = {
	//      tooltip: {
	//        show:true
	//      },
	//      legend: {
	//        show: false
	//      },
	//      grid: {
	//        left: '1%',
	//        right: '4%',
	//        bottom: '3%',
	//        containLabel: true
	//      },
	//      xAxis: [
	//        {
	//          type: 'category',
	//          data: ''
	//        }
	//      ],
	//      yAxis: [
	//        {
	//          type: 'value',
	//          axisLine: {
	//            lineStyle: {
	//              color: '#8EB3E8'   //颜色更换
	//            }
	//          },
	//          splitLine: {show: false}
	//        }
	//      ],
	//      series: [
	//        {
	//          //name: '分享',
	//          type: 'bar',
	//          barWidth: '35%',
	//          itemStyle: {normal:{color:'#8EB3E8'}},
	//          data: ''
	//        }
	//      ]
	//    };
	//    let {min,total}=this.props.data;
	//    //console.log(this.props.data);
	//    options.xAxis[0].data=min,
	//      options.series[0].data=total;
	//// 绘制图表
	//    myChart.setOption(options);
	//    //myChart.showLoading(LoadStyle);
	//    //if (total){
	//    //  dealyTime(myChart,options);
	//    //}
	//  }
	//  render() {
	//    return (
	//      <div ref="charts" className={styles.time_chart}>
	//      </div>
	//    );
	//  }
	//}
	//TimeChat.propTypes = {
	//};
	//export default TimeChat;


	var TimeChat = function (_Component) {
	  _inherits(TimeChat, _Component);

	  function TimeChat(props) {
	    _classCallCheck(this, TimeChat);

	    var _this = _possibleConstructorReturn(this, (TimeChat.__proto__ || (0, _getPrototypeOf2.default)(TimeChat)).call(this, props));

	    _this.state = {
	      display: 'none'

	    };
	    return _this;
	  }

	  _createClass(TimeChat, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {

	      var echartObj = this.renderEchartDom();
	      var onEvents = this.props.onEvents || [];

	      var _loop = function _loop(eventName) {
	        if (typeof eventName === 'string' && typeof onEvents[eventName] === 'function') {
	          echartObj.on(eventName, function (param) {
	            onEvents[eventName](param, echartObj);
	          });
	        }
	      };

	      for (var eventName in onEvents) {
	        _loop(eventName);
	      }

	      if (typeof this.props.onChartReady === 'function') this.props.onChartReady(echartObj);
	      (0, _elementResizeEvent2.default)(this.refs.echartsDom, function () {
	        echartObj.resize();
	      });
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.renderEchartDom();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _echarts2.default.dispose(this.refs.echartsDom);
	    }
	  }, {
	    key: 'renderEchartDom',
	    value: function renderEchartDom() {
	      var _props = this.props,
	          onquerycity = _props.onquerycity,
	          queryseccess = _props.queryseccess,
	          data = _props.data;

	      var echartObj = this.getEchartsInstance();
	      echartObj.setOption(this.props.option, this.props.notMerge || false, this.props.lazyUpdate || false);
	      if (this.props.showLoading) {} else {
	        //this.props.loadsuccess();
	      }
	      return echartObj;
	    }
	  }, {
	    key: 'getEchartsInstance',
	    value: function getEchartsInstance() {
	      return _echarts2.default.getInstanceByDom(this.refs.echartsDom) || _echarts2.default.init(this.refs.echartsDom, this.props.theme);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var showLoading = this.props.showLoading;

	      var dis = showLoading ? ' ' : 'none';
	      return _react2.default.createElement('div', { className: _TimeChat2.default.content }, _react2.default.createElement(_antd.Spin, { tip: "\u52A0\u8F7D\u4E2D...", spinning: showLoading }, _react2.default.createElement('div', { ref: 'echartsDom', className: _TimeChat2.default.time_chart })));
	    }
	  }]);

	  return TimeChat;
	}(_react.Component);

	exports.default = TimeChat;

	TimeChat.propTypes = {
	  option: _react.PropTypes.object.isRequired,
	  notMerge: _react.PropTypes.bool,
	  lazyUpdate: _react.PropTypes.bool,
	  className: _react.PropTypes.string,
	  style: _react.PropTypes.object,
	  theme: _react.PropTypes.string,
	  onChartReady: _react.PropTypes.func,
	  showLoading: _react.PropTypes.bool,
	  onEvents: _react.PropTypes.object
	};
	module.exports = exports['default'];

/***/ }),

/***/ 2058:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"time_chart":"TimeChat__time_chart___2L7gW","time_chart_loading":"TimeChat__time_chart_loading___13sWN","loading_content":"TimeChat__loading_content___3gT76","time_chart_none":"TimeChat__time_chart_none___1DJsL","content":"TimeChat__content___1A8x4"};

/***/ })

});