import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import { query, create, remove, update } from '../services/permissions';
import { setLocalStorage } from '../utils/helper';

export default {
  namespace: 'permissions',
  state: {
    list: [],
    keyword: '',
    total: null,
    loading: false,
    current: 1,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    createSuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    deleteSuccess(state, action) {
      const id = action.payload;
      const newList = state.list.filter(permission => permission.id !== id);
      return { ...state, list: newList, loading: false };
    },
    updateSuccess(state, action) {
      const updateRole = action.payload;
      const newList = state.list.map((permission) => {
        if (permission.id === updateRole.id) {
          return { ...permission, ...updateRole };
        }
        return permission;
      });
      return { ...state, list: newList, loading: false };
    },
    updateQueryKey(state, action) {
      return { ...state, ...action.payload };
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
      const { data } = yield call(create, payload);
      if (data && data.err_msg === 'SUCCESS') {
        yield put({ type: 'hideModal' });
        yield put({ type: 'showLoading' });
        yield put({
          type: 'query',
        });
        localStorage.removeItem('permissions');
        message.success('创建成功!');
      } else {
        message.error(`创建失败! ${data.err_msg}`);
      }
    },
    *'delete'({ payload }, { call, put }) {
      const { data } = yield call(remove, { id: payload });
      if (data && data.err_msg === 'SUCCESS') {
        yield put({ type: 'showLoading' });
        yield put({
          type: 'deleteSuccess',
          payload,
        });
        localStorage.removeItem('permissions');
        message.success('删除成功!');
      } else {
        message.error(`删除失败! ${data.err_msg}`);
      }
    },
    *update({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const id = yield select(({ permissions }) => permissions.currentItem.id);
      const newRole = { ...payload, id };
      const { data } = yield call(update, newRole);
      if (data && data.err_msg === 'SUCCESS') {
        yield put({
          type: 'updateSuccess',
          payload: newRole,
        });
        localStorage.removeItem('permissions');
        message.success('更新成功!');
      }
    },
    *updateCache({ payload }, { call, put }) {
      const { data } = yield call(query, parse({ ...payload, page_size: 10000 }));
      if (data && data.err_msg === 'SUCCESS') {
        setLocalStorage('permissions', data.data.list);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/permissions').exec(location.pathname);
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
