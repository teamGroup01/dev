webpackJsonp([5,8],{

/***/ 2020:
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (obj) {
	  if (obj == null) throw new TypeError("Cannot destructure undefined");
	};

/***/ }),

/***/ 2059:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(480);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(747);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _objectDestructuringEmpty2 = __webpack_require__(2020);

	var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

	var _assign = __webpack_require__(481);

	var _assign2 = _interopRequireDefault(_assign);

	var _regenerator = __webpack_require__(396);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _requestData = __webpack_require__(2021);

	var _constants = __webpack_require__(1978);

	var _antd = __webpack_require__(745);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.default = {

	  namespace: 'account',

	  state: {
	    data: [{
	      user_id: '',
	      user_name: '',
	      user_role: 0,
	      barea_id: '',
	      group_id: '',
	      dealer_id: '',
	      mail: '',
	      wechat: '',
	      telephone: '',
	      qq: '',
	      crt_date: '',
	      upd_date: '',
	      areaName: [],
	      dealerName: ''
	    }],
	    area: [{}],
	    cdata: [{}],
	    dealer: [{}],
	    cdealer: [{}],
	    group: [],
	    cgroup: [],
	    userDetail: {
	      user_id: '',
	      user_role: '',
	      user_name: '',
	      user_pass: '',
	      brand_id: '',
	      barea_id: '',
	      sarea_id: '',
	      dealer_id: '',
	      group_id: '',
	      realname: '',
	      telephone: '',
	      mobile: '',
	      qq: '',
	      wechat: '',
	      create_user: '',
	      crt_date: '',
	      upd_date: '',
	      areaName: '',
	      levelArr: '',
	      dealerName: '',
	      groupName: '',
	      showLoading: true
	    },
	    userroleid: '',
	    resetpwd: ''
	  },

	  subscriptions: {
	    setup: function setup(_ref) {
	      var dispatch = _ref.dispatch,
	          history = _ref.history;

	      return history.listen(function (_ref2) {
	        var pathname = _ref2.pathname,
	            query = _ref2.query;

	        if (pathname === '/accountpage') {
	          if (query.frommain == 1) {
	            dispatch({
	              type: 'updateuserdetail',
	              url: '/Ts_user/getOwnInformation'
	            });
	          } else {
	            dispatch({
	              type: 'userdetail'
	              //url:'/Ts_user/getOwnInformation',
	            });
	          }
	          dispatch({
	            type: 'loading'
	          });
	          dispatch({
	            type: 'fetch',
	            url: '/Ts_user/getAllData',
	            params: ''
	          });
	          dispatch({
	            type: 'area',
	            url: '/Ts_area/getAreaForUser'
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
	      var url = _ref3.url,
	          params = _ref3.params,
	          _ref3$pwd = _ref3.pwd,
	          pwd = _ref3$pwd === undefined ? '' : _ref3$pwd;
	      var call = _ref4.call,
	          put = _ref4.put;
	      var data;
	      return _regenerator2.default.wrap(function fetch$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _context.next = 2;
	              return call(_requestData.query, url, params);

	            case 2:
	              data = _context.sent;

	              if (!data) {
	                _context.next = 7;
	                break;
	              }

	              _context.next = 6;
	              return put({
	                type: 'save',
	                data: data.data,
	                userroleid: params
	              });

	            case 6:
	              if (pwd) {
	                _antd.Modal.success({
	                  title: '密码重置为',
	                  content: pwd
	                });
	              }

	            case 7:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, fetch, this);
	    }),
	    userdetail: /*#__PURE__*/_regenerator2.default.mark(function userdetail(_ref5, _ref6) {
	      var url = _ref5.url;
	      var call = _ref6.call,
	          put = _ref6.put;
	      var value;
	      return _regenerator2.default.wrap(function userdetail$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              // eslint-disable-line
	              //const data = yield call(query,url);
	              value = JSON.parse(localStorage.getItem(_constants.USER_DETAIL));

	              if (!value) {
	                _context2.next = 6;
	                break;
	              }

	              _context2.next = 4;
	              return put({
	                type: 'dealer',
	                url: '/Ts_dealer/getAllData'
	                //user_id:data.data[0].user_id,
	              });

	            case 4:
	              _context2.next = 6;
	              return put({
	                type: 'queryuserdetailseccess',
	                data: value
	              });

	            case 6:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, userdetail, this);
	    }),
	    updateuserdetail: /*#__PURE__*/_regenerator2.default.mark(function updateuserdetail(_ref7, _ref8) {
	      var url = _ref7.url;
	      var call = _ref8.call,
	          put = _ref8.put;
	      var data;
	      return _regenerator2.default.wrap(function updateuserdetail$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              _context3.next = 2;
	              return call(_requestData.query, url);

	            case 2:
	              data = _context3.sent;

	              if (!data) {
	                _context3.next = 8;
	                break;
	              }

	              _context3.next = 6;
	              return put({
	                type: 'dealer',
	                url: '/Ts_dealer/getAllData'
	                //user_id:data.data[0].user_id,
	              });

	            case 6:
	              _context3.next = 8;
	              return put({
	                type: 'queryuserdetailseccess',
	                data: data.data
	              });

	            case 8:
	            case 'end':
	              return _context3.stop();
	          }
	        }
	      }, updateuserdetail, this);
	    }),
	    resetPwd: /*#__PURE__*/_regenerator2.default.mark(function resetPwd(_ref9, _ref10) {
	      var url = _ref9.url,
	          user_id = _ref9.user_id;
	      var call = _ref10.call,
	          put = _ref10.put;
	      var params, data, pwd;
	      return _regenerator2.default.wrap(function resetPwd$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              // eslint-disable-line
	              params = { user_id: user_id };
	              _context4.next = 3;
	              return call(_requestData.query, url, params);

	            case 3:
	              data = _context4.sent;

	              if (!data) {
	                _context4.next = 8;
	                break;
	              }

	              pwd = data.data.password;
	              //console.log(data.data);
	              //message.success('重置密码:'+pwd, 5,true);

	              _context4.next = 8;
	              return put({
	                type: 'fetch',
	                url: '/Ts_user/getAllData',
	                pwd: pwd
	              });

	            case 8:
	            case 'end':
	              return _context4.stop();
	          }
	        }
	      }, resetPwd, this);
	    }),
	    group: /*#__PURE__*/_regenerator2.default.mark(function group(_ref11, _ref12) {
	      var url = _ref11.url;
	      var call = _ref12.call,
	          put = _ref12.put;
	      var data;
	      return _regenerator2.default.wrap(function group$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              // eslint-disable-line
	              //const data = yield call(query,url);
	              data = JSON.parse(localStorage.getItem(_constants.GROUP_DETAIL));
	              //console.log(data)

	              if (!data) {
	                _context5.next = 4;
	                break;
	              }

	              _context5.next = 4;
	              return put({
	                type: 'groupsuccess',
	                data: data
	              });

	            case 4:
	            case 'end':
	              return _context5.stop();
	          }
	        }
	      }, group, this);
	    }),
	    area: /*#__PURE__*/_regenerator2.default.mark(function area(_ref13, _ref14) {
	      var url = _ref13.url;
	      var call = _ref14.call,
	          put = _ref14.put;
	      var data;
	      return _regenerator2.default.wrap(function area$(_context6) {
	        while (1) {
	          switch (_context6.prev = _context6.next) {
	            case 0:
	              // eslint-disable-line
	              //const data = yield call(query,url);
	              data = JSON.parse(localStorage.getItem(_constants.AREA));

	              if (!data) {
	                _context6.next = 4;
	                break;
	              }

	              _context6.next = 4;
	              return put({
	                type: 'areasuccess',
	                data: data
	              });

	            case 4:
	            case 'end':
	              return _context6.stop();
	          }
	        }
	      }, area, this);
	    }),
	    addUser: /*#__PURE__*/_regenerator2.default.mark(function addUser(_ref15, _ref16) {
	      var user_pass = _ref15.user_pass,
	          url = _ref15.url,
	          user_name = _ref15.user_name,
	          user_role = _ref15.user_role,
	          pamar = _ref15.pamar,
	          dealer_id = _ref15.dealer_id,
	          group_id = _ref15.group_id,
	          realname = _ref15.realname;
	      var call = _ref16.call,
	          put = _ref16.put;

	      var params, _ref17, data;

	      return _regenerator2.default.wrap(function addUser$(_context7) {
	        while (1) {
	          switch (_context7.prev = _context7.next) {
	            case 0:
	              params = {};

	              if (dealer_id) {
	                params = (0, _assign2.default)(params, { dealer_id: dealer_id });
	              }
	              if (user_role) {
	                params = (0, _assign2.default)(params, { user_role: user_role });
	              }
	              if (user_name) {
	                params = (0, _assign2.default)(params, { user_name: user_name });
	              }
	              //
	              if (pamar) {
	                params = (0, _assign2.default)(params, pamar);
	              }
	              if (realname) {
	                params = (0, _assign2.default)(params, { realname: realname });
	              }
	              if (group_id) {
	                params = (0, _assign2.default)(params, { group_id: group_id });
	              }
	              if (user_pass) {
	                params = (0, _assign2.default)(params, { user_pass: user_pass });
	              }
	              //console.log(params);
	              _context7.next = 10;
	              return call(_requestData.query, url, params);

	            case 10:
	              _ref17 = _context7.sent;
	              data = _ref17.data;
	              _context7.next = 14;
	              return put({
	                type: 'addUserResult',
	                data: data
	              });

	            case 14:
	              _context7.next = 16;
	              return put({
	                type: 'fetch',
	                url: '/Ts_user/getAllData'
	              });

	            case 16:
	            case 'end':
	              return _context7.stop();
	          }
	        }
	      }, addUser, this);
	    }),
	    searchUser: /*#__PURE__*/_regenerator2.default.mark(function searchUser(_ref18, _ref19) {
	      var url = _ref18.url,
	          user_id = _ref18.user_id;
	      var call = _ref19.call,
	          select = _ref19.select,
	          put = _ref19.put;
	      var params, todos, data;
	      return _regenerator2.default.wrap(function searchUser$(_context8) {
	        while (1) {
	          switch (_context8.prev = _context8.next) {
	            case 0:
	              // eslint-disable-line
	              params = { user_id: user_id };
	              _context8.next = 3;
	              return select(function (state) {
	                return state.account.cdata;
	              });

	            case 3:
	              todos = _context8.sent;
	              data = [];

	              todos.map(function (item) {
	                if (item.user_name && item.user_name.includes(user_id) || item.realname && item.realname.includes(user_id)) {
	                  data.push(item);
	                }
	                //console.log(data);
	                //if(item.user_id==user_id){
	                //  data.push(item);
	                //}
	              });

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
	      }, searchUser, this);
	    }),
	    deleteUser: /*#__PURE__*/_regenerator2.default.mark(function deleteUser(_ref20, _ref21) {
	      var url = _ref20.url,
	          user_id = _ref20.user_id;
	      var call = _ref21.call,
	          put = _ref21.put;
	      var params, data;
	      return _regenerator2.default.wrap(function deleteUser$(_context9) {
	        while (1) {
	          switch (_context9.prev = _context9.next) {
	            case 0:
	              // eslint-disable-line
	              params = { user_id: user_id };
	              _context9.next = 3;
	              return call(_requestData.query, url, params);

	            case 3:
	              data = _context9.sent;
	              _context9.next = 6;
	              return put({
	                type: 'fetch',
	                url: '/Ts_user/getAllData'
	              });

	            case 6:
	            case 'end':
	              return _context9.stop();
	          }
	        }
	      }, deleteUser, this);
	    }),
	    role: /*#__PURE__*/_regenerator2.default.mark(function role(_ref22, _ref23) {
	      var url = _ref22.url,
	          user_id = _ref22.user_id;
	      var call = _ref23.call,
	          put = _ref23.put;
	      return _regenerator2.default.wrap(function role$(_context10) {
	        while (1) {
	          switch (_context10.prev = _context10.next) {
	            case 0:
	            case 'end':
	              return _context10.stop();
	          }
	        }
	      }, role, this);
	    }),
	    queryallnativedata: /*#__PURE__*/_regenerator2.default.mark(function queryallnativedata(_ref24, _ref25) {
	      var call = _ref25.call,
	          put = _ref25.put,
	          select = _ref25.select;
	      var data;
	      return _regenerator2.default.wrap(function queryallnativedata$(_context11) {
	        while (1) {
	          switch (_context11.prev = _context11.next) {
	            case 0:
	              (0, _objectDestructuringEmpty3.default)(_ref24);
	              _context11.next = 3;
	              return select(function (state) {
	                return state.account.cdata;
	              });

	            case 3:
	              data = _context11.sent;

	              if (!data) {
	                _context11.next = 7;
	                break;
	              }

	              _context11.next = 7;
	              return put({
	                type: 'dataseccess',
	                data: data
	              });

	            case 7:
	            case 'end':
	              return _context11.stop();
	          }
	        }
	      }, queryallnativedata, this);
	    }),
	    changeUserInfo: /*#__PURE__*/_regenerator2.default.mark(function changeUserInfo(_ref26, _ref27) {
	      var url = _ref26.url,
	          user_id = _ref26.user_id,
	          user_name = _ref26.user_name,
	          user_role = _ref26.user_role,
	          pamar = _ref26.pamar,
	          dealer_id = _ref26.dealer_id,
	          group_id = _ref26.group_id,
	          realname = _ref26.realname;
	      var call = _ref27.call,
	          put = _ref27.put,
	          select = _ref27.select;
	      var userroleid, params, data;
	      return _regenerator2.default.wrap(function changeUserInfo$(_context12) {
	        while (1) {
	          switch (_context12.prev = _context12.next) {
	            case 0:
	              _context12.next = 2;
	              return select(function (state) {
	                return state.account.userroleid;
	              });

	            case 2:
	              userroleid = _context12.sent;
	              params = { user_id: user_id, user_name: user_name };
	              ;
	              if (pamar) {
	                params = (0, _assign2.default)(params, pamar);
	              }
	              if (dealer_id) {
	                params = (0, _assign2.default)(params, { dealer_id: dealer_id });
	              }
	              if (user_role) {
	                params = (0, _assign2.default)(params, { user_role: user_role });
	              }
	              if (group_id) {
	                params = (0, _assign2.default)(params, { group_id: group_id });
	              }
	              if (realname) {
	                params = (0, _assign2.default)(params, { realname: realname });
	              }
	              _context12.next = 12;
	              return call(_requestData.query, url, params);

	            case 12:
	              data = _context12.sent;

	              if (!data) {
	                _context12.next = 16;
	                break;
	              }

	              _context12.next = 16;
	              return put({
	                type: 'fetch',
	                url: '/Ts_user/getAllData',
	                params: userroleid ? userroleid : ''
	              });

	            case 16:
	            case 'end':
	              return _context12.stop();
	          }
	        }
	      }, changeUserInfo, this);
	    }),
	    changeHost: /*#__PURE__*/_regenerator2.default.mark(function changeHost(_ref28, _ref29) {
	      var mail = _ref28.mail,
	          url = _ref28.url,
	          user_id = _ref28.user_id,
	          user_name = _ref28.user_name,
	          user_role = _ref28.user_role,
	          barea_id = _ref28.barea_id,
	          sarea_id = _ref28.sarea_id,
	          dealer_id = _ref28.dealer_id,
	          group_id = _ref28.group_id,
	          realname = _ref28.realname,
	          telephone = _ref28.telephone,
	          mobile = _ref28.mobile;
	      var call = _ref29.call,
	          put = _ref29.put;
	      var params, data;
	      return _regenerator2.default.wrap(function changeHost$(_context13) {
	        while (1) {
	          switch (_context13.prev = _context13.next) {
	            case 0:
	              // eslint-disable-line
	              params = { mail: mail, user_id: user_id, user_name: user_name, user_role: user_role, sarea_id: sarea_id, group_id: group_id, realname: realname, telephone: telephone, mobile: mobile };
	              ;
	              if (barea_id) {
	                params = (0, _assign2.default)(params, { barea_id: barea_id });
	              }
	              if (dealer_id) {
	                params = (0, _assign2.default)(params, { dealer_id: dealer_id });
	              }
	              _context13.next = 6;
	              return call(_requestData.query, url, params);

	            case 6:
	              data = _context13.sent;

	              if (!data) {
	                _context13.next = 10;
	                break;
	              }

	              _context13.next = 10;
	              return put({
	                type: 'userdetail',
	                url: '/Ts_user/getOwnInformation'
	              });

	            case 10:
	            case 'end':
	              return _context13.stop();
	          }
	        }
	      }, changeHost, this);
	    }),
	    dealer: /*#__PURE__*/_regenerator2.default.mark(function dealer(_ref30, _ref31) {
	      var url = _ref30.url,
	          user_id = _ref30.user_id;
	      var call = _ref31.call,
	          put = _ref31.put;
	      var data;
	      return _regenerator2.default.wrap(function dealer$(_context14) {
	        while (1) {
	          switch (_context14.prev = _context14.next) {
	            case 0:
	              // eslint-disable-line
	              //const params = {user_id,user_id};
	              //const data = yield call(query,url);
	              data = JSON.parse(localStorage.getItem(_constants.DEALER_DETAIL));

	              if (!data) {
	                _context14.next = 4;
	                break;
	              }

	              _context14.next = 4;
	              return put({
	                type: 'dealersuccess',
	                data: data
	              });

	            case 4:
	            case 'end':
	              return _context14.stop();
	          }
	        }
	      }, dealer, this);
	    }),
	    queryDealer: /*#__PURE__*/_regenerator2.default.mark(function queryDealer(_ref32, _ref33) {
	      var areaName = _ref32.areaName,
	          url = _ref32.url;
	      var call = _ref33.call,
	          put = _ref33.put,
	          select = _ref33.select;
	      var todos, data;
	      return _regenerator2.default.wrap(function queryDealer$(_context15) {
	        while (1) {
	          switch (_context15.prev = _context15.next) {
	            case 0:
	              _context15.next = 2;
	              return select(function (state) {
	                return state.account.cdealer;
	              });

	            case 2:
	              todos = _context15.sent;

	              //const data = yield call(query,url,params);
	              data = [];

	              todos.map(function (item) {
	                //ap_brand
	                if (item.dealer_name && item.dealer_name.includes(areaName) || item.dealer_code && item.dealer_code.includes(areaName) || item.province && item.province.includes(areaName) || item.address && item.address.includes(areaName) || item.install_desc && item.install_desc.includes(areaName)) {
	                  data.push(item);
	                }
	              });

	              if (!data) {
	                _context15.next = 8;
	                break;
	              }

	              _context15.next = 8;
	              return put({
	                type: 'querydealersuccess',
	                data: data
	              });

	            case 8:
	            case 'end':
	              return _context15.stop();
	          }
	        }
	      }, queryDealer, this);
	    }),
	    querynativeDealer: /*#__PURE__*/_regenerator2.default.mark(function querynativeDealer(_ref34, _ref35) {
	      var areaName = _ref34.areaName,
	          url = _ref34.url;
	      var call = _ref35.call,
	          put = _ref35.put,
	          select = _ref35.select;
	      var todos;
	      return _regenerator2.default.wrap(function querynativeDealer$(_context16) {
	        while (1) {
	          switch (_context16.prev = _context16.next) {
	            case 0:
	              _context16.next = 2;
	              return select(function (state) {
	                return state.account.cdealer;
	              });

	            case 2:
	              todos = _context16.sent;

	              if (!todos) {
	                _context16.next = 6;
	                break;
	              }

	              _context16.next = 6;
	              return put({
	                type: 'querydealersuccess',
	                data: todos
	              });

	            case 6:
	            case 'end':
	              return _context16.stop();
	          }
	        }
	      }, querynativeDealer, this);
	    }),
	    querygroup: /*#__PURE__*/_regenerator2.default.mark(function querygroup(_ref36, _ref37) {
	      var groupName = _ref36.groupName,
	          url = _ref36.url;
	      var call = _ref37.call,
	          put = _ref37.put,
	          select = _ref37.select;
	      var todos, data;
	      return _regenerator2.default.wrap(function querygroup$(_context17) {
	        while (1) {
	          switch (_context17.prev = _context17.next) {
	            case 0:
	              _context17.next = 2;
	              return select(function (state) {
	                return state.account.cgroup;
	              });

	            case 2:
	              todos = _context17.sent;

	              //const data = yield call(query,url,params);
	              data = [];

	              todos.map(function (item) {
	                //ap_brand
	                if (item.group_name && item.group_name.includes(groupName)) {
	                  data.push(item);
	                }
	              });

	              if (!data) {
	                _context17.next = 8;
	                break;
	              }

	              _context17.next = 8;
	              return put({
	                type: 'querygroupsuccess',
	                data: data
	              });

	            case 8:
	            case 'end':
	              return _context17.stop();
	          }
	        }
	      }, querygroup, this);
	    }),
	    querynativegroup: /*#__PURE__*/_regenerator2.default.mark(function querynativegroup(_ref38, _ref39) {
	      var url = _ref38.url;
	      var call = _ref39.call,
	          put = _ref39.put,
	          select = _ref39.select;
	      var todos;
	      return _regenerator2.default.wrap(function querynativegroup$(_context18) {
	        while (1) {
	          switch (_context18.prev = _context18.next) {
	            case 0:
	              _context18.next = 2;
	              return select(function (state) {
	                return state.account.cgroup;
	              });

	            case 2:
	              todos = _context18.sent;

	              if (!todos) {
	                _context18.next = 6;
	                break;
	              }

	              _context18.next = 6;
	              return put({
	                type: 'querygroupsuccess',
	                data: todos
	              });

	            case 6:
	            case 'end':
	              return _context18.stop();
	          }
	        }
	      }, querynativegroup, this);
	    }),
	    updaterole: /*#__PURE__*/_regenerator2.default.mark(function updaterole(_ref40, _ref41) {
	      var user_id = _ref40.user_id,
	          user_role = _ref40.user_role,
	          url = _ref40.url;
	      var call = _ref41.call,
	          put = _ref41.put,
	          select = _ref41.select;
	      var params, data;
	      return _regenerator2.default.wrap(function updaterole$(_context19) {
	        while (1) {
	          switch (_context19.prev = _context19.next) {
	            case 0:
	              // eslint-disable-line
	              params = (0, _defineProperty3.default)({ user_id: user_id, user_role: user_role }, 'user_role', user_role);
	              _context19.next = 3;
	              return call(_requestData.query, url, params);

	            case 3:
	              data = _context19.sent;

	              if (!data) {
	                _context19.next = 7;
	                break;
	              }

	              _context19.next = 7;
	              return put({
	                type: 'fetch',
	                url: '/Ts_user/getAllData'
	              });

	            case 7:
	            case 'end':
	              return _context19.stop();
	          }
	        }
	      }, updaterole, this);
	    }),
	    changePwd: /*#__PURE__*/_regenerator2.default.mark(function changePwd(_ref42, _ref43) {
	      var user_id = _ref42.user_id,
	          user_pass = _ref42.user_pass,
	          url = _ref42.url;
	      var call = _ref43.call,
	          put = _ref43.put,
	          select = _ref43.select;
	      var params, data;
	      return _regenerator2.default.wrap(function changePwd$(_context20) {
	        while (1) {
	          switch (_context20.prev = _context20.next) {
	            case 0:
	              // eslint-disable-line
	              params = { user_id: user_id, user_pass: user_pass };
	              _context20.next = 3;
	              return call(_requestData.query, url, params);

	            case 3:
	              data = _context20.sent;

	              if (!data) {
	                _context20.next = 7;
	                break;
	              }

	              _context20.next = 7;
	              return put({
	                type: 'userdetail',
	                url: '/Ts_user/getOwnInformation'
	              });

	            case 7:
	            case 'end':
	              return _context20.stop();
	          }
	        }
	      }, changePwd, this);
	    })
	  },

	  reducers: {
	    save: function save(state, action) {
	      var array = ['超级管理员', '总部', '大区经理', '小区经理', '经销商总经理', '集团账号'];
	      action.data.map(function (item) {
	        item.user_role = array[item.user_role - 1];
	      });
	      return (0, _extends3.default)({}, state, { data: action.data, cdata: action.data, showLoading: false, userroleid: action.userroleid });
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
	    groupsuccess: function groupsuccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { group: action.data, cgroup: action.data });
	    },
	    querygroupsuccess: function querygroupsuccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { group: action.data });
	    },
	    queryuserdetailseccess: function queryuserdetailseccess(state, action) {
	      var array = ['超级管理员', '总部', '大区经理', '小区经理', '经销商总经理', '集团账号'];
	      action.data[0].user_role = array[action.data[0].user_role - 1];
	      return (0, _extends3.default)({}, state, { userDetail: action.data[0] });
	    },
	    loading: function loading(state, action) {

	      return (0, _extends3.default)({}, state, { showLoading: true });
	    },
	    resetsuccess: function resetsuccess(state, action) {

	      return (0, _extends3.default)({}, state, { resetpwd: action.pwd });
	    },
	    addUserResult: function addUserResult(state, action) {
	      //alert(action.data[0].dealer_id);
	      //if (action.data.code==1){
	      _antd.message.success(action.data.code);
	      //}
	      return (0, _extends3.default)({}, state);
	    }
	  }

	};
	module.exports = exports['default'];

/***/ })

});