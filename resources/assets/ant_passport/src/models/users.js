import { hashHistory } from 'dva/router';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { query, updateSelf, update, deny, grant, userRoles } from '../services/users';
import { getLocalStorage, setLocalStorage } from '../utils/helper';
import { message } from 'antd';

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
    modalGrantVisible: false,
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
    showModalGrant(state, action) {
      return { ...state, ...action.payload, modalGrantVisible: true };
    },
    hideModalGrant(state, action) {
      return { ...state, modalGrantVisible: false };
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
      const { id, enable } = action.payload;
      const newList = state.list.map((user) => {
        if (user.id === id) {
          user.status = enable ? 2 : 1;
          return { ...user };
        }
        return user;
      });
      return { ...state, list: newList, loading: false };
    },
    grantSuccess(state, action) {
      const grantUser = action.payload;
      const newList = state.list.map((user) => {
        if (user.id === grantUser.id) {
          user.roles = grantUser.roles;
          return { ...user };
        }
        return user;
      });
      return { ...state, ...action.payload, loading: false };
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      });
      const { data } = yield call(query, parse({ ...payload, with: 'roles' }));
      if (data && data.err_msg === 'SUCCESS') {
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
      const { data } = yield call(deny, parse(payload));
      if (data && data.err_msg === 'SUCCESS') {
        yield put({ type: 'showLoading' });
        yield put({
          type: 'denySuccess',
          payload,
        });
        message.success(`操作成功!`);
      } else {
        message.error(`操作失败! ${data.err_msg}`);
      }
    },
    *grant({ payload }, { select, call, put }) {
      yield put({ type: 'hideModalGrant' });
      yield put({ type: 'showLoading' });
      const id = yield select(({ users }) => users.currentItem.id);
      const newUser = { ...payload, id }
      const { data } = yield call(grant, newUser);
      if (data && data.err_msg === 'SUCCESS') {
        yield put({
          type: 'grantSuccess',
          payload: {
            id,
            roles: data.data,
          },
        });
        message.success(`授权成功!`);
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/users').exec(location.pathname);
        if (match) {
          const data = getLocalStorage('roles');
          if (!data) {
            dispatch({
              type: 'roles/updateCache',
            });
          }
          dispatch({
            type: 'query',
            payload: location.query,
          });
        }
      });
    },
  },
}
