import Vue from 'components/base'
import { Component, Watch, Prop } from 'vue-property-decorator'
import template from './home.vue'

@Component({
    name: 'view-home',
    mixins: [template]
})
export default class Home extends Vue {
}

