/* eslint-env node, mocha */

const expect = require('chai').expect
const db = require('../../../src/models/contacts')
const resetDB = require('../../helpers/db').resetContacts

describe('src/models/db.js Integration Tests', () => {
  describe('findAll()', () => {
    beforeEach(() => resetDB())
    it('should return 3 rows as an array', () => {
      return db.findAll()
        .then((results) => {
          expect(results).to.be.an('array').with.length(3)
        })
    })
    it('should have a matching object in position 1 of the returned array', () => {
      return db.findAll()
        .then((results) => {
          const testObject = {
            id: 1,
            first_name: 'Jared',
            last_name: 'Grippe',
          }
          expect(results[0]).to.be.an('object').that.deep.equals(testObject)
        })
    })
  })
  describe('findById(contactId)', () => {
    const testId = 2
    const testObject = {
      id: 2,
      first_name: 'Tanner',
      last_name: 'Welsh',
    }
    beforeEach(() => resetDB())
    it('should return 1 row as an object when given an id', () => {
      return db.findById(testId)
        .then((results) => {
          expect(results).to.be.an('object')
        })
    })
    it('should have a matching object when given an id', () => {
      return db.findById(testId)
        .then((results) => {
          expect(results).to.deep.equal(testObject)
        })
    })
  })
})
