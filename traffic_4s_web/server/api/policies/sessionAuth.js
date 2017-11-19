/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */


module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  //if (req.session.authenticated) {
  //  return next();
  //}

  let path = req.url;
  if (path) {
    path = path.split('?')[0];
  }
  if (path === '/') {
    if (req.session.token) {
      sails.log(req.session.token);
      return res.redirect('/main');
    }
    return next();
  }else {
    if (req.session.token) {
      return next();
    }
    else {
      if (req.xhr) return res.json({"code": -1, "message": "请重新登录~"});
      return res.redirect('/');
    }
  }
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`);
};
