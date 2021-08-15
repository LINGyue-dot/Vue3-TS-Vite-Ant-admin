/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-14 07:45:00
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-15 20:18:30
 * @Description: 
 */

import { Action, Mutation } from "vuex";
import { router } from "../../router";
import { removeToken } from "../../utils/auth";
import { StoreModuleType } from "../types";

enum Role {
  Tourist, // 游客
  Gadmin, // 普通管理员 （不可以修改其他用户信息）
  Sadmin // 超级管理员
}


export interface UserStateType {
  user_account: string | null;
  user_avatar: string | null;
  user_id: string | number; // 所有的主键
  user_role: Role
}


export interface StateType {
  currentUser: UserStateType,
  message: number,// mq number
  verificated: boolean
}


export interface UserStoreType extends StoreModuleType<StateType> {
  state: StateType,
  mutations: {
    changeVerufucated: Mutation<StateType>;
    saveCurrentUser: Mutation<StateType>;
    saveMessage: Mutation<StateType>
  },
  actions: {
    fetchCurrent: Action<StateType, StateType>;
    fetchMessage: Action<StateType, StateType>;
    register: Action<StateType, StateType>;
    login: Action<StateType, StateType>;
    logout: Action<StateType, StateType>;
  }
}

const initState: StateType = {
  currentUser: {
    user_account: null,
    user_avatar: null,
    user_id: 0,
    user_role: Role.Tourist
  },
  message: 0,
  verificated: false
}



const StoreModel: UserStoreType = {
  namespaced: true,
  name: 'user',
  state: initState,
  mutations: {
    changeVerufucated(state, payload = false) {
      state.verificated = payload
    },
    saveCurrentUser(state, payload = {}) {
      state.currentUser = {
        ...initState.currentUser,
        ...payload
      }
    },
    saveMessage(state, payload) {
      state.message = payload ? payload : initState.message
    }
  },
  actions: {
    fetchCurrent(state, commit) {

    },
    fetchMessage(state, commit) {

    },
    register(state, commit) {

    },
    login(state, commit) {

    },
    /**
     * logout 
     * 清空 vuex 中数据
     * 返回到登入页面
     * 清空 localstorage 中用户相关数据
     * @param state 
     * @param commit 
     */
    async logout(state, commit) {
      commit('changeVerufucated', false)
      commit('saveCurrentUser', {})
      await router.replace('/login')
      removeToken()
    }
  }

}

export default StoreModel