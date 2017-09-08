/**
 * Todo
 * @author Allenice <994298628@qq.com>
 * @date 2017-07-21 11:32:22
 * @since 1.0.0
 */

import Vue from 'components/base'
import { Component, Watch } from 'vue-property-decorator'
import template from './todo.vue'

import InputBox from './inputBox'
import TodoItem from './item'
import TodoFooter from './footer'

// vuex
import { State, Getter, Mutation, Action } from 'store/modules/todo'

@Component({
    name: 'view-todo',
    mixins: [template],
    components: {
        InputBox,
        TodoItem,
        TodoFooter
    }
})
export default class Todo extends Vue {
    @State('todos') allTodos: Types.todo.TodoItem[]

    @Getter('filterTodos') todos: Types.todo.TodoItem[]

    @Mutation setFilter: (filter) => void
    @Mutation clearData: () => void

    @Action
    fetch: () => Promise<Types.todo.FetchStatus>

    @Action
    save: () => Promise<any>

    @Watch('todos', {deep: true})
    onTodosChange () {
        // save todos
        this.save()
    }

    async created () {
        // fetch todos
        let isSuccess = await this.fetch()
        console.info(`Fetch status: ${isSuccess.status}`)

        if (this.$route.params && this.$route.params.filter) {
            this.setFilter(this.$route.params.filter)
        }
    }

    beforeDestroy () {
        // 理论上是要清除掉大数据，但是这里 filter 使用链接的方式，所以不需要清掉
        // this.clearData()
    }
}
