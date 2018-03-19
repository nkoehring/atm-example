const colors = require('colors/safe')
const chevron = colors.bold.yellow('›')

module.exports = {
  colors,
  chevron,
  // red error message with details of the failed comparision
  errorMsg (title, expected, actual) {
    console.log(colors.red(`FAILED ${title.toUpperCase()}`))

    if (arguments.length === 4) {
      expected = JSON.stringify(expected)
      actual = JSON.stringify(actual)
      console.log(`  Expected  ${expected}\n  but got   ${actual}`)
    }
  },
  // green success message
  successMsg (s) {
    const message = colors.green(s)
    console.log(message)
  },
  // ATTENTION: only a shallow equality function
  arrayEq (ary1, ary2) {
    const a = [].concat(ary1).sort()
    const b = [].concat(ary2).sort()

    if (a.length !== b.length) return false

    for (let i in a) {
      if (a[i] !== b[i]) return false
    }

    return true
  }
}
