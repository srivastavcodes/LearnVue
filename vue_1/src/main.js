import './assets/main.css'
import 'primeicons/primeicons.css'
import 'vue-toastification/dist/index.css'

import {createApp} from 'vue'
import App from './App.vue'

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Toast from 'vue-toastification'
import router from "@/router/index.js";

const app = createApp(App)
app.component('PulseLoader', PulseLoader)
app.use(Toast)
app.use(router)
app.mount('#app')
