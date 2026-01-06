const { defineConfig } = require('@playwright/experimental-ct-react')
const path = require('path')

const resolvePath = relative => path.resolve(__dirname, relative)

module.exports = defineConfig({
  testDir: './tests/components',
  timeout: 20_000,
  snapshotDir: './tests/__screenshots__',
  use: {
    ctPort: 12100,
    ctViteDevServerOptions: { hmr: false },
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    headless: true,
  },
  ctViteConfig: {
    resolve: {
      alias: {
        '@': resolvePath('./src'),
        'next/link': resolvePath('./tests/mocks/next-link.jsx'),
      },
    },
    css: {
      preprocessorOptions: {
        postcss: true,
      },
    },
  },
  reporter: [['list']],
  webServer: undefined,
  metadata: {
    component: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
})
