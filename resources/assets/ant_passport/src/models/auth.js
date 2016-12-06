import { hashHistory } from 'dva/router';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { query, create, remvoe, update } from '../services/auth';
import { getCookie, getLocalStorage, setLocalStorage } from '../utils/helper';
import { redirectLogin } from '../utils/auth';

export default {
  namespace: 'auth',
  state: {
    name: '',
    mobile: '',
    dingid: '',
    id: null,
    email: null,
    status: null,
    isadmin: null,
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

      if (data && data.err_msg == 'SUCCESS') {
        setLocalStorage('user', data);
        yield put({
          type: 'querySuccess',
          payload: {
            name: data.data.name,
            mobile: data.data.mobile,
            dingid: data.data.dingid,
            id: data.data.id,
            email: data.data.email,
            status: data.data.status,
            isadmin: data.data.isadmin,
          }
        });
      }
    }
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
            name: data.data.name,
            mobile: data.data.mobile,
            dingid: data.data.dingid,
            id: data.data.id,
            email: data.data.email,
            status: data.data.status,
            isadmin: data.data.isadmin,
          },
        });
      }
    }
  },
}
