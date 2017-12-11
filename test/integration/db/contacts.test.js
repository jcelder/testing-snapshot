/* eslint-env node, mocha */

const expect = require('chai').expect
const db = require('../../../src/models/contacts')
const resetDB = require('../../helpers/db').resetContacts

describe('src/models/db.js Integration Tests', () => {

  describe('create(contact)', () => {
    const testContact = {
      first_name: 'Joshua',
      last_name: 'Elder',
    }
    beforeEach(() => resetDB())
    it('should return 1 row as an array', () => {
      return db.create(testContact)
        .then((newContact) => {
          expect(newContact).to.be.an('array')
        })
    })
    it('should return matching object in position 0 of the array', () => {
      const contactObject = {
        id: 4,
        first_name: 'Joshua',
        last_name: 'Elder',
      }
      return db.create(testContact)
        .then((newContact) => {
          expect(newContact[0]).to.deep.equal(contactObject)
        })
    })
  })
  describe('findAll()', () => {
    beforeEach(() => resetDB())
    it('should return 3 rows as an array', () => {
      return db.findAll()
        .then((results) => {
          expect(results).to.be.an('array').with.length(3)
        })
    })
    it('should have a matching object in position 0 of the returned array', () => {
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

  describe('destroy(contactId)', () => {
    const testContactId = 1
    beforeEach(() => resetDB())
    it('should return 2 rows as an array', () => {
      return db.destroy(testContactId)
        .then(() => db.findAll())
        .then((results) => {
          expect(results).to.be.an('array').with.length(2)
        })
    })
    it('should return have an object with id of 2 in the 0 position of the returned array', () => {
      return db.destroy(testContactId)
        .then(() => db.findAll())
        .then((results) => {
          expect(results[0].id).to.equal(2)
        })
    })
  })

  describe('search(searchQuery)', () => {
    const testSearchQuery = 'Jared'
    const testSearchQueryUpperCase = 'Jared'
    const matchingObject = {
      id: 1,
      first_name: 'Jared',
      last_name: 'Grippe',
    }
    beforeEach(() => resetDB())
    it('should return an array', () => {
      return db.search(testSearchQuery)
        .then((results) => {
          expect(results).to.be.an('array')
        })
    })
    it('should return a matching object in position 0 of the array', () => {
      return db.search(testSearchQuery)
        .then((results) => {
          expect(results[0]).to.deep.equal(matchingObject)
        })
    })
    it('should return a matching object in position 0 of the array regardless of case', () => {
      return db.search(testSearchQueryUpperCase)
        .then((results) => {
          expect(results[0]).to.deep.equal(matchingObject)
        })
    })
  })
})

