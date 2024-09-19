import type { Alpine } from 'alpinejs'
import type { AxiosStatic } from 'axios'

export {}

declare global {
  const Alpine: Alpine
  const axios: AxiosStatic

  interface Window {
    Alpine: Alpine
    axios: AxiosStatic
  }
}
