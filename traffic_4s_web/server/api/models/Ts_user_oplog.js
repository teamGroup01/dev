/**
 * Ts_user_oplog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  migrate: "safe",
  tableName: 'ts_user_oplog',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id: {
      type: 'serial',
      primaryKey: true
    },
    user_id : {
      type: 'int'
    },
    action: {
      type: 'text'
    },
    info: {
      type: 'text'
    },
    op_time: {
      type: 'date'
    },
    op_ip: {
      type: 'text'
    }
  }
};

