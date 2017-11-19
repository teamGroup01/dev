import React from 'react';
import { Icon, Card ,Popover} from 'antd'
import styles from './APCard.css';

const APCard = ({number,querydata}) => {
  const {queryonline,queryoutline,queryprevious,fetchDevice}=querydata;
  function fTime  (adate) {
    return Math.floor(adate * 100);
  }
  function alldevice  () {
    fetchDevice();
  }
  function onlinedevice  () {
    queryonline();
  }
  function outlinedevice  () {
    queryoutline();
  }
  function previousdevice () {
    queryprevious();
  }
  return (
    <div className={styles.body}>

      <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.content}>

        <div className={styles.title}>
          <div className={styles.title_top}>AP总数
          </div>
        </div>
        <div className={styles.number}>
          <div>
            <a onClick={alldevice}>{number.ap_total}</a>
          </div>
          <div className={styles.number_danwei}>台</div>
        </div>
        </div>

      </Card>

      <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.content}>

        <div className={styles.title}>
            <div className={styles.title_top}>在线AP数量

            </div>
          </div>
          <div className={styles.number}>
            <div>
              <a onClick={onlinedevice}> {number.ap_online}</a>
            </div>
            <div className={styles.number_danwei}>台</div>
          </div>
        </div>

      </Card>

      <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.content}>

        <div className={styles.title}>
            <div className={styles.title_top}>未响应AP数量
                       </div>
          </div>
          <div className={styles.number}>
            <div>
              <a onClick={outlinedevice}>{number.ap_noresponse}</a>
            </div>
            <div className={styles.number_danwei}>台</div>
          </div>
        </div>

      </Card>

      <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.content}>

        <div className={styles.title}>
            <div className={styles.title_top}>预警AP数量
            </div>
          </div>
          <div className={styles.number}>
            <div>
              <a onClick={previousdevice}>{number.ap_previous}</a>
            </div>
            <div className={styles.number_danwei}>台</div>
          </div>
        </div>

      </Card>


      <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.content}>

        <div className={styles.title}>
            <div className={styles.title_top}>在线率
            </div>
          </div>
          <div className={styles.number}>
            <div>
              {fTime(number.ap_onlineRate)}
            </div>
            <div className={styles.number_danwei}>%</div>
          </div>
        </div>

      </Card>

    </div>
  );
};

APCard.propTypes = {
};

export default APCard;
