import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './styles/main.scss' // Importing the global scss files

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(router)
app.use(MotionPlugin)

app.mount('#app')
