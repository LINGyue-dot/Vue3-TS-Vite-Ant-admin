/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-14 07:45:00
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-16 23:10:13
 * @Description: 本文件与 user.ts 完全一致，只是用于解决 bug
 */

import { Action, Mutation } from "vuex";
import { getCurrent, login } from "../../api/user";
import { router } from "../../router";
import { getToken, removeToken, setToken } from "../../utils/auth";
import { StoreModuleType } from "../types";

export enum Role {
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
  currentUser: UserStateType;
  message: number; // mq number
  verificated: boolean; // 本次登入是否已验证 token
  token: string | null;
}


export interface UserStoreType extends StoreModuleType<StateType> {
  state: StateType,
  mutations: {
    changeVerufucated: Mutation<StateType>;
    changeToken: Mutation<StateType>;
    saveCurrentUser: Mutation<StateType>;
    saveMessage: Mutation<StateType>;
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
  verificated: false,
  token: getToken()
}

const StoreModel: UserStoreType = {
  namespaced: true,
  name: 'user',
  state: initState,
  mutations: {
    changeVerufucated(state, payload = false) {
      state.verificated = payload
    },
    changeToken(state, payload = null) {
      state.token = payload
      if (payload) {
        setToken(payload)
      } else {
        removeToken()
      }
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
    async fetchCurrent({ state, commit }) {
      const userInfo = await getCurrent()
      commit('saveCurrentUser', userInfo)
      console.log(state.currentUser)
      return userInfo
    },
    fetchMessage({ state, commit }) {
      return
    },
    register({ state, commit }) {
      return

    },
    async login({ state, commit }, payload) {
      // return new Promise((resolve,reject)=>{
      //   login(payload).then(res=>{
          
      //   })

      // })

      const res = await login(payload)
      try {
        const { token } = res
        commit('changeToken', token)
      } catch (e) {
      }
      return res

    },
    /**
     * logout 
     * 清空 vuex 中数据
     * 返回到登入页面
     * 清空 localstorage 中用户相关数据
     * @param state 
     * @param commit 
     */
    async logout({ commit }) {
      commit('changeVerufucated', false)
      commit('saveCurrentUser', {})
      await router.replace('/login')
      removeToken()
    }
  }
}

export default StoreModel

