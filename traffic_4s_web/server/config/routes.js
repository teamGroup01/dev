/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //'/': {
  //  view: 'index/index'
  //},
  '/': {
    controller: 'IndexController',
    action: 'index'
  },
  '/main': {
    controller: 'IndexController',
    action: 'main'
  },
  'post /login':{
    controller: 'Ts_userController',
    action: 'login'
  },
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  '/addUser': {
    controller: 'Ts_userController',
    action: 'add'
  },
  '/searchUser': {
    controller: 'Ts_userController',
    action: 'search'
  },
  '/deleteUser': {
    controller: 'Ts_userController',
    action: 'delete'
  },
  '/getAllUser': {
    controller: 'Ts_userController',
    action: 'getAllData'
  },
  '/updateUser': {
    controller: 'Ts_userController',
    action: 'update'
  },
  '/addDealer': {
    controller: 'Ts_dealerController',
    action: 'add'
  },
  '/searchDealer': {
    controller: 'Ts_dealerController',
    action: 'search'
  },
  '/deleteDealer': {
    controller: 'Ts_dealerController',
    action: 'delete'
  },
  '/getAllDealer': {
    controller: 'Ts_dealerController',
    action: 'getAllData'
  },
  '/updateDealer': {
    controller: 'Ts_dealerController',
    action: 'update'
  },
  '/addAP': {
    controller: 'Ts_ap_deviceController',
    action: 'add'
  },
  '/searchAP': {
    controller: 'Ts_ap_deviceController',
    action: 'search'
  },
  '/deleteAP': {
    controller: 'Ts_ap_deviceController',
    action: 'delete'
  },
  '/getAllAP': {
    controller: 'Ts_ap_deviceController',
    action: 'getAllData'
  },
  '/updateAP': {
    controller: 'Ts_ap_deviceController',
    action: 'update'
  },
  '/getAPInformation': {
    controller: 'Ts_ap_deviceController',
    action: 'getAPInformation'
  },
  '/getAreaData': {
    controller: 'Ts_areaController',
    action: 'getAreaData'
  }
};
