import About from './pages/About.vue'
import Research from './pages/Research.vue'
import Home from './pages/Home.vue'
import Data from './pages/Data.vue'

import { IN_CONSTRUCTION } from './configuration.js'

let routes = null

if (!IN_CONSTRUCTION) {
    routes = [
      { path: '/', component: Home },
      { path: '/data', component: Data },
      { path: '/about', component: About },
      { path: '/research', component: Research },
    ]
}else{
    routes = [
      { path: '/', component: Home },
      { path: '/research', component: Research },
    ]
}

export default routes