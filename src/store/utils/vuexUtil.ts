/**
 * vuex util
 */

import Vuex from 'vuex'
import { BindingHelper } from 'vuex-class/lib/bindings'

// type alias
type RootState = Types.State.RootState

type Getter<S, R> = Vuex.Getter<S, R>
type GetterTree<S, R> = Vuex.GetterTree<S, R>
type MutationTree<S> = Vuex.MutationTree<S>
type Mutation<S> = Vuex.Mutation<S>
type ActionTree<S, R> = Vuex.ActionTree<S, R>
type Action<S, R> = Vuex.Action<S, R>

export function getter<S, T extends GetterTree<S, RootState>>(state: S, getters: T): {[K in keyof T]: Getter<S, RootState>} {
    return getters
}

export function mutation<S, T extends MutationTree<S>>(state: S, mutations: T): {[K in keyof T]: Mutation<S> } {
    return mutations
}

export function action<S, T extends ActionTree<S, RootState>>(state: S, actions: T): {[K in keyof T]: Action<S, RootState> } {
    return actions
}

export function decorator<D extends BindingHelper, T>(helper: D, keyMap: T) {
    type KeyType = keyof T

    function decoratorFactory(originKey?: undefined): (target, key: KeyType) => any
    function decoratorFactory(originKey: KeyType): (target, key: string) => any
    function decoratorFactory(originKey): any {
        if (typeof originKey === 'string') {
            return function (target, key: string) {
                // Can't not use now
                // return helper(target, key, originKey)
                return helper(target, key)
            }
        } else {
            return function (target, key: KeyType) {
                return helper(target, key)
            }
        }
    }

    return decoratorFactory
}
