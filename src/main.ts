import { createApp } from 'vue'
import App from './App.vue'

const root = document.getElementById('app')
const config = root?.getAttribute('marks') ?? ""
const hideLabels = root?.hasAttribute('hide-labels')

createApp(App, { config, hideLabels }).mount('#app')
