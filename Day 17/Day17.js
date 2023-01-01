var objectTypes = {
  empty: 0,
  static: 1,
  moving: 2
}

function isObjectInLine (objectType, lineIndex, currentState) {
  return currentState[lineIndex].some(function (currentPosition) {
    return currentPosition == objectType
  })
}

function findFirstAppearanceOfObject (objectType, currentState) {
  // return zero if not found (ground)

  var topPositionOfObject = 0 // default top position if there is no unit

  // loop through current state from last line, if line has unit note the index of line
  for (i = currentState.length - 1; i > 0; i--) {
    var lineHasUnit = isObjectInLine(objectType, i, currentState)

    if (lineHasUnit) {
      topPositionOfObject = i
      break
    }
  }

  return topPositionOfObject
}

function makeMovingObjectStatic (currentState) {
  var maximumLinesWhereObjectCanBe = 4
  var firstIndexOfObject = findFirstAppearanceOfObject(
    objectTypes.moving,
    currentState
  )

  var loopUntil =
    firstIndexOfObject - maximumLinesWhereObjectCanBe < 0
      ? 0
      : firstIndexOfObject - maximumLinesWhereObjectCanBe

  for (i = firstIndexOfObject; i >= loopUntil; i--) {
    currentState[i].forEach(function (item, index) {
      if (item == 2) currentState[i][index] = 1
    })
    if (i == 0) break
  }
}

function removeEmptyLinesFromTop (currentState) {
  var staticObjectStartsAtIndex = findFirstAppearanceOfObject(
    objectTypes.static,
    currentState
  )

  // remove lines if there is more
  if (
    staticObjectStartsAtIndex < currentState.length - 1 &&
    currentState.length != 0
  ) {
    //console.log('update lines, we need less')
    for (s = currentState.length; s > staticObjectStartsAtIndex; s--) {
      currentState.splice(s, 1)
    }
  }
}

function addNewUnit (unitType, currentState) {
  var emptyLine = [0, 0, 0, 0, 0, 0, 0]

  var staticObjectStartsAtIndex = findFirstAppearanceOfObject(
    objectTypes.static,
    currentState
  )
  var emptyLinesBetweenNewObjectAndStaticPart = 3

  removeEmptyLinesFromTop(currentState)

  // add three lines between last position and current line
  for (
    i = staticObjectStartsAtIndex;
    i < staticObjectStartsAtIndex + emptyLinesBetweenNewObjectAndStaticPart;
    i++
  ) {
    currentState.push(emptyLine) // add empty line if needed
  }

  for (k = 0; k < unitTypes[unitType].length; k++) {
    //currentState.push(unitTypes[unitType][k])
    currentState.push(JSON.parse(JSON.stringify(unitTypes[unitType][k])))
  }
}

function displayCurrentState (currentState) {
  console.log('') // empty line to separate
  var currentStateLength = currentState.length
  for (i = currentStateLength - 1; i >= 0; i--) {
    console.log(
      (i + 1).toString().padStart(4, '0') +
        ' | ' +
        currentState[i].join(' ').replaceAll('1', '#').replaceAll('0', '.') +
        ' |'
    )
  }
  console.log('     | - - - - - - - |') // bottom line
}

function unitTypeHeight (unitType) {
  switch (unitType) {
    case 0:
      return 1
    case 1:
    case 2:
      return 3
    case 3:
      return 4
    case 4:
      return 2
    default:
      console.error('unknown unit type: ' + unitType)
      break
  }

  return 0
}

function unitCanMoveDown (unitHeight, currentState) {
  var canMoveDown = true
  var firstIndexOfMovingObjectFromTop = findFirstAppearanceOfObject(
    objectTypes.moving,
    currentState
  )
  var loopUntil =
    firstIndexOfMovingObjectFromTop - unitHeight < 0
      ? 0
      : firstIndexOfMovingObjectFromTop - unitHeight

  var canMoveDown = true

  // checking if object is on ground
  if (isObjectInLine(objectTypes.moving, 0, currentState)) {
    return false
  }

  for (i = firstIndexOfMovingObjectFromTop; i >= loopUntil; i--) {
    canMoveDown = !currentState[i].some(function (item, index, array) {
      return item == 2 && currentState[i - 1][index] == 1
    })

    if (!canMoveDown) return false
  }

  return canMoveDown
}

