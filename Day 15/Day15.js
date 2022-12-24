const fs = require("fs");
var inputFile = "input.txt";
const lines = fs.readFileSync(inputFile, 'utf8').split("\n")


var inspectLineY = 2000000
var sensors = findAllSensorsWithNoBeaconPerimeter(lines)
var beacons = listAllBeacons(lines)
var maxDistance = getMaxDistanceFromSensorToBeacon(sensors)
var minX = findXStartOfMap(sensors, beacons) - maxDistance // deduct max distance to cover all necessary area
var maxX = findXEndOfMap(sensors, beacons) + maxDistance // add max distance to cover all necessary area
var noBeaconNodesInLine = findNoBeaconPositionsInLine(minX, maxX, inspectLineY, sensors, beacons) 

console.log("Solution 1: " + noBeaconNodesInLine.length) // 4793062

// functions

function getMaxDistanceFromSensorToBeacon(sensors){
  return sensors.sort((a,b) => {return b[2] - a[2]})
                [0][2]
}

function findNoBeaconPositionsInLine(minX, maxX, inspectLineY, sensors, beacons){

  var positionsWithNoPossibleBeacons = []

  for(x=minX; x<=maxX; x++){
    var currentPositions = [x,inspectLineY]
    
    var noBeaconPossible = sensors.some(function(sensor){
      // distance between sensor and current position is less than distance between sensor and beacon = cannot be beacon
      return spaceBetweenPoints(sensor, currentPositions) <= sensor[2]
    })

    var beaconOnPosition = beacons.some(function(beacon){
      return (beacon[0] == currentPositions[0] && beacon[1] == currentPositions[1])
    })
    var sensorOnPosition = sensors.some(function(sensor){
      return (sensor[0] == currentPositions[0] && sensor[1] == currentPositions[1])
    })

    if(noBeaconPossible && !(beaconOnPosition || sensorOnPosition)) positionsWithNoPossibleBeacons.push(currentPositions)
  }

  return positionsWithNoPossibleBeacons
}

function spaceBetweenPoints(point1, point2){
  // point sample = [0, 1] = array of x and y
  var xSpace = (point1[0] > point2[0]) ? point1[0]-point2[0] : point2[0]-point1[0]
  var ySpace = (point1[1] > point2[1]) ? point1[1]-point2[1] : point2[1]-point1[1]
  return xSpace + ySpace
}


function findXStartOfMap(sensors, beacons){
  sensors.sort(function(a, b){
    return a[0] - b[0]
  })

  beacons.sort(function(a, b){
    return a[0] - b[0]
  })

  return (sensors[0][0] > beacons[0][0]) ? beacons[0][0] : sensors[0][0]
}

function findXEndOfMap(sensors){
  sensors.sort(function(a, b){
    return b[0] - a[0]
  })

  beacons.sort(function(a, b){
    return b[0] - a[0]
  })

  return (sensors[0][0] < beacons[0][0]) ? beacons[0][0] : sensors[0][0]
}


function findAllSensorsWithNoBeaconPerimeter(lines){
return lines.map(function(line){
  var sensor = [Number(line.substring(line.indexOf("x=")+2, line.indexOf(","))), Number(line.substring(line.indexOf("y=")+2,line.indexOf(":")))]
  var beacon = [Number(line.substring(line.lastIndexOf("x=")+2,line.lastIndexOf(","))), Number(line.substring(line.lastIndexOf("y=")+2,line.length))]
  var positionsBetween = spaceBetweenPoints(sensor, beacon)

  // console.log(positionsBetween)
  // console.log(sensor)
  // console.log(beacon)
  
  return [sensor[0], sensor[1], positionsBetween]

})
}

function listAllBeacons(lines){
  return lines.map(function(line){
   return [Number(line.substring(line.lastIndexOf("x=")+2,line.lastIndexOf(","))), Number(line.substring(line.lastIndexOf("y=")+2,line.length))]
  })
}