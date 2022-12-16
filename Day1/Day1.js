const f = require('fs');
const readline = require('readline');
var inputFile = 'input.txt';

var reader = readline.createInterface({
    input : f.createReadStream(inputFile)
});


var currentGuyCarry = 0
var maximumOneGuyCarry = 0
var firstThree = [0, 0, 0]
var sumOfFirstThree = 0
reader.on('line', function (line) {

    if(line.length==0){
        console.log("new guy")
        console.log("previous guy carry: " + currentGuyCarry)

        // new maximum
        if(currentGuyCarry > maximumOneGuyCarry) {
           maximumOneGuyCarry = currentGuyCarry
        }

        // change in first three positions
        if(currentGuyCarry > firstThree[2]){
            firstThree[0] = firstThree[1]
            firstThree[1] = firstThree[2]
            firstThree[2] = currentGuyCarry
        } else if (currentGuyCarry > firstThree[1]){
            firstThree[0] = firstThree[1]
            firstThree[1] = currentGuyCarry
        } else if (currentGuyCarry > firstThree[0]){
            firstThree[0] = currentGuyCarry
        }

        // reset
        currentGuyCarry = 0
    } else {
        currentGuyCarry = currentGuyCarry + Number(line)
    }

    sumOfFirstThree = firstThree[0] + firstThree[1] + firstThree[2]

    console.log("current maximum: " + maximumOneGuyCarry)
    console.log("first three: " + sumOfFirstThree)
});