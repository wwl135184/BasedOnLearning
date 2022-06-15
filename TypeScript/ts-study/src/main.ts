import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// element-plus
import ElementPlus from 'element-plus'
import './assets/styles/element/index.scss'
app.use(ElementPlus)

app.mount('#app')
