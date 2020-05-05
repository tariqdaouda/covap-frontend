import About from './pages/About.vue'
import Research from './pages/Research.vue'
import Home from './pages/Home.vue'
import Data from './pages/Data.vue'
import Contact from './pages/Contact.vue'
import OpenSource from './pages/OpenSource.vue'

import { IN_CONSTRUCTION } from './configuration.js'

let routes = null

if (!IN_CONSTRUCTION) {
    routes = [
      { path: '/', component: Home, inactive:true },
      { path: '/:locale/', link: '', name: "menu.home", component: Home },
      { path: '/:locale/research', link: 'research', name: "menu.research", component: Research },
      { path: '/:locale/data', link: 'data', name: "menu.explore", component: Data },
      { path: '/:locale/about', link: 'about', name: "menu.about", component: About },
      { path: '/:locale/openSource', link: 'openSource', name: "menu.openSource", component: OpenSource },
      { path: '/:locale/contact', link: 'contact', name: "menu.contact", component: Contact },
    ]
}else{
    routes = [
      { path: '/', component: Home, inactive:true},
      { path: '/:locale/', link: '', name: "menu.home", component: Home },
      { path: '/:locale/about', link: 'about', name: "menu.about", component: About },
      { path: '/:locale/research', link: 'research', name: "menu.research", component: Research },
      { path: '/:locale/contact', link: 'contact', name: "menu.contact", component: Contact },
    ]
}

export default routes