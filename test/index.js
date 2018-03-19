console.log('UNIT TESTS')
require('./test_notes')

console.log('API TESTS')
const server = require('../src')
const runAPITests = require('./test_server')

runAPITests(server)
