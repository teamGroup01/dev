/**
 * Ts_area.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  migrate: "safe",
  tableName: 'ts_area',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id: {
      type: 'serial',
      required: false,
      primaryKey: true
    },
    level: {
      type: 'int',
      required: true
    },
    pid: {
      type: 'int',
      required: true
    },
    name: {
      type: 'text',
      required: true
    }
  }
};

