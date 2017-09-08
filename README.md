# vuex-example

> A Vue.js project

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for sit env with minification
yarn sit

# build for deploy env with minification
yarn deploy

# build svg icon
yarn svg
```

## Cli Tool
```
./tools/cli add [componentPath] -t [componentType]

# use npm script
npm run cli add [componentPath] -- -t [componentType]

# use yarn
yarn cli add [componentPath] -- -t [componentType]
```

## vuex 注意事项

### 项目骨架
这个例子使用 [MMF-FE/vue-typescript](https://github.com/MMF-FE/vue-typescript) 初始化

### 修改点
#### vuexUtil.ts
增加了一个 decorator 的方法， 返回该模块的装饰器。
```ts
export function decorator<D extends BindingHelper, T>(helper: D, keyMap: T) {
    type KeyType = keyof T
    type Decorator = (target, key: string) => any

    function decoratorWrapper(target, key: KeyType): void
    function decoratorWrapper(originKey: KeyType): Decorator
    function decoratorWrapper(a: any | KeyType, b?: KeyType): Decorator | void {
        if (typeof b === 'string') {
            const target = a
            const key = b
            return helper(target, key)
        }

        const originKey = a
        return helper(originKey)
    }

    return decoratorWrapper
}
```
#### store/modules/todo.ts
将装饰器 export 出去
```ts
import { getter, mutation, action, decorator } from '../utils/vuexUtil'
export let State = decorator(namespace(storeName, vState), types.state)
export let Getter = decorator(namespace(storeName, vGetter), types.getter)
export let Mutation = decorator(namespace(storeName, vMutation), types.mutation)
export let Action = decorator(namespace(storeName, vAction), types.action)
```

### 使用
以前的 types， modules 的方式可以不用改（建议改成新的），新的使用方式如下
```ts
import { State, Getter, Mutation, Action } from 'store/modules/someModule'

export default class AwsomeComp extends Vue {
    // = @module.State(types.state.foo) foo: string
    @State foo: string

    // = @module.State(types.state.foo) myFoo: stirng
    @State('foo') myFoo: string

    // = @module.Getter(types.getter.bar) bar: string
    @Getter bar: string

    // = @module.Mutation(types.mutation.setFoo) setFoo: (foo: string) => void
    @Mutation
    setFoo: (foo: string) => void

    @Mutation('setFoo')
    setFooAlias: (foo: string) => void

    // = @module.Action(types.action.fetch) fetch: (payload: any) => Promise<String[]>
    @Action
    fetch: (payload: any) => Promise<String[]>
}
```
** Store (state, getter, mutation, action) 都需要明确写出他们的类型 **，这样的好处是，自己能明白自己写的代码，别人 review 的时候，或者接手你的代码，可以更容易理解。

