/**
 * EncryptUtils.js
 *
 * @description: encrypt tool. includes md5 function.
 *
 * @author: Ziv
 */
const crypto = require('crypto');

module.exports = {
  md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
  }
};