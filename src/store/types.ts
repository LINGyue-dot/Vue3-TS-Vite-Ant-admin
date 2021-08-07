import { Module } from "vuex";



/**
 * 所有 stroe 的 module 都需要继承此
 */
export interface StoreModuleType<S> extends Module<S, S> {
  namespaced: boolean;
  name: string;
}