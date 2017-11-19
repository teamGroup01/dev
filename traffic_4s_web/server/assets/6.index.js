webpackJsonp([6,8],{

/***/ 2020:
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (obj) {
	  if (obj == null) throw new TypeError("Cannot destructure undefined");
	};

/***/ }),

/***/ 2060:
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

	  namespace: 'dealer',

	  state: {
	    data: [{
	      dealer_id: '',
	      dealer_name: '',
	      dealer_code: '',
	      brand_id: '',
	      barea_id: '',
	      sarea_id: '',
	      group_id: '',
	      province: '',
	      city: '',
	      address: '',
	      plan_path: ''

	    }],
	    area: [{}],
	    cdata: [{}],
	    group: [],
	    cgroup: [],
	    showLoading: true,
	    user_id: '',
	    areadealer: ''

	  },

	  subscriptions: {
	    setup: function setup(_ref) {
	      var dispatch = _ref.dispatch,
	          history = _ref.history;

	      return history.listen(function (_ref2) {
	        var pathname = _ref2.pathname,
	            query = _ref2.query;

	        if (pathname === '/dealerpage') {
	          dispatch({
	            type: 'loading'
	          });
	          //dispatch({
	          //  type: 'quertOwnDetail',
	          //  url:'/Ts_user/getOwnInformation',
	          //});
	          dispatch({
	            type: 'searchArea',
	            url: '/Ts_dealer/getAllData',
	            params: ''
	          });
	          dispatch({
	            type: 'area',
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
	    //      type: 'fetch',
	    //      url:'/Ts_dealer/getAllData',
	    //      user_id:data[0].user_id,
	    //    });
	    //  }
	    //
	    //},
	    fetch: /*#__PURE__*/_regenerator2.default.mark(function fetch(_ref3, _ref4) {
	      var url = _ref3.url;
	      var call = _ref4.call,
	          put = _ref4.put,
	          select = _ref4.select;
	      var data;
	      return _regenerator2.default.wrap(function fetch$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _context.next = 2;
	              return call(_requestData.query, url);

	            case 2:
	              data = _context.sent;

	              if (!data) {
	                _context.next = 6;
	                break;
	              }

	              _context.next = 6;
	              return put({
	                type: 'save',
	                data: data.data
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
	    addDealer: /*#__PURE__*/_regenerator2.default.mark(function addDealer(_ref7, _ref8) {
	      var province = _ref7.province,
	          dealer_name = _ref7.dealer_name,
	          dealer_code = _ref7.dealer_code,
	          group_id = _ref7.group_id,
	          barea_id = _ref7.barea_id,
	          city = _ref7.city,
	          url = _ref7.url;
	      var call = _ref8.call,
	          put = _ref8.put;
	      var params, data;
	      return _regenerator2.default.wrap(function addDealer$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              // eslint-disable-line
	              params = { dealer_name: dealer_name };

	              if (group_id) {
	                params = (0, _assign2.default)(params, { group_id: group_id });
	              }
	              if (barea_id) {
	                params = (0, _assign2.default)(params, { barea_id: barea_id });
	              }
	              if (dealer_code) {
	                params = (0, _assign2.default)(params, { dealer_code: dealer_code });
	              }
	              if (city) {
	                params = (0, _assign2.default)(params, { city: city });
	              }
	              _context3.next = 7;
	              return call(_requestData.query, url, params);

	            case 7:
	              data = _context3.sent;

	              if (!data) {
	                _context3.next = 11;
	                break;
	              }

	              _context3.next = 11;
	              return put({
	                type: 'fetch',
	                url: '/Ts_dealer/getAllData'
	              });

	            case 11:
	            case 'end':
	              return _context3.stop();
	          }
	        }
	      }, addDealer, this);
	    }),
	    changeDealer: /*#__PURE__*/_regenerator2.default.mark(function changeDealer(_ref9, _ref10) {
	      var province = _ref9.province,
	          dealer_id = _ref9.dealer_id,
	          dealer_name = _ref9.dealer_name,
	          dealer_code = _ref9.dealer_code,
	          brand_id = _ref9.brand_id,
	          group_id = _ref9.group_id,
	          barea_id = _ref9.barea_id,
	          city = _ref9.city,
	          url = _ref9.url;
	      var call = _ref10.call,
	          put = _ref10.put,
	          select = _ref10.select;
	      var areadealer, params, data;
	      return _regenerator2.default.wrap(function changeDealer$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              _context4.next = 2;
	              return select(function (state) {
	                return state.dealer.areadealer;
	              });

	            case 2:
	              areadealer = _context4.sent;
	              params = {
	                dealer_id: dealer_id,
	                dealer_name: dealer_name
	              };

	              if (barea_id) {
	                params = (0, _assign2.default)(params, { barea_id: barea_id });
	              }
	              if (group_id) {
	                params = (0, _assign2.default)(params, { group_id: group_id });
	              }
	              if (dealer_code) {
	                params = (0, _assign2.default)(params, { dealer_code: dealer_code });
	              }
	              if (city) {
	                params = (0, _assign2.default)(params, { city: city });
	              }
	              _context4.next = 10;
	              return call(_requestData.query, url, params);

	            case 10:
	              data = _context4.sent;
	              _context4.next = 13;
	              return put({
	                type: 'searchArea',
	                url: '/Ts_dealer/getAllData',
	                params: areadealer ? areadealer : ''
	              });

	            case 13:
	            case 'end':
	              return _context4.stop();
	          }
	        }
	      }, changeDealer, this);
	    }),
	    deleteDealer: /*#__PURE__*/_regenerator2.default.mark(function deleteDealer(_ref11, _ref12) {
	      var dealer_id = _ref11.dealer_id,
	          url = _ref11.url;
	      var call = _ref12.call,
	          put = _ref12.put,
	          select = _ref12.select;
	      var areadealer, params, data;
	      return _regenerator2.default.wrap(function deleteDealer$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              _context5.next = 2;
	              return select(function (state) {
	                return state.dealer.areadealer;
	              });

	            case 2:
	              areadealer = _context5.sent;
	              params = { dealer_id: dealer_id };
	              _context5.next = 6;
	              return call(_requestData.query, url, params);

	            case 6:
	              data = _context5.sent;

	              if (!data) {
	                _context5.next = 10;
	                break;
	              }

	              _context5.next = 10;
	              return put({
	                type: 'searchArea',
	                url: '/Ts_dealer/getAllData',
	                params: areadealer ? areadealer : ''
	              });

	            case 10:
	            case 'end':
	              return _context5.stop();
	          }
	        }
	      }, deleteDealer, this);
	    }),
	    searchDealer: /*#__PURE__*/_regenerator2.default.mark(function searchDealer(_ref13, _ref14) {
	      var dealer_id = _ref13.dealer_id,
	          url = _ref13.url;
	      var call = _ref14.call,
	          select = _ref14.select,
	          put = _ref14.put;
	      var params, todos, data;
	      return _regenerator2.default.wrap(function searchDealer$(_context6) {
	        while (1) {
	          switch (_context6.prev = _context6.next) {
	            case 0:
	              // eslint-disable-line
	              params = { dealer_id: dealer_id };
	              _context6.next = 3;
	              return select(function (state) {
	                return state.dealer.cdata;
	              });

	            case 3:
	              todos = _context6.sent;
	              data = [];

	              todos.map(function (item) {
	                //if(item.dealer_id==dealer_id){
	                //  data.push(item);
	                //}
	                if (item.dealer_name && item.dealer_name.includes(dealer_id) || item.dealer_code && item.dealer_code.includes(dealer_id) || item.city && item.city.includes(dealer_id) || item.address && item.address.includes(dealer_id)) {
	                  data.push(item);
	                }
	              });

	              if (!data) {
	                _context6.next = 9;
	                break;
	              }

	              _context6.next = 9;
	              return put({
	                type: 'dataseccess',
	                data: data
	              });

	            case 9:
	            case 'end':
	              return _context6.stop();
	          }
	        }
	      }, searchDealer, this);
	    }),
	    queryallnativedata: /*#__PURE__*/_regenerator2.default.mark(function queryallnativedata(_ref15, _ref16) {
	      var call = _ref16.call,
	          put = _ref16.put,
	          select = _ref16.select;
	      var data;
	      return _regenerator2.default.wrap(function queryallnativedata$(_context7) {
	        while (1) {
	          switch (_context7.prev = _context7.next) {
	            case 0:
	              (0, _objectDestructuringEmpty3.default)(_ref15);
	              _context7.next = 3;
	              return select(function (state) {
	                return state.dealer.cdata;
	              });

	            case 3:
	              data = _context7.sent;

	              if (!data) {
	                _context7.next = 7;
	                break;
	              }

	              _context7.next = 7;
	              return put({
	                type: 'dataseccess',
	                data: data
	              });

	            case 7:
	            case 'end':
	              return _context7.stop();
	          }
	        }
	      }, queryallnativedata, this);
	    }),
	    searchArea: /*#__PURE__*/_regenerator2.default.mark(function searchArea(_ref17, _ref18) {
	      var _ref17$params = _ref17.params,
	          params = _ref17$params === undefined ? '' : _ref17$params,
	          url = _ref17.url;
	      var call = _ref18.call,
	          put = _ref18.put,
	          select = _ref18.select;
	      var data;
	      return _regenerator2.default.wrap(function searchArea$(_context8) {
	        while (1) {
	          switch (_context8.prev = _context8.next) {
	            case 0:
	              _context8.next = 2;
	              return call(_requestData.query, url, params);

	            case 2:
	              data = _context8.sent;

	              if (!data.data) {
	                _context8.next = 6;
	                break;
	              }

	              _context8.next = 6;
	              return put({
	                type: 'save',
	                data: data.data,
	                areadealer: params
	              });

	            case 6:
	            case 'end':
	              return _context8.stop();
	          }
	        }
	      }, searchArea, this);
	    }),
	    group: /*#__PURE__*/_regenerator2.default.mark(function group(_ref19, _ref20) {
	      var url = _ref19.url;
	      var call = _ref20.call,
	          put = _ref20.put;
	      var data;
	      return _regenerator2.default.wrap(function group$(_context9) {
	        while (1) {
	          switch (_context9.prev = _context9.next) {
	            case 0:
	              // eslint-disable-line
	              //const data = yield call(query,url);
	              data = JSON.parse(localStorage.getItem(_constants.GROUP_DETAIL));

	              if (!data) {
	                _context9.next = 4;
	                break;
	              }

	              _context9.next = 4;
	              return put({
	                type: 'groupsuccess',
	                data: data
	              });

	            case 4:
	            case 'end':
	              return _context9.stop();
	          }
	        }
	      }, group, this);
	    }),
	    querygroup: /*#__PURE__*/_regenerator2.default.mark(function querygroup(_ref21, _ref22) {
	      var groupName = _ref21.groupName,
	          url = _ref21.url;
	      var call = _ref22.call,
	          put = _ref22.put,
	          select = _ref22.select;
	      var todos, data;
	      return _regenerator2.default.wrap(function querygroup$(_context10) {
	        while (1) {
	          switch (_context10.prev = _context10.next) {
	            case 0:
	              _context10.next = 2;
	              return select(function (state) {
	                return state.dealer.cgroup;
	              });

	            case 2:
	              todos = _context10.sent;

	              //const data = yield call(query,url,params);
	              data = [];

	              todos.map(function (item) {
	                //ap_brand
	                if (item.group_name && item.group_name.includes(groupName)) {
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
	                data: data
	              });

	            case 8:
	            case 'end':
	              return _context10.stop();
	          }
	        }
	      }, querygroup, this);
	    }),
	    querynativegroup: /*#__PURE__*/_regenerator2.default.mark(function querynativegroup(_ref23, _ref24) {
	      var url = _ref23.url;
	      var call = _ref24.call,
	          put = _ref24.put,
	          select = _ref24.select;
	      var todos;
	      return _regenerator2.default.wrap(function querynativegroup$(_context11) {
	        while (1) {
	          switch (_context11.prev = _context11.next) {
	            case 0:
	              _context11.next = 2;
	              return select(function (state) {
	                return state.dealer.cgroup;
	              });

	            case 2:
	              todos = _context11.sent;

	              if (!todos) {
	                _context11.next = 6;
	                break;
	              }

	              _context11.next = 6;
	              return put({
	                type: 'querygroupsuccess',
	                data: todos
	              });

	            case 6:
	            case 'end':
	              return _context11.stop();
	          }
	        }
	      }, querynativegroup, this);
	    })
	  },

	  reducers: {
	    save: function save(state, action) {
	      //console.log(action.user_id);
	      return (0, _extends3.default)({}, state, { data: action.data, cdata: action.data, showLoading: false, areadealer: action.areadealer });
	    },
	    areasuccess: function areasuccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { area: action.data });
	    },
	    dataseccess: function dataseccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { data: action.data });
	    },
	    groupsuccess: function groupsuccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { group: action.data, cgroup: action.data });
	    },
	    querygroupsuccess: function querygroupsuccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { group: action.data });
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