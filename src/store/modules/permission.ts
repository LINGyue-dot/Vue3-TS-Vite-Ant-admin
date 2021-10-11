/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-16 15:26:42
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-10-11 11:13:34
 * @Description:
 */

import { Action, Mutation } from 'vuex';
import { asyncRoutes } from '../../router/routes';
import { AppRouterRecordRaw } from '../../router/types';
import { filterAsyncRoutes } from '../../utils/router';
import { StoreModuleType } from '../types';
import { Role } from './user';

export interface PermissionStateType {
  dynamicRoutes?: AppRouterRecordRaw[]; // 为了 logoout 时候直接卸载
}

export interface PermissionStoreType
  extends StoreModuleType<PermissionStateType> {
  state: PermissionStateType;
  mutations: {
    addDynamicRoute: Mutation<PermissionStateType>;
    // setDynamicRoutes: Mutation<PermissionStateType>;
  };
  actions: {

    existRoute: Action<PermissionStateType, PermissionStateType>;
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
    addDynamicRoute(state, payload: AppRouterRecordRaw) {
      state.dynamicRoutes?.push(payload)
    },
    // setDynamicRoutes(state, payload = []) {
    //   state.dynamicRoutes = payload;
    // },
  },
  actions: {
    /**
     * 判断传入的 path 是否已经被动态添加到路由表中
     * @param param0 
     * @param name 
     * @returns 
     */
    existRoute({ state }, name: string) {
      let isExit = false
      console.log(state.dynamicRoutes)
      state.dynamicRoutes?.forEach(route => {
        if (route.name === name) { isExit = true }
      })
      if (name === 'Analysis') {
        isExit = true
      }
      return isExit
    },


    /**
     * 生成动态路由表
     * @param param0
     * @param role
     * @returns
     */
    generateRoutes({ commit }, role: Role) {
      return new Promise(resolve => {
        const filterRoutes = filterAsyncRoutes(role, asyncRoutes);
        resolve(filterRoutes);
      });
    },
  },
};

export default StoreModel;
