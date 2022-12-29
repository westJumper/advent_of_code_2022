function parseInput(lines) {
  var valvesMap = new Map();
  var valvesFlow = new Map();
  var valvesList = []
  var valvesWithFlow = []

  lines.forEach(function (line) {
    var currentPosition = line.split(" ")[1];
    var openFlowRate = Number(line.split(";")[0].split("=")[1]);
    var nextPossiblePositions = [];
    if (line.split(" valves ").length == 1) {
      nextPossiblePositions = [line.split(" valve ")[1]];
    } else {
      nextPossiblePositions = line.split(" valves ")[1].split(", ");
    }

    valvesMap.set(currentPosition, nextPossiblePositions);
    valvesFlow.set(currentPosition, openFlowRate);
    valvesList.push(currentPosition)
    if(openFlowRate != 0){
      valvesWithFlow.push(currentPosition)
    }
  });
  return [valvesMap, valvesFlow, valvesList, valvesWithFlow];
}

// this could be possibly enhanced with map of already known positions/distances so that we do not have to repeat it
function calculateClosestDistanceBetweenTwoPoints(currentValve, targetValve) {
  // bfs algorithm - one step at a time from beginning until reach the goal, then break and note the value
  // eg: one step from AA can move to DD, II and BB, one step from these positions can lead to CC, AA, EE then AA, JJ and CC, AA (we do not move where we already were)
  let visitedValves = [];
  let queuedValves = [currentValve];
  let distance = 0;

  while (queuedValves.length > 0) {
    let temporaryQueue = [];

    for (let valve of queuedValves) {
      // check only if the valve was not yet visited
      if (visitedValves.indexOf(valve) == -1) {
        visitedValves.push(valve); // add the valve we will step to to visited
        if (valve == targetValve) return distance; // if we are at the targetValve return the distance (closest distance)
        for (let neighbor of valvesMap.get(valve)) {
          temporaryQueue.push(neighbor); // add all neighbors of the next step to temporary queue as then next step
        }
      }
    }

    queuedValves = temporaryQueue; // move all next steps to current queue
    distance++;

  }
};

function getDistancesMap(valvesList){
var distancesMap = new Map()

valvesList.forEach(function(valve){
  var distancesFromCurrentValve = new Map()

  valvesList.filter(valvesMapValve => valve != valvesMapValve)
        .forEach(neighborValve => {
            if(valvesFlow.get(neighborValve) != 0){ // optimization - we do not want the paths to valves with 0 flow (this optimization solved the issue of performance - without it code run for two minutes and then I stopped it, with this optimization it completed immediately)
              distancesFromCurrentValve.set(neighborValve, calculateClosestDistanceBetweenTwoPoints(valve, neighborValve))
            }
          })

   distancesFromCurrentValve = new Map([...distancesFromCurrentValve.entries()].sort(function(a,b){
    return a[1] - b[1]
   }));

      distancesMap.set(valve, distancesFromCurrentValve)
})

return distancesMap
}

// depth-first search with keeping maximum time (dfs is a recursive function)
// apparently this could be optimised to keep track of the dfs results and use it in case we have the same input files (in other words cache it) but it is not necessary for this first part
function dfs(time, valve, openedValves){
    maxval = 0
    for (let [neighbor, timeToTravelToNeighbor] of distancesMap.get(valve)){ // loop through neighbors, not through all distances map
        if(openedValves.indexOf(neighbor) != -1){
          continue
        }
        var remainingTime = time - timeToTravelToNeighbor - 1 // this took me the longest (I did not define it as var but only remainingTime - this made it global and messed up with calculations as each recursive call changed the original value as well)
        if(remainingTime <= 0){
          continue
        }
        var openedAfter = JSON.parse(JSON.stringify(openedValves))
        openedAfter.push(neighbor)
        //console.log(maxval)
        maxval = Math.max(maxval, dfs(remainingTime, neighbor, openedAfter) + valvesFlow.get(neighbor) * remainingTime) 
      }
    return maxval
}

// start processing
const fs = require("fs");
var inputFile = "input.txt";
const lines = fs.readFileSync(inputFile, "utf8").split("\r\n");

var [valvesMap, valvesFlow, valvesList, valvesWithFlow] = parseInput(lines);
var distancesMap = getDistancesMap(valvesList)

// Solution 2 description (thinking)
// create and try all different combinations of opening valves for me and elephant
// when I try one combination elephant tries oposite combination (this means we can only try half of the combinations because other half would be the same just vice versa for me and elephant)
// if we run this for all possible combination we should find out which combination sums up and gives us maximum possible

// combination approach taken from https://codereview.stackexchange.com/questions/7001/generating-all-combinations-of-an-array
// I took the question approach because it does not store everything in array and does not do it recursively (this saves space)
var combination = [];
var combinationsLenght = Math.pow(2, valvesWithFlow.length) / 2 // we can compare only half of the combinations - explanation above
var maximum = 0
console.log("Number of iterations to go through: " + combinationsLenght)
console.log("-----------------------")

for (var i = 0; i < combinationsLenght ; i++){
  if(i % 1000 == 0){
    console.log("After iteration: " + i)
    console.log("Maximum so far: " + maximum)
    console.log("------------------------")
  }  
  combination= []
    for (var j=0;j<valvesWithFlow.length;j++) {
        if ((i & Math.pow(2,j))){ 
            combination.push(valvesWithFlow[j])
        }
    }
    if (combination !== "") {
        var opositeCombination = valvesWithFlow.filter( function( el ) { // for each combination create oposite consisting of remaining values
            return combination.indexOf( el ) < 0;
        });

        maximum = Math.max(maximum, dfs(26, "AA", combination) + dfs(26, "AA", opositeCombination))

        combination = []
    }
}

console.log("Solution to part 2: " + maximum)