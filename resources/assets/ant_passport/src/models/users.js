import { hashHistory } from 'dva/router';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { query, create, remvoe, update, deny } from '../services/users';

export default {

  namespace: 'users',

  state: {
    list: [],
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
    deleteSuccess() {},
    updateSuccess() {},
    updateQueryKey(state, action) {
      return { ...state, ...action.payload };
    },
    denySuccess(state, action) {
      const { id } = action.payload;
      const newList = state.list.map(user => {
        if (user.id === id) {
          user.status = 2;
          return { ...user };
        }
        return user;
      });
      return { ...state, list: newList };
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      });
      const { data } = yield call(query, parse(payload));
      if (data && data.err_msg == 'SUCCESS') {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.list,
            total: data.data.total,
            current: data.data.current,
          },
        });
      }
    },
    *create({ payload }, { call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const { data } = yield call(create, payload);
      if (data && data.success) {
        yield put({
          type: 'createSuccess',
          payload: {
            list: data.data.list,
            total: data.data.total,
            current: data.data.current,
            keyword: '',
          },
        });
      }
    },
    *'delete'() {},
    *update() {},
    *deny({ payload }, { call, put }) {
      // yield put({ type: 'showLoading' });
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload.query },
      });
      const { data } = yield call(deny, parse({id: payload.id, enable: true, }));
      if (data && data.err_msg == 'SUCCESS') {
        yield put({
          type: 'denySuccess',
          payload: {
              id: payload.id,
          },
        })
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp(`/users`).exec(location.pathname);

        if (match) {
          dispatch({
            type: 'query',
            payload: location.query,
          });
        }
      });
    },
  },
}
