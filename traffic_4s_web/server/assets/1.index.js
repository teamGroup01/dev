webpackJsonp([1,8],{

/***/ 2019:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(480);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectDestructuringEmpty2 = __webpack_require__(2020);

	var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

	var _assign = __webpack_require__(481);

	var _assign2 = _interopRequireDefault(_assign);

	var _regenerator = __webpack_require__(396);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _requestData = __webpack_require__(2021);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.default = {

	  namespace: 'index',

	  state: {
	    title: {
	      custom_total: '',
	      custom_new: '',
	      custom_old: '',
	      group_total: '',
	      group_vip: '',
	      group_old: '',
	      group_repeat: '',
	      areaName: ''
	    },
	    data: [{}],
	    chat: {},
	    map: [{}],
	    showMapLoading: true,
	    showChatLoading: true,
	    max: '',
	    table: [],
	    ctable: [],
	    count: [{ custom_total: '', group_total: '', group_vip: '', group_old: '', group_repeat: '' }],
	    ccount: [{ custom_total: '', group_total: '', group_vip: '', group_old: '', group_repeat: '' }],
	    area: '',
	    titlename: '',
	    groupdata: '',
	    cgroupdata: ''
	  },
	  subscriptions: {
	    setup: function setup(_ref) {
	      var dispatch = _ref.dispatch,
	          history = _ref.history;

	      return history.listen(function (_ref2) {
	        var pathname = _ref2.pathname,
	            query = _ref2.query;

	        if (pathname === '/') {
	          dispatch({
	            type: 'loadall'
	          });
	          //dispatch({
	          //  type: 'quertOwnDetail',
	          //  url:'/Ts_user/getOwnInformation',
	          //});
	          dispatch({
	            type: 'querycity',
	            url: '/Ts_home/getHomeChatInformation',
	            cityname: ''
	          });
	          dispatch({
	            type: 'fetch',
	            url: '/Ts_home/getHomeHeadInformation'
	          });
	          dispatch({
	            type: 'map',
	            url: '/Ts_home/getHomeMapInformation'
	          });
	          dispatch({
	            type: 'table',
	            url: '/Ts_home/getHomeBotTable',
	            params: ''
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
	    fetch: /*#__PURE__*/_regenerator2.default.mark(function fetch(_ref3, _ref4) {
	      var url = _ref3.url;
	      var call = _ref4.call,
	          put = _ref4.put;

	      var _ref5, data;

	      return _regenerator2.default.wrap(function fetch$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _context.next = 2;
	              return call(_requestData.query, url);

	            case 2:
	              _ref5 = _context.sent;
	              data = _ref5.data;

	              if (!data) {
	                _context.next = 7;
	                break;
	              }

	              _context.next = 7;
	              return put({
	                type: 'save',
	                data: data
	              });

	            case 7:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, fetch, this);
	    }),
	    group: /*#__PURE__*/_regenerator2.default.mark(function group(_ref6, _ref7) {
	      var url = _ref6.url;
	      var call = _ref7.call,
	          put = _ref7.put;

	      var _ref8, data;

	      return _regenerator2.default.wrap(function group$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              _context2.next = 2;
	              return call(_requestData.query, url);

	            case 2:
	              _ref8 = _context2.sent;
	              data = _ref8.data;

	              if (!data) {
	                _context2.next = 7;
	                break;
	              }

	              _context2.next = 7;
	              return put({
	                type: 'groupsuccess',
	                data: data
	              });

	            case 7:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, group, this);
	    }),
	    selectgroup: /*#__PURE__*/_regenerator2.default.mark(function selectgroup(_ref9, _ref10) {
	      var url = _ref9.url,
	          group_id = _ref9.group_id;
	      var call = _ref10.call,
	          put = _ref10.put;

	      var params, _ref11, data;

	      return _regenerator2.default.wrap(function selectgroup$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              // eslint-disable-line
	              params = '';

	              if (group_id) {
	                params = (0, _assign2.default)(params, { group_id: group_id });
	              }
	              _context3.next = 4;
	              return call(_requestData.query, url, params);

	            case 4:
	              _ref11 = _context3.sent;
	              data = _ref11.data;

	              console.log(data);
	            //if (data) {
	            //  yield put({
	            //  type: 'groupsuccess',
	            //  data: data,
	            //});
	            //}

	            case 7:
	            case 'end':
	              return _context3.stop();
	          }
	        }
	      }, selectgroup, this);
	    }),
	    table: /*#__PURE__*/_regenerator2.default.mark(function table(_ref12, _ref13) {
	      var url = _ref12.url,
	          params = _ref12.params;
	      var call = _ref13.call,
	          put = _ref13.put;

	      var _ref14, data;

	      return _regenerator2.default.wrap(function table$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              _context4.next = 2;
	              return call(_requestData.query, url, params);

	            case 2:
	              _ref14 = _context4.sent;
	              data = _ref14.data;

	              if (!data) {
	                _context4.next = 7;
	                break;
	              }

	              _context4.next = 7;
	              return put({
	                type: 'tablesuccess',
	                data: data
	              });

	            case 7:
	            case 'end':
	              return _context4.stop();
	          }
	        }
	      }, table, this);
	    }),
	    quertOwnDetail: /*#__PURE__*/_regenerator2.default.mark(function quertOwnDetail(_ref15, _ref16) {
	      var url = _ref15.url;
	      var call = _ref16.call,
	          put = _ref16.put;

	      var _ref17, data;

	      return _regenerator2.default.wrap(function quertOwnDetail$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              _context5.next = 2;
	              return call(_requestData.query, url);

	            case 2:
	              _ref17 = _context5.sent;
	              data = _ref17.data;

	              if (!data) {
	                _context5.next = 13;
	                break;
	              }

	              _context5.next = 7;
	              return put({
	                type: 'querycity',
	                url: '/Ts_home/getHomeChatInformation',
	                cityname: ''
	              });

	            case 7:
	              _context5.next = 9;
	              return put({
	                type: 'fetch',
	                url: '/Ts_home/getHomeHeadInformation'
	              });

	            case 9:
	              _context5.next = 11;
	              return put({
	                type: 'map',
	                url: '/Ts_home/getHomeMapInformation'
	              });

	            case 11:
	              _context5.next = 13;
	              return put({
	                type: 'homearea',
	                url: '/Ts_home/getHomeBotTable',
	                params: ''
	              });

	            case 13:
	            case 'end':
	              return _context5.stop();
	          }
	        }
	      }, quertOwnDetail, this);
	    }),
	    querycity: /*#__PURE__*/_regenerator2.default.mark(function querycity(_ref18, _ref19) {
	      var url = _ref18.url,
	          cityname = _ref18.cityname;
	      var call = _ref19.call,
	          put = _ref19.put;

	      var params, _ref20, data, role_id;

	      return _regenerator2.default.wrap(function querycity$(_context6) {
	        while (1) {
	          switch (_context6.prev = _context6.next) {
	            case 0:
	              // eslint-disable-line
	              params = '';

	              if (cityname) {
	                params = (0, _assign2.default)(params, { province: cityname });
	              }
	              _context6.next = 4;
	              return call(_requestData.query, url, params);

	            case 4:
	              _ref20 = _context6.sent;
	              data = _ref20.data;
	              role_id = data.user_role;

	              if (!data) {
	                _context6.next = 10;
	                break;
	              }

	              _context6.next = 10;
	              return put({
	                type: 'querycitysuccess',
	                data: data,
	                titlename: role_id <= 2 ? cityname ? '经销商列表' : '全国经销商TOP10' : '经销商列表'
	              });

	            case 10:
	            case 'end':
	              return _context6.stop();
	          }
	        }
	      }, querycity, this);
	    }),
	    map: /*#__PURE__*/_regenerator2.default.mark(function map(_ref21, _ref22) {
	      var url = _ref21.url;
	      var call = _ref22.call,
	          put = _ref22.put;

	      var _ref23, data;

	      return _regenerator2.default.wrap(function map$(_context7) {
	        while (1) {
	          switch (_context7.prev = _context7.next) {
	            case 0:
	              _context7.next = 2;
	              return call(_requestData.query, url);

	            case 2:
	              _ref23 = _context7.sent;
	              data = _ref23.data;

	              if (!data) {
	                _context7.next = 7;
	                break;
	              }

	              _context7.next = 7;
	              return put({
	                type: 'querymapsuccess',
	                data: data
	              });

	            case 7:
	            case 'end':
	              return _context7.stop();
	          }
	        }
	      }, map, this);
	    }),
	    homearea: /*#__PURE__*/_regenerator2.default.mark(function homearea(_ref24, _ref25) {
	      var url = _ref24.url,
	          params = _ref24.params;
	      var call = _ref25.call,
	          put = _ref25.put;

	      var _ref26, data;

	      return _regenerator2.default.wrap(function homearea$(_context8) {
	        while (1) {
	          switch (_context8.prev = _context8.next) {
	            case 0:
	              _context8.next = 2;
	              return call(_requestData.query, url, params);

	            case 2:
	              _ref26 = _context8.sent;
	              data = _ref26.data;

	              if (!data) {
	                _context8.next = 7;
	                break;
	              }

	              _context8.next = 7;
	              return put({
	                type: 'queryareasuccess',
	                data: data
	              });

	            case 7:
	            case 'end':
	              return _context8.stop();
	          }
	        }
	      }, homearea, this);
	    }),
	    querytable: /*#__PURE__*/_regenerator2.default.mark(function querytable(_ref27, _ref28) {
	      var dealer_name = _ref27.dealer_name;
	      var call = _ref28.call,
	          put = _ref28.put,
	          select = _ref28.select;
	      var dealer_data, data, count, sum1, sum2, sum3, sum4, sum5;
	      return _regenerator2.default.wrap(function querytable$(_context9) {
	        while (1) {
	          switch (_context9.prev = _context9.next) {
	            case 0:
	              _context9.next = 2;
	              return select(function (state) {
	                return state.index.ctable;
	              });

	            case 2:
	              dealer_data = _context9.sent;
	              data = [];
	              count = [{ custom_total: '', group_total: '', group_vip: '', group_old: '', group_repeat: '' }];
	              sum1 = 0;
	              sum2 = 0;
	              sum3 = 0;
	              sum4 = 0;
	              sum5 = 0;

	              dealer_data.map(function (item) {
	                dealer_name = dealer_name.toUpperCase();
	                if (item.dealer_name && item.dealer_name.includes(dealer_name) || item.dealer_code && item.dealer_code.includes(dealer_name)) {
	                  data.push(item);
	                }
	              });
	              data.map(function (item) {
	                sum1 += item.custom_total;
	                sum2 += item.group_total;
	                sum3 += item.group_vip;
	                sum4 += item.group_old;
	                sum5 += item.group_repeat;
	              });
	              count[0].custom_total = sum1;
	              count[0].group_total = sum2;
	              count[0].group_vip = sum3;
	              count[0].group_old = sum4;
	              count[0].group_repeat = sum5;

	              if (!data) {
	                _context9.next = 20;
	                break;
	              }

	              _context9.next = 20;
	              return put({
	                type: 'querytablesuccess',
	                data: data,
	                count: count
	              });

	            case 20:
	            case 'end':
	              return _context9.stop();
	          }
	        }
	      }, querytable, this);
	    }),
	    querynativetable: /*#__PURE__*/_regenerator2.default.mark(function querynativetable(_ref29, _ref30) {
	      var call = _ref30.call,
	          put = _ref30.put,
	          select = _ref30.select;
	      var dealer_data, ccount;
	      return _regenerator2.default.wrap(function querynativetable$(_context10) {
	        while (1) {
	          switch (_context10.prev = _context10.next) {
	            case 0:
	              (0, _objectDestructuringEmpty3.default)(_ref29);
	              _context10.next = 3;
	              return select(function (state) {
	                return state.index.ctable;
	              });

	            case 3:
	              dealer_data = _context10.sent;
	              _context10.next = 6;
	              return select(function (state) {
	                return state.index.ccount;
	              });

	            case 6:
	              ccount = _context10.sent;

	              if (!dealer_data) {
	                _context10.next = 10;
	                break;
	              }

	              _context10.next = 10;
	              return put({
	                type: 'querytablesuccess',
	                data: dealer_data,
	                count: ccount
	              });

	            case 10:
	            case 'end':
	              return _context10.stop();
	          }
	        }
	      }, querynativetable, this);
	    }),
	    querygroup: /*#__PURE__*/_regenerator2.default.mark(function querygroup(_ref31, _ref32) {
	      var group_name = _ref31.group_name;
	      var call = _ref32.call,
	          put = _ref32.put,
	          select = _ref32.select;
	      var group_data, data;
	      return _regenerator2.default.wrap(function querygroup$(_context11) {
	        while (1) {
	          switch (_context11.prev = _context11.next) {
	            case 0:
	              _context11.next = 2;
	              return select(function (state) {
	                return state.index.cgroupdata;
	              });

	            case 2:
	              group_data = _context11.sent;
	              data = [];

	              group_data.map(function (item) {
	                if (item.group_name && item.group_name.includes(group_name)) {
	                  data.push(item);
	                }
	              });

	              if (!data) {
	                _context11.next = 8;
	                break;
	              }

	              _context11.next = 8;
	              return put({
	                type: 'querygroupsuccess',
	                data: data
	              });

	            case 8:
	            case 'end':
	              return _context11.stop();
	          }
	        }
	      }, querygroup, this);
	    }),
	    querynativegroup: /*#__PURE__*/_regenerator2.default.mark(function querynativegroup(_ref33, _ref34) {
	      var call = _ref34.call,
	          put = _ref34.put,
	          select = _ref34.select;
	      var group_data;
	      return _regenerator2.default.wrap(function querynativegroup$(_context12) {
	        while (1) {
	          switch (_context12.prev = _context12.next) {
	            case 0:
	              (0, _objectDestructuringEmpty3.default)(_ref33);
	              _context12.next = 3;
	              return select(function (state) {
	                return state.index.cgroupdata;
	              });

	            case 3:
	              group_data = _context12.sent;

	              if (!group_data) {
	                _context12.next = 7;
	                break;
	              }

	              _context12.next = 7;
	              return put({
	                type: 'querygroupsuccess',
	                data: group_data
	              });

	            case 7:
	            case 'end':
	              return _context12.stop();
	          }
	        }
	      }, querynativegroup, this);
	    })
	  },

	  reducers: {
	    save: function save(state, action) {
	      return (0, _extends3.default)({}, state, { title: action.data });
	    },
	    querycitysuccess: function querycitysuccess(state, action) {
	      return (0, _extends3.default)({}, state, { chat: action.data, showChatLoading: false, titlename: action.titlename });
	    },
	    querymapsuccess: function querymapsuccess(state, action) {
	      //console.log(action.data);
	      var data = action.data;
	      var max = void 0;
	      data.map(function (item, index) {
	        if (index == 0) {
	          max = item.value;
	        } else {
	          if (item.value >= max) {
	            max = item.value;
	          }
	        }
	      });
	      max = parseInt(max * 0.1 + max + 10);
	      //console.log(action.data);
	      //let map_data=[];
	      //action.data.map(item=>{
	      //  map_data.push({"name":item.name,"value":item.value});
	      //});
	      return (0, _extends3.default)({}, state, { map: action.data, showMapLoading: false, max: max });
	    },
	    queryseccess: function queryseccess(state, action) {
	      //console.log(action.data);

	      return (0, _extends3.default)({}, state, { showLoading: false });
	    },
	    loadchat: function loadchat(state, action) {
	      //console.log(action.data);

	      return (0, _extends3.default)({}, state, { showChatLoading: true });
	    },
	    loadall: function loadall(state, action) {
	      //console.log(action.data);

	      return (0, _extends3.default)({}, state, { showChatLoading: true, showMapLoading: true });
	    },
	    tablesuccess: function tablesuccess(state, action) {
	      //console.log(action.data);
	      var count = action.data.count;
	      var mcount = [];
	      mcount.push(count);
	      return (0, _extends3.default)({}, state, { table: action.data.data, ctable: action.data.data, count: mcount, ccount: mcount });
	    },
	    querytablesuccess: function querytablesuccess(state, action) {
	      //console.log(action.data);
	      var count = action.count;
	      return (0, _extends3.default)({}, state, { table: action.data, count: count });
	    },
	    queryareasuccess: function queryareasuccess(state, action) {
	      //console.log(action.data);

	      return (0, _extends3.default)({}, state, { area: action.data });
	    },
	    groupsuccess: function groupsuccess(state, action) {
	      //console.log(action.data);

	      return (0, _extends3.default)({}, state, { groupdata: action.data, cgroupdata: action.data });
	    },
	    querygroupsuccess: function querygroupsuccess(state, action) {
	      //console.log(action.data);

	      return (0, _extends3.default)({}, state, { groupdata: action.data });
	    }
	  }

	};
	module.exports = exports['default'];

/***/ }),

/***/ 2020:
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (obj) {
	  if (obj == null) throw new TypeError("Cannot destructure undefined");
	};

/***/ })

});