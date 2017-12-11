/* eslint-env node, mocha */

const expect = require('chai').expect
const db = require('../../../src/models/contacts')
const resetDB = require('../../helpers/db').resetContacts

describe('src/models/db.js Integration Tests', () => {
  describe('findAll()', () => {
    beforeEach(() => resetDB())
    it('should return 3 rows', () => {
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
})
