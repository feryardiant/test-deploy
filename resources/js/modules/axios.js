import { captureException, setExtras } from '@sentry/browser'
import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.interceptors.response.use(res => res, (err) => {
  if (!err.response) {
    captureException(err)

    throw err
  }

  if (err.response.status === 419) {
    location.reload()

    return
  }

  setExtras({
    payload: JSON.parse(err.config?.data ?? '{}'),
  })

  captureException(
    err.response.data,
  )

  throw err
})

export function install() {
  window.axios = axios
}
