import type { Alpine } from 'alpinejs'
import type { AxiosStatic } from 'axios'

export {}

declare global {
  const alpine: Alpine
  const axios: AxiosStatic

  interface Window {
    alpine: Alpine
    axios: AxiosStatic
  }
}
