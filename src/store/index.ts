import { App } from "vue";
import { createStore } from "vuex";
import { importAllStore } from "../utils/store";


const store = createStore({
  modules: importAllStore()
})


export const setupStore = (app: App<Element>) => {
  app.use(store)
}


