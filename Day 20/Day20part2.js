function parseInput (lines, decryptionKey) {
  var original = new Array()
  var indexOfZero = ''
  lines.forEach(function (line, index) {
    if (line == '0') {
      indexOfZero = index + ';' + Number(line) * decryptionKey
    }
    original.push(index + ';' + Number(line) * decryptionKey) // cannot use set, duplicate numbers can appear
  })
  return [original, indexOfZero]
}

// start processing
const fs = require('fs')
var inputFile = 'input.txt'
const lines = fs.readFileSync(inputFile, 'utf8').split('\r\n')

var decryptionKey = 811589153
var mixinTimes = 10
var [original, indexOfZero] = parseInput(lines, decryptionKey)
var [mixin] = parseInput(lines, decryptionKey)
var originalLength = original.length - 1

var mixinCount = 0
while (mixinCount < mixinTimes) {
  var tempOrigin = JSON.parse(JSON.stringify(original))

  while (tempOrigin.length > 0) {
    var currentlyProcessing = tempOrigin.shift()
    var currentNumber = Number(currentlyProcessing.split(';')[1])
    var indexOld = mixin.indexOf(currentlyProcessing)
    var newIndexPosition =
      (indexOld + currentNumber + originalLength) % originalLength

    // remove currentNumber
    mixin.splice(indexOld, 1)

    // insert currentNumber to new index
    mixin.splice(newIndexPosition, 0, currentlyProcessing)
  }

  mixinCount++
}

var indexOfZero = mixin.indexOf(indexOfZero)

var first = mixin[(indexOfZero + 1000) % (originalLength + 1)]
var second = mixin[(indexOfZero + 2000) % (1 + originalLength)]
var third = mixin[(indexOfZero + 3000) % (1 + originalLength)]

console.log('index of 0: ' + indexOfZero)
console.log('1000th: ' + first)
console.log('2000th: ' + second)
console.log('3000th: ' + third)
console.log(
  'result 2: ' +
    (Number(first.split(';')[1]) +
      Number(second.split(';')[1]) +
      Number(third.split(';')[1]))
)
