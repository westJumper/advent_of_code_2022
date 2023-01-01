function parseInput (lines) {
  var original = new Array()
  lines.forEach(function (line, index) {
    original.push(index + ';' + Number(line)) // cannot use set, duplicate numbers can appear
  })
  return original
}

// start processing
const fs = require('fs')
var inputFile = 'input.txt'
const lines = fs.readFileSync(inputFile, 'utf8').split('\r\n')

var original = parseInput(lines)
var mixin = parseInput(lines)

var originalLength = original.length - 1

while (original.length > 0) {
  var currentlyProcessing = original.shift()
  var currentNumber = Number(currentlyProcessing.split(';')[1])
  var indexOld = mixin.indexOf(currentlyProcessing)
  var newIndexPosition =
    (indexOld + currentNumber + originalLength) % originalLength
  // remove currentNumber
  mixin.splice(indexOld, 1)

  // insert currentNumber to new index
  mixin.splice(newIndexPosition, 0, currentNumber)
}

var indexOfZero = mixin.indexOf(0)

var first = mixin[(indexOfZero + 1000) % (originalLength + 1)]
var second = mixin[(indexOfZero + 2000) % (1 + originalLength)]
var third = mixin[(indexOfZero + 3000) % (1 + originalLength)]

console.log('index of 0: ' + indexOfZero)
console.log('1000th: ' + first)
console.log('2000th: ' + second)
console.log('3000th: ' + third)
console.log('result 1: ' + (first + second + third))
