
import { registerPlugins } from '@/plugins'

import App from './App.vue'

import router from './router'
import { useLayoutStore } from '@/stores/layout'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

registerPlugins(app)
const setlayout = useLayoutStore()

function setLayoutForNextPage(to) {
  let layout = to.matched[0]?.components.default.layout

  if (!layout) {
    layout = 'default-layout'
  }

  setlayout.increment(layout)
}

router.afterEach(setLayoutForNextPage)
app.mount('#app')
