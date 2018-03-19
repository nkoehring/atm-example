const ALLOWED_NOTES = [100, 50, 20, 10]

function splitNotes (desired_amount) {
  const output = {}
  let rest = desired_amount

  for (let note of ALLOWED_NOTES) {
    output[note] = Math.floor(rest / note)
    rest -= output[note] * note
  }

  return {rest, ...output}
}

function listOfNotes (notes) {
  let output = []

  for (let note in notes) {
    if (note !== 'rest') {
      let n = notes[note]
      while (n--) output.push(Number.parseInt(note))
    }
  }

  return output
}

module.exports = { splitNotes, listOfNotes }
