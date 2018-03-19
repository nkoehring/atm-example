const { chevron, colors } = require('./helper')
let tests = []

function test (name, functionToTest, valueGenerator, resultChecker) {
  const testFunc = function (samples) {
    const failures = []

    for (let i = 0; i < samples; i++) {
      const value = valueGenerator(i, samples)
      const result = functionToTest(value)
      const isValid = resultChecker(value, result)

      if (!isValid) failures.push({value, result})
    }

    return failures
  }

  tests.push({name, testFunc})
}

function runTests (samples = 1000) {
  tests.forEach(entry => {
    const { name, testFunc } = entry

    process.stdout.write(`${chevron} Running test "${name}" with ${samples} samples… `)
    const failures = testFunc(samples)

    if (failures.length) {
      console.log(colors.red('FAILED'))
      console.log(colors.yellow(`${failures.length}/${samples} unsuccessful for ${name}`))
      console.log(failures)
    } else {
      console.log(colors.green('OK'))
    }
  })
}

module.exports = { test, runTests }
