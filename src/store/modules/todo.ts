/**
 * todo store
 */

import Vuex from 'vuex'
import { State, Getter, Mutation, Action, namespace } from 'vuex-class'
import keymirror from '../utils/keymirror'
import { getter, mutation, action, decorator } from '../utils/vuexUtil'

// type alias

const STORE_KEY = 'vue-typescript-todos'

/*** state ***/
let state = {
    foo: 'init foo'
}

/*** getters ***/
let getters = getter(state, {
})

/*** mutations ***/
let mutations = mutation(state, {
    setFoo (state, foo) {
        state.foo = foo
    }
})

/*** actions ***/
let actions = action(state, {
})

/*** module store ***/
let store = {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}

/*** exports ***/
export let types = {
    state: keymirror(state),
    getter: keymirror(getters),
    mutation: keymirror(mutations),
    action: keymirror(actions)
}

export let module = {
    State: namespace('todo', State),
    Getter: namespace('todo', Getter),
    Mutation: namespace('todo', Mutation),
    Action: namespace('todo', Action)
}

export let Store = {
    state: decorator(module.State, types.state),
    getter: decorator(module.Getter, types.getter),
    mutation: decorator(module.Mutation, types.mutation),
    action: decorator(module.Action, types.action),
}

export default store
