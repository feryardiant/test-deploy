/// <reference lib="DOM" />

interface ImportMetaEnv {
  APP_ENV?: 'local' | 'testing' | 'staging' | 'production'
  APP_NAME?: string
  APP_URL?: string
  SENTRY_DSN?: string
  SENTRY_TRACES_SAMPLE_RATE?: number
  SENTRY_PROFILING_ENABLE?: boolean
}
