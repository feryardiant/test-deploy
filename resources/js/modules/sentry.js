import { browserProfilingIntegration, browserTracingIntegration, init, replayIntegration } from '@sentry/browser'

export function install() {
  init({
    dsn: import.meta.env.SENTRY_DSN,
    environment: import.meta.env.APP_ENV,
    integrations: (integrations) => {
      integrations.push(
        browserTracingIntegration(),
        replayIntegration({
          maskAllInputs: true,
          maskAllText: false,
          // networkDetailAllowUrls: [location.origin],
        }),
      )

      if (import.meta.env.SENTRY_PROFILING_ENABLE) {
        integrations.push(
          browserProfilingIntegration(),
        )
      }

      return integrations
    },
    logErrors: true,
    tracesSampleRate: import.meta.env.SENTRY_TRACES_SAMPLE_RATE,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.1,
  })
}
