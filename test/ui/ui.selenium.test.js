/* eslint-env node, mocha */
const { expect } = require('chai')
const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

const uri = 'http://localhost:3000'

// Setup Chrome Webdriver
const chromeCapabilities = webdriver.Capabilities.chrome()

const chromeOptions = {
  args: ['--headless']
}

chromeCapabilities.set('chromeOptions', chromeOptions)

const driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build()

driver.get(uri)
driver.getTitle()
  .then((title) => {
    console.log(title)
  })
driver.quit()