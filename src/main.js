import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL='http://localhost:3000/api/'

// axios.defaults.baseURL='backend-contable-audqgae6hxavg9h5.canadacentral-01.azurewebsites.net'

createApp(App).use(store).use(router).mount('#app')
