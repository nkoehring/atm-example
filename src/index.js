const restify = require('restify')
const errors = require('restify-errors')
const notes = require('./notes')

const NotFoundError = errors.NotFoundError
const InvalidArgumentError = errors.InvalidArgumentError

const server = restify.createServer({
  name: 'cash-mashine',
  version: '0.0.1'
})

server.get('/withdraw/:amount', function (req, res, next) {
  const amount = Number.parseInt(req.params.amount)
  if (Number.isFinite(amount) && amount >= 0) {
    const result = notes.splitNotes(amount)

    if (result.rest === 0) {
      res.status(200)
      res.send(notes.listOfNotes(result))
    } else {
      return next(new NotFoundError('Amount needs to be dividable by 10.'))
    }
  } else {
    return next(new InvalidArgumentError('Amount missing.'))
  }

  return next()
})

if (module.parent === null) { // only run if directly executed
  server.listen(1234, _ => {
    console.log('%s listening at %s', server.name, server.url)
  })
} else {
  module.exports = server
}
