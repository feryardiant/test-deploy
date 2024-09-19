import { resolve } from 'node:path'
import laravel from 'laravel-vite-plugin'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', ['APP', 'SENTRY', 'VITE'])
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
