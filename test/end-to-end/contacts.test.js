/* eslint-env node, mocha */

const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../../src/models/contacts')
const resetDB = require('../helpers/db').resetContacts
const app = require('../../src/server')

const expect = chai.expect

chai.use(chaiHttp)
describe('End-to-End Tests', () => {
  describe('"/" GET Route', () => {
    beforeEach(() => resetDB())
    it('should return a status of 200', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          done()
        })
    })
    it('should contain an <h1> element containing "Contacts"', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.text).to.include('<h1>Contacts</h1>')
          done()
        })
    })
    it('should contain the list of contacts pulled from the database', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.text).to.include('<a class="contact-link" href="/contacts/3">')
          done()
        })
    })
  })

  describe('"/contacts/new" GET Route', () => {
    it('should return a status code of 200', (done) => {
      chai.request(app)
        .get('/contacts/new')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          done()
        })
    })
    it('should contain an <h1> element containing "New Contacts"', (done) => {
      chai.request(app)
        .get('/contacts/new')
        .end((err, res) => {
          expect(res.text).to.include('<h1>New Contact</h1>')
          done()
        })
    })
  })

  describe('"/contacts" POST Route', () => {

  })

  describe('"/contacts/:contactid" Routes', () => {
    describe('GET', () => {

    })
    describe('DELETE', () => {

    })
  })

  describe('"/search" Route', () => {

  })
})