const f = require('fs');
const readline = require('readline');
var inputFile = 'input.txt';

var reader = readline.createInterface({
    input : f.createReadStream(inputFile)
});
var counter = 0 // 629 is too high, 616 too high
reader.on('line', function (line) {

    console.log("line: " + line)
    var firstDwarf = [Number(line.split(",")[0].split("-")[0]), Number(line.split(",")[0].split("-")[1])]
    var secondDwarf = [Number(line.split(",")[1].split("-")[0]), Number(line.split(",")[1].split("-")[1])]
   // console.log(firstDwarf)
    //console.log(secondDwarf)

    if(firstDwarf[0] <= secondDwarf[0] && firstDwarf[1] >= secondDwarf[1]) {
      //  console.log("first condition")
        counter = counter + 1
    } else if(secondDwarf[0] <= firstDwarf[0] && secondDwarf[1] >= firstDwarf[1]) {
    //    console.log("second condition")
    //    console.log("seconddwarf[0]:" + secondDwarf[0])
        counter = counter + 1
    }

    console.log(counter)
    // var length = line.length
    // var firstCompartment = line.substring(0, length/2)
    // var secondCompartment = line.substring(length/2, length)
    // console.log("line: " + line)
    // console.log("firstCompartment: " + firstCompartment)
    // console.log("secondCompartment: " + secondCompartment)


    // for(var i = 0; i < length/2; i++){
    //     //console.log("char firstcomp[i]: " + firstCompartment[i])
    //     //console.log("result of if: " + secondCompartment.indexOf(firstCompartment[i]))
    //     if(secondCompartment.indexOf(firstCompartment[i]) != -1){
    //         console.log("found character: " + firstCompartment[i])
    //         foundCharacters += firstCompartment[i]
    //         if(firstCompartment[i].charCodeAt(0) >= 97) {
    //             console.log("char score: " + (firstCompartment[i].charCodeAt(0) - 96))
    //             score = score + (firstCompartment[i].charCodeAt(0) - 96)
    //         } else {
    //             console.log("char score: " + (firstCompartment[i].charCodeAt(0) - 38))
    //             score = score + (firstCompartment[i].charCodeAt(0) - 38)
    //         }
    //         break
    //     }
    // }

 
    // console.log("foundCharacters after this line: " + foundCharacters)
    // console.log("number of characters in foundCharacters after this line: " + foundCharacters.length)
    // console.log("score after this line: " + score) // 24878 too high, 6449 too low
    // console.log("----------------------------")
});