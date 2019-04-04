import { VueTSX } from '@vue-tsx/vue'
import { Options } from '@vue-tsx/vuex'
import { store, options } from './store'

declare module '@vue-tsx/vue' {
  namespace VueTSX {
    interface Options {
      store: typeof store
    }
  }
}

declare module '@vue-tsx/vuex' {
  interface Options {
    options: typeof options
  }
}
