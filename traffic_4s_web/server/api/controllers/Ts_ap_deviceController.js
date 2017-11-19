/**
 * Ts_ap_deviceController
 *
 * @description :: Server-side logic for managing ts_ap_devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    Ts_ap_device.create({
      ap_brand:req.param('ap_brand'),
      ap_model:req.param('ap_model'),
      ap_mac:req.param('ap_mac'),
      dealer_id:req.param('dealer_id'),
      install_desc:req.param('install_desc')
    }).exec(function (err, finn){
      if (err) { return res.serverError(err); }
      let user = req.session.userinfo;
      Ts_user_oplog.create({
        user_id: user['user_id'],
        action: 'ap_device-create',
        info: 'brand:' + req.param('ap_brand') + '|' + 'model:' + req.param('ap_model') + '|' + 'mac:' + req.param('ap_mac') + '|' + 'dealer_id:' + req.param('dealer_id') + '|' + 'install_desc:' + req.param('install_desc'),
        op_time: new Date(),
        op_ip: req.ips[0]
      }).exec(function(err, result){
        if (err) { return res.serverError(err); }
        return res.ok();
      })
    });
  },

  delete :function(req,res){
    Ts_ap_device.destroy({
      ap_id: req.param('ap_id')
    }).exec(function (err){
      if (err) {
        return res.negotiate(err);
      }
      let user = req.session.userinfo;
      Ts_user_oplog.create({
        user_id: user['user_id'],
        action: 'ap_device-delete',
        info: 'ap_id:' + req.param('ap_id'),
        op_time: new Date(),
        op_ip: req.ips[0]
      }).exec(function(err, result){
        if (err) { return res.serverError(err); }
        return res.ok();
      })
    });
  },

  search:function(req,res){
    Ts_ap_device.find({ap_id:req.param('ap_id')}).exec(function (err, result){
      if (err) {
        return res.serverError(err);
      }

      return res.json(result);
    });

  },
  searchWithArea:function(req,res) {
    if (req.param('sarea_id') != 0 && req.param('sarea_id') != null && req.param('sarea_id') != undefined) {
      Ts_dealer.find({
        sarea_id:req.param('sarea_id')}).exec(function(err, result){
        if (err) {
          return res.serverError(err);
        }
        let dealerArr = [];
        for (let a of result) {
          dealerArr.push(a['dealer_id']);
        }
        Ts_ap_device.find({dealer_id:dealerArr}).exec(function(err,apArr){
          let finArr = [];
          for (let a of apArr) {
            Ts_dealer.find({dealer_id: a['dealer_id']}).exec(function(err,dealer){
              Object.assign(a, {dealer_name: dealer[0]['dealer_name']});

              let lastDate = new Date(a['last_date']);

              let date = new Date();
              let localTime = date.getTime();
              let localOffset = date.getTimezoneOffset() * 60000;
              let utc = localTime - localOffset;
              let nowDate = new Date(utc);


              if (nowDate.getTime() - lastDate.getTime() + localOffset < 300000) {
                Object.assign(a, {online: 1});
              } else {
                Object.assign(a, {online: 0});
              }

              finArr.push(a);
              if (finArr.length == apArr.length) {
                return res.json(finArr);
              }
            });
          }
        });
      });
    } else {
      Ts_dealer.find({barea_id:req.param('barea_id')}).exec(function(err, result){
        if (err) {
          return res.serverError(err);
        }
        let dealerArr = [];
        for (let a of result) {
          dealerArr.push(a['dealer_id']);
        }
        Ts_ap_device.find({dealer_id:dealerArr}).exec(function(err,apArr){
          let finArr = [];
          for (let a of apArr) {
            Ts_dealer.find({dealer_id: a['dealer_id']}).exec(function(err,dealer){
              Object.assign(a, {dealer_name: dealer[0]['dealer_name']});

              let lastDate = new Date(a['last_date']);

              let date = new Date();
              let localTime = date.getTime();
              let localOffset = date.getTimezoneOffset() * 60000;
              let utc = localTime - localOffset;
              let nowDate = new Date(utc);


              if (nowDate.getTime() - lastDate.getTime() + localOffset < 300000) {
                Object.assign(a, {online: 1});
              } else {
                Object.assign(a, {online: 0});
              }



              finArr.push(a);
              if (finArr.length == apArr.length) {
                return res.json(finArr);
              }
            });
          }
        });
      });
    }
  },
  getAllData: function(req,res){

    let date = new Date();
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = localTime - localOffset;
    let nowDate = new Date(utc);

    let dealerArr = [];
    Ts_dealer.find().then(function (dealer) {
        for (var i = 0; i < dealer.length; i++) {
          dealerArr[dealer[i]['dealer_id']] = dealer[i];
        }
        return dealerArr;
    }).spread(function(){
      Ts_ap_device.find({sort: {ap_mac:1}, display_flag: 1}).exec(function (err, result){
        if (err) {
          return res.serverError(err);
        }

        let j = 0;
        let ret = [];
        for (var i = 0; i < result.length; i++) {

          let lastDate = new Date(result[i]['last_date']);
          let localLastDate = new Date(lastDate.getTime() - localOffset);

          if (date.getTime() - lastDate.getTime()> 86400000) {
            result[i]['online'] = 0;
          } else if (date.getTime() - lastDate.getTime()> 300000) {
            result[i]['online'] = 2;
          } else {
            result[i]['online'] = 1;
          }
          if (dealerArr[result[i]['dealer_id']] != null ) {
            result[i]['dealer_name'] = dealerArr[result[i]['dealer_id']]['dealer_name'];
            result[i]['barea_id'] = dealerArr[result[i]['dealer_id']]['barea_id'];
            result[i]['sarea_id'] = dealerArr[result[i]['dealer_id']]['sarea_id'];
          }
          else{
            result[i]['dealer_name'] = '无';
          }

          if (req.param('barea_id') != undefined) {
            if (dealerArr[result[i]['dealer_id']] != null && dealerArr[result[i]['dealer_id']]['barea_id'] != undefined && req.param('barea_id') == dealerArr[result[i]['dealer_id']]['barea_id']) {
              ret[j] = result[i];
              j++;
            }
          }
          else if (req.param('sarea_id') != undefined) {
            if (dealerArr[result[i]['dealer_id']] != null && dealerArr[result[i]['dealer_id']]['sarea_id'] != undefined && req.param('sarea_id') == dealerArr[result[i]['dealer_id']]['sarea_id']) {
              ret[j] = result[i];
              j++;
            }
          }
          else if (req.param('province') != undefined) {
            if (dealerArr[result[i]['dealer_id']] != null && dealerArr[result[i]['dealer_id']]['province'] != undefined && req.param('province') == dealerArr[result[i]['dealer_id']]['province']) {
              ret[j] = result[i];
              j++;
            }
          }
          else {
            ret[j] = result[i];
            j++;
          }
        }
        return res.json(ret);

      });
    }).catch(function (err) {
      console.log(err)
    });

  },

  update: function(req,res) {
    let date = new Date();

    Ts_ap_device.update(
      {ap_id:req.param('ap_id')},
      {ap_brand:req.param('ap_brand'),
        ap_model:req.param('ap_model'),
        ap_mac:req.param('ap_mac'),
        dealer_id:req.param('dealer_id'),
        upd_date: date,
        install_desc:req.param('install_desc')}).exec(function (err,updated) {
      if (err) {
        return res.serverError(err);
      } else {
        let user = req.session.userinfo;
        Ts_user_oplog.create({
          user_id: user['user_id'],
          action: 'ap_device-update',
          info: 'brand:' + req.param('ap_brand') + '|' + 'model:' + req.param('ap_model') + '|' + 'mac:' + req.param('ap_mac') + '|' + 'dealer_id:' + req.param('dealer_id') + '|' + 'install_desc:' + req.param('install_desc'),
          op_time: new Date(),
          op_ip: req.ips[0]
        }).exec(function(err, result){
          if (err) { return res.serverError(err); }
          return res.ok();
        })
      }
    });
  },
  getAPInformation: function(rep,res) {
    Ts_ap_device.query(
      "select count(1), sum(case when last_date > now() - interval '1 day' then 1 else 0 end), sum(case when last_date > now() - interval '24 hour' and last_date < now() - interval '5 minute' then 1 else 0 end) as sum1 from ts_ap_device where display_flag=1",
      function (err, result) {
        if (err) {
          return res.serverError(err);
        }

        let totalCount = result['rows'][0]['count'];
        let onlineCount = result['rows'][0]['sum'];
        let previous = result['rows'][0]['sum1'];
        let finData = {
          ap_total: totalCount,
          ap_online: onlineCount,
          ap_noresponse: Number(totalCount) - Number(onlineCount),
          ap_previous: previous,
          ap_onlineRate: Number(onlineCount) / Number(totalCount)
        };
        return res.json(finData);
      })
  }
};

