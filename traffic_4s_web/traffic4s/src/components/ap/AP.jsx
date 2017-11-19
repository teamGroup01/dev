import React from 'react';
import styles from './AP.css'
import APCard from './APCard'
import APTable from './APTable'

const AP = ({models}) => {
  let {title,queryonline,queryoutline,fetchDevice,queryprevious}=models;
  let queryData={queryonline,queryoutline,fetchDevice,queryprevious}
  return (
      <div className={styles.body}>
        <div className={styles.content}>
        <div className={styles.ap_title}>
          <h2>AP设备管理</h2>
        </div>
        <div className={styles.ap_brand}>
        <APCard querydata={queryData}number={title}/>
        </div>
        </div>
        <div className={styles.ap_table}>
        <APTable models={models}/>
        </div>
      </div>
  );
};

AP.propTypes = {
};

export default AP;
