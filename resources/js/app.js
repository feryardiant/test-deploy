import Alpine from 'alpinejs'
import axios from 'axios'

import '@fontsource-variable/inter'

window.Alpine = Alpine
window.axios = axios

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

Alpine.start()
