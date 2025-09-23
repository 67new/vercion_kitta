import { defineConfig } from '@playwright/test'
import path from 'path'

// Resolve dist relative to the Playwright working directory
const dist = path.resolve(process.cwd(), '../VersionControl1/dist/spa')

export default defineConfig({
  testDir: './tests',
  use: {
    headless: true,
    baseURL: process.env.BASE_URL || 'http://localhost:4173',
  },
  // If BASE_URL is not provided, spin up a static server for built SPA
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npx http-server "${dist}" -p 4173 -s`,
        url: 'http://localhost:4173',
        reuseExistingServer: true,
        timeout: 60_000,
      },
})
