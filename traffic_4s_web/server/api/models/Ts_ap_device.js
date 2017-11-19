/**
 * Ts_ap_device.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  migrate: "safe",
  tableName: 'ts_ap_device',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    ap_id: {
      type: 'serial',
      required: false,
      primaryKey: true
    },
    ap_brand: {
      type: 'text',
      required: false,
    },
    ap_model: {
      type: 'text',
      required: false,
      defaultsTo: ''

    },
    ap_mac: {
      type: 'text',
      required: false,
      defaultsTo: ''

    },
    dealer_id: {
      type: 'int',
      required: false,
      defaultsTo: 0

    },
    display_flag: {
      type: 'int',
      required: false,
      defaultsTo: 1
    },
    install_desc: {
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
    },
    cnt: {
      type: 'text',
      required: false
    },
    install_date: {
      type: 'date',
      required: false
    },
    last_date: {
      type: 'date',
      required: false
    },
    err_cnt: {
      type: 'text',
      required: false
    },
    last_err_date: {
      type: 'date'
    }
  }
};

