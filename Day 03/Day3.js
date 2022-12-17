const f = require('fs');
const { toASCII } = require('punycode');
const readline = require('readline');
var inputFile = 'input.txt';

var reader = readline.createInterface({
    input : f.createReadStream(inputFile)
});

var foundCharacters = ""
var score = 0
reader.on('line', function (line) {

    var length = line.length
    var firstCompartment = line.substring(0, length/2)
    var secondCompartment = line.substring(length/2, length)
    console.log("line: " + line)
    console.log("firstCompartment: " + firstCompartment)
    console.log("secondCompartment: " + secondCompartment)


    for(var i = 0; i < length/2; i++){
        //console.log("char firstcomp[i]: " + firstCompartment[i])
        //console.log("result of if: " + secondCompartment.indexOf(firstCompartment[i]))
        if(secondCompartment.indexOf(firstCompartment[i]) != -1){
            console.log("found character: " + firstCompartment[i])
            foundCharacters += firstCompartment[i]
            if(firstCompartment[i].charCodeAt(0) >= 97) {
                console.log("char score: " + (firstCompartment[i].charCodeAt(0) - 96))
                score = score + (firstCompartment[i].charCodeAt(0) - 96)
            } else {
                console.log("char score: " + (firstCompartment[i].charCodeAt(0) - 38))
                score = score + (firstCompartment[i].charCodeAt(0) - 38)
            }
            break
        }
    }

 
    console.log("foundCharacters after this line: " + foundCharacters)
    console.log("number of characters in foundCharacters after this line: " + foundCharacters.length)
    console.log("score after this line: " + score) // 24878 too high, 6449 too low
    console.log("----------------------------")
});