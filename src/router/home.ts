/**
 * home module router
 */

import Router from 'vue-router'

function getView (viewName) {
    return (resolve, reject) => {
        require.ensure([], (require) => {
            let map = {
                'home': require('components/views/todo')
            }

            resolve(map[viewName])
        }, reject, 'home')
    }
}

let routes: Router.RouteConfig[] = [
    {
        name: 'home',
        path: '/:filter?'
    },
    {
        name: 'defaultView',
        path: '*'
    }
]

routes.forEach((v) => {
    if (!v.redirect && !v.component) {
        v.component = getView(v.name)
    }
})

export default routes
