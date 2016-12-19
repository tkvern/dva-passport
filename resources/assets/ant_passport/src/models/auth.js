import { hashHistory } from 'dva/router';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { query, update, password } from '../services/auth';
import { getLocalStorage, setLocalStorage } from '../utils/helper';

import { message } from 'antd';

export default {
  namespace: 'auth',
  state: {
    user: {},
    isLogined: false,
    currentMenu: [],
  },
  reducers: {
    showLoading(state, action) {
      return { ...state, loading: true };
    },
    hideLoading(state, action) {
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
    *query({ payload }, { select, call, put }) {
      const { data } = yield call(query, parse(payload));

      if (data && data.err_msg === 'SUCCESS') {
        setLocalStorage('user', data);
        yield put({
          type: 'querySuccess',
          payload: {
            user: data.data,
          },
        });
      }
    },
    *update({ payload }, { call, put }) {
      // yield put({ type: 'showLoading' });
      const { data } = yield call(update, payload);
      if (data && data.err_msg === 'SUCCESS') {
        // debugger
        // yield put({
        //   type: 'grantSuccess',
        //   payload: {
        //     id,
        //     permissions: data.data,
        //   },
        // })
      }
    },
    *password({ payload }, { call, put }) {
      // yield put({ type: 'showLoading' });
      const { data } = yield call(password, payload);
      if (data && data.err_msg === 'SUCCESS') {
        message.info('This is a normal message');
        // debugger
        // yield put({
        //   type: 'grantSuccess',
        //   payload: {
        //     id,
        //     permissions: data.data,
        //   },
        // })
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
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
            user: data.data,
          },
        });
      }
    },
  },
}
