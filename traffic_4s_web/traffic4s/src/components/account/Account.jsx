import React from 'react';
import styles from './Account.css';
import Adam from './Adam';
import AffiliateAccount from './AffiliateAccount';

const Account = ({models}) => {
  const{loading,userDetail,addUser,searchUser,changeUserInfo,resetPwd,role,deleteUser,changePwd,changeHost}=models;
  return (
      <div className={styles.body}>
        <div className={styles.adam}>
        <Adam data={userDetail} models={models}/>
        </div>
        <div className={styles.affiliate}>
        <AffiliateAccount models={models}/>
        </div>
        </div>
  );
};

Account.propTypes = {

};

export default Account;
