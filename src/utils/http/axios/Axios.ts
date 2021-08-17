/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-15 14:55:48
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-17 13:28:56
 * @Description: Axios 进行 ts 对应配置
 */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { deepCopy, isFuntion } from "../../js";
import { BaseResponse, ContentTypeEnum, CreateAxiosOptions, RequestOptions } from "./types";

import qs from 'qs'


export class VAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }



  private getTransform() {
    const { transform } = this.options
    return transform
  }


  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance
  }


  /**
 * 挂载拦截器
 */
  private setupInterceptors() {

    const transform = this.getTransform()

    if (!transform) {
      return
    }

    const {
      configInRequestInterceptors,
      configInRequestInterceptorsCatch,
      handleResponseInterceptors,
      handleResponseInterceptorsCatch
    } = transform

    // 请求拦截器
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      if (configInRequestInterceptors && isFuntion(configInRequestInterceptors)) {
        config = configInRequestInterceptors(config, this.options)
      }
      return config
    }, undefined)

    configInRequestInterceptorsCatch && isFuntion(configInRequestInterceptorsCatch) && this.axiosInstance.interceptors.request.use(undefined, configInRequestInterceptorsCatch)


    // 响应拦截器
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      if (handleResponseInterceptors && isFuntion(handleResponseInterceptors)) {
        res = handleResponseInterceptors(res)
      }
      return res
    }, undefined)

    handleResponseInterceptorsCatch && isFuntion(handleResponseInterceptorsCatch) && this.axiosInstance.interceptors.response.use(undefined, handleResponseInterceptorsCatch)
  }

  /**
   * 根据不同的 content type 以及方法对发起请求的数据进行处理
   * @param config 
   */
  handleUrlData(config: AxiosRequestConfig) {

    const headers = config.headers || this.options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    // restful get 请求时候 body 不携带数据即此处的 config.data 为空
    if (contentType !== ContentTypeEnum.FORM_URLENCODED || config.method?.toUpperCase() === 'GET') {
      return config
    }

    return {
      ...config,
      data: qs.stringify(config.data)
    }
  }

  /**
   * 请求抽象封装
   * @param config 
   * @param options 
   * @returns 
   */
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {

    let conf: CreateAxiosOptions = deepCopy(config)

    const { requestOptions } = this.options
    // 覆盖初始化的请求 option
    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    conf.requestOptions = opt

    conf = this.handleUrlData(conf)

    const transform = this.getTransform()

    const { transformHook, transformHookCatch } = transform || {}

    return new Promise((resolve, reject) => {
      this.axiosInstance.request<any, AxiosResponse<BaseResponse>>(conf)
        .then((res: AxiosResponse<BaseResponse>) => {
          if (transformHook && isFuntion(transformHook)) {
            const ret = transformHook(res, opt)
            resolve(ret)
          } else {
            resolve(res as unknown as Promise<T>)
          }
        })
        .catch((e: AxiosError) => {
          if (transformHookCatch && isFuntion(transformHookCatch)) {
            reject(transformHookCatch(e, opt))
          } else {
            reject(e)
          }
        })
    })
  }


  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }
  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }
  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }
  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }
  patch<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PATCH' }, options)
  }

}
