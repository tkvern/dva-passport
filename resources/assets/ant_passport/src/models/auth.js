import { parse } from 'qs';
import { message } from 'antd';
import { query, update, password } from '../services/auth';
import { getLocalStorage, setLocalStorage } from '../utils/helper';

export default {
  namespace: 'auth',
  state: {
    user: {},
    isLogined: false,
    currentMenu: [],
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    activeMenu(state, action) {
      return { ...state, ...action.payload };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, isLogined: true };
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { data } = yield call(query, parse(payload));
      if (data && data.err_msg === 'SUCCESS') {
        setLocalStorage('user', data.data);
        yield put({
          type: 'querySuccess',
          payload: {
            user: data.data,
          },
        });
      }
    },
    *update({ payload }, { call, put }) {
      const { data } = yield call(update, payload);
      if (data && data.err_msg === 'SUCCESS') {
        setLocalStorage('user', data.data);
        yield put({
          type: 'querySuccess',
          payload: {
            user: data.data,
          },
        });
        message.success('用户信息修改成功!');
      } else {
        message.error(data.err_msg);
      }
    },
    *password({ payload }, { call }) {
      const { data } = yield call(password, payload);
      if (data && data.err_msg === 'SUCCESS') {
        message.success('密码修改成功!');
      } else {
        message.error(data.err_msg);
      }
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      const data = getLocalStorage('user');
      if (!data) {
        dispatch({
          type: 'query',
          payload: {},
        });
      } else {
        dispatch({
          type: 'querySuccess',
          payload: {
            user: data,
          },
        });
      }
    },
  },
}
