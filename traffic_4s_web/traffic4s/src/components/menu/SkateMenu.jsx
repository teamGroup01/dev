/**
 * Created by apple on 2017/5/10.
 */
import { Link } from 'dva/router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Tooltip } from 'antd';
import styles from './SkateMenu.css'
import React from 'react';

const SubMenu = Menu.SubMenu;

function SkateMenu ({location,user_role}) {
  const array=['超级管理员','总部','大区经理','小区经理','经销商总经理','集团账号'];
  array.map((item,index)=>{
    if (item==user_role){
      user_role=index+1;
    }
  });
  //console.log(user_role);
  return (
          <Menu
            mode="inline"
            defaultSelectedKeys={['/home']}
            selectedKeys={[location.pathname !== '/' ? location.pathname : '/home']}
            style={{ height: '100%', width: 240 }}
          >
              <Menu.Item key="/home">
                <Link to="/" className={styles.menu}><Icon type="home" />首页</Link>
              </Menu.Item>
              <Menu.Item key="/realpage">
                  <Link to="/realpage" className={styles.menu1}><Icon type="file-text" />实时页面</Link>
              </Menu.Item>
              <Menu.Item key="/trendpage">
              <Link to="/trendpage" className={styles.menu1}><Icon type="line-chart" />按天趋势</Link>
              </Menu.Item>
              <Menu.Item key="/timepage">
                <Link to="/timepage" className={styles.menu1}><Icon type="barcode" />时长分布</Link>
              </Menu.Item>
              {user_role==1? <SubMenu key="sub4" title={<span className={styles.menu1}><Icon type="setting" />管理设置</span>}>
                <Menu.Item key="/accountpage"> <Link to="/accountpage" className={styles.menu2}>账户管理</Link></Menu.Item>
                <Menu.Item key="/dealerpage"><Link to="/dealerpage" className={styles.menu2}>经销商管理</Link></Menu.Item>
                <Menu.Item key="/appage"><Link to="/appage" className={styles.menu2}>AP设备管理</Link></Menu.Item>
              </SubMenu>:""
            }
          </Menu>
  );
}

export default SkateMenu;
