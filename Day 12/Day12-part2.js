const f = require("fs");
const readline = require("readline");
var inputFile = "input.txt";

var reader = readline.createInterface({
  input: f.createReadStream(inputFile),
});

// parse input
var grid = [];

// start from S, end is E
var startCharacter = "S";
var startCharacterHeightOnGrid = "a".charCodeAt(0);
var endCharacter = "E";
var endCharacterHeightOnGrid = "z".charCodeAt(0);
var endPositionX;
var endPositionY;

var startingPositions = []
var stepsFromAs = []

// create grid and set starting position
reader.on("line", function (line) {
  var lineCharacters = line.split("");
  var lineCharactersNumbers = lineCharacters.map(function (character, index) {
    var characterASCII = character.charCodeAt(0);

    if (character == startCharacter) {
      //visitedPositions.push({ x: index, y: grid.length, height: startCharacterHeightOnGrid});
      //queue.push({ x: index, y: grid.length, height: startCharacterHeightOnGrid});
      startingPositions.push({
        visitedPositions: { x: index, y: grid.length, height: startCharacterHeightOnGrid},
        queue:            { x: index, y: grid.length, height: startCharacterHeightOnGrid}
      })
      return startCharacterHeightOnGrid;
    }
    if(character == "a"){
      startingPositions.push({
        visitedPositions: { x: index, y: grid.length, height: startCharacterHeightOnGrid},
        queue:            { x: index, y: grid.length, height: startCharacterHeightOnGrid}
      })
    }
    if (character == endCharacter) {
      endPositionX = index;
      endPositionY = grid.length;
      return endCharacterHeightOnGrid;
    }

    return characterASCII;
  });
  grid.push(lineCharactersNumbers);
});

// after file is read through
reader.on("close", function () {

  startingPositions.forEach(function(start){

  var visitedPositions = [start.visitedPositions];
  var queue = [start.queue];
  
  // both variables serve for calculating number of steps
  // temporaryQueue holds all next steps positions that are counted as one
  // once queue is empty we move all possible steps from temporaryQueue to queue and increasse stepsCounter
  var temporaryQueue = [];
  var stepsCounter = 0;

  // travel until no possible step
  while (queue.length > 0) {
    var route = queue.shift();
    var currentPositionX = route.x;
    var currentPositionY = route.y;
    var currentPositionHeight = grid[currentPositionY][currentPositionX];

    // find all neighbours of current node
    var nextPossiblePositions = [];
    // left and right
    if (currentPositionX == 0) {
      // move only right
      nextPossiblePositions.push({
        x: currentPositionX + 1,
        y: currentPositionY,
        height: grid[currentPositionY][currentPositionX + 1],
      });
    } else if (currentPositionX == grid[0].length - 1) {
      // move only left
      nextPossiblePositions.push({
        x: currentPositionX - 1,
        y: currentPositionY,
        height: grid[currentPositionY][currentPositionX - 1],
      });
    } else {
      // move right
      nextPossiblePositions.push({
        x: currentPositionX + 1,
        y: currentPositionY,
        height: grid[currentPositionY][currentPositionX + 1],
      });
      // move left
      nextPossiblePositions.push({
        x: currentPositionX - 1,
        y: currentPositionY,
        height: grid[currentPositionY][currentPositionX - 1],
      });
    }

    // up and down
    if (currentPositionY == 0) {
      // move only up
      nextPossiblePositions.push({
        x: currentPositionX,
        y: currentPositionY + 1,
        height: grid[currentPositionY + 1][currentPositionX],
      });
    } else if (currentPositionY == grid.length - 1) {
      // move only down
      nextPossiblePositions.push({
        x: currentPositionX,
        y: currentPositionY - 1,
        height: grid[currentPositionY - 1][currentPositionX],
      });
    } else {
      // move only up
      nextPossiblePositions.push({
        x: currentPositionX,
        y: currentPositionY + 1,
        height: grid[currentPositionY + 1][currentPositionX],
      });
      // move only down
      nextPossiblePositions.push({
        x: currentPositionX,
        y: currentPositionY - 1,
        height: grid[currentPositionY - 1][currentPositionX],
      });
    }

    // remove positions that were already visited
    nextPossiblePositions = nextPossiblePositions.filter(function (position) {
      return !visitedPositions.some(function (visitedPosition) {
        return (
          visitedPosition.x == position.x && visitedPosition.y == position.y
        );
      });
    });

    // remove positions that are too heigh to step from current position
    nextPossiblePositions = nextPossiblePositions.filter(function (position) {
      return currentPositionHeight + 1 >= grid[position.y][position.x]; // this is for lower to higher
    });

    // add to visited positions and temporary queue
    nextPossiblePositions.forEach(function (position) {
      visitedPositions.push(position);
      temporaryQueue.push(position);
    });

    // if queue is empty we go to next step (new array of neighbours)
    if (queue.length == 0) {
      stepsCounter++; // add one to next steps (all that are in temporaryQueue are next step)

      // if there is a finish in temporary queue we found the number of minimum steps to reach it
      temporaryQueue.forEach(function (position) {
        if (position.x == endPositionX && position.y == endPositionY) {
          stepsFromAs.push(stepsCounter)
        }
      });

      // push all next steps from temporary queue to our queue
      temporaryQueue.forEach(function (tempPosition) {
        queue.push(tempPosition);
      });
      temporaryQueue = [];
    
    }
  }
  })

  stepsFromAs.sort()
  console.log(stepsFromAs) // first value is the result

});