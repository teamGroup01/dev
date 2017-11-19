/**
 * Ts_dealerController
 *
 * @description :: Server-side logic for managing ts_dealers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {

    Ts_dealer.create({
      dealer_name:req.param('dealer_name'),
      dealer_code:req.param('dealer_code'),
      barea_id:req.param('barea_id') != undefined ? req.param('barea_id').split(',')[0] : 0,
      sarea_id: req.param('barea_id') != undefined && req.param('barea_id').split(',').length > 1 ? req.param('barea_id').split(',')[1] : 0,
      group_id:req.param('group_id'),
      province:req.param('barea_id') != undefined && req.param('barea_id').split(',').length > 2 ? req.param('barea_id').split(',')[2] : 0,
      city:req.param('city'),
      address:req.param('address'),
      plan_path:req.param('plan_path')
    }).exec(function (err, finn){
      if (err) { return res.serverError(err); }
      let user = req.session.userinfo;
      Ts_user_oplog.create({
        user_id: user['user_id'],
        action: 'dealer-create',
        info: 'name:' + req.param('dealer_name') + '|' + 'code:' + req.param('dealer_code') + '|' + 'area:' + req.param('barea_id') + '|' + 'group_id:' + req.param('group_id') + '|' + 'city:' + req.param('city') + '|' + 'address:' + req.param('address'),
        op_time: new Date(),
        op_ip: req.ips[0]
      }).exec(function(err, result){
        if (err) { return res.serverError(err); }
        return res.ok();
      })
    });
  },

  delete :function(req,res){

    let user = req.session.userinfo;

    Ts_dealer.destroy({
      dealer_id: req.param('dealer_id')
    }).exec(function (err){
      if (err) {
        return res.negotiate(err);
      }
      Ts_user_oplog.create({
        user_id: user['user_id'],
        action: 'dealer-delete',
        info: 'dealer_id:' + req.param('dealer_id'),
        op_time: new Date(),
        op_ip: req.ips[0]
      }).exec(function(err, result){
        if (err) { return res.serverError(err); }
        return res.ok();
      })
    });
  },

  search:function(req,res){
    Ts_dealer.find({
      dealer_id:req.param('dealer_id'),
      sort: {dealer_code: 1}
    }).exec(function (err, result){
      if (err) {
        return res.serverError(err);
      }
      return res.json(result);
    });
  },
  getAllData: function(req,res) {
    let areaArr = [];
    let groupArr = [];
    let condtion = {sort: {dealer_code: 1}};


    Ts_area.find().exec(function (err, area) {
      if (err) {
        return res.serverError(err);
      }

      for (var i = 0; i < area.length; i++) {
        areaArr[area[i]['id']] = area[i]['name'];
      }
    });

    Ts_group.find().exec(function (err, groupData) {
      for (var i = 0; i < groupData.length; i++) {
        groupArr[groupData[i]['group_id']] = groupData[i]['group_name'];
      }
    });

    if (req.param('value') != '全国') {
      let user = req.session.userinfo;

      if (user['user_role'] == 3) {
        condtion['barea_id'] = user['barea_id'];
      }
      else if (user['user_role'] == 4) {
        condtion['sarea_id'] = user['sarea_id'];
      }
      else if (user['user_role'] == 5) {
        condtion['dealer_id'] = user['dealer_id'];
      }
      else if (user['user_role'] == 6) {
        condtion['group_id'] = user['group_id'];
      }
    }

    Ts_dealer.find(condtion).exec(function (err, result) {
      if (err) {
        return res.serverError(err);
      }

      let finResult = [];

      if (req.param('barea_id') != undefined || req.param('sarea_id') != undefined || req.param('province') != undefined) {
        if (req.param('barea_id') != undefined) {
          for (let a of result) {
            if (a['barea_id'] == req.param('barea_id')) {
              finResult.push(a);
            }
          }
        }
        else if (req.param('sarea_id') != undefined) {
          for (let a of result) {
            if (a['sarea_id'] == req.param('sarea_id')) {
              finResult.push(a);
            }
          }
        }
        else if (req.param('province') != undefined) {
          for (let a of result) {
            if (a['province'] == req.param('province')) {
              finResult.push(a);
            }
          }
        }
      } else {
        finResult = result;
      }
      for (var i = 0; i < finResult.length; i++) {
        finResult[i]['areaName'] = areaArr[finResult[i]['barea_id']] + ',' + areaArr[finResult[i]['sarea_id']] + ',' + areaArr[finResult[i]['province']];
        finResult[i]['levelArr'] = [finResult[i]['barea_id'], finResult[i]['sarea_id'], parseInt(finResult[i]['province'])];
        finResult[i]['groupName'] = groupArr[finResult[i]['group_id']] ? groupArr[finResult[i]['group_id']] : '无';
      }

      return res.json(finResult);

    });
  },
  update: function(req,res) {

    let date = new Date();

    Ts_dealer.find({
      dealer_id:req.param('dealer_id')
    }).exec(function(err, result){
      Ts_dealer.update(
        {dealer_id:req.param('dealer_id')},
        {
          dealer_name:req.param('dealer_name') != undefined ? req.param('dealer_name') : result[0]['dealer_name'],
          dealer_code:req.param('dealer_code') != undefined ? req.param('dealer_code') : result[0]['dealer_code'],
          barea_id:req.param('barea_id') != undefined ? req.param('barea_id').split(',')[0] : result[0]['barea_id'],
          sarea_id: req.param('barea_id') != undefined && req.param('barea_id').split(',').length > 1 ? req.param('barea_id').split(',')[1] : result[0]['sarea_id'],
          group_id:req.param('group_id') != undefined ? req.param('group_id') : result[0]['group_id'],
          province: req.param('barea_id') != undefined && req.param('barea_id').split(',').length > 2 ? req.param('barea_id').split(',')[2] : result[0]['province'],
          city:req.param('city') != undefined ? req.param('city') : result[0]['city'],
          address:req.param('address') != undefined ? req.param('address') : result[0]['address'],
          upd_date: date,
          plan_path:req.param('plan_path')}).exec(function (err,updated) {
        if (err) {
          return res.serverError(err);
        }else{

          let user = req.session.userinfo;
          Ts_user_oplog.create({
            user_id: user['user_id'],
            action: 'dealer-update',
            info: 'name:' + req.param('dealer_name') + '|' + 'code:' + req.param('dealer_code') + '|' + 'area:' + req.param('barea_id') + '|' + 'group_id:' + req.param('group_id') + '|' + 'city:' + req.param('city') + '|' + 'address:' + req.param('address'),
            op_time: date,
            op_ip: req.ips[0]
          }).exec(function(err, result){
            if (err) { return res.serverError(err); }
            return res.json(updated);
          })
        }
      });
    });
  }
};