function unitCanMoveLeft (unitHeight, currentState) {
  var canMoveLeft = true
  var firstIndexOfMovingObjectFromTop = findFirstAppearanceOfObject(
    objectTypes.moving,
    currentState
  )
  var loopUntil =
    firstIndexOfMovingObjectFromTop - unitHeight < 0
      ? 0
      : firstIndexOfMovingObjectFromTop - unitHeight

  for (i = firstIndexOfMovingObjectFromTop; i >= loopUntil; i--) {
    // check if any position of unit is on the left edge, if so we cannot move left
    if (currentState[i][0] == 2) {
      canMoveLeft = false
      break
    }

    canMoveLeft = !currentState[i].some(function (item, index, array) {
      return item == 2 && array[index - 1] == 1 // TODO - this may not work depending if index - 1 is evaluated
    })

    if (!canMoveLeft) break
  }

  return canMoveLeft
}

function unitCanMoveRight (unitHeight, currentState) {
  var canMoveRight = true
  var firstIndexOfMovingObjectFromTop = findFirstAppearanceOfObject(
    objectTypes.moving,
    currentState
  )
  var loopUntil =
    firstIndexOfMovingObjectFromTop - unitHeight < 0
      ? 0
      : firstIndexOfMovingObjectFromTop - unitHeight

  for (i = firstIndexOfMovingObjectFromTop; i >= loopUntil; i--) {
    // check if any position of unit is on the left edge, if so we cannot move left
    if (currentState[i][6] == 2) {
      canMoveRight = false
      break
    }

    canMoveRight = !currentState[i].some(function (item, index, array) {
      return item == 2 && array[index + 1] == 1 // TODO - this may not work depending if index - 1 is evaluated
    })

    if (!canMoveRight) break
  }

  return canMoveRight
}

function moveRight (unitType) {
  var unitHeight = unitTypeHeight(unitType)
  var firstIndexOfMovingObjectFromTop = findFirstAppearanceOfObject(
    objectTypes.moving,
    currentState
  )
  var loopUntil =
    firstIndexOfMovingObjectFromTop - unitHeight < 0
      ? 0
      : firstIndexOfMovingObjectFromTop - unitHeight

  for (i = firstIndexOfMovingObjectFromTop; i >= loopUntil; i--) {
    for (l = 6; l >= 0; l--) {
      if (currentState[i][l] == 2) {
        currentState[i][l + 1] = 2 // this will work because edge case on the right will not get here
        currentState[i][l] = 0
      }
    }
  }
}

function moveLeft (unitType) {
  var unitHeight = unitTypeHeight(unitType)
  var firstIndexOfMovingObjectFromTop = findFirstAppearanceOfObject(
    objectTypes.moving,
    currentState
  )
  var loopUntil =
    firstIndexOfMovingObjectFromTop - unitHeight < 0
      ? 0
      : firstIndexOfMovingObjectFromTop - unitHeight

  for (i = firstIndexOfMovingObjectFromTop; i >= loopUntil; i--) {
    for (l = 0; l <= 6; l++) {
      if (currentState[i][l] == 2) {
        currentState[i][l - 1] = 2 // this will work because edge case on the left will not get here
        currentState[i][l] = 0
      }
    }
  }
}

function letJetBlow (jetBlowingDirection, unitType, currentState) {
  //console.log(jetBlowingDirection)
  // console.log(unitType)
  // console.log(currentState)
  var unitHeight = unitTypeHeight(unitType)

  switch (jetBlowingDirection) {
    case '>':
      var canMoveRight = unitCanMoveRight(unitHeight, currentState)
      if (canMoveRight) moveRight(unitType)
      break
    case '<':
      var canMoveLeft = unitCanMoveLeft(unitHeight, currentState)
      if (canMoveLeft) moveLeft(unitType)
      break
    default:
      console.log('unknown jet blow direction: ' + jetBlowingDirection)
      break
  }
}

