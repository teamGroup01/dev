import React, { Component } from 'react';
import styles from './Adam.css';
import ChangePwd from './moudle/ChangePwd';
import ChangeInfomation from './moudle/ChangeInfomation';

class Adam extends Component {

  constructor(props) {
    super(props);

  }
  fTime = (adate)=> {
    let date=new Date(adate);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h=h<10?('0'+h):h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    //return y + '-' + m + '-' + d+' '+h+':'+minute;
    let miao=date.getSeconds();
    miao=miao<10?('0'+miao):miao;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+miao;
  };
  render() {
  const {data}=this.props.data;
  const {changePwd}=this.props.models;

    return (
      <div className={styles.body}>
        <div className={styles.title}>
          <div className={styles.adam}>
            <h2 >账户信息</h2>
          </div>
        <div className={styles.rightlable}>


        </div>
        </div>
        <div className={styles.adamcontent}>

          <div className={styles.adamitem}>
            <div className={styles.adaleftcontent1}>
              <div className={styles.adamleftitem}>用户名:</div>
              <div className={styles.adamleftitem}>用户角色:</div>
            </div>
            <div>
              <div className={styles.adarightcontent1}>
                <div className={styles.adamleftitem}>{this.props.data.user_name}</div>
                <div className={styles.adamleftitem}>{this.props.data.user_role}</div>
              </div>
            </div>
          </div>


          <div className={styles.adamitem}>
            <div className={styles.adaleftcontent2}>
              <div className={styles.adamleftitem}>所属区域:</div>
              <div className={styles.adamleftitem}>所属集团:</div>
              <div className={styles.adamleftitem}>所属经销商:</div>
            </div>
            <div>
              <div className={styles.adarightcontent2}>
                <div className={styles.adamleftitem}>{this.props.data.areaName}</div>
                <div className={styles.adamleftitem}>{this.props.data.groupName}</div>
                <div className={styles.adamleftitem}>{this.props.data.dealerName}</div>
              </div>
            </div>
          </div>





          <div className={styles.adamitem}>
            <div className={styles.adaleftcontent4}>
              <div className={styles.adamleftitem}>创建时间:</div>
              <div className={styles.adamleftitem}>修改时间:</div>
            </div>
            <div>
              <div className={styles.adarightcontent4}>
                <div className={styles.adamleftitem}>{this.props.data.crt_date?this.fTime(this.props.data.crt_date):'2017-06-12 18:14:11'}</div>
                <div className={styles.adamleftitem}>{this.props.data.upd_date?this.fTime(this.props.data.upd_date):'2017-06-12 18:14:11'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
Adam.propTypes = {
};
export default Adam;
