const f = require('fs');
const readline = require('readline');
var inputFile = 'input.txt';

var reader = readline.createInterface({
    input : f.createReadStream(inputFile)
});

var myTotalScore = 0
reader.on('line', function (line) {

   var myChoice = line[2]
   var opponentChoice = line[0]

   if(myChoice == "X") { // rock
        myTotalScore = myTotalScore + 1 // 1 for choosing rock
        if(opponentChoice == "A") myTotalScore = myTotalScore + 3 // for draw
        if(opponentChoice == "B") myTotalScore = myTotalScore + 0 // for loss
        if(opponentChoice == "C") myTotalScore = myTotalScore + 6 // for win
   }

   if(myChoice == "Y") { // paper
        myTotalScore = myTotalScore + 2 // 2 for choosing paper
        if(opponentChoice == "A") myTotalScore = myTotalScore + 6 // for win
        if(opponentChoice == "B") myTotalScore = myTotalScore + 3 // for draw
        if(opponentChoice == "C") myTotalScore = myTotalScore + 0 // for loss
   }

   if(myChoice == "Z") { // scissors
        myTotalScore = myTotalScore + 3 // 3 for choosing scissors
        if(opponentChoice == "A") myTotalScore = myTotalScore + 0 // for loss
        if(opponentChoice == "B") myTotalScore = myTotalScore + 6 // for win
        if(opponentChoice == "C") myTotalScore = myTotalScore + 3 // for draw
   }

   


   console.log("my choice: " + myChoice)
   console.log("opponent choice: " + opponentChoice)
   console.log("my total points: " + myTotalScore) // 12272 is low
    
});