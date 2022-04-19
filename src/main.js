import { createApp } from 'vue'
import App from './App.vue'

import UiButton from './components/UI/UiButton.vue'
import UiHeading from './components/UI/UiHeading.vue'
import UiText from './components/UI/UiText.vue'
import InputText from './components/UI/InputText.vue'
import InputRadio from './components/UI/InputRadio.vue'
import InputFile from './components/UI/InputFile.vue'

const app = createApp(App)

app.component("ui-button", UiButton)
app.component("ui-heading", UiHeading)
app.component("ui-text", UiText)
app.component("input-text", InputText)
app.component("input-radio", InputRadio)
app.component("input-file", InputFile)

app.mount('#app')