function letUnitFall (unitType, currentState) {
  // fall by one line - if static part is hit do not move and change it to 1
  var topPositionOfMovingObject = findFirstAppearanceOfObject(
    objectTypes.moving,
    currentState
  )
  var bottomPositionOfMovingObject = 0
  switch (unitType) {
    case 0:
      bottomPositionOfMovingObject = topPositionOfMovingObject
      break
    case 1:
    case 2:
      bottomPositionOfMovingObject = topPositionOfMovingObject - 2
      break
    case 3:
      bottomPositionOfMovingObject = topPositionOfMovingObject - 3
      break
    case 4:
      bottomPositionOfMovingObject = topPositionOfMovingObject - 1
      break
    default:
      console.error('unknown unit type: ' + unitType)
      break
  }

  // console.log('bottom: ' + bottomPositionOfMovingObject)
  // console.log('top: ' + topPositionOfMovingObject)

  for (j = bottomPositionOfMovingObject; j <= topPositionOfMovingObject; j++) {
    var tempLine = []
    for (l = 0; l <= 6; l++) {
      if (currentState[j][l] == 2) {
        currentState[j][l] = 0
        tempLine.push(2)
      } else {
        tempLine.push(currentState[j - 1][l])
      }
      //displayCurrentState(currentState)
      //console.log('one') // TODO - something is wrong
    }
    currentState[j - 1] = tempLine
  }
}

// 0 is empty position
// 1 is static position (already felt)
// 2 is currently moving block

// start processing
const fs = require('fs')
const { stringify } = require('querystring')
var inputFile = 'sample.txt'
const jets = fs.readFileSync(inputFile, 'utf8').split('')
var jetsQueue = JSON.parse(JSON.stringify(jets)) // TODO - assign again whne there is no more jets

var unitPatterns = [0, 1, 2, 3, 4]

var pattern0 = [[0, 0, 2, 2, 2, 2, 0]] // horizontal line
var pattern1 = [
  [0, 0, 0, 2, 0, 0, 0],
  [0, 0, 2, 2, 2, 0, 0],
  [0, 0, 0, 2, 0, 0, 0]
] // plus
var pattern2 = [
  [0, 0, 2, 2, 2, 0, 0],
  [0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 2, 0, 0]
] // reversed l
var pattern3 = [
  [0, 0, 2, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0]
] // vertical line
var pattern4 = [
  [0, 0, 2, 2, 0, 0, 0],
  [0, 0, 2, 2, 0, 0, 0]
] // square
var unitTypes = [pattern0, pattern1, pattern2, pattern3, pattern4]

var currentState = [] // initial state
var unitsToFall = 2022

for (unit = 0; unit < unitsToFall; unit++) {
  // select which unit will start falling
  var unitType = unit % unitPatterns.length

  addNewUnit(unitType, currentState)
  // console.log('after new unit appears')
  //displayCurrentState(currentState)

  var canFall = true
  while (canFall) {
    if (jetsQueue.length == 0) jetsQueue = JSON.parse(JSON.stringify(jets))
    letJetBlow(jetsQueue.shift(), unitType, currentState)
    //  console.log('after jet blow')
    //displayCurrentState(currentState)

    canFall = unitCanMoveDown(unitTypeHeight(unitType), currentState)
    if (canFall) {
      letUnitFall(unitType, currentState)
      //   console.log('after unit falls')
      //displayCurrentState(currentState)
    } else {
      //letJetBlow(jetsQueue.shift(), unitType, currentState)
      //console.log('after jet blows 2')
      //displayCurrentState(currentState)

      makeMovingObjectStatic(currentState)
      //     console.log('after making static')
      //displayCurrentState(currentState)
    }
  }
}

removeEmptyLinesFromTop(currentState)

console.log(currentState.length)
//displayCurrentState(currentState) // uncomment to see how it looks like
