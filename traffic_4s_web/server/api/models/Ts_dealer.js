/**
 * Ts_dealer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  migrate: "safe",
  tableName: 'ts_dealer',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    dealer_id: {
      type: 'serial',
      required: false,
      primaryKey: true
    },
    dealer_name: {
      type: 'text',
      required: false,
    },
    dealer_code: {
      type: 'text',
      required: false,
    },
    brand_id: {
      type: 'int',
      required: false,
      defaultsTo: 0
    },
    barea_id: {
      required: false,
      defaultsTo: 0
    },
    sarea_id: {
      type: 'int',
      required: false,
      defaultsTo: 0
    },
    group_id: {
      type: 'int',
      required: false,
      defaultsTo: 0
    },
    province: {
      type: 'int',
      required: false,
    },
    city: {
      type: 'text',
      required: false,
    },
    address: {
      type: 'text',
      required: false,
    },
    //latitude: {
    //  type: numeric(32,20),
    //  required: true,
    //},
    //longitude: {
    //  type: numeric(32,20),
    //  required: true,
    //},
    plan_path: {
      type: 'text',
      required: false,
      defaultsTo: ''
    },
    crt_date: {
      type: 'date',
      required: false,
    },
    upd_date: {
      type: 'date',
      required: false,
    }
  }
};

