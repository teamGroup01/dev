import React from 'react';
import { IndexRoute, Router, Route } from 'dva/router';
import Common from './routes/MainLayout';
import First from './routes/IndexPage';
import Real from './routes/RealData';
import Trend from './routes/TrendChart';
import Account from './routes/AccountPage';
import Dealer from './routes/DealerPage';
import App from './routes/APPage';


const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }) {

  const routes = [{
    path: '/',
    component: Common,
    getIndexRoute (nextState, cb) {
      require.ensure([], require => {
        registerModel(app, require('./models/index'))
        cb(null, { component: require('./routes/IndexPage') })
      }, 'index')
    },
    childRoutes: [
    {
      path: '/realpage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/realdata'));
          cb(null, require('./routes/RealData'));
        }, 'realdata');
      },
    },
    {
      path: '/trendpage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/trend'));
          cb(null, require('./routes/TrendChart'));
        }, 'trend');
      },
    },
      {
        path: '/timepage',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('./models/time'));
            cb(null, require('./routes/TimePage'));
          }, 'time');
        },
      },
    {
      path: '/accountpage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/account'));
          cb(null, require('./routes/AccountPage'));
        }, 'account');
      },
    },
    {
      path: '/dealerpage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/dealer'));
          cb(null, require('./routes/DealerPage'));
        }, 'dealer');
      },
    },
    {
      path: '/appage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/app'));
          cb(null, require('./routes/APPage'));
        }, 'app');
      },
    },
  ]},];
  return <Router history={history} routes={routes} />;
}

export default RouterConfig;




