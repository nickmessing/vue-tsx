import { Vue } from '@vue-tsx/vue'
import { ModuleOptions, Vuex } from '@vue-tsx/vuex'
import { module } from './storeModule'

export interface RootState {
  str: string
  num: number | null
}

export interface RootGetters {
  s: string
  num: number
  total: string
}

interface RootMutations {
  setStr: string
  setNum: number
}

interface RootActions {
  setStrA: string
  setNumA?: number
}

const rootModule: ModuleOptions<RootState, RootGetters, RootMutations, RootActions> = {
  state: {
    str: '',
    num: null,
  },
  getters: {
    s(state) {
      return state.str
    },
    num(state) {
      return state.num || 0
    },
    total(state) {
      return this.s(state) + ':' + this.num(state)
    },
  },
  mutations: {
    setStr(state, payload) {
      state.str = payload
    },
    setNum(state, payload) {
      state.num = payload
    },
  },
  actions: {
    async setNumA(ctx, payload) {
      ctx.commit('setNum', payload || 0)
    },
    async setStrA(ctx, payload) {
      ctx.commit('setStr', payload)
      if (ctx.getters.s === payload) {
        console.log('set successful')
      }
      await this.setNumA(ctx, 1)
    },
  },
}

Vue.use(Vuex)

export const options = {
  rootModule,
  modules: {
    myModule: module,
  },
}

export const store = new Vuex(options)
