import { createApp } from 'vue'
import App from './App.vue'

import { setupRouter } from './router'
import { setupStore } from './store'

import './index.css'
import './assets/styles/common.scss'

const app = createApp(App)

// element-plus
import './assets/styles/element/index.scss'
import ElementPlus from 'element-plus'
app.use(ElementPlus)

setupStore(app)

setupRouter(app).then(() => {
    app.mount('#app')
})