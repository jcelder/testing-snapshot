/**
 * Database integration testing helper module
 * @module test/helpers/db.js
 */
const db = require('../../src/models/db/db')

/**
 * Truncates the 'contacts' table and restarts the index
 * @returns {Promise} - Promise whose resolution value is irrelevant
 */
const truncateContacts = () => db.any('TRUNCATE TABLE contacts RESTART IDENTITY')

/**
 * Reseeds the 'contacts' table with test values
 * @returns {Promise} - Promise whose resolution value is irrelevant
 */
const seedContacts = () => db.any(`
  INSERT INTO
    contacts (first_name, last_name)
  VALUES
    ('Jared', 'Grippe'),
    ('Tanner', 'Welsh'),
    ('NeEddra', 'James')
`)

/**
 * Truncates and reseeds the 'contacts' table
 * @returns {Promise} - Promise whose resolution value is irrelevant
 */
const resetContacts = () => truncateContacts().then(() => seedContacts())

module.exports = { resetContacts }
