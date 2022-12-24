const fs = require("fs");
var inputFile = "input.txt";
const lines = fs.readFileSync(inputFile, "utf8").split("\n");

// change for different inputs
var searchXMax = 4000000;
var searchYMax = 4000000;
var beaconMultiplier = 4000000;

if (inputFile == "sample.txt" || inputFile == "sample2.txt") {
  searchXMax = 20;
  searchYMax = 20;
}

var sensors = findAllSensorsWithNoBeaconPerimeter(lines);
var beacons = listAllBeacons(lines);
var [left, right] = findEdges(sensors);
left.sort(function (a, b) {
  return a[0] - b[0];
});
right.sort(function (a, b) {
  return a[0] - b[0];
});
var checkOutsideSensors = [
  ...findSensorsToCheck(left),
  ...findSensorsToCheck(right),
];
var pointsToCheck = findPointsToConsider(checkOutsideSensors)
var pointWithNoBeacon = checkPointsIfTheyCanIncludeBeacon(pointsToCheck, sensors, beacons)

console.log("Point with no beacon: " + pointWithNoBeacon)
console.log("Result of part two: " + ((pointWithNoBeacon[0] * 4000000)+pointWithNoBeacon[1]))

function findPointsToConsider(sensors){
  
  var pointsToConsider = []

  sensors.forEach(function(sensor){
    var x = sensor[1][0]
    var y = sensor[1][1]
    var d = sensor[1][2]

    var leftPosition = [x - d - 1, y]
    var topPosition = [x, y + d + 1]
    var rightPosition = [x + d + 1, y]
    var bottomPosition = [x, y - d - 1]

    for(i=0;i<d;i++){
      pointsToConsider.push([leftPosition[0]+i,leftPosition[1]+i]) // from left to top
      pointsToConsider.push([bottomPosition[0]+i,bottomPosition[1]+i]) // from bottom to right

      pointsToConsider.push([bottomPosition[0]-i,bottomPosition[1]-i]) // from bottom to left
      pointsToConsider.push([rightPosition[0]-i,rightPosition[1]-i]) // from right to top
    }
  })
  return pointsToConsider
}

function findSensorsToCheck(edgeGroup) {
  var edgeGroupsToCheck = edgeGroup.filter(function (record, index, array) {
    return array.some(function (value) {
      return Math.abs(value[0] - record[0]) == 2;
    });
  });
  return edgeGroupsToCheck;
}

function findEdges(sensors) {
  var left = [];
  var right = [];

  sensors.forEach(function (sensor) {
    var sx = sensor[0];
    var sy = sensor[1];
    var d = sensor[2];

    left.push([sx - d + sy, sensor]); // left to top
    left.push([sx + d + sy, sensor]); // bottom to right
    right.push([sx + d - sy, sensor]); // right to top
    right.push([sx - d - sy, sensor]); // bottom to left

  });

  return [left, right];
}

function checkPointsIfTheyCanIncludeBeacon(possibleSolutions, sensors, beacons) {
  // possibleSolutions sample = array of points = [[x,y],[x,y]] = [[10, 20], [11, 15]]
  for (i = 0; i < possibleSolutions.length; i++) {
    var currentPositions = possibleSolutions[i];

    var noBeaconPossible = sensors.some(function (sensor) {
      // distance between sensor and current position is less than distance between sensor and beacon = cannot be beacon
      return spaceBetweenPoints(sensor, currentPositions) <= sensor[2];
    });

    var beaconOnPosition = beacons.some(function (beacon) {
      return (
        beacon[0] == currentPositions[0] && beacon[1] == currentPositions[1]
      );
    });

    var sensorOnPosition = sensors.some(function (sensor) {
      return (
        sensor[0] == currentPositions[0] && sensor[1] == currentPositions[1]
      );
    });

    if (
      !noBeaconPossible &&
      !(beaconOnPosition || sensorOnPosition) &&
      currentPositions[0] <= searchXMax &&
      currentPositions[1] <= searchXMax &&
      currentPositions[0] >= 0 &&
      currentPositions[1] >= 0
    ) {
      return currentPositions;
    }
  }
  return [];
}

function spaceBetweenPoints(point1, point2) {
  // point sample = [0, 1] = array of x and y
  var xSpace =
    point1[0] > point2[0] ? point1[0] - point2[0] : point2[0] - point1[0];
  var ySpace =
    point1[1] > point2[1] ? point1[1] - point2[1] : point2[1] - point1[1];
  return xSpace + ySpace;
}

function findAllSensorsWithNoBeaconPerimeter(lines) {
  return lines.map(function (line) {
    var sensor = [
      Number(line.substring(line.indexOf("x=") + 2, line.indexOf(","))),
      Number(line.substring(line.indexOf("y=") + 2, line.indexOf(":"))),
    ];
    var beacon = [
      Number(line.substring(line.lastIndexOf("x=") + 2, line.lastIndexOf(","))),
      Number(line.substring(line.lastIndexOf("y=") + 2, line.length)),
    ];
    var positionsBetween = spaceBetweenPoints(sensor, beacon);
    return [sensor[0], sensor[1], positionsBetween];
  });
}

function listAllBeacons(lines) {
  return lines.map(function (line) {
    return [
      Number(line.substring(line.lastIndexOf("x=") + 2, line.lastIndexOf(","))),
      Number(line.substring(line.lastIndexOf("y=") + 2, line.length)),
    ];
  });
}
