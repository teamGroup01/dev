/**
 * Apdata_cnt_day.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  migrate: "safe",
  tableName: 'apdata_cnt_day',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    cnt_date: {
      type: 'int',
      required: false,
      primaryKey: true
    },
    dealer_id: {
      type: 'int',
      required:false,
      defaultsTo: 0
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
    },
    custom_index: {
      type: 'int',
      required: false,
      defaultsTo: 0
    },
    custom_index_percent: {
      type: 'float',
      required: false,
      defaultsTo: 0
    },
    custom_index_percent_avg_7: {
      type: 'float',
      required: false,
      defaultsTo: 0
    },
    custom_index_total: {
      type: 'int',
      required: false,
      defaultsTo: 0
    },
    custom_index_total_percent: {
      type: 'float',
      required: false,
      defaultsTo: 0
    }
  }
};

