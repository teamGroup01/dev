/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  migrate: "safe",
  tableName: 'ts_user',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {

    user_id : {
      type: 'serial',
      required: false,
      primaryKey: true,
    },
    user_role: {
      type: 'int',
      required:true,
    },
    user_name: {
      type: 'text',
      required: true,
    },
    user_pass: {
      type: 'text',
      required:false,
      defaultsTo: ''
    },
    brand_id: {
      type: 'int',
      required: false,
      defaultsTo: 0
    },
    barea_id: {
      //type: 'int',
      required: false,
      defaultsTo: 0
    },
    sarea_id: {
      type: 'int',
      required: false,
      defaultsTo: 0
    },
    dealer_id: {
      type: 'int',
      required: false,
      defaultsTo: 0
    },
    group_id: {
      type: 'int',
      defaultsTo: 0
    },
    realname: {
      type: 'text',
      required: false,
      defaultsTo: ''
    },
    telephone: {
      type: 'text',
      required: false,
      defaultsTo: ''
    },
    mobile: {
      type: 'text',
      required: false,
      defaultsTo: ''
    },
    qq: {
      type: 'text',
      required: false,
      defaultsTo: ''
    },
    wechat: {
      type: 'text',
      required: false,
      defaultsTo: ''
    },
    create_user: {
      type: 'int',
      required: false,
      defaultsTo: 0
    },
    crt_date: {
      type: 'datetime',
      required: false,
    },
    upd_date: {
      type: 'datetime',
      required: false,
    }
  }
};

