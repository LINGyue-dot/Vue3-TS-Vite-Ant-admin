/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-14 07:45:00
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-10-04 20:28:05
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


export interface UserInfoStateType {
  user_account: string | null;
  user_avatar: string | null;
  user_id: string | number; // 所有的主键
  user_role: Role
}


export interface UserStateType {
  currentUser: UserInfoStateType;
  message: number; // mq number
  verificated: boolean; // 本次登入是否已验证 token
  token: string | null;
}


export interface UserStoreType extends StoreModuleType<UserStateType> {
  state: UserStateType,
  mutations: {
    changeVerificated: Mutation<UserStateType>;
    changeToken: Mutation<UserStateType>;
    saveCurrentUser: Mutation<UserStateType>;
    saveMessage: Mutation<UserStateType>;
  },
  actions: {
    fetchCurrent: Action<UserStateType, UserStateType>;
    fetchMessage: Action<UserStateType, UserStateType>;
    register: Action<UserStateType, UserStateType>;
    login: Action<UserStateType, UserStateType>;
    logout: Action<UserStateType, UserStateType>;
  }
}

const initState: UserStateType = {
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
    changeVerificated(state, payload = false) {
      state.verificated = payload
    },
    changeToken(state, payload = null) {
      state.token = payload
      if (payload) {
        setToken(payload)
      } else {
        removeToken()
      }
      console.log(state.token)
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
      try {
        const userInfo = await getCurrent()
        commit('saveCurrentUser', userInfo)
        commit('changeVerificated', true)
        return userInfo
      } catch (e) {
        throw e
      }
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
      console.log(res)
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

