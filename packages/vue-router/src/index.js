import { transformComponent } from '@vue-tsx/vue'
import VueRouter from 'vue-router'

const processRoute = route => ({
  ...route,
  component: route.component ? transformComponent(route.component) : undefined,
  components: route.components
    ? Object.keys(route.components).reduce(
        (obj, key) => ({ ...obj, [key]: transformComponent(route.components[key]) }),
        {},
      )
    : undefined,
  children: route.children ? route.children.map(processRoute) : undefined,
})

export class Router {
  constructor(options) {
    this.$_TSX_infer = new VueRouter({
      ...options,
      routes: options.routes.map(processRoute) || [],
    })

    console.log({
      ...options,
      routes: options.routes.map(processRoute) || [],
    })
  }

  static get $_TSX_plugin () {
    return VueRouter
  }
}
export const RouterLink = 'RouterLink'
export const RouterView = 'RouterView'
