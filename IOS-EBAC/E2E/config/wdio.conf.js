import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')

export const config = {
  runner: 'local',
  rootDir: ROOT,
  specs: [path.join(ROOT, 'testes/test_*.js')],
  maxInstances: 1,

  // Sauce Labs (Nota: o .app de simulador do curso é só Intel e o Sauce só tem simulador ARM)
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  region: process.env.SAUCE_REGION || 'us-west-1',
  services: ['sauce'],

  capabilities: [{
    platformName: 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:deviceName': process.env.IOS_DEVICE || 'iPhone.*',
    'appium:app': 'storage:filename=LojaEBAC.ipa',
    'appium:autoAcceptAlerts': true,
    'appium:newCommandTimeout': 240,
    'appium:waitForIdleTimeout': 0, // a Home tem carrossel animado: não esperar a tela "parar"
    'sauce:options': {
      appiumVersion: 'latest',
      build: process.env.SAUCE_BUILD || `EBAC Store iOS - ${new Date().toISOString().slice(0, 16)}`
    }
  }],

  logLevel: 'warn',
  outputDir: path.join(ROOT, 'logs'),
  waitforTimeout: 15000,
  connectionRetryTimeout: 180000,
  connectionRetryCount: 2,

  framework: 'mocha',
  mochaOpts: { ui: 'bdd', timeout: 5 * 60 * 1000 },
  reporters: [
    'spec',
    ['allure', { outputDir: path.join(ROOT, 'allure-results'), disableWebdriverStepsReporting: true }]
  ],

  // Relatório e screenshots só da execução atual
  onPrepare: () => {
    fs.rmSync(path.join(ROOT, 'allure-results'), { recursive: true, force: true })
    fs.rmSync(path.join(ROOT, 'screenshots'), { recursive: true, force: true })
  },

  before: async () => {
    await driver.updateSettings({ snapshotMaxDepth: 60, customSnapshotTimeout: 20 })
  },

  afterTest: async (test, _context, { passed }) => {
    if (passed) return
    const dir = path.join(ROOT, 'screenshots')
    fs.mkdirSync(dir, { recursive: true })
    await browser.saveScreenshot(path.join(dir, `${test.title.replace(/[^\w-]+/g, '_')}.png`)).catch(() => {})
  }
}
