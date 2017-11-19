/**
 * Ts_homeController
 *
 * @description :: Server-side logic for managing Ts_homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getHomeHeadInformation: function(req,res) {

    let result = req.session.userinfo;

    let finData = {};
    let sumct_total = 0;
    let sumct_new = 0;
    let sumgp_total = 0;
    let sumgp_vip = 0;
    let sumgp_old = 0;
    let sumgp_repeat = 0;
    //头部title信息用到
    let areaKey = '';
    let areaArr = [];
    let groupArr = [];
    let dealerArr = [];

    let date = new Date();
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = localTime - localOffset;
    let localDate = new Date(utc);
    let dateString = '';
    if (localDate.getUTCMonth() > 8) {
      if (localDate.getUTCDate() > 9) {
        dateString = localDate.getUTCFullYear().toString() + (localDate.getUTCMonth() + 1) + localDate.getUTCDate();
      } else {
        dateString = localDate.getUTCFullYear().toString() + (localDate.getUTCMonth() + 1) + '0' + localDate.getUTCDate();
      }
    } else {
      if (localDate.getUTCDate() > 9) {
        dateString = localDate.getUTCFullYear().toString() + '0' + (localDate.getUTCMonth() + 1) + localDate.getUTCDate();
      } else {
        dateString = localDate.getUTCFullYear().toString() + '0' + (localDate.getUTCMonth() + 1) + '0' + localDate.getUTCDate();
      }
    }

    Ts_area.find().exec(function (err, area) {
      if (err) {
        return res.serverError(err);
      }

      for (var i = 0; i < area.length; i++) {
        areaArr[area[i]['id']] = area[i]['name'];
      }

      Ts_group.find().exec(function (err, group) {
        if (err) {
          return res.serverError(err);
        }

        for (var i = 0; i < group.length; i++) {
          groupArr[group[i]['group_id']] = group[i]['group_name'];
        }

        Ts_dealer.find().exec(function (err, dealer) {
          if (err) {
            return res.serverError(err);
          }

          for (var i = 0; i < dealer.length; i++) {
            dealerArr[dealer[i]['dealer_id']] = dealer[i]['dealer_name'];
          }

          let requirement = {};
          if (result['user_role'] === 1 || result['user_role'] === 2) {
            requirement = {cnt_date: dateString};
          }
          if (result['user_role'] === 3) {
            requirement = {barea_id: result['barea_id']};
            areaKey = areaArr[result['barea_id']];
          }
          if (result['user_role'] === 4) {
            requirement = {sarea_id: result['sarea_id']};
            areaKey = areaArr[result['sarea_id']];
          }
          if (result['user_role'] === 5) {
            requirement = {dealer_id: result['dealer_id'], cnt_date: dateString};
            areaKey = dealerArr[result['dealer_id']];
          }
          if (result['user_role'] === 6) {
            requirement = {group_id: result['group_id']};
            areaKey = groupArr[result['group_id']];
          }

          if (result['user_role'] === 1 || result['user_role'] === 2 || result['user_role'] === 5) {
            Apdata_cnt_day.find(requirement).exec(function (err, data) {
              if (err) {
                return res.serverError(err);
              }
              for (let a of data) {
                sumct_total += a['custom_total'];
                sumct_new += a['custom_new'];
                sumgp_total += a['group_total'];
                sumgp_vip += a['group_vip'];
                sumgp_old += a['group_old'];
                sumgp_repeat += a['group_repeat'];
              }

              let areaName = '';
              if (areaKey == '') {
                areaName = '全国';
              } else {
                areaName = areaKey;
              }
              finData = {
                custom_total: sumct_total,
                custom_new: sumct_new,
                custom_old: sumct_total - sumct_new,
                group_total: sumgp_total,
                group_vip: sumgp_vip,
                group_old: sumgp_old,
                group_repeat: sumgp_repeat,
                areaName: areaName
              };
              return res.json(finData);
            });
          } else {
            Ts_dealer.find(requirement).exec(function (err, data) {
              if (err) {
                return res.serverError(err);
              }
              let IDArr = [];
              for (let a of data) {
                IDArr.push(a['dealer_id']);
              }

              Apdata_cnt_day.find({dealer_id: IDArr, cnt_date: dateString}).exec(function (err, apdata) {
                for (let a of apdata) {
                  sumct_total += a['custom_total'];
                  sumct_new += a['custom_new'];
                  sumgp_total += a['group_total'];
                  sumgp_vip += a['group_vip'];
                  sumgp_old += a['group_old'];
                  sumgp_repeat += a['group_repeat'];
                }
                finData = {
                  custom_total: sumct_total,
                  custom_new: sumct_new,
                  custom_old: sumct_total - sumct_new,
                  group_total: sumgp_total,
                  group_vip: sumgp_vip,
                  group_old: sumgp_old,
                  group_repeat: sumgp_repeat,
                  areaName: areaKey
                };
                return res.json(finData);
              });
            });
          }


        });
      });
    });
  },
  getHomeMapInformation: function(req,res) {

    let finArr = [];
    let result = req.session.userinfo;

    let date = new Date();
    let dateString = date.getUTCFullYear() + (date.getUTCMonth()<9 ? '0' : '') + (date.getUTCMonth()+1) + (date.getUTCDate()<=9 ? '0' : '') + date.getUTCDate();



    if (result != undefined) {

      let requirement = {};

      if (result['user_role'] == 3) {
        requirement = {barea_id: result['barea_id']};
      }
      else if (result['user_role'] == 4) {
        requirement = {sarea_id: result['sarea_id']};
      }
      else if (result['user_role'] == 5) {
        requirement = {dealer_id: result['dealer_id']};
      }
      else if (result['user_role'] == 6) {
        requirement = {group_id: result['group_id']};
      }

      let dealerIds = [];


      Ts_dealer.find(requirement).then(function (dealer) {
        for (var i = 0; i < dealer.length; i++) {
          dealerIds.push(dealer[i]['dealer_id']);
        }

        return dealerIds;
      }).spread(function(){
        Ts_ap_device.query(
        "select c.id, c.name, sum(group_vip) from apdata_cnt_day a left join ts_dealer b on a.dealer_id=b.dealer_id left join ts_area c on b.province=c.id||''  where cnt_date="+dateString+" and b.dealer_id in ("+dealerIds.join(",")+") group by c.id, c.name",
        function (err, datas) {
          if (datas != undefined) {
            for (var i = 0; i < datas['rows'].length; i++) {
              let name = '';

              if (datas['rows'][i]['name'].substr(0, 1) == '内' || datas['rows'][i]['name'].substr(0, 1) == '黑') {
                name = datas['rows'][i]['name'].substr(0, 3);
              } else {
                name = datas['rows'][i]['name'].substr(0, 2);
              }

              finArr.push({
                name: name,
                value: parseInt(datas['rows'][i]['sum']),
                id: datas['rows'][i]['id']
              });
            }
          }

          return res.json(finArr);
        });
      });


    } else {
      return res.json({
        name: '无',
        value: 0,
        id: 0
      })
    }
  },

  getHomeChatInformation:function(req,res) {

    let date = new Date();
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = localTime - localOffset;
    let localDate = new Date(utc);

    let dateString = date.getUTCFullYear() + (date.getUTCMonth() < 9 ? '0' : '') + (date.getUTCMonth() + 1) + (date.getUTCDate() <= 9 ? '0' : '') + date.getUTCDate();

    let result = req.session.userinfo;
    let requrement = {};
    if (result['user_role'] === 3) {
      requrement = {barea_id: result['barea_id']};
    } else if (result['user_role'] === 4) {
      requrement = {sarea_id: result['sarea_id']};
    } else if (result['user_role'] === 5) {
      requrement = {dealer_id: result['dealer_id']};
    } else if (result['user_role'] === 6) {
      requrement = {group_id: result['group_id']};
    } else {
      requrement = {};
    }
    //如果没有传参数显示全国
    if (req.param('province') != null && req.param('province') != undefined) {
      requrement['province'] = req.param('province');
    }

    Ts_dealer.find(requrement).exec(function (err, dealerArr) {
      if (err) {
        return res.serverError(err);
      }
      let dealeridArr = [];
      for (let a of dealerArr) {
        dealeridArr.push(a['dealer_id']);
      }
      //通过省中所有经销商的id查询客流量并排序
      Apdata_cnt_day.find({
        where: {
          dealer_id: dealeridArr,
          cnt_date: dateString
        },
        sum: 'group_vip',
        groupBy: 'dealer_id'
      }).exec(function (err, dataArr) {
        if (err) {
          return res.serverError(err);
        }

        let temp;
        for (let i = 0;i < dataArr.length - 1; i++) {
          for (let j = 0; j < dataArr.length - 1 - i; j++) {
            if (dataArr[j]['group_vip'] < dataArr[j + 1]['group_vip']) {
              temp = dataArr[j];
              dataArr[j] = dataArr[j + 1];
              dataArr[j + 1] = temp;
            }
          }
        }

        let length = 0;
        let mdata = [];
        let dealernameArr = [];
        let sortedID = [];
        let sortedData = [];

        if (dataArr.length < 10) {
          length = dataArr.length;
        } else {
          length = 10;
        }
        for (let a = 0; a < length; a++) {
          mdata.push(dataArr[length - a - 1]['group_vip']);
          sortedID.push(dataArr[length - a - 1]['dealer_id']);
        }
        Ts_dealer.find({dealer_id: sortedID}).exec(function (err, dealerArr) {
          if (err) {
            return res.serverError(err);
          }
          for (let a = 0; a < dealerArr.length; a++) {
            sortedData[dealerArr[a]['dealer_id']] = dealerArr[a]['dealer_name'];
          }

          if (sortedID.length != 0) {
            for (let a = 0; a < sortedID.length; a++) {
              //通过排序后的经销商id取出排序后的经销商名称

              dealernameArr.push(sortedData[sortedID[a]]);
              if (dealernameArr.length == sortedID.length) {
                return res.json({
                  title: dealernameArr,
                  mdata: mdata,
                  id: sortedID,
                  user_role: result['user_role']
                });
              }
            }
          } else {
            return res.json({
              title: dealernameArr,
              mdata: mdata,
              id: sortedID,
              user_role: result['user_role']
            });
          }
        });
      });
    });
  },

  getHomeBotTable: function(req, res) {

    let result = req.session.userinfo;
    let requrement = {sort: {dealer_code: 1}};
    if (result['user_role'] === 3) {
      requrement['barea_id'] = result['barea_id'];
    } else if (result['user_role'] === 4) {
      requrement['sarea_id'] = result['sarea_id'];
    } else if (result['user_role'] === 5) {
      requrement['dealer_id'] = result['dealer_id'];
    } else if (result['user_role'] === 6) {
      requrement['group_id'] = result['group_id'];
    }
    Ts_dealer.find(requrement).exec(function (err, data) {
      if (err) {
        return res.serverError(err);
      }
      let dealerData = [];
      let dealerArr = [];
      let dealerIDArr = [];
      let dealerCodeArr = [];
      let dealerGroupArr = [];

      if (data.length != 0) {

        //如果有参数进行筛选
        if (req.param('barea_id') != undefined || req.param('sarea_id') != undefined || req.param('province') != undefined || req.param('group_id') != undefined) {
          for (let a of data) {
            if (req.param('barea_id') != undefined) {
              if (a['barea_id'] == req.param('barea_id')) {
                dealerData.push(a);
              }
            } else if (req.param('sarea_id') != undefined) {
              if (a['sarea_id'] == req.param('sarea_id')) {
                dealerData.push(a);
              }
            } else if (req.param('province') != undefined) {
              if (a['province'] == req.param('province')) {
                dealerData.push(a);
              }
            } else if (req.param('group_id') != undefined) {
              if (a['group_id'] == req.param('group_id')) {
                dealerData.push(a);
              }
            }
          }
          for (let a = 0; a < dealerData.length; a++) {
            dealerArr[dealerData[a]['dealer_id']] = dealerData[a]['dealer_name'];
            dealerCodeArr[dealerData[a]['dealer_id']] = dealerData[a]['dealer_code'];
            dealerGroupArr[dealerData[a]['dealer_id']] = dealerData[a]['group_id'];
            dealerIDArr.push(dealerData[a]['dealer_id']);
          }
        } else {
          for (let a = 0; a < data.length; a++) {
            dealerArr[data[a]['dealer_id']] = data[a]['dealer_name'];
            dealerCodeArr[data[a]['dealer_id']] = data[a]['dealer_code'];
            dealerGroupArr[data[a]['dealer_id']] = data[a]['group_id'];
            dealerIDArr.push(data[a]['dealer_id']);
          }
        }


        let date = new Date();
        let localTime = date.getTime();
        let localOffset = date.getTimezoneOffset() * 60000;
        let utc = localTime - localOffset;
        let localDate = new Date(utc);
        let dateString = '';
        if (localDate.getUTCMonth() > 8) {
          if (localDate.getUTCDate() > 9) {
            dateString = localDate.getUTCFullYear().toString() + (localDate.getUTCMonth() + 1) + localDate.getUTCDate();
          } else {
            dateString = localDate.getUTCFullYear().toString() + (localDate.getUTCMonth() + 1) + '0' + localDate.getUTCDate();
          }
        } else {
          if (localDate.getUTCDate() > 9) {
            dateString = localDate.getUTCFullYear().toString() + '0' + (localDate.getUTCMonth() + 1) + localDate.getUTCDate();
          } else {
            dateString = localDate.getUTCFullYear().toString() + '0' + (localDate.getUTCMonth() + 1) + '0' + localDate.getUTCDate();
          }
        }
        Apdata_cnt_day.find({dealer_id: dealerIDArr, cnt_date: dateString}).exec(function (err, apdata) {
          let sumct_total = 0;
          let sumgp_total = 0;
          let sumgp_vip = 0;
          let sumgp_old = 0;
          let sumgp_repeat = 0;

          if (apdata != undefined && apdata.length != 0) {

            for (let a = 0; a < apdata.length; a++) {
              apdata[a]['dealer_name'] = dealerArr[apdata[a]['dealer_id']];
              apdata[a]['dealer_code'] = dealerCodeArr[apdata[a]['dealer_id']];
              apdata[a]['group_id'] = dealerGroupArr[apdata[a]['dealer_id']];
              apdata[a]['custom_old'] = apdata[a]['custom_total'] - apdata[a]['custom_new'];
              sumct_total += apdata[a]['custom_total'];
              sumgp_total += apdata[a]['group_total'];
              sumgp_vip += apdata[a]['group_vip'];
              sumgp_old += apdata[a]['group_old'];
              sumgp_repeat += apdata[a]['group_repeat'];

            }
          }
          return res.json({
            data: apdata,
            count: {
              custom_total: sumct_total,
              group_total: sumgp_total,
              group_vip: sumgp_vip,
              group_old: sumgp_old,
              group_repeat: sumgp_repeat
            }
          });
        });


      } else {
        return res.json({
          data:[],
          count: {
            custom_total: 0,
            group_total: 0,
            group_vip: 0,
            group_old: 0,
            group_repeat: 0
          }
        });
      }
    });
  },
  getVIPDayRate:function(req,res) {
    //0=全国 1=大区 2=小区 3=省份 4=集团
    let area_type = Number(req.param('areaType'));
    let area_id = Number(req.param('areaID'));
    let timeRange = Number(req.param('timeRange'));
    let time = req.param('time');

    let date = new Date(Number(time.substr(0,4)),Number(time.substr(4,2))-1,Number(time.substr(6,2)));
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = localTime - localOffset;
    let startUtc = utc - timeRange * 24 * 60 * 60000;
    let startDate = new Date(startUtc);
    let startString = '';
    if (startDate.getUTCMonth() > 8) {
      if (startDate.getUTCDate() > 9) {
        startString = startDate.getUTCFullYear().toString() + (startDate.getUTCMonth() + 1) + startDate.getUTCDate();
      } else {
        startString = startDate.getUTCFullYear().toString() + (startDate.getUTCMonth() + 1) + '0' + startDate.getUTCDate();
      }
    } else {
      if (startDate.getUTCDate() > 9) {
        startString = startDate.getUTCFullYear().toString() + '0' + (startDate.getUTCMonth() + 1) + startDate.getUTCDate();
      } else {
        startString = startDate.getUTCFullYear().toString() + '0' + (startDate.getUTCMonth() + 1) + '0' + startDate.getUTCDate();
      }
    }


    let nowDate = new Date();
    let nowTime = nowDate.getTime();
    let nowOffset = nowDate.getTimezoneOffset() * 60000;
    let nowUTC = nowTime - nowOffset;
    let nowlocalDate = new Date(nowUTC);
    let nowDateString = '';
    let sevenUTC = nowUTC - 8 * 24 * 60 * 60000;
    let sevenDate = new Date(sevenUTC);
    let sevenDateString = '';

    if (nowlocalDate.getUTCMonth() > 8) {
      if (nowlocalDate.getUTCDate() > 9) {
        nowDateString = nowlocalDate.getUTCFullYear().toString() + (nowlocalDate.getUTCMonth() + 1) + nowlocalDate.getUTCDate();
      } else {
        nowDateString = nowlocalDate.getUTCFullYear().toString() + (nowlocalDate.getUTCMonth() + 1) + '0' + nowlocalDate.getUTCDate();
      }
    } else {
      if (nowlocalDate.getUTCDate() > 9) {
        nowDateString = nowlocalDate.getUTCFullYear().toString() + '0' + (nowlocalDate.getUTCMonth() + 1) + nowlocalDate.getUTCDate();
      } else {
        nowDateString = nowlocalDate.getUTCFullYear().toString() + '0' + (nowlocalDate.getUTCMonth() + 1) + '0' + nowlocalDate.getUTCDate();
      }
    }

    if (sevenDate.getUTCMonth() > 8) {
      if (sevenDate.getUTCDate() > 9) {
        sevenDateString = sevenDate.getUTCFullYear().toString() + (sevenDate.getUTCMonth() + 1) + sevenDate.getUTCDate();
      } else {
        sevenDateString = sevenDate.getUTCFullYear().toString() + (sevenDate.getUTCMonth() + 1) + '0' + sevenDate.getUTCDate();
      }
    } else {
      if (sevenDate.getUTCDate() > 9) {
        sevenDateString = sevenDate.getUTCFullYear().toString() + '0' + (sevenDate.getUTCMonth() + 1) + sevenDate.getUTCDate();
      } else {
        sevenDateString = sevenDate.getUTCFullYear().toString() + '0' + (sevenDate.getUTCMonth() + 1) + '0' + sevenDate.getUTCDate();
      }
    }


    if (req.param('dealer_id')) {
      Apdata_cnt_day.find({
        where: {
          dealer_id: req.param('dealer_id'),
          cnt_date: {'>=': Number(startString), '<=': Number(time)}
        },
        sort: 'cnt_date ASC'
      }).exec(function(err,apdata) {
        console.log(apdata);
        let rateData = [];
        let countData = [];
        let customRate = [];
        let sevenRate = [];
        let customCount = [];

        if (apdata && apdata.length != 0) {

          if (apdata.length > timeRange) {
            apdata.shift();
          }

          let index = 0;
          for (let data of apdata) {
            customRate[index] = data['custom_index_percent'];
            sevenRate[index] = data['custom_index_percent_avg_7'];
            rateData[index] = {
              customRate:data['custom_index_percent'],
              sevenRate:data['custom_index_percent_avg_7'],
              time:data['cnt_date']
            };
            customCount[index] = data['custom_total'];
            countData[index] = {
              customCount:data['custom_total'],
              time:data['cnt_date']
            };
            index++;
          }
        }

        Apdata_cnt_day.find({
          where: {
            dealer_id: req.param('dealer_id'),
            cnt_date: {'>=': Number(sevenDateString), '<=': Number(nowDateString)}
          },
          sort: 'cnt_date DESC'
        }).exec(function(err,sevenData) {

          let referenceValue = [];

          if (sevenData && sevenData.length != 0) {
            let index = 0;
            if (sevenData.length > 7) {
              sevenData.shift();
            }
            for (let data of sevenData) {
              referenceValue[index] = {
                custom: data['custom_total'],
                standCustom: data['custom_index'],
                customRate: data['custom_index_percent']
              }
              index++;
            }
          }

          let finData = {
            topChat: {
              //customRate: customRate,
              //sevenRate: sevenRate
              data: rateData
            },
            bottomChat: {
              //customCount: customCount
              data: countData
            },
            yesData: referenceValue[0],
            referenceValue: referenceValue
          };

          return res.json(finData);

        })
      })
    } else {
      Apdata_cnt_day_area.find({
        //0=全国 1=大区 2=小区 3=省份 4=集团
        where: {
          area_type: area_type,
          area_id: area_id,
          cnt_date: {'>=': Number(startString), '<=': Number(time)}
        },
        sort: 'cnt_date ASC'
      }).exec(function(err,apdata){
        let rateData = [];
        let countData = [];
        let customRate = [];
        let sevenRate = [];
        let customCount = [];

        if (apdata && apdata.length != 0) {

          if (apdata.length > timeRange) {
            apdata.shift();
          }

          let index = 0;
          for (let data of apdata) {
            customRate[index] = data['custom_index_percent'];
            sevenRate[index] = data['custom_index_percent_avg_7'];
            rateData[index] = {
              customRate:data['custom_index_percent'],
              sevenRate:data['custom_index_percent_avg_7'],
              time:data['cnt_date']
            };
            customCount[index] = data['custom_total'];
            countData[index] = {
              customCount:data['custom_total'],
              time:data['cnt_date']
            };
            index++;
          }
        }

        Apdata_cnt_day_area.find({
          where: {
            area_type: area_type,
            area_id: area_id,
            cnt_date: {'>=': Number(sevenDateString), '<=': Number(nowDateString)}
          },
          sort: 'cnt_date DESC'
        }).exec(function(err,sevenData) {

          let referenceValue = [];

          if (sevenData && sevenData.length != 0) {
            let index = 0;
            if (sevenData.length > 7) {
              sevenData.shift();
            }
            for (let data of sevenData) {
              referenceValue[index] = {
                custom: data['custom_total'],
                standCustom: data['custom_index'],
                customRate: data['custom_index_percent']
              }
              index++;
            }
          }

          let finData = {
            topChat: {
              //customRate: customRate,
              //sevenRate: sevenRate
              data: rateData
            },
            bottomChat: {
              //customCount: customCount
              data: countData
            },
            yesData: referenceValue[0],
            referenceValue: referenceValue
          };

          return res.json(finData);

        })
      })
    }
  },
  getVIPMonthRate: function(req,res) {
    //0=全国 1=大区 2=小区 3=省份 4=集团
    let area_type = Number(req.param('areaType'));
    let area_id = Number(req.param('areaID'));
    let timeRange = Number(req.param('timeRange'));
    let startTime = Number(req.param('time') + '00');
    let time = Number(req.param('time') + '31');

    let nowDate = new Date();
    let nowTime = nowDate.getTime();
    let nowOffset = nowDate.getTimezoneOffset() * 60000;
    let nowUTC = nowTime - nowOffset;
    let nowlocalDate = new Date(nowUTC);
    let nowDateString = '';
    let sevenUTC = nowUTC - 8 * 24 * 60 * 60000;
    let sevenDate = new Date(sevenUTC);
    let sevenDateString = '';

    if (nowlocalDate.getUTCMonth() > 8) {
      if (nowlocalDate.getUTCDate() > 9) {
        nowDateString = nowlocalDate.getUTCFullYear().toString() + (nowlocalDate.getUTCMonth() + 1) + nowlocalDate.getUTCDate();
      } else {
        nowDateString = nowlocalDate.getUTCFullYear().toString() + (nowlocalDate.getUTCMonth() + 1) + '0' + nowlocalDate.getUTCDate();
      }
    } else {
      if (nowlocalDate.getUTCDate() > 9) {
        nowDateString = nowlocalDate.getUTCFullYear().toString() + '0' + (nowlocalDate.getUTCMonth() + 1) + nowlocalDate.getUTCDate();
      } else {
        nowDateString = nowlocalDate.getUTCFullYear().toString() + '0' + (nowlocalDate.getUTCMonth() + 1) + '0' + nowlocalDate.getUTCDate();
      }
    }

    if (sevenDate.getUTCMonth() > 8) {
      if (sevenDate.getUTCDate() > 9) {
        sevenDateString = sevenDate.getUTCFullYear().toString() + (sevenDate.getUTCMonth() + 1) + sevenDate.getUTCDate();
      } else {
        sevenDateString = sevenDate.getUTCFullYear().toString() + (sevenDate.getUTCMonth() + 1) + '0' + sevenDate.getUTCDate();
      }
    } else {
      if (sevenDate.getUTCDate() > 9) {
        sevenDateString = sevenDate.getUTCFullYear().toString() + '0' + (sevenDate.getUTCMonth() + 1) + sevenDate.getUTCDate();
      } else {
        sevenDateString = sevenDate.getUTCFullYear().toString() + '0' + (sevenDate.getUTCMonth() + 1) + '0' + sevenDate.getUTCDate();
      }
    }


    if (req.param('dealer_id')) {
      Apdata_cnt_day.find({
        where: {
          dealer_id: req.param('dealer_id'),
          cnt_date: {'>=': Number(startTime), '<=': Number(time)}
        },
        sort: 'cnt_date ASC'
      }).exec(function(err,apdata) {
        console.log(apdata);
        let rateData = [];
        let countData = [];
        let customRate = [];
        let customCount = [];

        if (apdata && apdata.length != 0) {
          if (timeRange == 'day') {
            for (let i = apdata.length;i > 7; i--) {
              apdata.shift();
            }
          }
          let index = 0;
          for (let data of apdata) {
            customRate[index] = data['custom_index_total_percent'];
            rateData[index] = {
              customRate:data['custom_index_total_percent'],
              time:data['cnt_date']
            };
            customCount[index] = data['custom_index_total'];
            countData[index] = {
              customCount:data['custom_index_total'],
              time:data['cnt_date']
            };
            index++;
          }
        }

        Apdata_cnt_day.find({
          where: {
            dealer_id: req.param('dealer_id'),
            cnt_date: {'>=': Number(sevenDateString), '<=': Number(nowDateString)}
          },
          sort: 'cnt_date DESC'
        }).exec(function(err,sevenData) {

          let referenceValue = [];

          if (sevenData && sevenData.length != 0) {
            let index = 0;
            if (sevenData.length > 7) {
              sevenData.shift();
            }
            for (let data of sevenData) {
              referenceValue[index] = {
                custom: data['custom_index_total'],
                standCustom: data['custom_index'],
                customRate: data['custom_index_total_percent']
              }
              index++;
            }
          }

          let finData = {
            topChat: {
              //customRate: customRate
              data: rateData
            },
            bottomChat: {
              //customCount: customCount
              data: countData
            },
            yesData: referenceValue[0],
            referenceValue: referenceValue
          };

          return res.json(finData);

        })
      })
    } else {
      Apdata_cnt_day_area.find({
        //0=全国 1=大区 2=小区 3=省份 4=集团
        where: {
          area_type: area_type,
          area_id: area_id,
          cnt_date: {'>=': Number(startTime), '<=': Number(time)}
        },
        sort: 'cnt_date ASC'
      }).exec(function(err,apdata){
        let rateData = [];
        let countData = [];
        let customRate = [];
        let customCount = [];

        if (apdata && apdata.length != 0) {

          if (timeRange == 'day') {
            for (let i = apdata.length;i > 7; i--) {
              apdata.shift();
            }
          }

          let index = 0;
          for (let data of apdata) {
            customRate[index] = data['custom_index_total_percent'];
            rateData[index] = {
              customRate:data['custom_index_total_percent'],
              time:data['cnt_date']
            };
            customCount[index] = data['custom_index_total'];
            countData[index] = {
              customCount:data['custom_index_total'],
              time:data['cnt_date']
            };
            index++;
          }
        }

        Apdata_cnt_day_area.find({
          where: {
            area_type: area_type,
            area_id: area_id,
            cnt_date: {'>=': Number(sevenDateString), '<=': Number(nowDateString)}
          },
          sort: 'cnt_date DESC'
        }).exec(function(err,sevenData) {

          let referenceValue = [];
          if (sevenData && sevenData.length != 0) {
            let index = 0;
            if (sevenData.length > 7) {
              sevenData.shift();
            }

            for (let data of sevenData) {
              referenceValue[index] = {
                custom: data['custom_index_total'],
                standCustom: data['custom_index'],
                customRate: data['custom_index_total_percent']
              }
              index++;
            }
          }

          let finData = {
            topChat: {
              //customRate: customRate
              data: rateData
            },
            bottomChat: {
              //customCount: customCount
              data: countData
            },
            yesData: referenceValue[0],
            referenceValue: referenceValue
          };

          return res.json(finData);

        })
      })
    }
  }
};






