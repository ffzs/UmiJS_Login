import { stringify } from 'querystring';
import { history } from 'umi';
import { accountLogin, getPageQuery } from '../services/login';

const Model = {
  namespace: 'login',   // 命名空间
  state: {},   // store 数据

  effects: {    // 副作用 *的是异步方法
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);

      if (response.code === 200) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();

        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        redirect = redirect === 'login'? '/':redirect;
        history.replace(redirect || '/');
      }
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
      // 不是login界面的话跳转到login界面
      if (window.location.pathname !== '/login') {
        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href
          }),
        });
      }
    },
  },

  reducers: {  // effect获取数据处理方法
    changeLoginStatus(state, { payload }) {
      localStorage.setItem("token", payload.data.token);
      localStorage.setItem("roles", payload.data.auth);
      console.log(`login, ${payload.data.auth}`);
      return { ...state};
    },
  },
};
export default Model;
