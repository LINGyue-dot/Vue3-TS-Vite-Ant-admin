/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-15 15:01:34
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-15 22:40:48
 * @Description: 
 */

import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";


/**
 * 后端返回基础结构
 */
export interface BaseResponse<T = any> {
  code: number | string;
  message: string;
  result: T;
}


export interface CreateAxiosOptions extends AxiosRequestConfig {

  transform?: AxiosTransform;
  requestOptions?: RequestOptions
}

export interface RequestOptions {

  joinParamsToUrl?: Boolean;

  formaData?: Boolean;

  // 如果没有就使用默认 api
  apiUrl?: string;

  // 默认携带 token 
  withToken?: boolean;

  // 是否直接返回响应数据
  returnNativeResponse?: Boolean;

  // 如果请求失败是否显示组件提示，默认不显示
  showErrorMessage?: Boolean;

}



export abstract class AxiosTransform {

  /**
   * 响应的数据请求，集成在请求中，并非在拦截器中
   */
  transformHook?: (res: AxiosResponse<BaseResponse>, options: RequestOptions) => any


  /**
   * 响应数据请求失败，主要用于处理非 4xx 5xx 状态码
   */
  transformHookCatch?: (err: AxiosError<BaseResponse>, options: RequestOptions) => any

  /**
   * 在请求拦截器中对其 config 进行修改
   * 主要进行 token 携带
   */
  configInRequestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig

  /**
   * 配置请求拦截 config 失败时候的 catch function
   */
  configInRequestInterceptorsCatch?: (err: Error) => void


  /**
   * 处理请求到数据之后的处理
   */
  handleResponseInterceptors?: (
    response: AxiosResponse<any>
  ) => AxiosResponse<any>

  handleResponseInterceptorsCatch?: (err: Error) => void
}

export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
