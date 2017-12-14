/* eslint-env node, mocha */
const chai = require('chai')
const casperChai = require('casper-chai')

const expect = chai.expect

chai.use(casperChai)

describe('UI Tests', function() {
  describe('"/" Page', function() {
    before(function() {
      casper.start('http://localhost:3000')
    })
    it('should have an element in DOM', function() {
      casper.waitForSelector('.page-column-content', function() {
        expect('.page-column-content'.should.be.inDOM)
      })
    })
  })
})