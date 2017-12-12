/* eslint-env node, mocha */

const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../../src/models/contacts')
const resetDB = require('../helpers/db').resetContacts
const app = require('../../src/server')

const expect = chai.expect

chai.use(chaiHttp)
describe('Contacts End-to-End Tests', () => {
// Begin End-to-End Tests with Callbacks
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
  // Begin End-to-End Tests with Promises
  describe('"/contacts" POST Route', () => {
    beforeEach(() => resetDB())
    it('should return a status code of 200', () => {
      return chai.request(app)
        .post('/contacts')
        .type('form')
        .send({
          _method: 'post',
          first_name: 'Joshua',
          last_name: 'Elder',
        })
        .then((res) => {
          expect(res).to.have.status(200)
        })
    })
    it('should insert a new contact into the database', () => {
      return chai.request(app)
        .post('/contacts')
        .type('form')
        .send({
          _method: 'post',
          first_name: 'Joshua',
          last_name: 'Elder',
        })
        .then(() => {
          return db.findById(4)
            .then((newContact) => {
              expect(newContact.first_name).to.equal('Joshua')
            })
        })
    })
  })

  describe('"/contacts/:contactid" Routes', () => {
    describe('GET', () => {
      beforeEach(() => resetDB())
      it('should return status code 200', () => {
        return chai.request(app)
          .get('/contacts/1')
          .then((res) => {
            expect(res).to.have.status(200)
          })
      })
      it('should render contact information for the specified ID', () => {
        return chai.request(app)
          .get('/contacts/1')
          .then((res) => {
            expect(res.text).to.include('<h1>Jared&nbsp;Grippe</h1>')
          })
      })
    })
    describe('DELETE', () => {
      beforeEach(() => resetDB())
      it('should return status code 200', () => {
        return chai.request(app)
          .del('/contacts/1')
          .then((res) => {
            expect(res).to.have.status(200)
          })
      })
      it('should redirect to the "/" route', () => {
        return chai.request(app)
          .del('/contacts/1')
          .then((res) => {
            expect(res.text).to.include('<h1>Contacts</h1>')
          })
      })
      it('should redirect to the "/" route with the contact removed', () => {
        return chai.request(app)
          .del('/contacts/1')
          .then((res) => {
            expect(res.text).to.not.include('Jared&nbsp;Grippe') 
          })
      })
    })
  })

  describe('"/search" Route', () => {
    beforeEach(() => resetDB())
    it('should return status code 200', () => {
      return chai.request(app)
        .get('/contacts/search')
        .query({ q: 'Jared' })
        .then((res) => {
          expect(res).to.have.status(200)
        })
    })
    it('should render the "contacts/index" page', () => {
      return chai.request(app)
        .get('/contacts/search')
        .query({ q: 'Jared' })
        .then((res) => {
          expect(res.text).to.include('<h1>Contacts</h1>')
        })
    })
    it('should only show results for the query', () => {
      return chai.request(app)
        .get('/contacts/search')
        .query({ q: 'Jared' })
        .then((res) => {
          expect(res.text).to.not.include('NeEddra&nbsp;James')
          expect(res.text).to.include('Jared&nbsp;Grippe')
        })
    })
  })
})