/**
 * Apdata_cnt_lengthController
 *
 * @description :: Server-side logic for managing Apdata_cnt_lengths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getLengthData: function(req,res) {

    let user = req.session.userinfo;
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

    if (req.param('startTime') != undefined && req.param('startTime') != null && req.param('startTime') != 0) {
      Ts_dealer.find(requiredment).exec(function (err, dealer) {
        if (err) {
          return res.serverError(err);
        }

        let dealerIDArr = [];
        for (let a of dealer) {
          dealerIDArr.push(a['dealer_id']);
        }

        Apdata_cnt_length.find({
          where: {
            dealer_id: dealerIDArr,
            cnt_date: {'>=': req.param('startTime'), '<=': req.param('endTime')}
          },
          sum: 'group_total',
          groupBy: 'range'
        }).exec(function (err, result) {
          if (err) {
            return res.serverError(err);
          }

          let finData = {apdata: result, user_role:user['user_role']};

          if (dealer.length != 0) {
            if (req.param('dealer_id')) {
              Object.assign(finData, {
                dealerName: dealer[0]['dealer_name'],
                time: [req.param('startTime'), req.param('endTime')]
              });
            } else {
              Object.assign(finData, {
                dealerName: '',
                time: [req.param('startTime'), req.param('endTime')]
              });
            }

          } else {
            if (req.param('dealer_id')) {
              Object.assign(finData, {
                dealerName: '暂无',
                time: [req.param('startTime'), req.param('endTime')]
              });
            } else {
              Object.assign(finData, {
                dealerName: '',
                time: [req.param('startTime'), req.param('endTime')]
              });
            }
          }
          return res.json(finData);
        });
      });
    } else {
      let date = new Date();
      let localTime = date.getTime();
      let localOffset = date.getTimezoneOffset() * 60000;
      let utc = localTime - localOffset;
      let localDate = new Date(utc);
      let localDateString = '';

      if (localDate.getUTCMonth() > 8) {
        if (localDate.getUTCDate() > 9) {
          localDateString = localDate.getUTCFullYear().toString() + (localDate.getUTCMonth() + 1) + localDate.getUTCDate();
        } else {
          localDateString = localDate.getUTCFullYear().toString() + (localDate.getUTCMonth() + 1) + '0' + localDate.getUTCDate();
        }
      } else {
        if (localDate.getUTCDate() > 9) {
          localDateString = localDate.getUTCFullYear().toString() + '0' + (localDate.getUTCMonth() + 1) + localDate.getUTCDate();
        } else {
          localDateString = localDate.getUTCFullYear().toString() + '0' + (localDate.getUTCMonth() + 1) + '0' + localDate.getUTCDate();
        }
      }

      let weeklaterDate = new Date(utc - 7 * 24 * 60 * 60 * 1000);
      let weeklaterDateString = '';

      if (weeklaterDate.getUTCMonth() > 8) {
        if (weeklaterDate.getUTCDate() > 9) {
          weeklaterDateString = weeklaterDate.getUTCFullYear().toString() + (weeklaterDate.getUTCMonth() + 1) + weeklaterDate.getUTCDate();
        } else {
          weeklaterDateString = weeklaterDate.getUTCFullYear().toString() + (weeklaterDate.getUTCMonth() + 1) + '0' + weeklaterDate.getUTCDate();
        }
      } else {
        if (weeklaterDate.getUTCDate() > 9) {
          weeklaterDateString = weeklaterDate.getUTCFullYear().toString() + '0' + (weeklaterDate.getUTCMonth() + 1) + weeklaterDate.getUTCDate();
        } else {
          weeklaterDateString = weeklaterDate.getUTCFullYear().toString() + '0' + (weeklaterDate.getUTCMonth() + 1) + '0' + weeklaterDate.getUTCDate();
        }
      }
      Ts_dealer.find(requiredment).exec(function (err, dealer) {
        if (err) {
          return res.serverError(err);
        }

        let dealerIDArr = [];
        for (let a of dealer) {
          dealerIDArr.push(a['dealer_id']);
        }

        Apdata_cnt_length.find({
          where: {
            dealer_id: dealerIDArr,
            cnt_date: {'>': Number(weeklaterDateString), '<=': Number(localDateString)}
          },
          sum: 'group_total',
          groupBy: 'range'
        }).exec(function (err, result) {
          if (err) {
            return res.serverError(err);
          }



          let finData = {user_role: user['user_role']};
          if (result.length != 0) {
            Object.assign(finData, {apdata: result});
          } else {
            Object.assign(finData, {apdata: []});
          }
          if (dealer.length != 0) {
            if (req.param('dealer_id')) {
              Object.assign(finData, {dealerName: dealer[0]['dealer_name'], time: [weeklaterDateString, localDateString]})
            } else {
              Object.assign(finData, {dealerName: '', time: [weeklaterDateString, localDateString]})
            }
          } else {
            if (req.param('dealer_id')) {
              Object.assign(finData, {dealerName: '暂无', time: [weeklaterDateString, localDateString]})
            } else {
              Object.assign(finData, {dealerName: '', time: [weeklaterDateString, localDateString]})
            }
          }
          return res.json(finData);
        });
      });
    }
  }
};

