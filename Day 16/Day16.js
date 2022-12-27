function parseInput(lines) {
  var valvesMap = new Map();
  //var valvesMap1 = []
  var valvesFlow = new Map();
  //var valvesFlow = []
  var valvesList = []

  lines.forEach(function (line) {
    var currentPosition = line.split(" ")[1];
    var openFlowRate = Number(line.split(";")[0].split("=")[1]);
    var nextPossiblePositions = [];
    //nextPossiblePositions = line.replace(" valves "," valve ").split(" valves ")[1].split(", ")
    if (line.split(" valves ").length == 1) {
      nextPossiblePositions = [line.split(" valve ")[1]];
    } else {
      nextPossiblePositions = line.split(" valves ")[1].split(", ");
    }

    valvesMap.set(currentPosition, nextPossiblePositions);
    valvesFlow.set(currentPosition, openFlowRate);
    valvesList.push(currentPosition)
  });
  return [valvesMap, valvesFlow, valvesList];
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
            if(valvesFlow.get(neighborValve) != 0){ // optimize this, we do not want the paths to valves with 0 flow (this optimization solved the issue of performance - without it code run for two minutes and then I stopped it, with this optimization it completed immediately)
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

var [valvesMap, valvesFlow, valvesList] = parseInput(lines);
var distancesMap = getDistancesMap(valvesList)
console.log("Solution to 1: " + dfs(30, "AA", []))