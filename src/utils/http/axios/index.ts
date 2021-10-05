/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-15 14:50:59
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-10-04 15:56:56
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
    return res.data.result
  },

  /**
   * 响应数据请求失败，主要用于处理非 4xx 5xx 状态码，需要配置 axios
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
        break;
      case 501:
        break;
      default:
        break;
    }
    return err.response?.data
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
    throw new Error('/src/utils/http/axios/index configInRequestInterceptorsCatch error')
  },


  /**
   * 处理请求到数据之后的处理
   */
  handleResponseInterceptors: (
    response
  ) => {
    return response
  },

  /**
   * 响应数据失败非 200 拦截器 
   * 注意此处 应该用 throw 
   * 如果用 return 那么就会在 then 中被获取，而非 catch
   * @param err 
   * @returns 
   */
  handleResponseInterceptorsCatch: (err) => {
    throw err
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
      validateStatus: function (status) {
        return status < 400 // rejct only greater than 400 , status 大于 400 时候都会被 catch
      },
      ...opt
    }
  )
}

export const http = createAxios()
