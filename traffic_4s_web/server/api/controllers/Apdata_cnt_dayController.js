/**
 * Apdata_cnt_dayController
 *
 * @description :: Server-side logic for managing Apdata_cnt_days
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


function getDateNum (dateStr, day, week) {
  let startDate = new Date(Number(dateStr.substr(0, 4)), Number(dateStr.substr(4, 2)) - 1, Number(dateStr.substr(6, 2)));
  let localOffset = startDate.getTimezoneOffset() * 60000;
  let utc = startDate.getTime();
  let finUTC = utc + (week * 7 + day) * 3600000 * 24 - localOffset;
  let finDate = new Date(finUTC);
  let finDateStr = '';

  if (finDate.getUTCMonth() > 8) {
    if (finDate.getUTCDate() > 9) {
      finDateStr = finDate.getUTCFullYear().toString() + (finDate.getUTCMonth() + 1) + finDate.getUTCDate();
    } else {
      finDateStr = finDate.getUTCFullYear().toString() + (finDate.getUTCMonth() + 1) + '0' + finDate.getUTCDate();
    }
  } else {
    if (finDate.getUTCDate() > 9) {
      finDateStr = finDate.getUTCFullYear().toString() + '0' + (finDate.getUTCMonth() + 1) + finDate.getUTCDate();
    } else {
      finDateStr = finDate.getUTCFullYear().toString() + '0' + (finDate.getUTCMonth() + 1) + '0' + finDate.getUTCDate();
    }
  }

  return Number(finDateStr);
}

function getChinaWeek (date) {
  let chinaWeek = 0;
  if (date.getUTCDay() == 0) {
    chinaWeek = 7;
  } else {
    chinaWeek = date.getUTCDay();
  }
  return chinaWeek;
}

module.exports = {
  getDayDate: function(req,res) {
    let user = req.session.userinfo;
    let dealerName = '';
    let requiredment = {};

    if (req.param('group_id') || req.param('barea_id') || req.param('sarea_id') || req.param('province')) {
      if (req.param('barea_id')) {
        if (req.param('barea_id') != '全国') {
          requiredment['barea_id'] = req.param('barea_id');
        }
      }
      if (req.param('sarea_id')) {
        requiredment['sarea_id'] = req.param('sarea_id');
      }
      if (req.param('province')) {
        requiredment['province'] = req.param('province');
      }
      if (req.param('group_id')) {
        requiredment['group_id'] = req.param('group_id');
      }
    } else {
      requiredment['dealer_id'] = req.param('dealer_id');
    }

    Ts_dealer.find(requiredment).exec(function (err, dealer) {
      if (err) {
        return res.serverError(err);
      }
      if (req.param('dealer_id') != undefined) {
        dealerName = dealer[0]['dealer_name'];
      }
      let date = [];
      let count = [];
      let table = [];
      let type = '';
      let startTime = '';
      let endTime = '';

      let dealerIDArr = [];
      for (let a of dealer) {
        dealerIDArr.push(a['dealer_id']);
      }

      if (req.param('startTime') != null && req.param('startTime') != undefined) {
        startTime = req.param('startTime');
      } else {

        let myDate = new Date();
        let localTime = myDate.getTime();
        let localOffset = myDate.getTimezoneOffset() * 60000;
        let utc = localTime - localOffset - 3600000 * 24 * 7;
        let localDate = new Date(utc);
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

      }

      if (req.param('endTime') != null && req.param('endTime') != undefined) {
        endTime = req.param('endTime');
      } else {

        let myDate = new Date();
        let localTime = myDate.getTime();
        let localOffset = myDate.getTimezoneOffset() * 60000;
        let utc = localTime - localOffset;
        let localDate = new Date(utc);

        if (localDate.getUTCMonth() > 8) {
          if (localDate.getUTCDate() > 9) {
            endTime = localDate.getUTCFullYear().toString() + (localDate.getUTCMonth() + 1) + localDate.getUTCDate();
          } else {
            endTime = localDate.getFullYear().toString() + (localDate.getUTCMonth() + 1) + '0' + localDate.getUTCDate();
          }
        } else {
          if (localDate.getUTCDate() > 9) {
            endTime = localDate.getUTCFullYear().toString() + '0' + (localDate.getUTCMonth() + 1) + localDate.getUTCDate();
          } else {
            endTime = localDate.getUTCFullYear().toString() + '0' + (localDate.getUTCMonth() + 1) + '0' + localDate.getUTCDate();
          }
        }
      }


      //判断显示数据类型
      switch (req.param('type')) {
        case '1':
              type = 'custom_total';
              break;
        case '2':
              type = 'group_total';
              break;
        case '3':
              type = 'group_vip';
              break;
        case '4':
              type = 'group_repeat';
              break;
        case '5':
              type = 'group_old';
              break;
        default:

      }
      //判断显示条件样式
      switch (req.param('dateType')) {
        case 'day':
          Apdata_cnt_day.find({
            where: {
              dealer_id: dealerIDArr,
              cnt_date: {'>=': Number(startTime), '<=': Number(endTime)}
            },
            sort: 'cnt_date ASC',
            sum: ['custom_total','group_total','group_vip','group_old','group_repeat'],
            groupBy: 'cnt_date'
          }).exec(function (err, result) {
            if (err) {
              return res.serverError(err);
            }
            for (let a of result) {
              date.push(a['cnt_date']);
              count.push(a[type]);
              table.push({
                date: a['cnt_date'],
                ctTotal: a['custom_total'],
                gpTotal: a['group_total'],
                gpVIP: a['group_vip'],
                gpOld: a['group_old'],
                gpRepeat: a['group_repeat']
              })
            }
            return res.json({
              date: date,
              count: count,
              table: table,
              dealerName: dealerName,
              selectTime: [startTime, endTime, startTime],
              user_role: user['user_role']
            });
          });
          break;
        case 'week':

          let selectTime = '';
          let myDate = new Date();
          let localTime = myDate.getTime();
          let localOffset = myDate.getTimezoneOffset() * 60000;

          let weekStartDate = new Date(Number(startTime.substr(0, 4)), Number(startTime.substr(4, 2)) - 1, Number(startTime.substr(6, 2)));
          let weekLocalStartDate = new Date(weekStartDate.getTime() - localOffset);
          let startDate = new Date(weekLocalStartDate.getTime() - (getChinaWeek(weekLocalStartDate) - 1) * 24 * 3600000);



          if (weekLocalStartDate.getUTCMonth() > 8) {
            if (weekLocalStartDate.getUTCDate() > 9) {
              selectTime = weekLocalStartDate.getUTCFullYear().toString() + (weekLocalStartDate.getUTCMonth() + 1) + weekLocalStartDate.getUTCDate();
            } else {
              selectTime = weekLocalStartDate.getUTCFullYear().toString() + (weekLocalStartDate.getUTCMonth() + 1) + '0' + weekLocalStartDate.getUTCDate();
            }
          } else {
            if (weekLocalStartDate.getUTCDate() > 9) {
              selectTime = weekLocalStartDate.getUTCFullYear().toString() + '0' + (weekLocalStartDate.getUTCMonth() + 1) + weekLocalStartDate.getUTCDate();
            } else {
              selectTime = weekLocalStartDate.getUTCFullYear().toString() + '0' + (weekLocalStartDate.getUTCMonth() + 1) + '0' + weekLocalStartDate.getUTCDate();
            }
          }

          if (startDate.getUTCMonth() > 8) {
            if (startDate.getUTCDate() > 9) {
              startTime = startDate.getUTCFullYear().toString() + (startDate.getUTCMonth() + 1) + startDate.getUTCDate();
            } else {
              startTime = startDate.getUTCFullYear().toString() + (startDate.getUTCMonth() + 1) + '0' + startDate.getUTCDate();
            }
          } else {
            if (startDate.getUTCDate() > 9) {
              startTime = startDate.getUTCFullYear().toString() + '0' + (startDate.getUTCMonth() + 1) + startDate.getUTCDate();
            } else {
              startTime = startDate.getUTCFullYear().toString() + '0' + (startDate.getUTCMonth() + 1) + '0' + startDate.getUTCDate();
            }
          }
          let localEndDate = new Date(Number(endTime.substr(0, 4)), Number(endTime.substr(4, 2)) - 1, Number(endTime.substr(6, 2)));
          let endDate = new Date(localEndDate.getTime() - localOffset);
          let duringDay = (endDate.getTime() - startDate.getTime()) / 3600000 / 24;
          //判断是否在同一周
          Apdata_cnt_day.find({
            dealer_id: dealerIDArr,
            cnt_date: {'>=': Number(startTime), '<=': Number(endTime)}
          }).exec(function (err, result) {

            if (duringDay >= (7 - getChinaWeek(startDate))) {
              //不在同一周
              let weekCount = (duringDay - (7 - getChinaWeek(startDate)) - getChinaWeek(endDate)) / 7;
              //周数据
              if (weekCount != 0) {
                for (let a = 0; a < weekCount + 2; a++) {
                  let sumct_total = 0;
                  let sumgp_total = 0;
                  let sumgp_vip = 0;
                  let sumgp_old = 0;
                  let sumgp_repeat = 0;
                  let sumType = 0;
                  for (let date of result) {
                    if (Number(date['cnt_date']) >= getDateNum(startTime, 0, a) && Number(date['cnt_date']) < getDateNum(startTime, 0, a + 1)) {
                      sumct_total += date['custom_total'];
                      sumgp_total += date['group_total'];
                      sumgp_vip += date['group_vip'];
                      sumgp_old += date['group_old'];
                      sumgp_repeat += date['group_repeat'];
                      sumType += date[type];
                    }

                  }
                  date.push(getDateNum(startTime, 0, a));
                  count.push(sumType);
                  table.push({
                    date: getDateNum(startTime, 0, a),
                    ctTotal: sumct_total,
                    gpTotal: sumgp_total,
                    gpVIP: sumgp_vip,
                    gpOld: sumgp_old,
                    gpRepeat: sumgp_repeat
                  });

                  if (a - 1 == weekCount) {
                    //返回数据
                    return res.json({
                      date: date,
                      count: count,
                      table: table,
                      dealerName: dealerName,
                      selectTime: [startTime, endTime, selectTime],
                      user_role: user['user_role']
                    });
                  }
                }
              } else {
                //第一周
                Apdata_cnt_day.find({
                  where: {
                    dealer_id: dealerIDArr,
                    cnt_date: {
                      '>=': Number(startTime),
                      '<=': getDateNum(startTime, (7 - getChinaWeek(startDate)), 0)
                    }
                  },
                  sum: ['custom_total', 'custom_new', 'group_total', 'group_vip', 'group_old', 'group_repeat']
                }).exec(function (err, result) {
                  if (err) {
                    return res.serverError(err);
                  }
                  if (result.length > 0) {
                    date.push(startTime);
                    count.push(result[0][type]);
                    table.push({
                      date: Number(startTime),
                      ctTotal: result[0]['custom_total'],
                      gpTotal: result[0]['group_total'],
                      gpVIP: result[0]['group_vip'],
                      gpOld: result[0]['group_old'],
                      gpRepeat: result[0]['group_repeat']
                    });
                  } else {
                    date.push(startTime);
                    count.push(0);
                    table.push({
                      date: Number(startTime),
                      ctTotal: 0,
                      gpTotal: 0,
                      gpVIP: 0,
                      gpOld: 0,
                      gpRepeat: 0
                    })
                  }
                  //后一周数据
                  Apdata_cnt_day.find({
                    where: {
                      dealer_id: dealerIDArr,
                      cnt_date: {
                        '>': getDateNum(endTime, -getChinaWeek(endDate), 0),
                        '<=': Number(endTime)
                      }
                    },
                    sum: ['custom_total', 'custom_new', 'group_total', 'group_vip', 'group_old', 'group_repeat']
                  }).exec(function (err, lastResult) {
                    if (err) {
                      return res.serverError(err);
                    }

                    if (lastResult.length > 0) {
                      date.push(getDateNum(endTime, -getChinaWeek(endDate) + 1, 0));
                      count.push(lastResult[0][type]);
                      table.push({
                        date: getDateNum(endTime, -getChinaWeek(endDate) + 1, 0),
                        ctTotal: result[0]['custom_total'],
                        gpTotal: result[0]['group_total'],
                        gpVIP: result[0]['group_vip'],
                        gpOld: result[0]['group_old'],
                        gpRepeat: result[0]['group_repeat']
                      });
                    } else {
                      date.push(getDateNum(endTime, -getChinaWeek(endDate) + 1, 0));
                      count.push(0);
                      table.push({
                        date: getDateNum(endTime, -getChinaWeek(endDate) + 1, 0),
                        ctTotal: 0,
                        gpTotal: 0,
                        gpVIP: 0,
                        gpOld: 0,
                        gpRepeat: 0
                      })
                    }

                    return res.json({
                      date: date,
                      count: count,
                      table: table,
                      dealerName: dealerName,
                      selectTime: [startTime, endTime, selectTime],
                      user_role: user['user_role']
                    });
                  });
                });
              }
              //});
            } else {
              //在同一周
              Apdata_cnt_day.find({
                where: {
                  dealer_id: dealerIDArr,
                  cnt_date: {'>=': Number(startTime), '<=': Number(endTime)}
                },
                sum: ['custom_total', 'custom_new', 'group_total', 'group_vip', 'group_old', 'group_repeat']
              }).exec(function (err, finResult) {
                if (err) {
                  return res.serverError(err);
                }
                if (finResult.length > 0) {
                  date.push(startTime);
                  count.push(finResult[0][type]);
                  table.push({
                    date: Number(startTime),
                    ctTotal: result[0]['custom_total'],
                    gpTotal: result[0]['group_total'],
                    gpVIP: result[0]['group_vip'],
                    gpOld: result[0]['group_old'],
                    gpRepeat: result[0]['group_repeat']
                  });
                } else {
                  date.push(startTime);
                  count.push(0);
                  table.push({
                    date: Number(startTime),
                    ctTotal: 0,
                    gpTotal: 0,
                    gpVIP: 0,
                    gpOld: 0,
                    gpRepeat: 0
                  })
                }

                return res.json({
                  date: date,
                  count: count,
                  table: table,
                  dealerName: dealerName,
                  selectTime: [startTime, endTime, selectTime],
                  user_role: user['user_role']
                });
              });
            }
          })

          break;
        case 'month':


            if (startTime.substr(0,6) == endTime.substr(0,6)) {
              //同一
              Apdata_cnt_day.find({
                where: {
                  dealer_id: dealerIDArr,
                  cnt_date: {'>': Number(startTime.substr(0, 6) + '00'), '<': Number(Number(startTime.substr(0, 6)) + 1 + '00')}
                },
                sum: ['custom_total', 'custom_new', 'group_total', 'group_vip', 'group_old', 'group_repeat']
              }).exec(function(err, result){
                if (err) {
                  return res.serverError(err);
                }

                if (result.length > 0) {
                  date.push(startTime.substr(0,6));
                  count.push(result[0][type]);
                  table.push({
                    date: Number(startTime.substr(0,6)),
                    ctTotal: result[0]['custom_total'],
                    gpTotal: result[0]['group_total'],
                    gpVIP: result[0]['group_vip'],
                    gpOld: result[0]['group_old'],
                    gpRepeat: result[0]['group_repeat']
                  });
                } else {
                  date.push(startTime.substr(0,6));
                  count.push(0);
                  table.push({date: Number(startTime.substr(0,6)), total: 0, new: 0, old: 0})
                }
                return res.json({
                  date: date,
                  count: count,
                  table: table,
                  dealerName: dealerName,
                  selectTime: [startTime, endTime, startTime],
                  user_role: user['user_role']
                });
              });
            } else {

              Apdata_cnt_day.find({
                where: {
                  dealer_id: dealerIDArr,
                  cnt_date: {'>': Number(startTime.substr(0, 6) + '00'), '<': Number(Number(endTime.substr(0, 6)) + 1 + '00')}
                }
              }).exec(function (err, result) {

                let sumct_total = 0;
                let sumgp_total = 0;
                let sumgp_vip = 0;
                let sumgp_old = 0;
                let sumgp_repeat = 0;
                let sumType = 0;

                //第一月数据
                let firstEnd = (Number(startTime.substr(0, 6)) + 1).toString() + '00';

                for (let date of result) {
                  if (Number(date['cnt_date']) >= Number(startTime.substr(0, 6) + '00') && Number(date['cnt_date']) < Number(firstEnd)) {
                    sumct_total += date['custom_total'];
                    sumgp_total += date['group_total'];
                    sumgp_vip += date['group_vip'];
                    sumgp_old += date['group_old'];
                    sumgp_repeat += date['group_repeat'];
                    sumType += date[type];
                  }
                }
                date.push(startTime.substr(0, 6));
                count.push(sumType);

                table.push({
                  date: Number(startTime.substr(0, 6)),
                  ctTotal: sumct_total,
                  gpTotal: sumgp_total,
                  gpVIP: sumgp_vip,
                  gpOld: sumgp_old,
                  gpRepeat: sumgp_repeat
                });

                let sumct_totalM = 0;
                let sumgp_totalM = 0;
                let sumgp_vipM = 0;
                let sumgp_oldM = 0;
                let sumgp_repeatM = 0;
                let sumTypeM = 0;

                let startMonth = startTime.substr(0, 6);
                let endMonth = endTime.substr(0, 6);
                let startMonthNum = Number(startMonth) + 1;
                let endMonthNum = Number(endMonth);

                for (; startMonthNum <= endMonthNum; startMonthNum++) {

                  let startMonthStr = startMonthNum.toString() + '00';
                  let endMonthStr = '';
                  //if (startMonthNum == endMonthNum) {
                  //  endMonthStr = endTime;
                  //} else {
                  endMonthStr = (startMonthNum + 1).toString() + '00';
                  //}
                  //当月份为12时 变为下一年的一月份
                  if (startMonthNum % 100 == 12) {
                    let exchangeStr = startMonthNum.toString();
                    let exchangeNum = Number(exchangeStr.substr(0, 4)) + 1;
                    startMonthNum = exchangeNum * 100;
                  }

                  for (let date of result) {
                    if (Number(date['cnt_date']) > Number(Number(startMonthStr)) && Number(date['cnt_date']) <= Number(endMonthStr)) {
                      sumct_totalM += date['custom_total'];
                      sumgp_totalM += date['group_total'];
                      sumgp_vipM += date['group_vip'];
                      sumgp_oldM += date['group_old'];
                      sumgp_repeatM += date['group_repeat'];
                      sumTypeM += date[type];
                    }
                  }
                  date.push(startMonthStr.substr(0, 6));
                  count.push(sumTypeM);
                  table.push({
                    date: Number(startMonthStr.substr(0, 6)),
                    ctTotal: sumct_totalM,
                    gpTotal: sumgp_totalM,
                    gpVIP: sumgp_vipM,
                    gpOld: sumgp_oldM,
                    gpRepeat: sumgp_repeatM
                  });

                }
                return res.json({
                  date: date,
                  count: count,
                  table: table,
                  dealerName: dealerName,
                  selectTime: [startTime, endTime, startTime],
                  user_role: user['user_role']
                });
              });
            }
          break;
        default:
          date = [];
          count = [];
          table.push({
            date: 0,
            ctTotal: 0,
            gpTotal: 0,
            gpVIP: 0,
            gpOld: 0,
            gpRepeat: 0
          })
          return res.json({
            date: date,
            count: count,
            table: table,
            dealerName: dealerName,
            selectTime: [startTime, endTime, startTime],
            user_role: user['user_role']
          });
      }
    })
  },
  download: function(req,res) {


    let user = req.session.userinfo;
    let requiredment = {};
    let fileType = 0;
    let filename_title = '';
    let sqlHead = '';
    let sql = '';

    if (req.param('group_id') || req.param('barea_id') || req.param('sarea_id') || req.param('province')) {
      if (req.param('barea_id')) {
        if (req.param('barea_id') != '全国') {
          fileType = 1;
          requiredment['barea_id'] = req.param('barea_id');
          sqlHead = "case when b.barea_id=1 then '北区'  when b.barea_id=2 then '东区'  when b.barea_id=3 then '南区'  when b.barea_id=4 then '西区'  when b.barea_id=5 then '浙江区'  end as barea";
        }
        else {
          sqlHead = "'全国' as barea ";
        }
      }
      if (req.param('sarea_id')) {
        fileType = 2;
        requiredment['sarea_id'] = req.param('sarea_id');
        sqlHead = "c.name as barea";
      }
      if (req.param('province')) {
        fileType = 3;
        requiredment['province'] = req.param('province');
        sqlHead = "c.name as barea";
      }
      if (req.param('group_id')) {
        fileType = 4;
        requiredment['group_id'] = req.param('group_id');
        sqlHead = "d.group_name as barea";
      }
    } else {
      requiredment['dealer_id'] = req.param('dealer_id');
      fileType = 5;
      sqlHead = "dealer_name as barea";
    }



    Ts_dealer.find(requiredment).exec(function (err, dealer) {
      if (err) {
        return res.serverError(err);
      }

      let startTime = '';
      let endTime = '';

      let dealerIDArr = [];
      for (let a of dealer) {
        dealerIDArr.push(a['dealer_id']);
      }

      if (req.param('startTime') != null && req.param('startTime') != undefined) {
        startTime = req.param('startTime');
      } else {

        let myDate = new Date();
        let localTime = myDate.getTime();
        let localOffset = myDate.getTimezoneOffset() * 60000;
        let utc = localTime - localOffset - 3600000 * 24 * 7;
        let localDate = new Date(utc);
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
      }

      if (req.param('endTime') != null && req.param('endTime') != undefined) {
        endTime = req.param('endTime');
      } else {

        let myDate = new Date();
        let localTime = myDate.getTime();
        let localOffset = myDate.getTimezoneOffset() * 60000;
        let utc = localTime - localOffset;
        let localDate = new Date(utc);

        if (localDate.getUTCMonth() > 8) {
          if (localDate.getUTCDate() > 9) {
            endTime = localDate.getUTCFullYear().toString() + (localDate.getUTCMonth() + 1) + localDate.getUTCDate();
          } else {
            endTime = localDate.getFullYear().toString() + (localDate.getUTCMonth() + 1) + '0' + localDate.getUTCDate();
          }
        } else {
          if (localDate.getUTCDate() > 9) {
            endTime = localDate.getUTCFullYear().toString() + '0' + (localDate.getUTCMonth() + 1) + localDate.getUTCDate();
          } else {
            endTime = localDate.getUTCFullYear().toString() + '0' + (localDate.getUTCMonth() + 1) + '0' + localDate.getUTCDate();
          }
        }
      }

      if (req.param('style') == 0) {
        sql = "select case when b.barea_id=1 then '北区'  when b.barea_id=2 then '东区'  when b.barea_id=3 then '南区'  when b.barea_id=4 then '西区'  when b.barea_id=5 then '浙江区'  end as barea,c.name,d.group_name,dealer_name,dealer_code,cnt_date, a.custom_total, a.group_total,a.group_vip,a.group_old, a.group_repeat from apdata_cnt_day a left join ts_dealer b on a.dealer_id=b.dealer_id left join ts_area c on b.sarea_id=c.id left join ts_group d on b.group_id=d.group_id where a.cnt_date>=$1 and a.cnt_date<=$2 and b.dealer_id in (" + dealerIDArr.join(',') + ") order by b.barea_id, b.sarea_id, b.dealer_id, a.cnt_date;";
      } else {
        sql = "select "+ sqlHead + ",cnt_date,sum (a.custom_total) as custom_total,sum (a.group_total) as group_total,sum (a.group_vip) as group_vip,sum (a.group_old) as group_old,sum (a.group_repeat) as group_repeat from apdata_cnt_day a left join ts_dealer b on a.dealer_id=b.dealer_id left join ts_area c on b.sarea_id=c.id left join ts_group d on b.group_id=d.group_id where a.cnt_date>=$1 and a.cnt_date<=$2 and b.dealer_id in (" + dealerIDArr.join(',') + ") group by barea, a.cnt_date order by a.cnt_date;";
      }

      Apdata_cnt_day.query(
        sql,
        [startTime, endTime],
        function(err, result) {
          if (err) {
            return res.serverError(err);
          }

          var head = '';

          if (req.param('style') == 0) {
            head = '大区,小区,集团,经销商,经销商代码,日期,展厅流量(人次),展厅流量(批次),高意向潜客(批次),当日二次到店潜客(批次),三个月内二次到店潜客(批次)';
          } else {
            if (fileType == 1) {
              head = '大区,日期,展厅流量(人次),展厅流量(批次),高意向潜客(批次),当日二次到店潜客(批次),三个月内二次到店潜客(批次)';
            }
            if (fileType == 2) {
              head = '小区,日期,展厅流量(人次),展厅流量(批次),高意向潜客(批次),当日二次到店潜客(批次),三个月内二次到店潜客(批次)';
            }
            if (fileType == 3) {
              head = '小区,日期,展厅流量(人次),展厅流量(批次),高意向潜客(批次),当日二次到店潜客(批次),三个月内二次到店潜客(批次)';
            }
            if (fileType == 4) {
              head = '集团,日期,展厅流量(人次),展厅流量(批次),高意向潜客(批次),当日二次到店潜客(批次),三个月内二次到店潜客(批次)';
            }
            if (fileType == 5) {
              head = '经销商,日期,展厅流量(人次),展厅流量(批次),高意向潜客(批次),当日二次到店潜客(批次),三个月内二次到店潜客(批次)';
            }
            if (fileType == 0) {
              head = '全国,日期,展厅流量(人次),展厅流量(批次),高意向潜客(批次),当日二次到店潜客(批次),三个月内二次到店潜客(批次)';
            }
          }

          var arr = [
            head.split(',')
          ];
          if (req.param('style') == 0) {
            for (let v of result['rows']) {
              let barea = '';
              let name = '';
              let group_name = '';
              let dealer_name = '';
              let dealer_code = '';
              let cnt_date = '';
              let custom_total = '';
              let group_total = '';
              let group_vip = '';
              let group_old = '';
              let group_repeat = '';
              if (v.barea) {
                barea = v.barea;
              }
              if (v.name) {
                name = v.name;
              }
              if (v.group_name) {
                group_name = v.group_name;
              }
              if (v.dealer_name) {
                dealer_name = v.dealer_name;
              }
              if (v.dealer_code) {
                dealer_code = v.dealer_code;
              }
              if (v.cnt_date) {
                cnt_date = v.cnt_date;
              }

              custom_total = v.custom_total ? v.custom_total : 0;
              group_total = v.group_total ? v.group_total : 0;
              group_vip = v.group_vip ? v.group_vip : 0;
              group_old = v.group_old ? v.group_old : 0;
              group_repeat = v.group_repeat ? v.group_repeat : 0;

              arr.push(
                [
                  barea,
                  name,
                  group_name,
                  dealer_name,
                  dealer_code,
                  cnt_date,
                  custom_total,
                  group_total,
                  group_vip,
                  group_old,
                  group_repeat
                ]
              )
            }
            if (fileType == 0) {
              filename_title = '全国';
            }
            if (fileType == 1) {
              filename_title = '大区-' + arr[arr.length - 1][0];
            }
            if (fileType == 2) {
              filename_title = '小区-' + arr[arr.length - 1][1];
            }
            if (fileType == 3) {
              filename_title = '省份-' + arr[arr.length - 1][1];
            }
            if (fileType == 4) {
              filename_title = '集团-' + arr[arr.length - 1][2];
            }
            if (fileType == 5) {
              filename_title = '经销商-' + arr[arr.length - 1][3];
            }
          } else {
            for (let v of result['rows']) {
              let barea = '';
              let cnt_date = '';
              let custom_total = '';
              let group_total = '';
              let group_vip = '';
              let group_old = '';
              let group_repeat = '';
              if (v.barea) {
                barea = v.barea;
              }
              if (v.cnt_date) {
                cnt_date = v.cnt_date;
              }
              custom_total = v.custom_total ? v.custom_total : 0;
              group_total = v.group_total ? v.group_total : 0;
              group_vip = v.group_vip ? v.group_vip : 0;
              group_old = v.group_old ? v.group_old : 0;
              group_repeat = v.group_repeat ? v.group_repeat : 0;

              arr.push(
                [
                  barea,
                  cnt_date,
                  custom_total,
                  group_total,
                  group_vip,
                  group_old,
                  group_repeat
                ]
              )
            }
            if (fileType == 0) {
              filename_title = '全国';
            }
            if (fileType == 1) {
              filename_title = '大区-' + arr[arr.length - 1][0];
            }
            if (fileType == 2) {
              filename_title = '小区-' + arr[arr.length - 1][0];
            }
            if (fileType == 3) {
              filename_title = '省份-' + arr[arr.length - 1][0];
            }
            if (fileType == 4) {
              filename_title = '集团-' + arr[arr.length - 1][0];
            }
            if (fileType == 5) {
              filename_title = '经销商-' + arr[arr.length - 1][0];
            }
          }
          let styleStr = '';
          if (req.param('style') == 0) {
            styleStr = '明细-';
          } else {
            styleStr = '汇总-';
          }
          var csv = require("fast-csv");
          var filename = 'Volvo' + styleStr + startTime + '-' + endTime + '-' + filename_title + '.csv';
          // //only quote the second column
          csv.writeToString(arr, {
            headers: true,
            quoteColumns: true
          }, function(err, data) {
            var userAgent = (req.headers['user-agent']||'').toLowerCase();
            if(userAgent.indexOf('macintosh') === -1){
              res.set('Content-Type', 'application/octet-stream;charset=UTF-8');
            }else{
              res.set('Content-Type', 'application/octet-stream;charset=GBK');
            }
            if(userAgent.indexOf('msie') >= 0 || userAgent.indexOf('chrome') >= 0) {
              res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent(filename));
            } else if(userAgent.indexOf('firefox') >= 0) {
              res.setHeader('Content-Disposition', 'attachment; filename*="utf8\'\'' + encodeURIComponent(filename)+'"');
            } else {
              /* safari等其他非主流浏览器只能自求多福了 */
              res.setHeader('Content-Disposition', 'attachment; filename=' + new Buffer(filename).toString('binary'));
            }
            var Iconv = require('iconv').Iconv;
            if (userAgent.indexOf('macintosh') === -1) {
              var dataBuffer = Buffer.concat([new Buffer('\xEF\xBB\xBF', 'binary'), new Buffer(data)]);
              dataBuffer.toString('UTF-8');
              res.send(dataBuffer);
            } else {
              var iconv = new Iconv('UTF-8', 'GBK//TRANSLIT//IGNORE');
              res.send(iconv.convert(data));
            }

            //var dataBuffer = Buffer.concat([new Buffer('\xEF\xBB\xBF', 'binary'), new Buffer(data)]);
          });


        }
      )

    });

  }

};

