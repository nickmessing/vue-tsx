import { VueTSX } from '@vue-tsx/vue'
import { Router } from './index'

declare module '@vue-tsx/vue' {
  namespace VueTSX {
    interface Options {
      router?: Router
    }
  }
}
