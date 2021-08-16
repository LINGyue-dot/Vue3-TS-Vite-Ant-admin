/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-16 15:26:42
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-16 17:55:44
 * @Description:
 */

import { Action, Mutation } from 'vuex';
import { asyncRoutes } from '../../router/routes';
import { AppRouterMeta } from '../../router/types';
import { filterAsyncRoutes } from '../../utils/auth';
import { StoreModuleType } from '../types';
import { Role } from './user';

export interface PermissionStateType {
  dynamicRoutes?: AppRouterMeta[]; // 为了 logoout 时候直接卸载
}

export interface PermissionStoreType
  extends StoreModuleType<PermissionStateType> {
  state: PermissionStateType;
  mutations: {
    setDynamicRoutes: Mutation<PermissionStateType>;
  };
  actions: {
    generateRoutes: Action<PermissionStateType, PermissionStateType>;
  };
}

const StoreModel: PermissionStoreType = {
  name: 'permission',
  namespaced: true,
  state: {
    dynamicRoutes: [],
  },
  mutations: {
    setDynamicRoutes(state, payload = []) {
      state.dynamicRoutes = payload;
    },
  },
  actions: {
    /**
     * 生成动态路由表
     * @param param0
     * @param role
     * @returns
     */
    generateRoutes({ commit }, role: Role) {
      return new Promise(resolve => {
        const filterRoutes = filterAsyncRoutes(role, asyncRoutes);
        commit('setDynamicRoutes', filterRoutes);
        resolve(filterRoutes);
      });
    },
  },
};

export default StoreModel;
