import React, { Component } from 'react';
import styles from './Header.css';
import ChangeInfomation from '../account/moudle/ChangeInfomation.jsx';
import ChangePwd from '../account/moudle/ChangePwd.jsx';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;



class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data,changePwd,queryGroup,queryNativeGroup,group,area,dealer,querynativeDealer,queryDealer,changeUserInfo,changeHost}=this.props.model;
    //console.log(group);
    return (
      <div className={styles.h0}>
        <div className={styles.left}>
          <div className={styles.logo}>
          </div>
          <div className={styles.h1}>
            <p className={styles.h1t}>沃尔沃汽车展厅流量分析</p>
          </div>
        </div>
        <div className={styles.right}>
          <Menu
            mode="horizontal"
          >
            <Menu.Item key="setting:4" disabled={true}>
              <span><Icon type="user" />{data[0].user_name}&nbsp;{data[0].user_role}</span>
            </Menu.Item>

            <Menu.Item key="setting:3">
              <ChangePwd changepwd={changePwd} data={data[0]}/>
            </Menu.Item>

            <Menu.Item key="setting:1">
              <ChangeInfomation
                records={data[0]}
                querygroup={queryGroup}
                querynativegroup={queryNativeGroup}
                groupdata={this.props.model.group}
                areadata={area}
                dealerid={dealer}
                nativeDealer={querynativeDealer}
                querdyealer={queryDealer}
                onchangeUserInfo={changeUserInfo}
                onchangeHost={changeHost}
                type='2'
              />
            </Menu.Item>

            <Menu.Item key="setting:2"><div><a href="Ts_user/logout">退出</a></div></Menu.Item>

          </Menu>
        </div>
      </div>
    );
  }
};

Header.propTypes = {
};

export default Header;
