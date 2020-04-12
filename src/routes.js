import People from './pages/People.vue'
import Research from './pages/Research.vue'
import Home from './pages/Home.vue'
import Data from './pages/Data.vue'

export default [
  { path: '/', component: Home },
  { path: '/data', component: Data },
  { path: '/people', component: People },
  { path: '/research', component: Research },
]
