function parseInput (lines) {
  var allLines = new Map()
  lines.forEach(function (line, index) {
    if (!Number.isNaN(Number(line[6]))) {
      allLines.set(line.split(':')[0], Number(line.split(': ')[1]))
    } else {
      allLines.set(line.split(':')[0], line.split(': ')[1])
    }
  })
  return allLines
}

// start processing
const fs = require('fs')
var inputFile = 'input.txt'
const lines = fs.readFileSync(inputFile, 'utf8').split('\r\n')

var allLines = parseInput(lines)
console.log(getResultFor('root', allLines))

function getResultFor (key, allLines) {
  var currentValue = allLines.get(key)

  if (typeof currentValue == 'number') {
    return currentValue
  } else {
    var leftSide = currentValue.split(' ')[0]
    var operation = currentValue.split(' ')[1]
    var rightSide = currentValue.split(' ')[2]
    var investigate = [leftSide, rightSide]
    var afterInvestigation = investigate.map(function (investigateKey) {
      return getResultFor(investigateKey, allLines)
    })

    allLines.set(
      key,
      eval(afterInvestigation[0] + operation + afterInvestigation[1])
    )
  }

  return allLines.get(key)
}
