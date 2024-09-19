import { resolve } from 'node:path'
import laravel from 'laravel-vite-plugin'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', ['APP', 'SENTRY'])
  const rootDir = 'resources/client'
  const isDev = ['local', 'testing'].includes(env.APP_ENV)

  return {
    resolve: {
      alias: {
        '~': resolve(__dirname, rootDir),
      },
    },

    build: {
      sourcemap: isDev,
    },

    define: {
      'import.meta.env.APP_ENV': JSON.stringify(env.APP_ENV),
      'import.meta.env.SENTRY_DSN': JSON.stringify(env.SENTRY_DSN),
      'import.meta.env.SENTRY_TRACES_SAMPLE_RATE': Number(env.SENTRY_TRACES_SAMPLE_RATE),
      'import.meta.env.SENTRY_PROFILING_ENABLE': Boolean(env.SENTRY_PROFILING_ENABLE),
    },

    plugins: [
      laravel({
        input: [
          'resources/css/app.css',
          'resources/js/app.js',
        ],
        refresh: true,
      }),
    ],
  }
})
