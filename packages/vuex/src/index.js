import RealVuex from 'vuex'

const transformModule = module => ({
  namespaced: true,
  state: module.state,
  mutations: module.mutations || {},
  getters: Object.keys(module.getters || {}).reduce(
    (obj, getter) => ({
      ...obj,
      [getter]: (state, getters) =>
        module.getters[getter].call(
          Object.keys(module.getters).reduce(
            (obj, getter) => ({
              ...obj,
              [getter]: () => getters[getter],
            }),
            {},
          ),
          state,
        ),
    }),
    {},
  ),
  actions: Object.keys(module.actions || {}).reduce(
    (obj, action) => ({
      ...obj,
      [action]: (ctx, payload) =>
        module.actions[action].call(
          Object.keys(module.actions).reduce(
            (obj, action) => ({
              ...obj,
              [action]: (ctx, payload) => ctx.dispatch(action, payload),
            }),
            {},
          ),
          ctx,
          payload,
        ),
    }),
    {},
  ),
})

export class Vuex {
  constructor(options) {
    const modules = options.modules || {}
    this.$_TSX_infer = new RealVuex.Store({
      ...transformModule(options.rootModule),
      modules: Object.keys(modules).reduce(
        (obj, module) => ({
          ...obj,
          [module]: transformModule(modules[module]),
        }),
        {},
      ),
    })
  }

  static get $_TSX_plugin() {
    return RealVuex
  }
}

export const getter = (vm, getter) => vm.$store.getters[getter]
export const mutate = (vm, mutation, payload) => vm.$store.commit(mutation, payload)
export const action = (vm, action, payload) => vm.$store.dispatch(action, payload)
export const namespacedGetter = (vm, namespace, getter) => vm.$store.getters[`${namespace}/${getter}`]
export const namespacedMutate = (vm, namespace, mutation, payload) =>
  vm.$store.commit(`${namespace}/${mutation}`, payload)
export const namespacedAction = (vm, namespace, action, payload) => 
  vm.$store.dispatch(`${namespace}/${action}`, payload)
