/**
 * Apdata_cnt_hourController
 *
 * @description :: Server-side logic for managing Apdata_cnt_hours
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getChatData: function (req,res) {
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

    let currentDate = 0;
    if (req.param('date') != null && req.param('date') != undefined) {
      currentDate = Number(req.param('date'));
    } else {
      currentDate = Number(dateString);
    }

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

    Ts_dealer.find(requiredment).exec(function (err, dealer){
      if (err) {
        return res.serverError(err);
      }

      let dealerIDArr = [];
      for (let a of dealer) {
        dealerIDArr.push(a['dealer_id']);
      }

      Apdata_cnt_hour.find({
        where: {
          dealer_id: dealerIDArr,
          cnt_date: currentDate
        },
        sum: ['custom_total', 'custom_new', 'group_total', 'group_vip', 'group_old', 'group_repeat'],
        groupBy: 'cnt_hour',
        sort: 'cnt_hour ASC',
      }).exec(function (err, data) {
        if (err) {
          return res.serverError(err);
        }
        let hour = [];
        let count = [];
        let table = [];
        switch (req.param('type')) {
          case '1':
            for (let a of data) {
              hour.push(a['cnt_hour']);
              count.push(a['custom_total']);
              table.push({
                date: a['cnt_date'],
                hour: a['cnt_hour'],
                ctTotal: a['custom_total'],
                gpTotal: a['group_total'],
                gpVIP: a['group_vip'],
                gpOld: a['group_old'],
                gpRepeat: a['group_repeat']
              })
            }
            break;
          case '2':
            for (let a of data) {
              hour.push(a['cnt_hour']);
              count.push(a['group_total']);
              table.push({
                date: a['cnt_date'],
                hour: a['cnt_hour'],
                ctTotal: a['custom_total'],
                gpTotal: a['group_total'],
                gpVIP: a['group_vip'],
                gpOld: a['group_old'],
                gpRepeat: a['group_repeat']
              })
            }
            break;
          case '3':
            for (let a of data) {
              hour.push(a['cnt_hour']);
              count.push(a['group_vip']);
              table.push({
                date: a['cnt_date'],
                hour: a['cnt_hour'],
                ctTotal: a['custom_total'],
                gpTotal: a['group_total'],
                gpVIP: a['group_vip'],
                gpOld: a['group_old'],
                gpRepeat: a['group_repeat']
              })
            }
            break;
          case '4':
            for (let a of data) {
              hour.push(a['cnt_hour']);
              count.push(a['group_repeat']);
              table.push({
                date: a['cnt_date'],
                hour: a['cnt_hour'],
                ctTotal: a['custom_total'],
                gpTotal: a['group_total'],
                gpVIP: a['group_vip'],
                gpOld: a['group_old'],
                gpRepeat: a['group_repeat']
              })
            }
            break;
          case '5':
            for (let a of data) {
              hour.push(a['cnt_hour']);
              count.push(a['group_old']);
              table.push({
                date: a['cnt_date'],
                hour: a['cnt_hour'],
                ctTotal: a['custom_total'],
                gpTotal: a['group_total'],
                gpVIP: a['group_vip'],
                gpOld: a['group_old'],
                gpRepeat: a['group_repeat']
              })
            }
            break;
          default:
            date = [];
            hour = [];
            count = [];
            table.push({
              date: 0,
              hour: 0,
              ctTotal: 0,
              gpTotal: 0,
              gpVIP: 0,
              gpOld: 0,
              gpRepeat: 0
            })
        }

        let user = req.session.userinfo;

        if (req.param('dealer_id')) {
          return res.json({
            hour: hour,
            count: count,
            table: table,
            dealerName: dealer[0]['dealer_name'],
            user_role: user['user_role']
          });
        } else {
          return res.json({
            hour: hour,
            count: count,
            table: table,
            dealerName: '',
            user_role: user['user_role']
          });
        }
      });
    });
  }
};

