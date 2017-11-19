webpackJsonp([8,7],{

/***/ 1967:
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (obj) {
	  if (obj == null) throw new TypeError("Cannot destructure undefined");
	};

/***/ }),

/***/ 1990:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(1992);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _extends2 = __webpack_require__(451);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectDestructuringEmpty2 = __webpack_require__(1967);

	var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

	var _regenerator = __webpack_require__(367);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _requestData = __webpack_require__(1968);

	var _constants = __webpack_require__(1925);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.default = {

	  namespace: 'realdata',

	  state: {
	    dealer: [{}],
	    user_role: 0,
	    cdealer: [{}],
	    chart: {},
	    defaultdealer: '',
	    hour: [],
	    count: [],
	    table: [{}],
	    dealerName: '',
	    style: '',
	    showLoading: true,
	    radioname: '客流数',
	    area: [],
	    selectArea: '',
	    group_id: '',
	    cgroupdata: '',
	    groupdata: '',
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

	        if (pathname === '/realpage') {
	          //if (query.dealer_name){
	          dispatch({
	            type: 'loading',
	            style: 1
	          });
	          dispatch({
	            type: 'dealer',
	            url: '/Ts_dealer/getAllData',
	            dealer_id: query.dealer_name
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
	    }
	  },

	  effects: {
	    fetch: _regenerator2.default.mark(function fetch(_ref3, _ref4) {
	      var url = _ref3.url,
	          style = _ref3.style;
	      var call = _ref4.call,
	          put = _ref4.put;
	      var data;
	      return _regenerator2.default.wrap(function fetch$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              // eslint-disable-line
	              console.log('fetch');
	              _context.next = 3;
	              return call(_requestData.query, url);

	            case 3:
	              data = _context.sent;

	              if (!data) {
	                _context.next = 7;
	                break;
	              }

	              _context.next = 7;
	              return put({
	                type: 'save',
	                data: data.data
	              });

	            case 7:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, fetch, this);
	    }),
	    quertOwnDetail: _regenerator2.default.mark(function quertOwnDetail(_ref5, _ref6) {
	      var url = _ref5.url,
	          dealer_id = _ref5.dealer_id;
	      var call = _ref6.call,
	          put = _ref6.put;

	      var params, _ref7, data;

	      return _regenerator2.default.wrap(function quertOwnDetail$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              // eslint-disable-line
	              console.log('quertOwnDetail');
	              params = {};
	              _context2.next = 4;
	              return call(_requestData.query, url);

	            case 4:
	              _ref7 = _context2.sent;
	              data = _ref7.data;

	              if (!data) {
	                _context2.next = 9;
	                break;
	              }

	              _context2.next = 9;
	              return put({
	                type: 'dealer',
	                url: '/Ts_dealer/getAllData',
	                dealer_id: dealer_id
	              });

	            case 9:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, quertOwnDetail, this);
	    }),
	    querytype: _regenerator2.default.mark(function querytype(_ref8, _ref9) {
	      var url = _ref8.url,
	          style = _ref8.style,
	          dealer_id = _ref8.dealer_id,
	          first = _ref8.first;
	      var call = _ref9.call,
	          put = _ref9.put,
	          select = _ref9.select;
	      var radioArray, date, year, month, day, da, params, groupName, areaName, group_id, area, data;
	      return _regenerator2.default.wrap(function querytype$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              // eslint-disable-line
	              console.log('querytype');
	              radioArray = ['客流数', '客群数', '潜客客群数', '当日多次到店客群数', '再次到店客群数'];
	              date = new Date();
	              year = date.getFullYear();
	              month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	              day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	              da = year + '' + month + '' + day;
	              params = {};
	              groupName = '';
	              areaName = '';
	              group_id = '';
	              area = '';

	              if (!(first == 1)) {
	                _context3.next = 20;
	                break;
	              }

	              _context3.next = 15;
	              return select(function (state) {
	                return state.realdata.style;
	              });

	            case 15:
	              style = _context3.sent;

	              params = { dealer_id: dealer_id, date: da };
	              params['type'] = style;
	              _context3.next = 37;
	              break;

	            case 20:
	              _context3.next = 22;
	              return select(function (state) {
	                return state.realdata.defaultdealer;
	              });

	            case 22:
	              dealer_id = _context3.sent;
	              _context3.next = 25;
	              return select(function (state) {
	                return state.realdata.group_id;
	              });

	            case 25:
	              group_id = _context3.sent;
	              _context3.next = 28;
	              return select(function (state) {
	                return state.realdata.selectArea;
	              });

	            case 28:
	              area = _context3.sent;

	              params = { type: style, date: da };

	              if (!(group_id != undefined && group_id != '')) {
	                _context3.next = 35;
	                break;
	              }

	              params['group_id'] = group_id;
	              _context3.next = 34;
	              return select(function (state) {
	                return state.realdata.groupName;
	              });

	            case 34:
	              groupName = _context3.sent;

	            case 35:
	              if (area != undefined && area != '') {
	                if (area['barea_id']) {
	                  params['barea_id'] = area['barea_id'];
	                }
	                if (area['sarea_id']) {
	                  params['sarea_id'] = area['sarea_id'];
	                }
	                if (area['province']) {
	                  params['province'] = area['province'];
	                }
	                areaName = area['value'];
	              }
	              if (dealer_id != undefined && dealer_id != '') {
	                params['dealer_id'] = dealer_id;
	              }

	            case 37:
	              _context3.next = 39;
	              return call(_requestData.query, url, params);

	            case 39:
	              data = _context3.sent;
	              _context3.next = 42;
	              return put({
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

	            case 42:
	            case 'end':
	              return _context3.stop();
	          }
	        }
	      }, querytype, this);
	    }),
	    querytypedata: _regenerator2.default.mark(function querytypedata(_ref10, _ref11) {
	      var url = _ref10.url,
	          _ref10$style = _ref10.style,
	          style = _ref10$style === undefined ? 1 : _ref10$style,
	          dealer_id = _ref10.dealer_id,
	          group_id = _ref10.group_id,
	          selectArea = _ref10.selectArea,
	          groupName = _ref10.groupName,
	          first = _ref10.first,
	          fdata = _ref10.fdata;
	      var call = _ref11.call,
	          put = _ref11.put,
	          select = _ref11.select;
	      var date, year, month, day, da, params, areaName, data;
	      return _regenerator2.default.wrap(function querytypedata$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              // eslint-disable-line
	              console.log('querytypedata');

	              date = new Date();
	              year = date.getFullYear();
	              month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	              day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	              da = year + '' + month + '' + day;
	              params = { type: style, date: da };
	              areaName = '';

	              if (dealer_id && dealer_id != '') {
	                params['dealer_id'] = dealer_id;
	              } else {
	                if (group_id && group_id != '') {
	                  params['group_id'] = group_id;
	                }
	                if (selectArea && selectArea != '') {
	                  if (selectArea['barea_id']) {
	                    params['barea_id'] = selectArea['barea_id'];
	                  }
	                  if (selectArea['sarea_id']) {
	                    params['sarea_id'] = selectArea['sarea_id'];
	                  }
	                  if (selectArea['province']) {
	                    params['province'] = selectArea['province'];
	                  }
	                  areaName = selectArea['value'];
	                }
	              }

	              _context4.next = 11;
	              return call(_requestData.query, url, params);

	            case 11:
	              data = _context4.sent;
	              _context4.next = 14;
	              return put({
	                type: 'querytypedatasuccess',
	                dealer_id: dealer_id,
	                group_id: group_id,
	                groupName: groupName,
	                selectArea: selectArea,
	                areaName: areaName,
	                style: style,
	                data: data.data,
	                fdata: fdata,
	                showLoading: false
	              });

	            case 14:
	            case 'end':
	              return _context4.stop();
	          }
	        }
	      }, querytypedata, this);
	    }),
	    queryarea: _regenerator2.default.mark(function queryarea(_ref12, _ref13) {
	      var url = _ref12.url,
	          payload = _ref12.payload;
	      var call = _ref13.call,
	          put = _ref13.put;
	      var params, data;
	      return _regenerator2.default.wrap(function queryarea$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              // eslint-disable-line
	              console.log('queryarea');

	              params = {};
	              _context5.next = 4;
	              return call(_requestData.query, url, params);

	            case 4:
	              data = _context5.sent;

	              if (!data) {
	                _context5.next = 8;
	                break;
	              }

	              _context5.next = 8;
	              return put({
	                type: 'save',
	                data: data.data
	              });

	            case 8:
	            case 'end':
	              return _context5.stop();
	          }
	        }
	      }, queryarea, this);
	    }),
	    homearea: _regenerator2.default.mark(function homearea(_ref14, _ref15) {
	      var url = _ref14.url,
	          params = _ref14.params;
	      var call = _ref15.call,
	          put = _ref15.put;

	      var _ref16, data;

	      return _regenerator2.default.wrap(function homearea$(_context6) {
	        while (1) {
	          switch (_context6.prev = _context6.next) {
	            case 0:
	              // eslint-disable-line
	              console.log('homearea');
	              _context6.next = 3;
	              return call(_requestData.query, url, params);

	            case 3:
	              _ref16 = _context6.sent;
	              data = _ref16.data;

	              if (!data) {
	                _context6.next = 8;
	                break;
	              }

	              _context6.next = 8;
	              return put({
	                type: 'queryareasuccess',
	                data: data
	              });

	            case 8:
	            case 'end':
	              return _context6.stop();
	          }
	        }
	      }, homearea, this);
	    }),
	    dealer: _regenerator2.default.mark(function dealer(_ref17, _ref18) {
	      var url = _ref17.url,
	          dealer_id = _ref17.dealer_id;
	      var call = _ref18.call,
	          put = _ref18.put,
	          select = _ref18.select;
	      var data, groupName, group_id, selectArea;
	      return _regenerator2.default.wrap(function dealer$(_context7) {
	        while (1) {
	          switch (_context7.prev = _context7.next) {
	            case 0:
	              // eslint-disable-line
	              console.log('dealer');
	              data = JSON.parse(localStorage.getItem(_constants.DEALER_DETAIL));
	              groupName = JSON.parse(localStorage.getItem('groupName'));

	              dealer_id = JSON.parse(localStorage.getItem('dealerID'));
	              group_id = JSON.parse(localStorage.getItem('groupID'));
	              selectArea = JSON.parse(localStorage.getItem('selelctArea'));

	              //const data = yield call(query,url);

	              if (!data) {
	                _context7.next = 9;
	                break;
	              }

	              _context7.next = 9;
	              return put({
	                type: 'querytypedata',
	                url: '/Apdata_cnt_hour/getChatData',
	                dealer_id: dealer_id,
	                group_id: group_id,
	                groupName: groupName,
	                selectArea: selectArea,
	                first: 1,
	                fdata: data
	              });

	            case 9:
	            case 'end':
	              return _context7.stop();
	          }
	        }
	      }, dealer, this);
	    }),
	    queryDealer: _regenerator2.default.mark(function queryDealer(_ref19, _ref20) {
	      var areaName = _ref19.areaName,
	          url = _ref19.url;
	      var call = _ref20.call,
	          put = _ref20.put,
	          select = _ref20.select;
	      var todos, data;
	      return _regenerator2.default.wrap(function queryDealer$(_context8) {
	        while (1) {
	          switch (_context8.prev = _context8.next) {
	            case 0:
	              // eslint-disable-line
	              console.log('queryDealer');

	              _context8.next = 3;
	              return select(function (state) {
	                return state.realdata.cdealer;
	              });

	            case 3:
	              todos = _context8.sent;

	              //const data = yield call(query,url,params);
	              data = [];

	              todos.map(function (item) {
	                //ap_brand
	                if (item.dealer_name && item.dealer_name.includes(areaName) || item.dealer_code && item.dealer_code.includes(areaName) || item.province && item.province.includes(areaName) || item.address && item.address.includes(areaName) || item.install_desc && item.install_desc.includes(areaName)) {
	                  data.push(item);
	                }
	              });

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
	      }, queryDealer, this);
	    }),
	    querynativeDealer: _regenerator2.default.mark(function querynativeDealer(_ref21, _ref22) {
	      var areaName = _ref21.areaName,
	          url = _ref21.url;
	      var call = _ref22.call,
	          put = _ref22.put,
	          select = _ref22.select;
	      var todos;
	      return _regenerator2.default.wrap(function querynativeDealer$(_context9) {
	        while (1) {
	          switch (_context9.prev = _context9.next) {
	            case 0:
	              // eslint-disable-line
	              console.log('querynativeDealer');

	              _context9.next = 3;
	              return select(function (state) {
	                return state.realdata.cdealer;
	              });

	            case 3:
	              todos = _context9.sent;

	              if (!todos) {
	                _context9.next = 7;
	                break;
	              }

	              _context9.next = 7;
	              return put({
	                type: 'querydealersuccess',
	                data: todos
	              });

	            case 7:
	            case 'end':
	              return _context9.stop();
	          }
	        }
	      }, querynativeDealer, this);
	    }),
	    selectGroup: _regenerator2.default.mark(function selectGroup(_ref23, _ref24) {
	      var url = _ref23.url,
	          group_id = _ref23.group_id;
	      var call = _ref24.call,
	          put = _ref24.put,
	          select = _ref24.select;
	      var radioArray, date, year, month, day, da, style, area, areaName, params, data;
	      return _regenerator2.default.wrap(function selectGroup$(_context10) {
	        while (1) {
	          switch (_context10.prev = _context10.next) {
	            case 0:
	              // eslint-disable-line
	              console.log('selectGroup');
	              radioArray = ['客流数', '客群数', '潜客客群数', '当日多次到店客群数', '再次到店客群数'];
	              date = new Date();
	              year = date.getFullYear();
	              month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	              day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	              da = year + '' + month + '' + day;
	              _context10.next = 9;
	              return select(function (state) {
	                return state.realdata.style;
	              });

	            case 9:
	              style = _context10.sent;
	              _context10.next = 12;
	              return select(function (state) {
	                return state.realdata.selectArea;
	              });

	            case 12:
	              area = _context10.sent;
	              areaName = '';
	              params = { type: style, date: da };

	              if (group_id != '') {
	                params['group_id'] = group_id;
	              }

	              if (area != undefined && area != '') {
	                if (area['barea_id']) {
	                  params['barea_id'] = area['barea_id'];
	                }
	                if (area['sarea_id']) {
	                  params['sarea_id'] = area['sarea_id'];
	                }
	                if (area['province']) {
	                  params['province'] = area['province'];
	                }
	                areaName = area['value'];
	              }

	              _context10.next = 19;
	              return call(_requestData.query, url, params);

	            case 19:
	              data = _context10.sent;
	              _context10.next = 22;
	              return put({
	                type: 'selectGroupSuccess',
	                dealer_id: '',
	                style: style,
	                group_id: group_id,
	                data: data.data,
	                radioname: radioArray[style - 1],
	                selectArea: area,
	                areaName: areaName
	              });

	            case 22:
	            case 'end':
	              return _context10.stop();
	          }
	        }
	      }, selectGroup, this);
	    }),
	    selectArea: _regenerator2.default.mark(function selectArea(_ref25, _ref26) {
	      var url = _ref25.url,
	          area = _ref25.area;
	      var call = _ref26.call,
	          put = _ref26.put,
	          select = _ref26.select;
	      var radioArray, date, year, month, day, da, group_id, style, groupName, areaName, params, data;
	      return _regenerator2.default.wrap(function selectArea$(_context11) {
	        while (1) {
	          switch (_context11.prev = _context11.next) {
	            case 0:
	              // eslint-disable-line
	              console.log('selectArea');
	              radioArray = ['客流数', '客群数', '潜客客群数', '当日多次到店客群数', '再次到店客群数'];
	              date = new Date();
	              year = date.getFullYear();
	              month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	              day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	              da = year + '' + month + '' + day;
	              _context11.next = 9;
	              return select(function (state) {
	                return state.realdata.group_id;
	              });

	            case 9:
	              group_id = _context11.sent;
	              _context11.next = 12;
	              return select(function (state) {
	                return state.realdata.style;
	              });

	            case 12:
	              style = _context11.sent;
	              _context11.next = 15;
	              return select(function (state) {
	                return state.realdata.groupName;
	              });

	            case 15:
	              groupName = _context11.sent;
	              areaName = '';
	              params = { type: style, date: da };

	              if (group_id != undefined && group_id != '') {
	                params['group_id'] = group_id;
	              }

	              if (area != '') {
	                if (area['barea_id']) {
	                  params['barea_id'] = area['barea_id'];
	                }
	                if (area['sarea_id']) {
	                  params['sarea_id'] = area['sarea_id'];
	                }
	                if (area['province']) {
	                  params['province'] = area['province'];
	                }
	                areaName = area['value'];
	              }

	              _context11.next = 22;
	              return call(_requestData.query, url, params);

	            case 22:
	              data = _context11.sent;
	              _context11.next = 25;
	              return put({
	                type: 'querytypesuccess',
	                dealer_id: '',
	                style: style,
	                group_id: group_id,
	                data: data.data,
	                radioname: radioArray[style - 1],
	                selectArea: area,
	                areaName: areaName,
	                groupName: groupName
	              });

	            case 25:
	            case 'end':
	              return _context11.stop();
	          }
	        }
	      }, selectArea, this);
	    }),
	    querygroup: _regenerator2.default.mark(function querygroup(_ref27, _ref28) {
	      var group_name = _ref27.group_name;
	      var call = _ref28.call,
	          put = _ref28.put,
	          select = _ref28.select;
	      var group_data, data;
	      return _regenerator2.default.wrap(function querygroup$(_context12) {
	        while (1) {
	          switch (_context12.prev = _context12.next) {
	            case 0:
	              _context12.next = 2;
	              return select(function (state) {
	                return state.realdata.cgroupdata;
	              });

	            case 2:
	              group_data = _context12.sent;
	              data = [];

	              group_data.map(function (item) {
	                if (item.group_name && item.group_name.includes(group_name)) {
	                  data.push(item);
	                }
	              });

	              if (!data) {
	                _context12.next = 8;
	                break;
	              }

	              _context12.next = 8;
	              return put({
	                type: 'querygroupsuccess',
	                data: data,
	                groupName: group_name
	              });

	            case 8:
	            case 'end':
	              return _context12.stop();
	          }
	        }
	      }, querygroup, this);
	    }),
	    querynativegroup: _regenerator2.default.mark(function querynativegroup(_ref29, _ref30) {
	      var call = _ref30.call,
	          put = _ref30.put,
	          select = _ref30.select;
	      var group_data;
	      return _regenerator2.default.wrap(function querynativegroup$(_context13) {
	        while (1) {
	          switch (_context13.prev = _context13.next) {
	            case 0:
	              (0, _objectDestructuringEmpty3.default)(_ref29);
	              _context13.next = 3;
	              return select(function (state) {
	                return state.realdata.cgroupdata;
	              });

	            case 3:
	              group_data = _context13.sent;

	              if (!group_data) {
	                _context13.next = 7;
	                break;
	              }

	              _context13.next = 7;
	              return put({
	                type: 'querygroupsuccess',
	                data: group_data,
	                groupName: ''
	              });

	            case 7:
	            case 'end':
	              return _context13.stop();
	          }
	        }
	      }, querynativegroup, this);
	    }),

	    //初始化 读取集团信息
	    group: _regenerator2.default.mark(function group(_ref31, _ref32) {
	      var url = _ref31.url;
	      var call = _ref32.call,
	          put = _ref32.put;

	      var _ref33, data;

	      return _regenerator2.default.wrap(function group$(_context14) {
	        while (1) {
	          switch (_context14.prev = _context14.next) {
	            case 0:
	              _context14.next = 2;
	              return call(_requestData.query, url);

	            case 2:
	              _ref33 = _context14.sent;
	              data = _ref33.data;

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
	    })
	  },

	  reducers: {
	    save: function save(state, action) {

	      return (0, _extends3.default)({}, state, { data: action.data });
	    },
	    dealersuccess: function dealersuccess(state, action) {
	      //alert(action.data[0].dealer_id);

	      localStorage.setItem('dealerID', (0, _stringify2.default)(action.defaultdealer));

	      return (0, _extends3.default)({}, state, { dealer: action.data, cdealer: action.data, defaultdealer: action.defaultdealer });
	    },
	    querydealersuccess: function querydealersuccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { dealer: action.data });
	    },
	    querytypesuccess: function querytypesuccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      //console.log(action.data);
	      var time = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
	      var time_data = ['8-9点', '9-10点', '10-11点', '11-12点', '12-13点', '13-14点', '14-15点', '15-16点', '16-17点', '17-18点', '18-19点', '19点往后'];
	      var sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	      var count = action.data.count;
	      action.data.hour.map(function (item, index) {
	        sum[item - 8] = count[index];
	      });
	      for (var a = 0; a < 12; a++) {
	        if (sum[11 - a] == 0) {
	          sum.pop();
	        } else {
	          break;
	        }
	      }

	      localStorage.setItem('groupName', (0, _stringify2.default)(action.groupName));
	      localStorage.setItem('dealerID', (0, _stringify2.default)(action.dealer_id));
	      localStorage.setItem('groupID', (0, _stringify2.default)(action.group_id));
	      localStorage.setItem('selectArea', (0, _stringify2.default)(action.selectArea));

	      return (0, _extends3.default)({}, state, { dealerName: action.data.dealerName, hour: time_data, count: sum, table: action.data.table,
	        style: action.style, defaultdealer: action.dealer_id, showLoading: false, radioname: action.radioname,
	        selectArea: action.selectArea, group_id: action.group_id, user_role: action.data.user_role,
	        areaName: action.areaName, groupName: action.groupName });
	    },
	    querytypedatasuccess: function querytypedatasuccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      //console.log(action.data);
	      var time = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
	      var time_data = ['8-9点', '9-10点', '10-11点', '11-12点', '12-13点', '13-14点', '14-15点', '15-16点', '16-17点', '17-18点', '18-19点', '19点往后'];
	      var sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	      var count = action.data.count;
	      action.data.hour.map(function (item, index) {
	        sum[item - 8] = count[index];
	      });
	      for (var a = 0; a < 12; a++) {
	        if (sum[11 - a] == 0) {
	          sum.pop();
	        } else {
	          break;
	        }
	      }
	      return (0, _extends3.default)({}, state, { dealerName: action.data.dealerName, hour: time_data, count: sum, table: action.data.table,
	        style: action.style, defaultdealer: action.dealer_id,
	        dealer: action.fdata, cdealer: action.fdata, showLoading: action.showLoading, radioname: '客流数',
	        user_role: action.data.user_role, areaName: action.areaName, groupName: action.groupName,
	        selectArea: action.selectArea, group_id: action.group_id });
	    },
	    loading: function loading(state, action) {
	      //alert(action.data[0].dealer_id);
	      return (0, _extends3.default)({}, state, { style: action.style, showLoading: true
	      });
	    },
	    selectGroupSuccess: function selectGroupSuccess(state, action) {
	      //alert(action.data[0].dealer_id);
	      //console.log(action.data);
	      var time = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
	      var time_data = ['8-9点', '9-10点', '10-11点', '11-12点', '12-13点', '13-14点', '14-15点', '15-16点', '16-17点', '17-18点', '18-19点', '19点往后'];
	      var sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	      var count = action.data.count;
	      action.data.hour.map(function (item, index) {
	        sum[item - 8] = count[index];
	      });
	      for (var a = 0; a < 12; a++) {
	        if (sum[11 - a] == 0) {
	          sum.pop();
	        } else {
	          break;
	        }
	      }

	      localStorage.setItem('dealerID', (0, _stringify2.default)(action.dealer_id));
	      localStorage.setItem('groupID', (0, _stringify2.default)(action.group_id));
	      localStorage.setItem('selectArea', (0, _stringify2.default)(action.selectArea));

	      return (0, _extends3.default)({}, state, { dealerName: action.data.dealerName, hour: time_data, count: sum, table: action.data.table,
	        style: action.style, defaultdealer: action.dealer_id, showLoading: false, radioname: action.radioname,
	        selectArea: action.selectArea, group_id: action.group_id, user_role: action.data.user_role,
	        areaName: action.areaName });
	    },
	    queryareasuccess: function queryareasuccess(state, action) {
	      //console.log(action.data);

	      return (0, _extends3.default)({}, state, { area: action.data });
	    },

	    //更新选择框下面显示的集团信息 赋值cgroupdata
	    groupsuccess: function groupsuccess(state, action) {
	      //console.log(action.data);

	      return (0, _extends3.default)({}, state, { groupdata: action.data, cgroupdata: action.data });
	    },
	    querygroupsuccess: function querygroupsuccess(state, action) {
	      //console.log(action.data);

	      localStorage.setItem('groupName', (0, _stringify2.default)(action.groupName));

	      return (0, _extends3.default)({}, state, { groupdata: action.data, dealerName: '', groupName: action.groupName });
	    }
	  }

	};
	module.exports = exports['default'];

/***/ })

});