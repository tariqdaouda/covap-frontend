import About from './pages/About.vue'
import Research from './pages/Research.vue'
import Home from './pages/Home.vue'
import Data from './pages/Data.vue'
import Contact from './pages/Contact.vue'

import { IN_CONSTRUCTION } from './configuration.js'

let routes = null

if (!IN_CONSTRUCTION) {
    routes = [
      { path: '/', component: Home },
      { path: '/data', component: Data },
      { path: '/about', component: About },
      { path: '/research', component: Research },
      { path: '/contact', component: Contact },
    ]
}else{
    routes = [
      { path: '/', component: Home },
      { path: '/about', component: About },
      { path: '/research', component: Research },
      { path: '/contact', component: Contact },
    ]
}

export default routes