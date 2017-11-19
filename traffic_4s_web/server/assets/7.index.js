webpackJsonp([7,8],{

/***/ 2020:
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (obj) {
	  if (obj == null) throw new TypeError("Cannot destructure undefined");
	};

/***/ }),

/***/ 2061:
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

	var _constants = __webpack_require__(1978);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.default = {
	  //localhost:1337/Ts_ap_device/add?ap_id=1&ap_brand=sdfsdfs&ap_model=sdfdsfsdfsdf&ap_mac=dfsfsdfsdf&dealer_id=1&install_desc=fggggg
	  namespace: 'app',

	  state: {
	    data: [{
	      ap_id: '',
	      ap_brand: '',
	      ap_model: '',
	      ap_mac: '',
	      dealer_id: '',
	      install_desc: ''
	    }],
	    area: [{}],
	    cdata: [{}],
	    dealer: [{}],
	    cdealer: [{}],
	    title: {},
	    showLoading: true,
	    areadevice: ''
	  },

	  subscriptions: {
	    setup: function setup(_ref) {
	      var dispatch = _ref.dispatch,
	          history = _ref.history;

	      return history.listen(function (_ref2) {
	        var pathname = _ref2.pathname,
	            query = _ref2.query;

	        if (pathname === '/appage') {
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
	            type: 'fetch',
	            url: '/Ts_ap_device/getAllData'
	          });
	          dispatch({
	            type: 'area',
	            url: '/Ts_area/getAreaData'
	          });
	          dispatch({
	            type: 'title',
	            url: '/Ts_ap_device/getAPInformation'
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
	      var url = _ref3.url,
	          _ref3$areadevice = _ref3.areadevice,
	          areadevice = _ref3$areadevice === undefined ? ' ' : _ref3$areadevice,
	          _ref3$areaName = _ref3.areaName,
	          areaName = _ref3$areaName === undefined ? '' : _ref3$areaName;
	      var call = _ref4.call,
	          put = _ref4.put;
	      var data;
	      return _regenerator2.default.wrap(function fetch$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _context.next = 2;
	              return call(_requestData.query, url, areaName);

	            case 2:
	              data = _context.sent;

	              if (!data) {
	                _context.next = 6;
	                break;
	              }

	              _context.next = 6;
	              return put({
	                type: 'save',
	                data: data.data,
	                areadevice: areadevice
	              });

	            case 6:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, fetch, this);
	    }),
	    area: /*#__PURE__*/_regenerator2.default.mark(function area(_ref5, _ref6) {
	      var url = _ref5.url;
	      var call = _ref6.call,
	          put = _ref6.put;
	      var data;
	      return _regenerator2.default.wrap(function area$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              _context2.next = 2;
	              return call(_requestData.query, url);

	            case 2:
	              data = _context2.sent;

	              if (!data) {
	                _context2.next = 6;
	                break;
	              }

	              _context2.next = 6;
	              return put({
	                type: 'areasuccess',
	                data: data.data
	              });

	            case 6:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, area, this);
	    }),
	    title: /*#__PURE__*/_regenerator2.default.mark(function title(_ref7, _ref8) {
	      var url = _ref7.url;
	      var call = _ref8.call,
	          put = _ref8.put;
	      var data;
	      return _regenerator2.default.wrap(function title$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              _context3.next = 2;
	              return call(_requestData.query, url);

	            case 2:
	              data = _context3.sent;

	              if (!data) {
	                _context3.next = 6;
	                break;
	              }

	              _context3.next = 6;
	              return put({
	                type: 'titlesuccess',
	                data: data.data
	              });

	            case 6:
	            case 'end':
	              return _context3.stop();
	          }
	        }
	      }, title, this);
	    }),
	    dealer: /*#__PURE__*/_regenerator2.default.mark(function dealer(_ref9, _ref10) {
	      var url = _ref9.url;
	      var call = _ref10.call,
	          put = _ref10.put;
	      var data;
	      return _regenerator2.default.wrap(function dealer$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              // eslint-disable-line
	              //const data = yield call(query,url);
	              data = JSON.parse(localStorage.getItem(_constants.DEALER_DETAIL));

	              if (!data) {
	                _context4.next = 4;
	                break;
	              }

	              _context4.next = 4;
	              return put({
	                type: 'dealersuccess',
	                data: data
	              });

	            case 4:
	            case 'end':
	              return _context4.stop();
	          }
	        }
	      }, dealer, this);
	    }),
	    addDevice: /*#__PURE__*/_regenerator2.default.mark(function addDevice(_ref11, _ref12) {
	      var ap_brand = _ref11.ap_brand,
	          ap_mac = _ref11.ap_mac,
	          ap_model = _ref11.ap_model,
	          dealer_id = _ref11.dealer_id,
	          url = _ref11.url,
	          payload = _ref11.payload;
	      var call = _ref12.call,
	          put = _ref12.put;
	      var params, data;
	      return _regenerator2.default.wrap(function addDevice$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              // eslint-disable-line
	              params = { ap_brand: ap_brand, ap_mac: ap_mac, ap_model: ap_model };

	              if (dealer_id) {
	                params = (0, _assign2.default)(params, { dealer_id: dealer_id });
	              }
	              _context5.next = 4;
	              return call(_requestData.query, url, params);

	            case 4:
	              data = _context5.sent;

	              if (!data) {
	                _context5.next = 10;
	                break;
	              }

	              _context5.next = 8;
	              return put({
	                type: 'title',
	                url: '/Ts_ap_device/getAPInformation'
	              });

	            case 8:
	              _context5.next = 10;
	              return put({
	                type: 'fetch',
	                url: '/Ts_ap_device/getAllData'
	              });

	            case 10:
	            case 'end':
	              return _context5.stop();
	          }
	        }
	      }, addDevice, this);
	    }),
	    changeInfo: /*#__PURE__*/_regenerator2.default.mark(function changeInfo(_ref13, _ref14) {
	      var ap_id = _ref13.ap_id,
	          ap_brand = _ref13.ap_brand,
	          ap_mac = _ref13.ap_mac,
	          ap_model = _ref13.ap_model,
	          dealer_id = _ref13.dealer_id,
	          url = _ref13.url,
	          payload = _ref13.payload;
	      var call = _ref14.call,
	          put = _ref14.put,
	          select = _ref14.select;
	      var areadevice, params, data;
	      return _regenerator2.default.wrap(function changeInfo$(_context6) {
	        while (1) {
	          switch (_context6.prev = _context6.next) {
	            case 0:
	              _context6.next = 2;
	              return select(function (state) {
	                return state.app.areadevice;
	              });

	            case 2:
	              areadevice = _context6.sent;
	              params = { ap_id: ap_id, ap_brand: ap_brand, ap_mac: ap_mac, ap_model: ap_model };

	              if (dealer_id) {
	                params = (0, _assign2.default)(params, { dealer_id: dealer_id });
	              }
	              _context6.next = 7;
	              return call(_requestData.query, url, params);

	            case 7:
	              data = _context6.sent;

	              if (!data) {
	                _context6.next = 11;
	                break;
	              }

	              _context6.next = 11;
	              return put({
	                type: 'fetch',
	                url: '/Ts_ap_device/getAllData',
	                areaName: areadevice ? areadevice : ''
	              });

	            case 11:
	            case 'end':
	              return _context6.stop();
	          }
	        }
	      }, changeInfo, this);
	    }),
	    deleteDevice: /*#__PURE__*/_regenerator2.default.mark(function deleteDevice(_ref15, _ref16) {
	      var ap_id = _ref15.ap_id,
	          url = _ref15.url;
	      var call = _ref16.call,
	          put = _ref16.put,
	          select = _ref16.select;
	      var areadevice, params, data;
	      return _regenerator2.default.wrap(function deleteDevice$(_context7) {
	        while (1) {
	          switch (_context7.prev = _context7.next) {
	            case 0:
	              _context7.next = 2;
	              return select(function (state) {
	                return state.app.areadevice;
	              });

	            case 2:
	              areadevice = _context7.sent;
	              params = { ap_id: ap_id };
	              _context7.next = 6;
	              return call(_requestData.query, url, params);

	            case 6:
	              data = _context7.sent;

	              if (!data) {
	                _context7.next = 12;
	                break;
	              }

	              _context7.next = 10;
	              return put({
	                type: 'fetch',
	                url: '/Ts_ap_device/getAllData',
	                areaName: areadevice ? areadevice : ''

	              });

	            case 10:
	              _context7.next = 12;
	              return put({
	                type: 'title',
	                url: '/Ts_ap_device/getAPInformation'
	              });

	            case 12:
	            case 'end':
	              return _context7.stop();
	          }
	        }
	      }, deleteDevice, this);
	    }),
	    searchDevice: /*#__PURE__*/_regenerator2.default.mark(function searchDevice(_ref17, _ref18) {
	      var ap_id = _ref17.ap_id,
	          url = _ref17.url;
	      var call = _ref18.call,
	          put = _ref18.put,
	          select = _ref18.select;
	      var params, todos, data;
	      return _regenerator2.default.wrap(function searchDevice$(_context8) {
	        while (1) {
	          switch (_context8.prev = _context8.next) {
	            case 0:
	              // eslint-disable-line
	              params = { ap_id: ap_id };
	              _context8.next = 3;
	              return select(function (state) {
	                return state.app.cdata;
	              });

	            case 3:
	              todos = _context8.sent;
	              data = [];

	              todos.map(function (item) {

	                //ap_brand
	                if (item.ap_mac && item.ap_mac.includes(ap_id) || item.ap_brand && item.ap_brand.includes(ap_id) || item.dealer_name && item.dealer_name.includes(ap_id)) {
	                  data.push(item);
	                }
	              });
	              //const data = yield call(query,url,params);

	              if (!data) {
	                _context8.next = 9;
	                break;
	              }

	              _context8.next = 9;
	              return put({
	                type: 'dataseccess',
	                data: data
	              });

	            case 9:
	            case 'end':
	              return _context8.stop();
	          }
	        }
	      }, searchDevice, this);
	    }),
	    queryallnativedata: /*#__PURE__*/_regenerator2.default.mark(function queryallnativedata(_ref19, _ref20) {
	      var call = _ref20.call,
	          put = _ref20.put,
	          select = _ref20.select;
	      var data;
	      return _regenerator2.default.wrap(function queryallnativedata$(_context9) {
	        while (1) {
	          switch (_context9.prev = _context9.next) {
	            case 0:
	              (0, _objectDestructuringEmpty3.default)(_ref19);
	              _context9.next = 3;
	              return select(function (state) {
	                return state.app.cdata;
	              });

	            case 3:
	              data = _context9.sent;

	              if (!data) {
	                _context9.next = 7;
	                break;
	              }

	              _context9.next = 7;
	              return put({
	                type: 'dataseccess',
	                data: data
	              });

	            case 7:
	            case 'end':
	              return _context9.stop();
	          }
	        }
	      }, queryallnativedata, this);
	    }),
	    searchAreaDevice: /*#__PURE__*/_regenerator2.default.mark(function searchAreaDevice(_ref21, _ref22) {
	      var areaName = _ref21.areaName,
	          url = _ref21.url;
	      var call = _ref22.call,
	          put = _ref22.put,
	          select = _ref22.select;
	      var data;
	      return _regenerator2.default.wrap(function searchAreaDevice$(_context10) {
	        while (1) {
	          switch (_context10.prev = _context10.next) {
	            case 0:
	              _context10.next = 2;
	              return call(_requestData.query, url, areaName);

	            case 2:
	              data = _context10.sent;

	              if (!data.data) {
	                _context10.next = 6;
	                break;
	              }

	              _context10.next = 6;
	              return put({
	                type: 'save',
	                data: data.data,
	                areadevice: areaName
	              });

	            case 6:
	            case 'end':
	              return _context10.stop();
	          }
	        }
	      }, searchAreaDevice, this);
	    }),
	    queryDealer: /*#__PURE__*/_regenerator2.default.mark(function queryDealer(_ref23, _ref24) {
	      var areaName = _ref23.areaName,
	          url = _ref23.url;
	      var call = _ref24.call,
	          put = _ref24.put,
	          select = _ref24.select;
	      var todos, data;
	      return _regenerator2.default.wrap(function queryDealer$(_context11) {
	        while (1) {
	          switch (_context11.prev = _context11.next) {
	            case 0:
	              _context11.next = 2;
	              return select(function (state) {
	                return state.app.cdealer;
	              });

	            case 2:
	              todos = _context11.sent;

	              //const data = yield call(query,url,params);
	              data = [];

	              todos.map(function (item) {
	                //ap_brand
	                if (item.dealer_name && item.dealer_name.includes(areaName) || item.dealer_code && item.dealer_code.includes(areaName) || item.province && item.province.includes(areaName) || item.address && item.address.includes(areaName) || item.install_desc && item.install_desc.includes(areaName)) {
	                  data.push(item);
	                }
	              });

	              if (!data) {
	                _context11.next = 8;
	                break;
	              }

	              _context11.next = 8;
	              return put({
	                type: 'querydealersuccess',
	                data: data
	              });

	            case 8:
	            case 'end':
	              return _context11.stop();
	          }
	        }
	      }, queryDealer, this);
	    }),
	    querynativeDealer: /*#__PURE__*/_regenerator2.default.mark(function querynativeDealer(_ref25, _ref26) {
	      var areaName = _ref25.areaName,
	          url = _ref25.url;
	      var call = _ref26.call,
	          put = _ref26.put,
	          select = _ref26.select;
	      var todos;
	      return _regenerator2.default.wrap(function querynativeDealer$(_context12) {
	        while (1) {
	          switch (_context12.prev = _context12.next) {
	            case 0:
	              _context12.next = 2;
	              return select(function (state) {
	                return state.app.cdealer;
	              });

	            case 2:
	              todos = _context12.sent;

	              if (!todos) {
	                _context12.next = 6;
	                break;
	              }

	              _context12.next = 6;
	              return put({
	                type: 'querydealersuccess',
	                data: todos
	              });

	            case 6:
	            case 'end':
	              return _context12.stop();
	          }
	        }
	      }, querynativeDealer, this);
	    }),
	    queryonline: /*#__PURE__*/_regenerator2.default.mark(function queryonline(_ref27, _ref28) {
	      var url = _ref27.url;
	      var call = _ref28.call,
	          put = _ref28.put,
	          select = _ref28.select;
	      var todos, data;
	      return _regenerator2.default.wrap(function queryonline$(_context13) {
	        while (1) {
	          switch (_context13.prev = _context13.next) {
	            case 0:
	              _context13.next = 2;
	              return select(function (state) {
	                return state.app.cdata;
	              });

	            case 2:
	              todos = _context13.sent;

	              //const data = yield call(query,url,params);
	              data = [];

	              todos.map(function (item) {
	                if (item.online == 1) {
	                  data.push(item);
	                }
	              });

	              if (!data) {
	                _context13.next = 8;
	                break;
	              }

	              _context13.next = 8;
	              return put({
	                type: 'dataseccess',
	                data: data
	              });

	            case 8:
	            case 'end':
	              return _context13.stop();
	          }
	        }
	      }, queryonline, this);
	    }),
	    queryoutline: /*#__PURE__*/_regenerator2.default.mark(function queryoutline(_ref29, _ref30) {
	      var url = _ref29.url;
	      var call = _ref30.call,
	          put = _ref30.put,
	          select = _ref30.select;
	      var todos, data;
	      return _regenerator2.default.wrap(function queryoutline$(_context14) {
	        while (1) {
	          switch (_context14.prev = _context14.next) {
	            case 0:
	              _context14.next = 2;
	              return select(function (state) {
	                return state.app.cdata;
	              });

	            case 2:
	              todos = _context14.sent;

	              //const data = yield call(query,url,params);
	              data = [];

	              todos.map(function (item) {
	                if (item.online == 0) {
	                  data.push(item);
	                }
	              });

	              if (!data) {
	                _context14.next = 8;
	                break;
	              }

	              _context14.next = 8;
	              return put({
	                type: 'dataseccess',
	                data: data
	              });

	            case 8:
	            case 'end':
	              return _context14.stop();
	          }
	        }
	      }, queryoutline, this);
	    }),
	    queryprevious: /*#__PURE__*/_regenerator2.default.mark(function queryprevious(_ref31, _ref32) {
	      var url = _ref31.url;
	      var call = _ref32.call,
	          put = _ref32.put,
	          select = _ref32.select;
	      var todos, data;
	      return _regenerator2.default.wrap(function queryprevious$(_context15) {
	        while (1) {
	          switch (_context15.prev = _context15.next) {
	            case 0:
	              _context15.next = 2;
	              return select(function (state) {
	                return state.app.cdata;
	              });

	            case 2:
	              todos = _context15.sent;

	              //const data = yield call(query,url,params);
	              data = [];

	              todos.map(function (item) {
	                if (item.online == 2) {
	                  data.push(item);
	                }
	              });

	              if (!data) {
	                _context15.next = 8;
	                break;
	              }

	              _context15.next = 8;
	              return put({
	                type: 'dataseccess',
	                data: data
	              });

	            case 8:
	            case 'end':
	              return _context15.stop();
	          }
	        }
	      }, queryprevious, this);
	    })
	  },

	  reducers: {
	    titlesuccess: function titlesuccess(state, action) {
	      return (0, _extends3.default)({}, state, { title: action.data });
	    },
	    save: function save(state, action) {
	      return (0, _extends3.default)({}, state, { data: action.data, cdata: action.data, showLoading: false, areadevice: action.areadevice });
	    },
	    areasuccess: function areasuccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { area: action.data });
	    },
	    dataseccess: function dataseccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { data: action.data });
	    },
	    dealersuccess: function dealersuccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { dealer: action.data, cdealer: action.data });
	    },
	    querydealersuccess: function querydealersuccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { dealer: action.data });
	    },
	    loading: function loading(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { showLoading: true });
	    }
	  }

	};
	module.exports = exports['default'];

/***/ })

});