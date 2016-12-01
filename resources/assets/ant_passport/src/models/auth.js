import { hashHistory } from 'dva/router';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { query, create, remvoe, update } from '../services/auth';
import { getCookie, getLocalStorage, setLocalStorage } from '../utils/helper';
import { redirectLogin } from '../utils/auth';

export default {

  namespace: 'anth',

  state: {
    name: '',
    mobile: '',
    dingid: '',
    id: null,
    email: null,
    status: '',
  },

  reducers: {
    showLoading(state, action) {
      return { ...state, loading: true };
    },
    hideLoading(state, action) {
      return { ...state, loading: false };
    }

  },

  effects: {
    *query({ payload }, { select, call, put }) {
      const { data } = yield call(query, parse(payload));
      if (data) {
        setLocalStorage('user', data);
      }
    }

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp(`*`).exec(location.pathname);
        if (match && !localStorage.user) {
          dispatch({
            type: 'query',
            payload: {},
          });
        }
      });
    }
  },
}
