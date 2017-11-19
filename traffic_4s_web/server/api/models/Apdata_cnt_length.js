/**
 * Apdata_cnt_length.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  migrate: "safe",
  tableName: 'apdata_cnt_length',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    cnt_date: {
      type: 'int',
      required: false,
      primaryKey: true
    },
    range: {
      type: 'int',
      required: false
    },
    dealer_id: {
      type: 'int',
      required:true
    },
    custom_total: {
      type: 'int',
      required: false,
      defaultsTo: 0
    },
    custom_new: {
      type: 'int',
      required: false,
      defaultsTo: 0
    },
    group_total: {
      type: 'int',
      required: false,
      defaultsTo: 0
    },
    group_vip: {
      type: 'int',
      required: false,
      defaultsTo: 0
    },
    group_old: {
      type: 'int',
      required: false,
      defaultsTo: 0
    },
    group_repeat: {
      type: 'int',
      required: false,
      defaultsTo: 0
    },
    length: {
      type: 'bigint',
      required: false,
      defaultsTo: 0
    }
  }
};

