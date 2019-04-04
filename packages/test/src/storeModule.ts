import { ModuleOptions } from '@vue-tsx/vuex'

interface State {
  str: string
  num: number | null
}

interface Getters {
  s: string
  num: number
  total: string
}

interface Mutations {
  setStr: string
  setNum: number
}

interface Actions {
  setStrA: string
  setNumA?: number
}

export const module: ModuleOptions<State, Getters, Mutations, Actions> = {
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
