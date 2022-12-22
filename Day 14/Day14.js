const fs = require("fs");
var inputFile = "input.txt";
const lines = fs.readFileSync(inputFile, 'utf8').split("\n")

var occupiedPositions = addRocks(lines) // for calculations
var rocks = addRocks(lines) // for display only
var sands = [] // for display only
var sandStart = [500, 0]
var overflowXPositionLeft = Math.min(...occupiedPositions.map((position) => Number(position[0])))
var overflowXPositionRight = Math.max(...occupiedPositions.map((position) => Number(position[0])))
var overflowYPosition = Math.max(...occupiedPositions.map((position) => Number(position[1])))
//displayCave(rocks, sands, [0,0]) // display without sand
releaseSandFlow(sandStart, overflowXPositionLeft, overflowXPositionRight, overflowYPosition)

// functions

function addRocks(lines){
var rocks = []
lines.forEach((line) => {
  var positions = line.split(" -> ")
  positions.forEach((position, index, array) => {
    if(index<array.length-1){
      var startPosition = {x: Number(position.split(",")[0]), y: Number(position.split(",")[1])}
      var endPosition = {x: Number(array[index+1].split(",")[0]), y: Number(array[index+1].split(",")[1])} 
      var xStart = Math.min(startPosition.x, endPosition.x)
      var xEnd = Math.max(startPosition.x, endPosition.x)
      var yStart = Math.min(startPosition.y, endPosition.y)
      var yEnd = Math.max(startPosition.y, endPosition.y)

      for(x = xStart; x <= xEnd; x++){
        rocks.push([x, yStart])
      }

      for(y = yStart; y <= yEnd; y++){
        rocks.push([xStart, y])
      }
    }
  })
})

return rocks
}

function releaseSandFlow(start, overflowXPositionLeft, overflowXPositionRight, overflowYPosition){

  var sandInGrid = true
  var sandPath = []
  var trackPath = true

  var currentSandPosition = start

  // repeat release sand until sand falls in void
  while(sandInGrid) { 

    // after sand cannot move anymore either use last possible start if there is a space to move or take previous position from tracked path
    if(!trackPath) {
      var can = sandCanMoveToPosition(sandPath[sandPath.length-1], occupiedPositions)
      if(can.length == 0){
        currentSandPosition = sandPath.pop()
      } else {
        currentSandPosition = sandPath[sandPath.length-1]
      }
    }

    // one unit
    var sandCanMove = true
    while(sandCanMove){

      var positionToMove = sandCanMoveToPosition(currentSandPosition, occupiedPositions)

      // sand cannot move
      if(positionToMove.length == 0){ 
        trackPath = false // no longer track path (track only for first grain)
        sands.push(currentSandPosition)
        occupiedPositions.push(currentSandPosition)
        sandCanMove = false; 
      } else {
        // move to next position
        if(trackPath) sandPath.push(currentSandPosition)
        currentSandPosition = positionToMove
      }

      // overflow?
      if(positionToMove[0] < overflowXPositionLeft || positionToMove[0] > overflowXPositionRight || positionToMove[1] > overflowYPosition){
        sandCanMove = false;
        sandInGrid = false
      }

      //displayCave(rocks , sands, currentSandPosition) // display each step of a grain
    }

    //displayCave(rocks , sands, currentSandPosition) // display after one grain is placed
  }

  displayCave(rocks , sands, currentSandPosition) // display final result

  console.log("sand count when one grain falls to void (result of solution 1): " + sands.length)
}


function sandCanMoveToPosition(currentSandPosition, occupiedPositions){
      var stepDown = [currentSandPosition[0], currentSandPosition[1]+1]
      var stepDownLeft = [currentSandPosition[0]-1, currentSandPosition[1]+1] 
      var stepDownRight = [currentSandPosition[0]+1, currentSandPosition[1]+1] 

      var bottomIsOccupied = occupiedPositions.some((position) => {
        return position[0] == stepDown[0] && position[1] == stepDown[1]
      })
      var bottomLeftIsOccupied = occupiedPositions.some((position) => {
        return position[0] == stepDownLeft[0] && position[1] == stepDownLeft[1]
      }) 
      var bottomRightIsOccupied = occupiedPositions.some((position) => {
        return position[0] == stepDownRight[0] && position[1] == stepDownRight[1]
      }) 

      if(!bottomIsOccupied) return stepDown
      if(!bottomLeftIsOccupied) return stepDownLeft
      if(!bottomRightIsOccupied) return stepDownRight
      return []
}

function displayCave(rocks, sands, currentSandPosition){
  var allX = rocks.map((rock) => Number(rock[0]))
  var allY = rocks.map((rock) => Number(rock[1]))
  var minX = Math.min(...allX)
  var maxX = Math.max(...allX)
  var minY = Math.min(...allY)
  var maxY = Math.max(...allY)

  var lines = []
  for(y=0;y<=maxY;y++){
    var line = []
    for(x=minX;x<=maxX;x++){
      if(rocks.some((rock) => {return rock[0] == x && rock[1] == y})){
        line.push("#")
      } else if (x == 500 && y == 0) {
        line.push("+")
      } else if (sands.some((sand) => {return sand[0] == x && sand[1] == y})) {
        line.push("o")
      } else if (currentSandPosition[0] == x && currentSandPosition[1] == y) {
        line.push("&")
      } else {
        line.push(".")
      }
    }
    lines.push(line)
  }

  lines.forEach((line, index) => {
    console.log(index + " " + line.join(" "))
  })
  console.log("---------------------")
}

