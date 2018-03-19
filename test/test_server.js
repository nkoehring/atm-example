const { chevron, errorMsg, successMsg, arrayEq } = require('./helper')
const clients = require('restify-clients')
const TEST_VALUES = {
  '0': {status: 200, body: []},
  '80': {status: 200, body: [50, 20, 10]},
  'null': {status: 200, body: []},
  '85': {status: 404},
  '-120': {status: 409},
  'foo': {status: 409}
}

const client = clients.createJsonClient('http://localhost:1234')

function apiTest () {
  let promises = []

  Object.keys(TEST_VALUES).forEach(amount => {
    const expected = TEST_VALUES[amount]
    const promise = new Promise((resolve, reject) => {
      client.get(`/withdraw/${amount}`, function (err, req, res, obj) {
        let error = false
        process.stdout.write(`${chevron} Running API test for "/withdraw/${amount}"… `)

        if (res.statusCode != expected.status) {
          error = true
          reject({
            type: 'status',
            expectedValue: expected.status,
            actualValue: res.statusCode
          })
        }

        if (expected.body !== undefined && !arrayEq(obj, expected.body)) {
          error = true
          reject({
            type: 'body',
            expectedValue: expected.body,
            actualValue: obj
          })
        }

        resolve()
      })
    })

    promises.push(promise
      .then(_ => successMsg('OK'))
      .catch(err => {
        errorMsg(err.type, err.expectedValue, err.actualValue)
      })
    )
  })

  return Promise.all(promises)
}

module.exports = function runAPITests (server) {
  server.listen(1234, _ => {
    // unfortunately, Promise.finally is not yet supported in nodejs
    apiTest().then(_ => server.close()).catch(_ => server.close())
  })
}
