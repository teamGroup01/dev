import React from 'react';
import { Icon, Card ,Popover} from 'antd'
import styles from './NumberCard.css';

const NumberCard = ({data}) => {
  const content=[
    (<div>
      <p>留店时长3分钟至2小时的客流人次</p>
      <p>(剔除工作人员、短时间到店停留人员以及留店2小时以上人员）</p>
    </div>)
    ,
    (<div>
      <p>留店时长10分钟至2小时同进同出的客流批次 </p>
    </div>)
    ,
    (<div>
      <p>留店时长10分钟至2小时同进同出的客流批次</p>
    </div>)
    ,
    (<div>
      <p>当日二次及以上多次进出、进出间隔时长15分钟以上</p>
      <p>到店停留时长10分钟-2小时的客流批次</p>
    </div>)
    ,
    (<div>
    <p>三个月内非当日二次及以上到店且停留时长</p>
    <p>10分钟至2小时的客流批次</p>
  </div>),
  ];
  return (
    <div className={styles.body}>
      <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.content}>
          <div className={styles.title}>
            <div className={styles.title_top}>展厅流量&nbsp;
              <Popover content={content[1]}>

                <Icon type="question-circle-o" />
              </Popover>

            </div>
          </div>
          <div className={styles.number}>
            <div>
              {data.group_total}
            </div>
            <div className={styles.number_danwei}>批次</div>
          </div>
        </div>
      </Card>
      <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.content}>
          <div className={styles.title}>
            <div className={styles.title_top}>当日二次到店潜客&nbsp;
              <Popover content={content[3]}>

                <Icon type="question-circle-o" />
              </Popover>
            </div>
          </div>
          <div className={styles.number}>
            <div>
              {data.group_repeat}
            </div>
            <div className={styles.number_danwei}>批次</div>
          </div>
        </div>
      </Card>
      <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.content}>
          <div className={styles.title}>
            <div className={styles.title_top}>三个月内二次到店潜客&nbsp;
              <Popover content={content[4]}>

                <Icon type="question-circle-o" />
              </Popover>
            </div>
          </div>
          <div className={styles.number}>
            <div>
              {data.group_old}
            </div>
            <div className={styles.number_danwei}>批次</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

NumberCard.propTypes = {
};

export default NumberCard;
