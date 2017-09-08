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
    filter: '',
    todos: []
}

/*** getters ***/
let getters = getter(state, {
    filterTodos (state, getters) {
        let filter = state.filter || 'all'

        switch (filter) {
            case 'all':
                return state.todos
            case 'active':
                return getters.remaining
            case 'completed':
                return getters.completed
        }
    },

    completed (state) {
        return state.todos.filter(v => v.completed)
    },

    remaining (state) {
        return state.todos.filter(v => !v.completed)
    },

    isAllCompleted () {
        return state.todos.every(v => v.completed)
    }
})

/*** mutations ***/
let mutations = mutation(state, {
    setFilter (state, filter) {
        state.filter = filter
    },

    setTodos(state, todos) {
        state.todos = todos
    },

    addTodo(state, todo) {
        state.todos.unshift(todo)
    },

    removeTodo(state, todo) {
        let ix = state.todos.indexOf(todo)
        state.todos.splice(ix, 1)
    },

    toggleTodoStatus (state, payload: { todo: Types.todo.TodoItem, status: boolean }) {
        let ix = state.todos.indexOf(payload.todo)
        state.todos[ix].completed = payload.status
    },

    toggleAllTodoStatus (state, status) {
        state.todos.forEach(v => v.completed = status)
    },

    clearComplete (state) {
        state.todos = state.todos.filter(v => !v.completed)
    },

    clearData () {
        // 将大数据重置，以免一直存在内存
        state.todos = []
    }
})

/*** actions ***/
let actions = action(state, {
    fetch({ commit }) {
        let todos = []
        try {
            todos = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
        } catch (err) {
            console.error(err)
        }
        commit(types.mutation.setTodos, todos)
        return {
            status: true
        }
    },

    save({state, commit }) {
        window.localStorage.setItem(STORE_KEY, JSON.stringify(state.todos))
    }
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
