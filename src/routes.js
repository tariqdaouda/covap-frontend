import People from './pages/People.vue'
import Research from './pages/Research.vue'
import Home from './pages/Home.vue'
import Data from './pages/Data.vue'

import { IN_CONSTRUCTION } from './configuration.js'

let routes = null

if (!IN_CONSTRUCTION) {
    routes = [
      { path: '/', component: Home },
      { path: '/data', component: Data },
      { path: '/people', component: People },
      { path: '/research', component: Research },
    ]
}else{
    routes = [
      { path: '/', component: Home },
      { path: '/research', component: Research },
    ]
}

export default routes