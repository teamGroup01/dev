/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const EncryptUtils = require('../utils/EncryptUtils');

function GetRandomNum(Min,Max)
{
  var Range = Max - Min;
  var Rand = Math.random();
  return(Min + Math.round(Rand * Range));
}

module.exports = {
  add: function (req, res) {
    Ts_user.find({
      user_name:req.param('user_name')
    }).exec(function(err, info){
      if (err) {
        return res.serverError(err);
      }

      if (info == undefined || info.length == 0) {

        Ts_user.create({
          user_role:req.param('user_role'),
          user_name:req.param('user_name'),
          user_pass:req.param('user_pass'),
          barea_id:req.param('barea_id') != undefined ? req.param('barea_id') : 0,
          sarea_id: req.param('sarea_id') != undefined ? req.param('sarea_id') : 0,
          dealer_id:req.param('dealer_id') != undefined ? req.param('barea_id') : 0,
          group_id:req.param('group_id') != undefined ? req.param('barea_id') : 0,
          realname:req.param('realname') != undefined ? req.param('realname') : '',
          telephone:req.param('telephone'),
          mobile:req.param('mobile'),
          qq:req.param('qq'),
          wechat:req.param('wechat'),
          create_user:req.param('create_user')
        }).exec(function (err, finn){
          if (err) { return res.serverError(err); }
          let user = req.session.userinfo;
          Ts_user_oplog.create({
            user_id: user['user_id'],
            action: 'user-create',
            info: 'role:' + req.param('user_role') + '|' + 'name:' + req.param('user_name') + '|' + 'pass:' + req.param('user_pass') + '|' + 'barea_id:' + req.param('barea_id') + '|' + 'sarea_id:' + req.param('sarea_id')  + '|' + 'dealer_id:' + req.param('dealer_id')  + '|' + 'group_id:' + req.param('group_id')  + '|' + 'realname:' + req.param('realname')  + '|' + 'telephone:' + req.param('telephone')  + '|' + 'mobile:' + req.param('mobile')  + '|' + 'qq:' + req.param('qq')  + '|' + 'wechat:' + req.param('wechat'),
            op_time: new Date(),
            op_ip: req.ips[0]
          }).exec(function(err, result){
            if (err) { return res.serverError(err); }
            return res.json({
              code:'添加用户成功'
            });
          })
        });

      } else {
        return res.json({
          code:'该用户已存在'
        })
      }
    });
  },
  login: function(req,res) {
    Ts_user.find({user_name:req.param('username')}).exec(function (err, result){
      if (err) {
        return res.serverError(err);
      }
      if (result.length != 0) {
        if (result[0]['user_pass'] === req.param('password')) {
          req.session.token = EncryptUtils.md5(req.param('username') + req.param('password'));
          req.session.userinfo = result[0];

          Ts_user_oplog.create({
            user_id: result[0]['user_id'],
            action: 'login',
            info: 'name:' + req.param('username') + '|' + 'password:' + req.param('password'),
            op_time: new Date(),
            op_ip: req.ips[0]
          }).exec(function(err, result){
            if (err) { return res.serverError(err); }
            return res.redirect('/main');
          })
        } else {
          return res.redirect('/');
        }
      } else {
        return res.redirect('/');
      }
    });
  },
  logout: function(req,res) {
    delete req.session.token;
    //delete req.session.user;
    req.session.save();
    return res.redirect('/');
  },
  getOwnInformation: function(req,res) {
    let dealerArr = [];
    let groupArr = [];
    let areaArr = [];

    let user = req.session.userinfo;


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

    Ts_dealer.find().then(function (dealer) {
      for (var i = 0; i < dealer.length; i++) {
        dealerArr[dealer[i]['dealer_id']] = dealer[i]['dealer_name'];
      }

      return dealerArr;
    }).spread(function(){

      Ts_user.find({user_name: user['user_name']}).exec(function (err, result){
        if (err) {
          return res.serverError(err);
        }

        for (var i = 0; i < result.length; i++) {
          result[i]['areaName'] = areaArr[result[i]['barea_id']] ? (areaArr[result[i]['sarea_id']] ? areaArr[result[i]['barea_id']] + ',' + areaArr[result[i]['sarea_id']] : areaArr[result[i]['barea_id']])  : '无';
          result[i]['levelArr']= result[i]['sarea_id'] ? [result[i]['barea_id'], result[i]['sarea_id']] : [result[i]['barea_id']];
          result[i]['groupName'] = groupArr[result[i]['group_id']] ? groupArr[result[i]['group_id']] : '无';

          if (dealerArr[result[i]['dealer_id']] != null && dealerArr[result[i]['dealer_id']]!= undefined ) {
            result[i]['dealerName'] = dealerArr[result[i]['dealer_id']];
          }
          else{
            result[i]['dealerName'] = '无';
          }
        }
        return res.json(result);
      });

    });
  },
  delete :function(req,res){
    Ts_user.destroy({
      user_id: req.param('user_id')
    }).exec(function (err){
      if (err) {
        return res.negotiate(err);
      }
      let user = req.session.userinfo;
      Ts_user_oplog.create({
        user_id: user['user_id'],
        action: 'user-delete',
        info: 'user_id:' + req.param('user_id'),
        op_time: new Date(),
        op_ip: req.ips[0]
      }).exec(function(err, result){
        if (err) { return res.serverError(err); }
        return res.ok();
      })
    });
  },

  search:function(req,res){
    Ts_user.find({user_role:req.param('user_role')}).exec(function (err, result){
      if (err) {
        return res.serverError(err);
      }
      return res.json(result);
    });
  },

  getAllData: function(req,res){
    let user = req.session.userinfo;

    let dealerArr = [];
    let groupArr = [];
    let areaArr = [];

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

    Ts_dealer.find().then(function (dealer) {
      for (var i = 0; i < dealer.length; i++) {
        dealerArr[dealer[i]['dealer_id']] = dealer[i]['dealer_name'];
      }

      return dealerArr;
    }).spread(function(){

      let condtion = {
        sort:'user_id DESC'
      };

      if (req.param('user_role')) {
        condtion['user_role'] = req.param('user_role');
      }

      Ts_user.find(condtion).exec(function (err, result){
        if (err) {
          return res.serverError(err);
        }

         for (var i = 0; i < result.length; i++) {
          result[i]['areaName'] = areaArr[result[i]['barea_id']] ? (areaArr[result[i]['sarea_id']] ? areaArr[result[i]['barea_id']] + ',' + areaArr[result[i]['sarea_id']] : areaArr[result[i]['barea_id']])  : '无';
          result[i]['levelArr']= result[i]['sarea_id'] ? [result[i]['barea_id'], result[i]['sarea_id']] : [result[i]['barea_id']];
          result[i]['groupName'] = groupArr[result[i]['group_id']] ? groupArr[result[i]['group_id']] : '无';

          if (dealerArr[result[i]['dealer_id']] != null && dealerArr[result[i]['dealer_id']]!= undefined ) {
            result[i]['dealerName'] = dealerArr[result[i]['dealer_id']];
          }
          else{
            result[i]['dealerName'] = '无';
          }
        }
        return res.json(result);
      });
    });
  },
  update: function(req,res) {

    let date = new Date();
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = localTime - localOffset;
    let localDate = new Date(utc);

    Ts_user.find({
      user_id:req.param('user_id')
    }).exec(function(err, result){
      if (err) {
        return res.json({
          code: '信息修改失败，请重新尝试!'
        });
      }
      Ts_user.update(
        {user_id:req.param('user_id')},
        {
          user_role: req.param('user_role') != undefined ? req.param('user_role') : 0,
          barea_id: req.param('barea_id') != undefined ? req.param('barea_id') : 0,
          sarea_id: req.param('sarea_id') != undefined ? req.param('sarea_id') : 0,
          dealer_id: req.param('dealer_id') != undefined ? req.param('dealer_id') : 0,
          group_id: req.param('group_id') != undefined ? req.param('group_id') : 0,
          realname: req.param('realname') != undefined ? req.param('realname') : '',
          telephone: req.param('telephone') != undefined ? req.param('telephone') : '',
          mobile: req.param('mobile') != undefined ? req.param('mobile') : '',
          qq: req.param('qq') != undefined ? req.param('qq') : '',
          wechat: req.param('wechat') != undefined ? req.param('wechat') : '',
          upd_date: date,
          create_user: req.param('create_user') != undefined ? req.param('create_user') : 0
        }).exec(function (err,updated) {
        if (err) {
          return res.serverError(err);
        }else{
          let user = req.session.userinfo;
          Ts_user_oplog.create({
            user_id: user['user_id'],
            action: 'user-update',
            info: 'role:' + req.param('user_role') + '|' + 'name:' + req.param('user_name') + '|' + 'pass:' + req.param('user_pass') + '|' + 'barea_id:' + req.param('barea_id') + '|' + 'sarea_id:' + req.param('sarea_id')  + '|' + 'dealer_id:' + req.param('dealer_id')  + '|' + 'group_id:' + req.param('group_id')  + '|' + 'realname:' + req.param('realname')  + '|' + 'telephone:' + req.param('telephone')  + '|' + 'mobile:' + req.param('mobile')  + '|' + 'qq:' + req.param('qq')  + '|' + 'wechat:' + req.param('wechat'),
            op_time: new Date(),
            op_ip: req.ips[0]
          }).exec(function(err, result){
            if (err) {
              return res.json({
                code: '信息修改失败，请重新尝试!'
              });
            }
            return res.json({
              code: '信息修改成功'
            });
          })
        }
      });
    })
  },
  updateUserRole: function(req,res) {
    let date = new Date();
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = localTime - localOffset;
    let localDate = new Date(utc);
    Ts_user.update(
      {user_id: req.param('user_id')},
      {
        user_role: req.param('user_role'),
        upd_date: localDate
      }).exec(function (err, updated) {
      if (err) {
        return res.serverError(err);
      } else {
        let user = req.session.userinfo;
        Ts_user_oplog.create({
          user_id: user['user_id'],
          action: 'user-updateRole',
          info: 'user_id:' + req.param('user_id') + '|' + 'user_role:' + req.param('user_role'),
          op_time: new Date(),
          op_ip: req.ips[0]
        }).exec(function(err, result){
          if (err) { return res.serverError(err); }
          return res.ok();
        })
      }
    });
  },
  updatePassword: function(req,res) {

    let date = new Date();

    let user = req.session.userinfo;

    if (user['user_pass'] == req.param('user_pass')) {
      return res.json({
        err: '新密码不能和旧密码相同',
        code: 1
      })
    }

    if (user['user_pass'] != req.param('oldpwd')) {
      return res.json({
        err: '旧密码输入错误',
        code: 2
      })
    }

    Ts_user.update({
        user_name: user['user_name']
      },
      {
        user_pass: req.param('user_pass'),
        upd_date: date
      }).exec(function (err, update) {
      if (err) {
        return res.serverError(err);
      } else {
        let user = req.session.userinfo;
        Ts_user_oplog.create({
          user_id: user['user_id'],
          action: 'user-updatePassword',
          info: 'name:' + req.param('user_name') + '|' + 'user_pass:' + req.param('user_pass'),
          op_time: new Date(),
          op_ip: req.ips[0]
        }).exec(function(err, result){
          if (err) { return res.serverError(err); }
          return res.json({
            password: req.param('user_pass'),
            code: '密码修改成功'
          });
        })
      }
    });
  },
  resetPassword: function(req,res) {

    let date = new Date();
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = localTime - localOffset;
    let localDate = new Date(utc);

    let newPassword = GetRandomNum(10000000,99999999);
    Ts_user.update({
        user_id: req.param('user_id')
      },
      {
        user_pass: newPassword.toString(),
        upd_date: localDate
      }).exec(function (err, update) {
      if (err) {
        return res.serverError(err);
      } else {
        let user = req.session.userinfo;
        Ts_user_oplog.create({
          user_id: user['user_id'],
          action: 'user-resetPassword',
          info: 'id:' + req.param('user_id') + '|' + 'user_pass:' + newPassword.toString(),
          op_time: new Date(),
          op_ip: req.ips[0]
        }).exec(function(err, result){
          if (err) { return res.serverError(err); }
          return res.json({
            password: newPassword.toString()
          });
        })
      }
    });
  }
};

