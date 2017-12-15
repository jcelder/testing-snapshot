/* eslint-env node, mocha */
const { expect } = require('chai')
const Nightmare = require('nightmarejs')
const db = require('../helpers/db')

describe('"/" Index', () => {
  beforeEach(() => {
    db.resetContacts()
      .then(() => {
        const nightmare = Nightmare()
      })
  })
  it('should find an element on the dom',)
})