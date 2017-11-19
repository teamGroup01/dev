import './index.css';
import React from 'react';
import dva from 'dva';
import router from './router';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import { message } from 'antd';
import "babel-polyfill";
// 1. Initialize
const app = dva();
const opts={
  loading:{
    global:false,
    models:{
      special:false,
    },
  }
}
// 2. Plugins
app.use(createLoading(opts));

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/main'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
