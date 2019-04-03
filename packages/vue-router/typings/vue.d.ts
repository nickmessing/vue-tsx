import { VueTSX } from '@vue-tsx/vue'
import { Router, NavigationGuard, Route } from './index'

declare module '@vue-tsx/vue' {
  namespace VueTSX {
    interface Options {
      router?: Router
      beforeRouteEnter?: NavigationGuard;
      beforeRouteLeave?: NavigationGuard;
      beforeRouteUpdate?: NavigationGuard;
    }

    interface ComponentInstance {
      $router: Router;
      $route: Route;
    }
  }
}

