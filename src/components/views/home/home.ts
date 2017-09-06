import Vue from 'components/base'
import { Component, Watch, Prop } from 'vue-property-decorator'
import template from './home.vue'

import { Store } from 'store/modules/todo'

@Component({
    name: 'view-home',
    mixins: [template]
})
export default class Home extends Vue {
    @Store.state() foo

    @Store.mutation() setFoo

    // can't do this, because property name should same as key
    @Store.state('foo') foo2

    async created () {
        console.log(this.foo)
        this.setFoo('foo')
        console.log(this.foo)

        console.log(this.foo2)
    }
}

