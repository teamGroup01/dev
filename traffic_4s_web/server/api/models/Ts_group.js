/**
 * Ts_group.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  migrate: "safe",
  tableName: 'ts_group',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    group_id: {
      typee: 'serial',
      required: false,
      primaryKey: true
    },
    group_name: {
      type: 'text',
      required: false
    }
  }
};

