import styles from './index.less';
import React from 'react';
import { Button } from 'antd';
import {connect} from 'umi';

function BasicLayout(props) {

  const logout = () => {
    props.dispatch({
      type: 'login/logout',
    });
  };

  return (
    <div className={styles.main}>
      <div>
        <h1 className={styles.title}>Yay! Welcome to umi!</h1>
        {props.children}
        <Button onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default connect()(BasicLayout);
