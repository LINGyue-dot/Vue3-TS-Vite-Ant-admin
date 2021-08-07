import { Mutation } from "vuex";
import { StoreModuleType } from "../types";

export interface GlobalStateType {
  collapsed: boolean; // 左侧是否折叠
}

export interface GlobalStoreType extends StoreModuleType<GlobalStateType> {
  state: GlobalStateType,
  mutations: {
    changeMenuCollapse: Mutation<GlobalStateType>;
  },
}

const StoreModel: GlobalStoreType = {
  namespaced: true,
  name: 'global',
  state: {
    collapsed: false
  },
  mutations: {
    changeMenuCollapse(state) {
      state.collapsed = !state.collapsed
    }
  }
}

export default StoreModel