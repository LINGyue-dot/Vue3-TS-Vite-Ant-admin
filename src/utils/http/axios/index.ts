/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-15 14:50:59
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-15 23:31:56
 * @Description: axios 对其基本配置包括 响应处理 以及拦截器
 */

import { AxiosTransform, ContentTypeEnum, CreateAxiosOptions } from "./types";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from "../../auth";

import { message } from "ant-design-vue";
import { store } from "../../../store";
import { VAxios } from "./Axios";
import { getApi } from "../../settings/env";

const transform: AxiosTransform = {


  /**
   * 响应数据处理
   * @param res 
   * @param options 
   */
  transformHook: (res, options) => {
    return res.data
  },

  /**
   * 响应数据请求失败，主要用于处理非 4xx 5xx 状态码
   */
  transformHookCatch: (err, options) => {
    const { showErrorMessage } = options

    if (showErrorMessage) {
      message.error(err.response?.data.message || '出错了...')
    }

    switch (err.response?.status) {
      case 401: // token 验证失败 退出所有数据并跳转路由 
        // todo ：该文件中使用 vuex
        store.dispatch('user/logout')
        return
      case 501:
        return
      default:
        return
    }

  },

  /**
     * 在请求拦截器中对其 config 进行修改
     * 主要进行 token 携带
     */
  configInRequestInterceptors: (
    config,
    options
  ) => {
    config.headers.Authorization = getToken()

    return config
  },

  /**
   * 配置请求拦截 config 失败时候的 catch function
   */
  configInRequestInterceptorsCatch: (err) => {
    message.error('request header config errror')
  },


  /**
   * 处理请求到数据之后的处理
   */
  handleResponseInterceptors: (
    response
  ) => {
    return response
  },

  handleResponseInterceptorsCatch: (err) => {

  }
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    {
      timeout: 10 * 1000,
      baseURL: getApi(),
      headers: { 'Content-Type': ContentTypeEnum.JSON },
      transform,
      requestOptions: {
        withToken: true,
        showErrorMessage: false,
        returnNativeResponse: false
      },
      ...opt
    }
  )
}

export const http = createAxios()
