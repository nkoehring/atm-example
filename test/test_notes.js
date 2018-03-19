const { test, runTests } = require('./factory')
const notes = require('../src/notes')
const N = 1000

function sumSplitNotes (values) {
  let sum = 0
  for (note in values) {
    if (note !== 'rest') sum += note * values[note]
  }
  return sum + values.rest
}

function sumList (values) {
  let sum = 0
  for (v of values) sum += v
  return sum
}

function isValidSplit (value, result) {
  return typeof result === "object" && sumSplitNotes(result) === value
}

function generateAmount (i) {
  if (i % 2) { // make sure to have lots of reasonable values like 20, 50, 80
    return 10 + Math.round(Math.random() * 10) * 10
  } else {
    return Math.round(Math.random() * 100)
  }
}

function generateNotes () {
  return {
    100: Math.round(Math.random() * 10),
    50: Math.round(Math.random() * 10),
    20: Math.round(Math.random() * 10),
    10: Math.round(Math.random() * 10),
    rest: 0
  }
}

function isValidList (value, result) {
  return sumSplitNotes(value) === sumList(result)
}

// USAGE: test(name, functionToTest, valueGenerator, resultChecker)
test('splitNotes', notes.splitNotes, generateAmount, isValidSplit)
test('listOfNotes', notes.listOfNotes, generateNotes, isValidList)
runTests()
