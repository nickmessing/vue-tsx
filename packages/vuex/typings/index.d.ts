import { VueTSX } from '@vue-tsx/vue'

export type GettersOption<State extends Record<string, any>, Getters extends Record<string, any>> = {
  [Key in keyof Getters]: (state: State) => Getters[Key]
}

export type MutationsOption<State extends Record<string, any>, Mutations extends Record<string, any>> = {
  [Key in keyof Mutations]: void extends Mutations[Key]
    ? (state: State, payload?: Mutations[Key]) => void
    : (state: State, payload: Mutations[Key]) => void
}

export type ActionContext<
  State extends Record<string, any>,
  Getters extends Record<string, any>,
  Mutations extends Record<string, any>,
  RootState extends Record<string, any>,
  RootGetters extends Record<string, any>
> = {
  rootState: RootState
  rootGetters: RootGetters
  state: State
  getters: Getters
  commit: VueTSX.UnionToIntersection<
    {
      [Key in keyof Mutations]: void extends Mutations[Key]
        ? (muation: Key, payload?: Mutations[Key]) => void
        : (muation: Key, payload: Mutations[Key]) => void
    }[keyof Mutations]
  >
}

export type ActionsOption<
  State extends Record<string, any>,
  Getters extends Record<string, any>,
  Mutations extends Record<string, any>,
  Actions extends Record<string, any>,
  RootState extends Record<string, any>,
  RootGetters extends Record<string, any>
> = {
  [Key in keyof Actions]-?: void extends Actions[Key]
    ? (
        context: ActionContext<State, Getters, Mutations, RootState, RootGetters>,
        payload?: Actions[Key],
      ) => void | Promise<void>
    : (
        context: ActionContext<State, Getters, Mutations, RootState, RootGetters>,
        payload: Actions[Key],
      ) => void | Promise<void>
}

export interface ModuleOptions<
  State extends Record<string, any>,
  Getters extends Record<string, any> = {},
  Mutations extends Record<string, any> = {},
  Actions extends Record<string, any> = {},
  RootsState extends Record<string, any> = {},
  RootGetters extends Record<string, any> = {}
> {
  state: State
  getters?: GettersOption<State, Getters>
  mutations?: MutationsOption<State, Mutations>
  actions?: ActionsOption<State, Getters, Mutations, Actions, RootsState, RootGetters>
}

export interface VuexOptions<RootState, RootGetters> {
  rootModule: ModuleOptions<RootState, RootGetters, any, any>
  modules?: {
    [key: string]: ModuleOptions<any, any, any, any, RootState, RootGetters>
  }
}

export interface Options {}

export interface OptionsSchema {
  options: VuexOptions<any, any>
}

export class Vuex<RootState, RootGetters> {
  constructor(options: VuexOptions<RootState, RootGetters>)
}

export type GetGetters<T> = T extends ModuleOptions<any, infer G, any, any, any, any> ? G : never
export type GetMutations<T> = T extends ModuleOptions<any, any, infer M, any, any, any> ? M : never
export type GetActions<T> = T extends ModuleOptions<any, any, any, infer A, any, any> ? A : never

export const getter: Options extends OptionsSchema
  ? VueTSX.UnionToIntersection<
      {
        [Key in keyof GetGetters<Options['options']['rootModule']>]: (
          vm: VueTSX.Instance,
          getter: Key,
        ) => GetGetters<Options['options']['rootModule']>[Key]
      }[keyof GetGetters<Options['options']['rootModule']>]
    >
  : never
export const mutate: Options extends OptionsSchema
  ? VueTSX.UnionToIntersection<
      {
        [Key in keyof GetMutations<Options['options']['rootModule']>]: void extends GetMutations<
          Options['options']['rootModule']
        >[Key]
          ? (vm: VueTSX.Instance, mutations: Key, payload?: GetMutations<Options['options']['rootModule']>[Key]) => void
          : (vm: VueTSX.Instance, mutations: Key, payload: GetMutations<Options['options']['rootModule']>[Key]) => void
      }[keyof GetMutations<Options['options']['rootModule']>]
    >
  : never
export const action: Options extends OptionsSchema
  ? VueTSX.UnionToIntersection<
      {
        [Key in keyof GetActions<Options['options']['rootModule']>]: void extends GetActions<
          Options['options']['rootModule']
        >[Key]
          ? (
              vm: VueTSX.Instance,
              mutations: Key,
              payload?: GetActions<Options['options']['rootModule']>[Key],
            ) => void | Promise<void>
          : (
              vm: VueTSX.Instance,
              mutations: Key,
              payload: GetActions<Options['options']['rootModule']>[Key],
            ) => void | Promise<void>
      }[keyof GetActions<Options['options']['rootModule']>]
    >
  : never

export const namespacedGetter: Options extends OptionsSchema
  ? VueTSX.UnionToIntersection<
      {
        [Module in keyof Options['options']['modules']]: {
          [Key in keyof GetGetters<Options['options']['modules'][Module]>]: (
            vm: VueTSX.Instance,
            namespace: Module,
            getter: Key,
          ) => GetGetters<Options['options']['modules'][Module]>[Key]
        }[keyof GetGetters<Options['options']['modules'][Module]>]
      }[keyof Options['options']['modules']]
    >
  : never
export const namespacedMutate: Options extends OptionsSchema
  ? VueTSX.UnionToIntersection<
      {
        [Module in keyof Options['options']['modules']]: {
          [Key in keyof GetMutations<Options['options']['modules'][Module]>]: void extends GetMutations<
            Options['options']['modules'][Module]
          >[Key]
            ? (
                vm: VueTSX.Instance,
                namespace: Module,
                mutations: Key,
                payload?: GetMutations<Options['options']['modules'][Module]>[Key],
              ) => void
            : (
                vm: VueTSX.Instance,
                namespace: Module,
                mutations: Key,
                payload: GetMutations<Options['options']['modules'][Module]>[Key],
              ) => void
        }[keyof GetMutations<Options['options']['modules'][Module]>]
      }[keyof Options['options']['modules']]
    >
  : never
export const namespacedAction: Options extends OptionsSchema
  ? VueTSX.UnionToIntersection<
      {
        [Module in keyof Options['options']['modules']]: {
          [Key in keyof GetActions<Options['options']['modules'][Module]>]: void extends GetActions<
            Options['options']['modules'][Module]
          >[Key]
            ? (
                vm: VueTSX.Instance,
                namespace: Module,
                mutations: Key,
                payload?: GetActions<Options['options']['modules'][Module]>[Key],
              ) => void | Promise<void>
            : (
                vm: VueTSX.Instance,
                namespace: Module,
                mutations: Key,
                payload: GetActions<Options['options']['modules'][Module]>[Key],
              ) => void | Promise<void>
        }[keyof GetActions<Options['options']['modules'][Module]>]
      }[keyof Options['options']['modules']]
    >
  : never
