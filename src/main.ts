import { createApp } from 'vue'
import App from './App.vue'

const root = document.getElementById('app')
const config = root?.getAttribute('marks') ?? ""

createApp(App, { config }).mount('#app')
