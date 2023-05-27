import { createApp } from 'vue'
import App from './App.vue'

const root = document.getElementById('app')
const type = root?.getAttribute('type') || 'absolute'
const marks = JSON.parse(root?.getAttribute('marks') ?? '[]')

createApp(App, { type, marks }).mount('#app')
