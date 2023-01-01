function parseInput (lines) {
  var cubes = new Set()
  lines.forEach(function (line) {
    var cube = {
      x: Number(line.split(',')[0]),
      y: Number(line.split(',')[1]),
      z: Number(line.split(',')[2])
    }
    var cubeString = line
    cubes.add(cubeString)
  })
  return cubes
}

// start processing
const fs = require('fs')
var inputFile = 'input.txt'
const lines = fs.readFileSync(inputFile, 'utf8').split('\r\n')

var cubes = parseInput(lines)
var visibleSides = cubes.size * 6
var touching = 0

cubes.forEach(function (value) {
  var [x, y, z] = value.split(',').map(Number)
  if (cubes.has([x + 1, y, z].join())) touching++
  if (cubes.has([x - 1, y, z].join())) touching++
  if (cubes.has([x, y + 1, z].join())) touching++
  if (cubes.has([x, y - 1, z].join())) touching++
  if (cubes.has([x, y, z + 1].join())) touching++
  if (cubes.has([x, y, z - 1].join())) touching++
})

console.log('Visible sides: ' + visibleSides)
console.log('Touching: ' + touching)
console.log('Result: ' + (visibleSides - touching))
