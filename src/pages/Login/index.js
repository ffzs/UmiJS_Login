import React, {Component} from 'react'
import styles from "./style.less"

import LoginForm from './components/Login';
import { connect } from 'umi';

const { UserName, Password, Submit } = LoginForm;


export default @connect() class extends Component {

  onSubmit = values => {
    console.log("用户输入：", values);
    this.props.dispatch({ type: "login/login", payload: values });

  };

  render() {
    return (
      <div className={styles.normal}>
        <div style={{'height':'20%'}}> </div>
        <div className={styles.main}>
          {/* logo */}
          <img
            className={styles.logo}
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597756619654&di=614e6457d19facc70fc19d1a870fd65b&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20170805%2F20170805232157_105785d2963bb49429d4e5d92acb0368_7.jpeg"
            alt="冰封王座"/>
          {/* 登录表单 */}
          <LoginForm onSubmit={this.onSubmit}>
            <UserName
              name="username"
              placeholder="admin"
              rules={[{ required: true, message: "请输入用户名" }]}
            />
            <Password
              name="password"
              placeholder="admin"
              rules={[{ required: true, message: "请输入密码" }]}
            />
            <Submit>登录</Submit>
          </LoginForm>
        </div>
      </div>
    )
  }
}


