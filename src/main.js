import { createApp } from 'vue'
import {
  Quasar, LocalStorage,
  SessionStorage,
  Notify
} from 'quasar'

import App from './App.vue'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

const app = createApp(App)

app
  .use(Quasar, {
    plugins: {
      LocalStorage,
      SessionStorage,
      Notify,
    },
  })
  .mount('#app')
