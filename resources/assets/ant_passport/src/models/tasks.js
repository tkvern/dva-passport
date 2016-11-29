import { hashHistory } from 'dva/router';
import { query, create, remvoe, update } from '../services/tasks';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';

export default {
  
  namespace: 'tasks',

  state: {
    list: [],
    field: '',
    keyword: '',
    expand: false,
    total: null,
    loading: false,
    current: 1,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  reducers: {
    showLoading(state, action) {
      return { ...state, loading: true };
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal(state, action) {
      return { ...state, modalVisible: false };
    },
    collapseExpand(state, action) {
      return { ...state, ...action.payload };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    createSuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    deleteSuccess(){},
    updateSuccess(){},
    updateQueryKey(state, action) {
      return { ...state, ...action.payload };
    },
  },

  effects: {
    *query({payload}, { select, call, put }) {
      yield put({ type: 'showLoading' });
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, field: '', keyword: '', ...payload },
      });

      const { data } = yield call(query, parse(payload));
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current,
          }
        });
      }
    },
    *create({ payload }, { call, put }){
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const { data } = yield call(create, payload);
      if(data && data.success) {
        yield put({
          type: 'createSuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current,
            field: '',
            keyword: '',
          },
        });
      }
    },
    *'delete'(){},
    *update(){},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        // const match = pathToRegexp(`/tasks`).exec(pathname);

        if(location.pathname === '/tasks') {
          dispatch({
            type: 'query',
            payload: location.query,
          });
        }
      });
    },
  },
}
